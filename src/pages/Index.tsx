import React, { useRef, useState, useEffect } from 'react';
import '@/styles/home.css';
import { ArrowRight, ShieldCheck, Truck, Leaf, Heart, Package, ShoppingBag, PlusCircle } from 'lucide-react';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import { getProducts, type Product } from '@/lib/pocketbase';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Logo } from '@/components/Logo';
import { ProductImage } from '@/components/ProductImage';
import { Card } from '@/components/ui/card';
import { trackButtonClick } from '@/lib/analytics';
import UtmLink from '@/components/UtmLink';
import { BuilderComponent } from "@/components/BuilderComponent";
import { builder } from "@/lib/builder";
// Removed homepage-config-service. Inline minimal config shape and defaults.
type HomepageConfig = {
  showHero: boolean;
  showNewArrivals: boolean;
  showFeatures: boolean;
  showBestsellers: boolean;
  showTestimonials: boolean;
  showNewsletter: boolean;
  heroOrder: number;
  newArrivalsOrder: number;
  featuresOrder: number;
  bestsellersOrder: number;
  testimonialsOrder: number;
  newsletterOrder: number;
};
const DEFAULT_HOMEPAGE_CONFIG: HomepageConfig = {
  showHero: true,
  showNewArrivals: true,
  showFeatures: true,
  showBestsellers: true,
  showTestimonials: true,
  showNewsletter: true,
  heroOrder: 10,
  newArrivalsOrder: 20,
  featuresOrder: 30,
  bestsellersOrder: 40,
  testimonialsOrder: 50,
  newsletterOrder: 60,
};

import { OfferBanner } from '@/components/OfferBanner';
import { pocketbase } from '@/lib/pocketbase';

const FeatureItem = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="flex flex-col items-center text-center p-6 transition-all rounded-lg">
    <div className="bg-[#219898]/10 p-3 rounded-full mb-4">
      <Icon className="h-6 w-6 text-[#219898]" />
    </div>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
  </div>
);

const CategoryBadge = ({ title, onClick }: { title: string, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="px-4 py-2 rounded-full border border-gray-200 hover:border-[#219898] hover:bg-[#219898]/5 transition-colors text-sm font-medium"
  >
    {title}
  </button>
);

const Index = () => {
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  
  // Debug state to track product loading
  const [productLoadState, setProductLoadState] = useState({
    attempted: false,
    success: false,
    productsCount: 0
  });
  const [homepageConfig] = useState<HomepageConfig>(DEFAULT_HOMEPAGE_CONFIG);
  const [configLoaded] = useState(true);
  interface BuilderContent {
    data?: {
      title?: string;
      subtitle?: string;
      image?: string;
      buttonText?: string;
      buttonLink?: string;
      [key: string]: string | number | boolean | null | undefined;
    };
    id?: string;
    name?: string;
    [key: string]: string | number | boolean | null | undefined | Record<string, unknown> | unknown;
  }
  
  const [heroContent, setHeroContent] = useState<BuilderContent | null>(null);
  const [featuresContent, setFeaturesContent] = useState<BuilderContent | null>(null);
  // Offer banner state (homepage)
  const [offerLoading, setOfferLoading] = useState(false);
  const [showOffer, setShowOffer] = useState(false);
  const [offerTitle, setOfferTitle] = useState<string>('');
  const [offerDescription, setOfferDescription] = useState<string>('');
  const [offerMinOrder, setOfferMinOrder] = useState<number | null>(null);
  const [offerImageUrl, setOfferImageUrl] = useState<string | undefined>(undefined);
  
  // Simple refs without animation dependency
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const bestsellersRef = useRef<HTMLElement>(null);
  const newArrivalsRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    console.log('Index component mounted');
    // Using default homepage configuration (static)
    
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setProductLoadState(prev => ({ ...prev, attempted: true }));
        
        // Log the product fetching attempt
        console.log('Attempting to fetch products...');
        
        // Fetch all products once (already ordered by list_order first in getProducts)
        const allProducts = await getProducts({}, controller.signal);

        // Build Bestsellers: show list_ordered products first (even if not bestseller),
        // then append remaining bestsellers without positive list_order, preserving their order
        const ordered = allProducts
          .filter(p => typeof (p as any).list_order === 'number' && ((p as any).list_order as number) > 0)
          .sort((a, b) => ((a as any).list_order as number) - ((b as any).list_order as number));

        const bestsellersRest = allProducts.filter(p => p.bestseller && !((p as any).list_order as number > 0));

        let bestsellersData = [...ordered, ...bestsellersRest];

        // New Arrivals keeps existing behavior: take flagged items in the incoming order
        let newArrivalsData = allProducts.filter(p => p.new);

        // If both lists are empty, fallback to first items
        if (bestsellersData.length === 0 && allProducts.length > 0) {
          bestsellersData = allProducts.slice(0, 4);
        }
        if (newArrivalsData.length === 0 && allProducts.length > 0) {
          newArrivalsData = allProducts.slice(0, 4);
        }

        // Debug log the product data
        console.log('Bestsellers data (ordered-first):', bestsellersData.map(p => ({ name: p.name, list_order: (p as any).list_order, bestseller: p.bestseller })));
        console.log('New arrivals data:', newArrivalsData.map(p => ({ name: p.name, list_order: (p as any).list_order, new: p.new })));
        
        // Get featured products - prioritize actual bestsellers, but fallback if needed
        let featuredOnes = bestsellersData.length > 0 ? [bestsellersData[0]] : [];
        
        // If no featured product yet, try to get one from any available product
        if (featuredOnes.length === 0 && newArrivalsData.length > 0) {
          featuredOnes = [newArrivalsData[0]];
        }
        
        // If still no products, make one final attempt to get any product
        if ((bestsellersData.length === 0 || newArrivalsData.length === 0) && !controller.signal.aborted) {
          try {
            const anyProducts = await getProducts({}, controller.signal);
            console.log('Fallback to any products:', anyProducts);
            
            if (bestsellersData.length === 0) {
              bestsellersData = anyProducts.slice(0, 4);
            }
            
            if (newArrivalsData.length === 0) {
              newArrivalsData = anyProducts.slice(0, 4);
            }
            
            if (featuredOnes.length === 0 && anyProducts.length > 0) {
              featuredOnes = [anyProducts[0]];
            }
          } catch (err) {
            console.error('Error in fallback product fetch:', err);
          }
        }
        
        setBestsellers(bestsellersData);
        setNewArrivals(newArrivalsData);
        setFeaturedProducts(featuredOnes);
        
        // Update product load state
        const totalProducts = bestsellersData.length + newArrivalsData.length;
        setProductLoadState({
          attempted: true,
          success: totalProducts > 0,
          productsCount: totalProducts
        });
        
        console.log(`Products loaded successfully: ${totalProducts} total products`);
      } catch (error) {
        // Only log error if it's not an abort error
        if (!(error instanceof Error) || error.name !== 'AbortError') {
          console.error('Error fetching products:', error);
          setProductLoadState(prev => ({ ...prev, success: false }));
        }
      } finally {
        setLoading(false);
      }
    };
    
    async function fetchBuilderContent() {
      try {
        // Fetch hero section content
        const heroData = await builder
          .get('home-hero', {
            cachebust: false
          })
          .promise();

        // Fetch features section content
        const featuresData = await builder
          .get('home-features', {
            cachebust: false
          })
          .promise();

        setHeroContent(heroData);
        setFeaturesContent(featuresData);
      } catch (error) {
        console.error('Error fetching Builder.io content:', error);
      }
    }
    
    fetchProducts();
    fetchBuilderContent();

    // Fetch active special offer for homepage banner
    const fetchOffer = async () => {
      try {
        setOfferLoading(true);
        const offers = await pocketbase.collection('special_offers').getList(1, 1, {
          filter: 'active = true && start_date <= @now && end_date >= @now',
          sort: '-created',
          expand: 'product'
        });
        if (offers.items && offers.items.length > 0) {
          const offer: any = offers.items[0];
          setOfferTitle(offer.title || 'Special Offer');
          setOfferDescription(offer.description || '');
          setOfferMinOrder(typeof offer.min_order_value === 'number' ? offer.min_order_value : null);

          // Try resolve image from expanded product
          let resolvedImage: string | undefined = undefined;
          try {
            const expanded: any = offer.expand;
            const prod = expanded?.product;
            const firstImage = Array.isArray(prod?.images) && prod.images.length > 0 ? prod.images[0] : undefined;
            if (prod && typeof firstImage === 'string') {
              resolvedImage = pocketbase.files.getURL(prod, firstImage);
            }
          } catch {}

          // Fallback: free_gift gift_product_id
          if (!resolvedImage && offer.offer_type === 'free_gift' && offer.gift_product_id) {
            try {
              const giftProduct = await pocketbase.collection('products').getOne(offer.gift_product_id, { $autoCancel: false });
              const imgs: unknown = (giftProduct as any).images;
              if (Array.isArray(imgs) && imgs.length > 0 && typeof imgs[0] === 'string') {
                resolvedImage = pocketbase.files.getURL(giftProduct, imgs[0]);
              }
            } catch {}
          }

          setOfferImageUrl(resolvedImage);
          setShowOffer(true);
        } else {
          setShowOffer(false);
        }
      } catch (e) {
        console.warn('[homepage] Failed to fetch special offer:', e);
        setShowOffer(false);
      } finally {
        setOfferLoading(false);
      }
    };

    fetchOffer();

    return () => {
      controller.abort();
    };
  }, []);

  const handleCategoryClick = (category: string) => {
    trackButtonClick(`category_${category.toLowerCase().replace(/\s+/g, '_')}`, category, window.location.pathname);
    window.location.href = `/shop?category=${encodeURIComponent(category)}`;
  };

  const handleShopNowClick = () => {
    trackButtonClick('shop_now_button', 'Shop Now', window.location.pathname);
  };
  
  return (
    <div className="flex flex-col bg-white">


      {/* All other sections are rendered based on backend configuration */}
      {(() => {
        // Define array to hold all sections in the correct order
        const sections: {
          id: string;
          order: number;
          component: React.ReactNode;
        }[] = [];
        
        // Only proceed if homepage config is loaded
        if (!configLoaded) {
          return <div className="konipai-container py-12 text-center"><p>Loading homepage configuration...</p></div>;
        }
        
        console.log('Product state for rendering:', {
          bestsellers: bestsellers?.length || 0,
          newArrivals: newArrivals?.length || 0,
          featuredProducts: featuredProducts?.length || 0,
          loading
        });
        // Hero Section
        if (homepageConfig.showHero) {
          sections.push({
            id: "hero",
            order: homepageConfig.heroOrder,
            component: (
              <div key="hero" ref={heroRef} className="relative">
                {heroContent ? (
                  <BuilderComponent 
                    model="home-hero" 
                    content={heroContent}
                  />
                ) : (
                  <Hero />
                )}
                {/* Offer banner below hero */}
                {offerLoading ? (
                  <div className="konipai-container py-4 flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <span>Loading offer...</span>
                  </div>
                ) : showOffer ? (
                  <div className="konipai-container mt-4">
                    <OfferBanner
                      title={offerTitle}
                      description={offerDescription}
                      imageUrl={offerImageUrl}
                      active={true}
                      minValue={offerMinOrder ?? undefined}
                      currentAmount={0}
                    />
                  </div>
                ) : null}
              </div>
            )
          });
        }


        
        // New Arrivals Section
        if (homepageConfig.showNewArrivals) {
          sections.push({
            id: "new-arrivals",
            order: homepageConfig.newArrivalsOrder,
            component: (
              <section 
                key="new-arrivals"
                ref={newArrivalsRef}
                className="py-24 bg-white animate-fade-in new-arrivals-section"
              >
                <div className="konipai-container">
                  <div className="text-center max-w-3xl mx-auto mb-12">
                    <Badge className="mb-4 py-1.5 px-3 bg-primary text-white hover:bg-primary/90">Just Arrived</Badge>
                    <h2 className="text-4xl font-bold mb-4">New Arrivals</h2>
                    <p className="text-gray-600">
                      Discover our latest collection of handcrafted natural soaps, made with care for your skin and the environment.
                    </p>
                  </div>
                  <div className="relative">
                    <ProductGrid products={newArrivals.slice(0, 4)} loading={loading} />
                    {newArrivals.length === 0 && !loading && (
                      <div className="py-8 text-center">
                        <p className="text-gray-500">No new arrival products found</p>
                      </div>
                    )}
                    <div className="mt-10 text-center">
                      <Button 
                        asChild 
                        variant="outline" 
                        size="lg" 
                        className="rounded-full border-[#219898] text-[#219898] hover:bg-[#219898] hover:text-white px-8"
                        onClick={() => trackButtonClick('view_new_arrivals_button', 'View All New Arrivals', window.location.pathname)}
                      >
                        <UtmLink to="/new-arrivals">
                          View All
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </UtmLink>
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            )
          });
        }
        
        // Features Section
        if (homepageConfig.showFeatures) {
          sections.push({
            id: "features",
            order: homepageConfig.featuresOrder,
            component: (
              <section 
                key="features"
                ref={featuresRef}
                className="py-20 bg-[#219898]/5 animate-fade-in features-section"
              >
                <div className="konipai-container">
                  <div className="text-center max-w-3xl mx-auto mb-12">
                    <Badge className="mb-4 py-1.5 px-3 bg-[#219898]/10 text-[#219898] hover:bg-[#219898]/20">Why Choose Us</Badge>
                    <h2 className="text-4xl font-bold mb-4">Crafted with Care</h2>
                    <p className="text-gray-600">
                      Our products are made with natural ingredients, designed for sustainability, and delivered with exceptional service.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    <FeatureItem 
                      icon={Leaf} 
                      title="Natural Ingredients" 
                      description="We use only the purest natural ingredients, sourced sustainably and carefully selected for their beneficial properties."
                    />
                    <FeatureItem 
                      icon={ShieldCheck} 
                      title="Quality Guaranteed" 
                      description="Every product meets our strict quality standards, ensuring you receive only the best for your skin and home."
                    />
                    <FeatureItem 
                      icon={Heart} 
                      title="Made with Love" 
                      description="Each item is handcrafted with attention to detail and a genuine passion for creating exceptional products."
                    />
                  </div>
                </div>
              </section>
            )
          });
        }

        // Bestsellers Section
        if (homepageConfig.showBestsellers) {
          sections.push({
            id: "bestsellers",
            order: homepageConfig.bestsellersOrder,
            component: (
              <section 
                key="bestsellers"
                ref={bestsellersRef}
                className="py-24 bg-[#F9F9F9] animate-fade-in bestsellers-section"
              >
                <div className="konipai-container">
                  <div className="text-center max-w-3xl mx-auto mb-12">
                    <Badge className="mb-4 py-1.5 px-3 bg-[#219898]/10 text-[#219898] hover:bg-[#219898]/20">Most Popular</Badge>
                    <h2 className="text-4xl font-bold mb-4">Our Bestsellers</h2>
                    <p className="text-gray-600">
                      Our most popular products loved by customers. High-quality, sustainable, and effective solutions for everyday use.
                    </p>
                  </div>
                  <div className="relative">
                    <ProductGrid products={bestsellers} loading={loading} />
                    {bestsellers.length === 0 && !loading && (
                      <div className="py-8 text-center">
                        <p className="text-gray-500">No bestseller products found</p>
                      </div>
                    )}
                    <div className="mt-10 text-center hidden">
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="rounded-full border-[#219898] text-[#219898] hover:bg-[#219898] hover:text-white px-8"
                        onClick={() => trackButtonClick('view_bestsellers_button', 'View All Bestsellers', window.location.pathname)}
                      >
                        <UtmLink to="/bestsellers">
                          View All
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </UtmLink>
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            )
          });
        }
        
        // Testimonials Section
        if (homepageConfig.showTestimonials) {
          sections.push({
            id: "testimonials",
            order: homepageConfig.testimonialsOrder,
            component: (
              <div key="testimonials" className="relative">
                <Testimonials />
              </div>
            )
          });
        }
        
        // Newsletter Section
        if (homepageConfig.showNewsletter) {
          sections.push({
            id: "newsletter",
            order: homepageConfig.newsletterOrder,
            component: (
              <div key="newsletter" className="relative bg-gray-50">
                <Newsletter />
              </div>
            )
          });
        }
        
        console.log("Sections before sorting:", sections.map(s => ({ section: s.id, order: s.order })));
        
        // Debug information for product states
        console.log('Product rendering state:', { 
          loading, 
          bestsellersCount: bestsellers?.length || 0,
          newArrivalsCount: newArrivals?.length || 0,
          featuredCount: featuredProducts?.length || 0,
          productLoadState 
        });

        // Render the sorted sections
        return (
          <>
            {/* Loading state handled by skeleton components */}

            {/* Render sorted sections */}
            {sections.sort((a, b) => a.order - b.order).map((section) => (
              <div key={section.id}>
                {section.component}
              </div>
            ))}

            {/* Floating WhatsApp Order Button (Homepage) */}
            <a
              href={`https://wa.me/919486054899?text=${encodeURIComponent("Hi Karigai, I'd like to place an order.")}`}
              target="_blank"
              rel="noreferrer"
              className="fixed bottom-24 right-4 z-50"
              aria-label="Order via WhatsApp"
            >
              <div className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-7 w-7 fill-current">
                  <path d="M27.1 4.9A13.9 13.9 0 0 0 16 .1C7.3.1.2 7.2.2 15.9c0 2.8.8 5.5 2.2 7.8L.1 32l8.5-2.2c2.2 1.2 4.7 1.9 7.3 1.9 8.7 0 15.8-7.1 15.8-15.8 0-4.2-1.7-8.2-4.6-11zm-11.1 24c-2.3 0-4.6-.6-6.6-1.8l-.5-.3-5.1 1.3 1.4-5-.3-.5c-1.3-2.1-2-4.5-2-7 0-7.3 6-13.3 13.3-13.3 3.6 0 6.9 1.4 9.4 3.9 2.5 2.5 3.9 5.8 3.9 9.4 0 7.3-6 13.3-13.3 13.3zm7.3-9.9c-.4-.2-2.3-1.1-2.6-1.2-.4-.1-.6-.2-.9.2-.3.4-1 1.2-1.2 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.3-2.1-2.7-.2-.4 0-.6.2-.8.2-.2.4-.4.5-.6.2-.2.3-.4.4-.6.1-.2 0-.5 0-.7s-.9-2.1-1.2-2.9c-.3-.7-.6-.6-.9-.6h-.8c-.3 0-.7.1-1 .5-.3.4-1.3 1.3-1.3 3.2s1.4 3.7 1.6 4 .3.6.6 1c.8 1.1 1.8 2.1 3 2.8 1 .6 2 .8 2.7 1 .9.3 1.8.2 2.5.1.8-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5z"/>
                </svg>
              </div>
            </a>
            
            {/* Debug section - only visible in development */}
            {process.env.NODE_ENV !== 'production' && productLoadState.attempted && !loading && bestsellers.length === 0 && newArrivals.length === 0 && (
              <div className="konipai-container py-4 bg-red-50 border border-red-200 rounded-lg my-4">
                <p className="text-sm text-red-600">No products found. Please make sure you have products marked as bestsellers or new arrivals in your database.</p>
              </div>
            )}
          </>
        );
      })()}
    </div>
  );
};

export default Index;
