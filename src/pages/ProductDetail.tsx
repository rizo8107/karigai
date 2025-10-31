import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  ArrowLeft, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw, 
  Star,
  Check,
  ImageIcon,
  Loader2,
  ShoppingCart,
  CornerDownRight,
  Info,
  Ruler,
  Clock,
  Package,
  ThumbsUp,
  Award
} from 'lucide-react';
import { getProduct, getProducts, getProductReviews, type Product, type ProductColor, pocketbase, Collections } from '@/lib/pocketbase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/components/ui/use-toast";
import { cn } from '@/lib/utils';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductImage } from '@/components/ProductImage';
import { preloadImages, getPocketBaseImageUrl, ImageSize } from '@/utils/imageOptimizer';
import { trackEcommerceEvent } from '@/utils/analytics';
import { useAuth } from '@/contexts/AuthContext';
import { 
  trackProductView, 
  trackAddToCart, 
  trackButtonClick 
} from '@/lib/analytics';
import { ProductReviews } from '@/components/ProductReviews';
import { ProductDetails } from '@/components/ProductDetails';
import { Breadcrumbs, BreadcrumbItem } from '@/components/Breadcrumbs';
import { BuilderComponent } from "@/components/BuilderComponent";
import { builder } from "@/lib/builder";
import { DEFAULT_CONFIG, getOrderConfig } from '@/lib/order-config-service';
import { getProductSettings } from '@/lib/config/product-settings';

// Generate a very low-res placeholder
const generatePlaceholder = (color = '#f3f4f6') => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='${color.replace('#', '%23')}'/%3E%3C/svg%3E`;
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const [productDescription, setProductDescription] = useState<Record<string, unknown> | null>(null);
  
  const { addItem, items, getItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const { toast } = useToast();
  const relatedLoaded = useRef(false);
  // Track last add to cart time to prevent duplicate events
  const lastAddToCartRef = useRef<number>(0);
  // Track last wishlist action time to prevent duplicate events
  const lastWishlistActionRef = useRef<number>(0);
  const { user } = useAuth();
  
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  
  const [averageRating, setAverageRating] = useState(0);
  // Initialize with default config and update when loaded from API
  const [orderConfig, setOrderConfig] = useState(DEFAULT_CONFIG);
  const [productSettings, setProductSettings] = useState(getProductSettings());
  
  // Check if the current product is already in cart
  const isInCart = useMemo(() => {
    return items.some(item => 
      item.productId === id && 
      (!selectedColor || item.color === selectedColor?.name)
    );
  }, [items, id, selectedColor]);
  
  // Force scroll to top when page loads or product ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  // Load order configuration from PocketBase
  useEffect(() => {
    const loadOrderConfig = async () => {
      try {
        const config = await getOrderConfig();
        console.log('Loaded order configuration:', config);
        setOrderConfig(config);
        
        // Also load product settings
        const settings = getProductSettings();
        console.log('Loaded product settings:', settings);
        setProductSettings(settings);
      } catch (error) {
        console.error('Failed to load order configuration:', error);
        // Keep using the default config
      }
    };
    
    loadOrderConfig();
  }, []);
  
  // Preload images for better performance
  useEffect(() => {
    if (product && product.images && product.images.length > 0 && !imagesPreloaded) {
      // Create a function to preload all product images
      const preloadProductImages = async () => {
        try {
          // Immediately show thumbnail quality for all images
          product.images.forEach(image => {
            const img = new Image();
            img.src = getPocketBaseImageUrl(image, Collections.PRODUCTS, "thumbnail", "webp");
            img.loading = 'eager'; // Load thumbnails immediately
          });

          // Preload main image at medium quality immediately
          if (product.images[0]) {
            const mainImage = product.images[0];
            const mediumQualityLink = document.createElement('link');
            mediumQualityLink.rel = 'preload';
            mediumQualityLink.as = 'image';
            mediumQualityLink.href = getPocketBaseImageUrl(mainImage, Collections.PRODUCTS, "medium", "webp");
            mediumQualityLink.type = 'image/webp';
            mediumQualityLink.setAttribute('fetchpriority', 'high');
            document.head.appendChild(mediumQualityLink);

            // Then load high quality version slightly delayed
            setTimeout(() => {
              const highQualityLink = document.createElement('link');
              highQualityLink.rel = 'preload';
              highQualityLink.as = 'image';
              highQualityLink.href = getPocketBaseImageUrl(mainImage, Collections.PRODUCTS, "large", "webp");
              highQualityLink.type = 'image/webp';
              document.head.appendChild(highQualityLink);
            }, 1000);
          }

          // Load medium quality versions of other images when idle
          if (product.images.length > 1) {
            if ('requestIdleCallback' in window) {
              requestIdleCallback(() => {
                product.images.slice(1).forEach(image => {
                  const img = new Image();
                  img.src = getPocketBaseImageUrl(image, Collections.PRODUCTS, "medium", "webp");
                  img.loading = 'lazy';
                });
              });
            } else {
              // Fallback for browsers that don't support requestIdleCallback
              setTimeout(() => {
                product.images.slice(1).forEach(image => {
                  const img = new Image();
                  img.src = getPocketBaseImageUrl(image, Collections.PRODUCTS, "medium", "webp");
                  img.loading = 'lazy';
                });
              }, 2000);
            }
          }

          setImagesPreloaded(true);
        } catch (error) {
          console.error('Error preloading images:', error);
        }
      };

      preloadProductImages();
    }
  }, [product, imagesPreloaded]);
  
  // Optimize related products image loading
  useEffect(() => {
    if (relatedProducts.length > 0 && !relatedLoaded.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !relatedLoaded.current) {
              // First load thumbnails immediately
              relatedProducts.forEach(product => {
                if (product.images?.[0]) {
                  const img = new Image();
                  img.src = getPocketBaseImageUrl(product.images[0], Collections.PRODUCTS, "thumbnail", "webp");
                  img.loading = 'lazy';
                }
              });

              // Then load better quality when idle
              if ('requestIdleCallback' in window) {
                requestIdleCallback(() => {
                  relatedProducts.forEach(product => {
                    if (product.images?.[0]) {
                      const img = new Image();
                      img.src = getPocketBaseImageUrl(product.images[0], Collections.PRODUCTS, "medium", "webp");
                      img.loading = 'lazy';
                    }
                  });
                });
              }

              relatedLoaded.current = true;
              observer.disconnect();
            }
          });
        },
        { rootMargin: '500px' }
      );

      const relatedSection = document.querySelector('#related-products');
      if (relatedSection) {
        observer.observe(relatedSection);
      }

      return () => observer.disconnect();
    }
  }, [relatedProducts]);
  
  // Update document title when product changes
  useEffect(() => {
    if (product) {
      document.title = `${product.name} - Karigai`;
    } else {
      document.title = 'Product | Karigai';
    }
  }, [product]);
  
  // Load product data when ID changes
  useEffect(() => {
    const loadProduct = async () => {
      console.log(`[PROD DEBUG] loadProduct called for id: ${id}`);
      if (!id) return;
      setLoading(true);
      setError('');
      
      try {
        console.log(`[PROD DEBUG] Calling getProduct with id: ${id}`);
        let data;
        
        try {
          // First try the main getProduct function
          data = await getProduct(id);
        } catch (mainError) {
          console.error(`[PROD DEBUG] Main getProduct failed:`, mainError);
          
          // If the main method fails, try a direct approach as fallback
          console.log(`[PROD DEBUG] Trying fallback direct product fetch for ${id}`);
          try {
            const record = await pocketbase.collection('products').getOne(id, {
              $autoCancel: false,
              requestKey: `prod_fallback_${id}_${Date.now()}`
            });
            
            // Transform to match our Product interface
            data = {
              ...record,
              $id: record.id,
              name: record.name || 'Unknown Product',
              description: record.description || '',
              price: record.price || 0,
              dimensions: record.dimensions || '',
              material: record.material || '',
              category: record.category || '',
              bestseller: record.bestseller || false,
              new: record.new || false,
              inStock: record.inStock || false,
              images: Array.isArray(record.images) 
                ? record.images.map((image: string) => `${record.id}/${image}`)
                : [],
              colors: typeof record.colors === 'string' ? JSON.parse(record.colors) : (record.colors || []),
              features: typeof record.features === 'string' ? JSON.parse(record.features) : (record.features || []),
              care: typeof record.care === 'string' ? JSON.parse(record.care) : (record.care || []),
              tags: typeof record.tags === 'string' ? JSON.parse(record.tags) : (record.tags || []),
              specifications: record.specifications || {
                material: record.material || '',
                dimensions: record.dimensions || '',
                weight: '',
                capacity: '',
                style: '',
                pattern: '',
                closure: '',
                waterResistant: false
              },
              reviews: 0 // Default to 0 reviews
            } as Product;
            
            console.log(`[PROD DEBUG] Fallback product fetch successful for ${id}`);
          } catch (fallbackError) {
            console.error(`[PROD DEBUG] Fallback product fetch also failed:`, fallbackError);
            throw fallbackError; // Re-throw to be caught by the outer catch
          }
        }
        
        console.log(`[PROD DEBUG] Product loaded successfully:`, data.name);
        setProduct(data);
        
        if (data.images?.length > 0) {
          const mainImage = data.images[0];
          setSelectedImage(mainImage);
        }
        if (data.colors?.length > 0) {
          setSelectedColor(data.colors[0]);
        }
        
        // Track product view with GTM - only once per session
        const viewedProductKey = `viewed_product_${data.id}`;
        if (!sessionStorage.getItem(viewedProductKey)) {
          trackProductView({
            item_id: data.id,
            item_name: data.name,
            price: Number(data.price) || 0,
            quantity: 1,
            item_category: data.category || 'Tote Bag',
            item_brand: 'Konipai',
            affiliation: 'Konipai Web Store'
          });
          // Mark this product as viewed in this session
          sessionStorage.setItem(viewedProductKey, 'true');
        }
        
        // Load reviews to calculate average rating if product has reviews
        if (data.reviews && data.reviews > 0) {
          try {
            console.log(`[PROD DEBUG] Loading ${data.reviews} reviews for product ${id}`);
            const reviews = await getProductReviews(id);
            console.log(`[PROD DEBUG] Successfully loaded ${reviews.length} reviews`);
            
            const avgRating = reviews.length > 0
              ? reviews.reduce((acc: number, review: { rating: number }) => acc + review.rating, 0) / reviews.length
              : 0;
            setAverageRating(avgRating);
            console.log(`[PROD DEBUG] Set average rating to ${avgRating}`);
          } catch (reviewError) {
            console.error('[PROD DEBUG] Error loading reviews:', reviewError);
            // Continue with product display even if reviews fail to load
            setAverageRating(0);
          }
        }
        
        // After loading the product, try to load related products
        if (!relatedLoaded.current) {
          try {
            console.log(`[PROD DEBUG] Loading related products for ${data.category}`);
            const relatedData = await getProducts({ category: data.category });
            
            // Filter out the current product and limit to 4 products
            const filteredRelated = relatedData
              .filter(p => p.id !== id)
              .slice(0, 4);
              
            console.log(`[PROD DEBUG] Found ${filteredRelated.length} related products`);
            setRelatedProducts(filteredRelated);
            relatedLoaded.current = true;
          } catch (relatedError) {
            console.error('[PROD DEBUG] Error loading related products:', relatedError);
            // Continue even if related products fail to load
            setRelatedProducts([]);
          }
        }
      } catch (error) {
        console.error('[PROD DEBUG] Error loading product:', error);
        setError('Failed to load product. Please try refreshing the page.');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();

    return () => {
      relatedLoaded.current = false;
    };
  }, [id]); // Only depend on id, not product
  
  // Optimize image selection handling
  const handleImageSelect = (image: string) => {
    // First set the thumbnail version immediately
    setSelectedImage(image);
    
    // Then preload and switch to higher quality versions
    const preloadHighRes = () => {
      // First load medium quality
      const mediumQualityLink = document.createElement('link');
      mediumQualityLink.rel = 'preload';
      mediumQualityLink.as = 'image';
      mediumQualityLink.href = getPocketBaseImageUrl(image, Collections.PRODUCTS, "medium", "webp");
      mediumQualityLink.type = 'image/webp';
      document.head.appendChild(mediumQualityLink);

      // Then load high quality slightly delayed
      setTimeout(() => {
        const highQualityLink = document.createElement('link');
        highQualityLink.rel = 'preload';
        highQualityLink.as = 'image';
        highQualityLink.href = getPocketBaseImageUrl(image, Collections.PRODUCTS, "large", "webp");
        highQualityLink.type = 'image/webp';
        document.head.appendChild(highQualityLink);
      }, 500);
    };
    
    preloadHighRes();
  };
  
  if (loading) {
    return (
      <div className="konipai-container py-8">
        <div className="animate-pulse space-y-8">
          <Skeleton className="h-4 w-24" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Skeleton className="aspect-square rounded-lg" />
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="aspect-square rounded-lg" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/4" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="konipai-container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8 text-muted-foreground">{error || "Sorry, we couldn't find the product you're looking for."}</p>
        <Button asChild variant="outline">
          <Link to="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }
  
  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    
    // Add to cart logic
    addItem(
      product, 
      quantity, 
      selectedColor?.name || ''
    );
    
    // Prevent duplicate tracking events with throttling
    const now = Date.now();
    const THROTTLE_MS = 2000; // 2 seconds
    
    if (now - lastAddToCartRef.current > THROTTLE_MS) {
      // Track add to cart with enhanced properties
      trackAddToCart({
        item_id: product.id,
        item_name: product.name,
        price: Number(product.price) || 0,
        quantity: quantity,
        item_variant: selectedColor?.name,
        item_category: product.category || 'Tote Bag',
        item_brand: 'Konipai',
        affiliation: 'Konipai Web Store'
      });
      
      // Only track button click if we're tracking the add to cart event
      trackButtonClick('add_to_cart_button', 'Add to Cart', window.location.pathname);
      
      // Update last tracking time
      lastAddToCartRef.current = now;
    }
    
    toast({
      title: "Added to cart",
      description: `${quantity} ${product.name} added to your cart`,
    });
  };

  const toggleWishlist = async () => {
    // Prevent duplicate tracking events with throttling
    const now = Date.now();
    const THROTTLE_MS = 2000; // 2 seconds
    
    if (now - lastWishlistActionRef.current > THROTTLE_MS) {
      // Track wishlist button click
      trackButtonClick(
        isWishlisted ? 'remove_from_wishlist_button' : 'add_to_wishlist_button', 
        isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist',
        window.location.pathname
      );
      
      // Update last tracking time
      lastWishlistActionRef.current = now;
    }
    
    try {
      if (!user) {
        toast({
          variant: "destructive",
          title: "Please Login",
          description: "You need to login to add items to your wishlist.",
        });
        return;
      }

      setIsWishlisted(!isWishlisted);

      if (!isWishlisted) {
        // Add to wishlist
        await pocketbase.collection('wishlist').create({
          user: user.id,
          product: product.id,
        });
        toast({
          title: "Added to Wishlist",
          description: `${product.name} has been added to your wishlist.`,
        });
      } else {
        // Remove from wishlist
        const record = await pocketbase.collection('wishlist').getFirstListItem(
          `user="${user.id}" && product="${product.id}"`
        );
        await pocketbase.collection('wishlist').delete(record.id);
        toast({
          title: "Removed from Wishlist",
          description: `${product.name} has been removed from your wishlist.`,
        });
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      setIsWishlisted(!isWishlisted); // Revert the state change
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update your wishlist. Please try again.",
      });
    }
  };

  const handleShare = async () => {
    try {
      // Track share button click
      trackButtonClick('share_button', 'Share', window.location.pathname);
      
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} at Konipai!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied",
          description: "The product link has been copied to your clipboard.",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  
  // We'll handle breadcrumbs in the render section
  
  // Prepare breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Shop',
      href: '/shop',
    }
  ];
  
  // Add category if available
  if (product?.category) {
    breadcrumbItems.push({
      label: product.category.charAt(0).toUpperCase() + product.category.slice(1),
      href: `/shop?category=${product.category}`,
    });
  }
  
  // Current product is always last
  if (product?.name) {
    breadcrumbItems.push({
      label: product.name,
    });
  }

  // Check if product is loading or has an error
  if (loading) {
    return (
      <div className="pb-32">
        <div className="konipai-container py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-96">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <span className="ml-2 text-xl font-medium">Loading product...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pb-32">
        <div className="konipai-container py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center h-96">
            <ImageIcon className="h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Product Coming Soon</h2>
            <p className="text-gray-500 mb-6">{error || "This product is currently unavailable or does not exist."}</p>
            <Button onClick={() => navigate('/shop')} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Shop
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-32">
      <div className="konipai-container py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumbs items={breadcrumbItems} isLoading={loading} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images - Enhanced Gallery */}
          <div className="space-y-4">
            <div className="relative bg-card rounded-xl overflow-hidden group shadow-sm hover:shadow-md transition-shadow duration-300">
              {selectedImage ? (
                <>
                  <ProductImage
                    url={selectedImage}
                    alt={product?.name || 'Product image'}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    priority={true}
                    width={600}
                    height={600}
                    size="large"
                    aspectRatio="square"
                  />
                  <button 
                    onClick={() => setShowSizeGuide(true)}
                    className="absolute bottom-4 right-4 bg-background/90 text-foreground backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    title="View size guide"
                  >
                    <Ruler className="h-5 w-5" />
                  </button>
                  <button
                    onClick={toggleWishlist}
                    className={cn(
                      "absolute top-4 right-4 bg-background/90 text-foreground backdrop-blur-sm p-2 rounded-full shadow-lg",
                      isWishlisted ? "text-destructive" : "text-muted-foreground hover:text-foreground"
                    )}
                    title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart className="h-5 w-5" fill={isWishlisted ? "currentColor" : "none"} />
                  </button>
                </>
              ) : (
                <div className="aspect-square w-full h-full flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {product?.images?.map((image, index) => (
                <button 
                  key={image || index}
                  type="button" 
                  onClick={() => handleImageSelect(image)}
                  className={cn(
                    "relative bg-card rounded-lg overflow-hidden transition-all",
                    selectedImage === image ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-primary/50",
                    "aspect-square shadow-sm"
                  )}
                  aria-label={`View ${product.name} image ${index + 1}`}
                >
                  <ProductImage
                    url={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={150}
                    height={150}
                    size="thumbnail"
                    priority={index < 2}
                    aspectRatio="square"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Details - Enhanced */}
          <div>
            {/* Quantity Selector */}
            <div className="flex items-center gap-3 mb-8">
              <button 
                type="button" 
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="p-3 text-muted-foreground hover:text-foreground disabled:text-muted-foreground transition-colors"
              >
                <Minus className="h-5 w-5" />
              </button>
              <p className="text-lg font-medium">{quantity}</p>
              <button 
                type="button" 
                onClick={increaseQuantity}
                className="p-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            
            {/* Title and Price */}
            <h1 className="text-3xl font-bold mb-3 text-foreground">{product.name}</h1>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <p className="text-3xl font-semibold text-primary">
                  ₹{typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
                </p>
                {product.original_price && product.original_price > product.price && (
                  <>
                    <p className="text-lg text-muted-foreground line-through">
                      ₹{product.original_price.toFixed(2)}
                    </p>
                    <span className="text-sm bg-destructive/10 text-destructive px-2 py-0.5 rounded-full font-medium">
                      {Math.round((1 - product.price / product.original_price) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
              {orderConfig.showStarRating && (
                <div className="flex items-center gap-1">
                  {product.reviews && product.reviews > 0 ? (
                    <div className="flex items-center gap-1 text-accent">
                      {Array(5).fill(null).map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "h-4 w-4",
                            i < Math.round(averageRating) ? "fill-current" : ""
                          )} 
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      {Array(5).fill(null).map((_, i) => (
                        <Star key={i} className="h-4 w-4" />
                      ))}
                    </div>
                  )}
                  <Link to="#reviews" className="text-sm text-muted-foreground hover:text-primary ml-2">
                    ({product.reviews || 0} reviews)
                  </Link>
                </div>
              )}
            </div>
            
            {/* Product information section removed */}
            
            {/* Description Tabs */}
            <Tabs defaultValue="description" className="mb-8">
              <TabsList className="w-full grid grid-cols-2 mb-2">
                <TabsTrigger value="description">Description</TabsTrigger>
                {orderConfig.showDimensions && (
                  <TabsTrigger value="features">Features</TabsTrigger>
                )}
              </TabsList>
              <TabsContent value="description" className="pt-5 px-1">
                <p className="text-muted-foreground">{product.description}</p>
              </TabsContent>
              {orderConfig.showDimensions && (
                <TabsContent value="features" className="pt-5 px-1">
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </TabsContent>
              )}
            </Tabs>

            {/* Color Selection */}
            {product.colors?.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Color</h3>
                  <span className="text-sm text-muted-foreground capitalize">
                    {selectedColor?.name || 'Select a color'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 mt-3">
                  {product.colors.map(color => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "group relative w-14 h-14 rounded-full transition-all",
                        selectedColor?.value === color.value
                          ? "ring-2 ring-primary ring-offset-2 shadow-md"
                          : "ring-1 ring-border hover:ring-2 hover:ring-primary/50 shadow-sm"
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor?.value === color.value && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <Check className="h-4 w-4 text-white drop-shadow" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Social Proof removed as requested */}
          </div>
        </div>
        
        {/* Product Details - Moved above reviews */}
        {product && (
          <ProductDetails product={product} />
        )}

        {/* Reviews Section */}
        {product && id && orderConfig?.showReviews && (
          <section id="reviews" className="mt-12 border-t pt-10">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-2xl font-bold">Customer Reviews</h2>
              <span className="text-sm text-muted-foreground">
                {product.reviews || 0} review{(product.reviews || 0) === 1 ? '' : 's'}
              </span>
            </div>
            <ProductReviews 
              productId={id} 
              initialReviewCount={product.reviews} 
              onReviewAdded={async () => {
              console.log("[PROD DEBUG] Review added callback triggered");
              // Refresh product data to get updated review count
              if (id) {
                try {
                  const updatedProduct = await getProduct(id);
                  console.log(`[PROD DEBUG] Updated product fetched with ${updatedProduct.reviews} reviews`);
                  setProduct(updatedProduct);
                  
                  // Update average rating
                  const reviews = await getProductReviews(id);
                  console.log(`[PROD DEBUG] Fetched ${reviews.length} reviews for rating calculation`);
                  
                  if (reviews.length > 0) {
                    const total = reviews.reduce((acc: number, review: { rating: number }) => acc + review.rating, 0);
                    const avg = total / reviews.length;
                    console.log(`[PROD DEBUG] Calculated rating: ${avg} (total: ${total})`);
                    setAverageRating(avg);
                  } else {
                    console.log("[PROD DEBUG] No reviews to calculate average from");
                    setAverageRating(0);
                  }
                } catch (err) {
                  console.error("[PROD DEBUG] Error refreshing product after review:", err);
                }
              }
              }} 
            />
          </section>
        )}
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20" id="related-products">
            <h2 className="text-2xl font-bold mb-10 text-center">You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {relatedProducts.map((relatedProduct) => (
                <Link 
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group block"
                >
                  <div className="relative aspect-square overflow-hidden bg-card rounded-xl mb-5 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                    <ProductImage
                      url={relatedProduct.images?.[0] || ''}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                      width={300}
                      height={300}
                      size="medium"
                      priority={false}
                      aspectRatio="square"
                    />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {relatedProduct.bestseller && (
                        <Badge variant="default" className="bg-black text-white">
                          Bestseller
                        </Badge>
                      )}
                      {relatedProduct.new && (
                        <Badge variant="default" className="bg-primary text-white">
                          New
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="font-medium">
                        ₹{typeof relatedProduct.price === 'number' ? relatedProduct.price.toFixed(2) : '0.00'}
                      </p>
                      {relatedProduct.colors?.length > 0 && (
                        <div className="flex gap-4 mt-8">
                          {relatedProduct.colors.slice(0, 3).map((color) => (
                            <div 
                              key={color.value}
                              className="w-4 h-4 rounded-full border-2 border-white ring-1 ring-gray-200"
                              style={{ backgroundColor: color.hex }}
                              title={color.name}
                            />
                          ))}
                          {relatedProduct.colors.length > 3 && (
                            <div className="w-4 h-4 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-medium">
                              +{relatedProduct.colors.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {/* Floating WhatsApp Order Button */}
        {product && (
          <a
            href={`https://wa.me/919486054899?text=${encodeURIComponent(`Hi Karigai, I'd like to order: ${product.name}`)}`}
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-24 right-4 z-50"
            aria-label="Order via WhatsApp"
          >
            <div className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg flex items-center justify-center text-white">
              {/* WhatsApp Icon (inline SVG) */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-7 w-7 fill-current">
                <path d="M27.1 4.9A13.9 13.9 0 0 0 16 .1C7.3.1.2 7.2.2 15.9c0 2.8.8 5.5 2.2 7.8L.1 32l8.5-2.2c2.2 1.2 4.7 1.9 7.3 1.9 8.7 0 15.8-7.1 15.8-15.8 0-4.2-1.7-8.2-4.6-11zm-11.1 24c-2.3 0-4.6-.6-6.6-1.8l-.5-.3-5.1 1.3 1.4-5-.3-.5c-1.3-2.1-2-4.5-2-7 0-7.3 6-13.3 13.3-13.3 3.6 0 6.9 1.4 9.4 3.9 2.5 2.5 3.9 5.8 3.9 9.4 0 7.3-6 13.3-13.3 13.3zm7.3-9.9c-.4-.2-2.3-1.1-2.6-1.2-.4-.1-.6-.2-.9.2-.3.4-1 1.2-1.2 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.3-2.1-2.7-.2-.4 0-.6.2-.8.2-.2.4-.4.5-.6.2-.2.3-.4.4-.6.1-.2 0-.5 0-.7s-.9-2.1-1.2-2.9c-.3-.7-.6-.6-.9-.6h-.8c-.3 0-.7.1-1 .5-.3.4-1.3 1.3-1.3 3.2s1.4 3.7 1.6 4 .3.6.6 1c.8 1.1 1.8 2.1 3 2.8 1 .6 2 .8 2.7 1 .9.3 1.8.2 2.5.1.8-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5z"/>
              </svg>
            </div>
          </a>
        )}

        {/* Floating Add to Cart Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-5 shadow-lg z-50">
          <div className="konipai-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-4">
              {isInCart ? (
                <>
                  <Button 
                    className="flex-1 border-2" 
                    onClick={handleAddToCart}
                    size="lg"
                    variant="outline"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" /> Add Again
                  </Button>
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700 shadow-sm" 
                    asChild
                    size="lg"
                  >
                    <Link to="/checkout">
                      <CornerDownRight className="h-5 w-5 mr-2" /> Checkout
                    </Link>
                  </Button>
                </>
              ) : (
                <Button 
                  className="w-full shadow-sm"
                  onClick={handleAddToCart}
                  size="lg"
                  disabled={!product?.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" /> 
                  {product?.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
