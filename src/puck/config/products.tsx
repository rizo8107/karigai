import { Config } from "@measured/puck";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Static Product Grid Component (no hooks - safe for Puck)
export const StaticProductGrid = {
  fields: {
    title: { type: "text" as const, label: "Section Title" },
    subtitle: { type: "textarea" as const, label: "Section Subtitle" },
    columns: {
      type: "select" as const,
      options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
        { label: "5 Columns", value: "5" },
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
    columns: "4",
    showPrices: true,
  },
  render: ({ title, subtitle, columns, showPrices }: any) => {
    // Static sample products (replace with your actual data)
    const sampleProducts = [
      {
        id: "1",
        name: "Radiance Soap",
        price: 100,
        originalPrice: 120,
        description: "Natural soap with turmeric and honey",
        images: ["https://via.placeholder.com/300x300?text=Radiance+Soap"],
        bestseller: true,
      },
      {
        id: "2", 
        name: "Charcoal Soap",
        price: 75,
        originalPrice: 100,
        description: "Deep cleansing charcoal soap",
        images: ["https://via.placeholder.com/300x300?text=Charcoal+Soap"],
        bestseller: true,
      },
      {
        id: "3",
        name: "Aloevera Soap", 
        price: 75,
        originalPrice: 100,
        description: "Soothing aloe vera soap",
        images: ["https://via.placeholder.com/300x300?text=Aloevera+Soap"],
        bestseller: false,
      },
      {
        id: "4",
        name: "Menthol Soap",
        price: 85,
        originalPrice: 100,
        description: "Refreshing menthol soap",
        images: ["https://via.placeholder.com/300x300?text=Menthol+Soap"],
        bestseller: true,
      },
      {
        id: "5",
        name: "Rice Water Kojic Soap",
        price: 120,
        originalPrice: 150,
        description: "Brightening rice water soap",
        images: ["https://via.placeholder.com/300x300?text=Rice+Water+Soap"],
        bestseller: false,
      },
      {
        id: "6",
        name: "Handmade Soap",
        price: 120,
        originalPrice: 150,
        description: "Artisanal handmade soap",
        images: ["https://via.placeholder.com/300x300?text=Handmade+Soap"],
        bestseller: false,
      },
      {
        id: "7",
        name: "Ayurampam Soap",
        price: 75,
        originalPrice: 100,
        description: "Traditional ayurvedic soap",
        images: ["https://via.placeholder.com/300x300?text=Ayurampam+Soap"],
        bestseller: false,
      },
      {
        id: "8",
        name: "Kuparimeni Soap",
        price: 75,
        originalPrice: 100,
        description: "Herbal kuparimeni soap",
        images: ["https://via.placeholder.com/300x300?text=Kuparimeni+Soap"],
        bestseller: false,
      },
    ];

    const columnClasses = {
      "2": "grid-cols-1 md:grid-cols-2",
      "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3", 
      "4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      "5": "grid-cols-1 md:grid-cols-3 lg:grid-cols-5",
    };

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
            {sampleProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-4">
                  {product.bestseller && (
                    <Badge className="absolute top-2 left-2 z-10 bg-primary">
                      Bestseller
                    </Badge>
                  )}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
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
    backgroundImage: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    textColor: "text-white",
  },
  render: ({ title, subtitle, description, backgroundImage, buttonText, buttonLink, textColor }: any) => (
    <section 
      className="relative h-96 md:h-[500px] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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

// Simple Text Component
export const SimpleText = {
  fields: {
    text: { type: "textarea" as const, label: "Text Content" },
    size: {
      type: "select" as const,
      options: [
        { label: "Small", value: "text-sm" },
        { label: "Medium", value: "text-base" },
        { label: "Large", value: "text-lg" },
        { label: "Extra Large", value: "text-xl" },
      ],
    },
    alignment: {
      type: "select" as const,
      options: [
        { label: "Left", value: "text-left" },
        { label: "Center", value: "text-center" },
        { label: "Right", value: "text-right" },
      ],
    },
  },
  defaultProps: {
    text: "Enter your text here",
    size: "text-base",
    alignment: "text-left",
  },
  render: ({ text, size, alignment }: any) => (
    <div className="py-4">
      <p className={cn(size, alignment)}>{text}</p>
    </div>
  ),
};

// Simple Container
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
    maxWidth: {
      type: "select" as const,
      options: [
        { label: "Small", value: "max-w-4xl" },
        { label: "Medium", value: "max-w-6xl" },
        { label: "Large", value: "max-w-7xl" },
        { label: "Full", value: "max-w-full" },
      ],
    },
  },
  defaultProps: {
    padding: "p-8",
    maxWidth: "max-w-7xl",
  },
  render: ({ padding, maxWidth, puck: { renderDropZone } }: any) => (
    <div className={cn(maxWidth, "mx-auto", padding)}>
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

export const productsPuckConfig: Config = {
  root: Root,
  categories: {
    ecommerce: {
      title: "E-commerce",
      components: ["StaticProductGrid", "HeroSection"],
    },
    content: {
      title: "Content",
      components: ["SimpleText"],
    },
    layout: {
      title: "Layout", 
      components: ["SimpleContainer"],
    },
  },
  components: {
    StaticProductGrid,
    HeroSection,
    SimpleText,
    SimpleContainer,
  },
};

export default productsPuckConfig;
