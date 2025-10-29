import { Config } from "@measured/puck";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { pocketbase } from "@/lib/pocketbase";
import { Badge } from "@/components/ui/badge";

// Product Grid Component - Connected to PocketBase
export const ProductGrid = {
  fields: {
    title: { type: "text" as const, label: "Section Title" },
    subtitle: { type: "textarea" as const, label: "Section Subtitle" },
    limit: { 
      type: "number" as const, 
      label: "Number of Products",
      min: 1,
      max: 20
    },
    columns: {
      type: "select" as const,
      options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
        { label: "5 Columns", value: "5" },
      ],
    },
    category: { type: "text" as const, label: "Category Filter (optional)" },
    showBestsellers: {
      type: "radio" as const,
      options: [
        { label: "All Products", value: false },
        { label: "Bestsellers Only", value: true },
      ],
    },
    showPrices: {
      type: "radio" as const,
      options: [
        { label: "Show Prices", value: true },
        { label: "Hide Prices", value: false },
      ],
    },
  },
  defaultProps: {
    title: "Our Bestsellers",
    subtitle: "Our most popular products loved by customers. High-quality, sustainable, and effective solutions for everyday use.",
    limit: 8,
    columns: "4",
    category: "",
    showBestsellers: true,
    showPrices: true,
  },
  render: ({ title, subtitle, limit, columns, category, showBestsellers, showPrices }: any) => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          
          let filter = '';
          const filters = [];
          
          if (category) {
            filters.push(`category~"${category}"`);
          }
          
          if (showBestsellers) {
            filters.push('bestseller=true');
          }
          
          if (filters.length > 0) {
            filter = filters.join(' && ');
          }

          const records = await pocketbase.collection('products').getList(1, limit || 8, {
            filter: filter,
            sort: '-created',
          });
          
          setProducts(records.items);
        } catch (error) {
          console.error('Error fetching products:', error);
          setProducts([]);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }, [limit, category, showBestsellers]);

    const columnClasses = {
      "2": "grid-cols-1 md:grid-cols-2",
      "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      "4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      "5": "grid-cols-1 md:grid-cols-3 lg:grid-cols-5",
    };

    if (loading) {
      return (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {title && (
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">{title}</h2>
                {subtitle && (
                  <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
                )}
              </div>
            )}
            <div className={cn("grid gap-6", columnClasses[columns as keyof typeof columnClasses] || columnClasses["4"])}>
              {Array.from({ length: limit || 8 }).map((_, index) => (
                <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-80" />
              ))}
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {title && (
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{title}</h2>
              {subtitle && (
                <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
              )}
            </div>
          )}
          
          {products.length > 0 ? (
            <div className={cn("grid gap-6", columnClasses[columns as keyof typeof columnClasses] || columnClasses["4"])}>
              {products.map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-4">
                    {product.bestseller && (
                      <Badge className="absolute top-2 left-2 z-10 bg-primary">
                        Bestseller
                      </Badge>
                    )}
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={pocketbase.files.getUrl(product, product.images[0])}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    
                    {showPrices && (
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">₹{product.price}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <>
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{product.originalPrice}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                            </Badge>
                          </>
                        )}
                      </div>
                    )}
                    
                    {product.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found.</p>
            </div>
          )}
          
          <div className="text-center mt-12">
            <button className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded">
              Load More Products
            </button>
          </div>
        </div>
      </section>
    );
  },
};

// Hero Section Component
export const HeroSection = {
  fields: {
    title: { type: "text" as const, label: "Hero Title" },
    subtitle: { type: "text" as const, label: "Hero Subtitle" },
    description: { type: "textarea" as const, label: "Description" },
    backgroundImage: { type: "text" as const, label: "Background Image URL" },
    buttonText: { type: "text" as const, label: "Button Text" },
    buttonLink: { type: "text" as const, label: "Button Link" },
    textColor: {
      type: "select" as const,
      options: [
        { label: "White", value: "text-white" },
        { label: "Black", value: "text-black" },
        { label: "Primary", value: "text-primary" },
      ],
    },
  },
  defaultProps: {
    title: "Premium Handcrafted Soaps",
    subtitle: "Natural & Sustainable",
    description: "Discover our collection of artisanal soaps made with the finest natural ingredients",
    backgroundImage: "",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    textColor: "text-white",
  },
  render: ({ title, subtitle, description, backgroundImage, buttonText, buttonLink, textColor }: any) => (
    <section 
      className="relative h-96 md:h-[500px] flex items-center justify-center"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className={cn("space-y-6", textColor)}>
          {subtitle && (
            <p className="text-lg font-medium opacity-90">{subtitle}</p>
          )}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {title}
          </h1>
          {description && (
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              {description}
            </p>
          )}
          {buttonText && (
            <div className="pt-4">
              <a
                href={buttonLink}
                className="inline-block bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                {buttonText}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  ),
};

// Category Grid Component
export const CategoryGrid = {
  fields: {
    title: { type: "text" as const, label: "Section Title" },
    subtitle: { type: "textarea" as const, label: "Section Subtitle" },
    columns: {
      type: "select" as const,
      options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
      ],
    },
  },
  defaultProps: {
    title: "Shop by Category",
    subtitle: "Explore our different soap categories",
    columns: "3",
  },
  render: ({ title, subtitle, columns }: any) => {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          setLoading(true);
          const records = await pocketbase.collection('products').getList(1, 50, {
            fields: 'category',
          });
          
          // Get unique categories
          const uniqueCategories = [...new Set(records.items.map(item => item.category).filter(Boolean))];
          setCategories(uniqueCategories.map(cat => ({ name: cat, slug: cat.toLowerCase().replace(/\s+/g, '-') })));
        } catch (error) {
          console.error('Error fetching categories:', error);
          setCategories([]);
        } finally {
          setLoading(false);
        }
      };

      fetchCategories();
    }, []);

    const columnClasses = {
      "2": "grid-cols-1 md:grid-cols-2",
      "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      "4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    };

    if (loading) {
      return (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{title}</h2>
              {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
            </div>
            <div className={cn("grid gap-6", columnClasses[columns as keyof typeof columnClasses] || columnClasses["3"])}>
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-48" />
              ))}
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>
          
          <div className={cn("grid gap-6", columnClasses[columns as keyof typeof columnClasses] || columnClasses["3"])}>
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-primary/40 h-48 flex items-center justify-center">
                  <h3 className="text-xl font-semibold text-center px-4">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  },
};

// Simple Container (same as before)
export const SimpleContainer = {
  fields: {
    padding: {
      type: "select" as const,
      options: [
        { label: "Small", value: "p-4" },
        { label: "Medium", value: "p-8" },
        { label: "Large", value: "p-12" },
      ],
    },
  },
  defaultProps: {
    padding: "p-8",
  },
  render: ({ padding, puck: { renderDropZone } }: any) => (
    <div className={cn("max-w-7xl mx-auto", padding)}>
      {renderDropZone({ zone: "content" })}
    </div>
  ),
};

// Root component
const Root = {
  render: ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  ),
};

export const ecommercePuckConfig: Config = {
  root: Root,
  categories: {
    ecommerce: {
      title: "E-commerce",
      components: ["ProductGrid", "HeroSection", "CategoryGrid"],
    },
    layout: {
      title: "Layout",
      components: ["SimpleContainer"],
    },
  },
  components: {
    ProductGrid,
    HeroSection,
    CategoryGrid,
    SimpleContainer,
  },
};

export default ecommercePuckConfig;
