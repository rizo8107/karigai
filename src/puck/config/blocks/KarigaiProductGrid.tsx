import { ComponentConfig } from "@measured/puck";
import ProductCard from "@/components/ProductCard";
import { useEffect, useMemo, useRef, useState } from "react";
import { getProducts, Product } from "@/lib/pocketbase";
import { cn } from "@/lib/utils";

export interface ProductGridProps {
  title?: string;
  description?: string;
  category?: string;
  limit?: number;
  // grid mode columns
  columnsDesktop?: 2 | 3 | 4;
  columnsTablet?: 1 | 2 | 3 | 4;
  columnsMobile?: 1 | 2 | 3 | 4;
  showFeatured?: boolean;
  mode?: "grid" | "carousel";
  carouselRows?: 1 | 2;
  showArrows?: boolean;
  showDots?: boolean;
}

// Wrapper component that can use hooks
const ProductGridContent = ({ title, description, category, limit, columnsDesktop, columnsTablet, columnsMobile, showFeatured, mode, carouselRows = 1, showArrows = true, showDots = true }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [internalCategory, setInternalCategory] = useState<string>(category || "");
  useEffect(() => {
    setInternalCategory(category || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        
        // Filter products
        let filtered = allProducts;
        
        if (showFeatured) {
          filtered = filtered.filter(p => p.bestseller);
        }
        
        if (internalCategory) {
          const term = internalCategory.toLowerCase();
          filtered = filtered.filter(p => {
            const name = p.name?.toLowerCase() || "";
            const cat = (p as any).category?.toLowerCase?.() || ("" + (p as any).category || "").toLowerCase();
            const desc = (p as any).description?.toLowerCase?.() || ("" + (p as any).description || "").toLowerCase();
            return name.includes(term) || cat.includes(term) || desc.includes(term);
          });
        }
        
        filtered = filtered.slice(0, limit || 8);
        setProducts(filtered);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limit, internalCategory, showFeatured]);

  // Track container device breakpoint with hysteresis to reduce jitter
  useEffect(() => {
    const el = containerRef.current;
    const compute = (w: number): "desktop" | "tablet" | "mobile" => (w >= 1024 ? "desktop" : w >= 640 ? "tablet" : "mobile");
    const H = 24; // px hysteresis
    let raf: number | null = null;
    const update = (w: number) => {
      setDevice((prev) => {
        if (prev === "desktop") return w < 1024 - H ? compute(w) : prev;
        if (prev === "tablet") return (w > 1024 + H || w < 640 - H) ? compute(w) : prev;
        // mobile
        return w > 640 + H ? compute(w) : prev;
      });
    };
    if (!el || typeof ResizeObserver === "undefined") {
      const w = typeof window !== "undefined" ? window.innerWidth : 0;
      update(w);
      return;
    }
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width || 0;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => update(w));
    });
    ro.observe(el);
    update(el.clientWidth);
    return () => { ro.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const gridCols = useMemo(() => {
    const m = Math.max(1, (columnsMobile || 1));
    const t = Math.max(1, (columnsTablet || 2));
    const d = Math.max(1, (columnsDesktop || 4));
    const cls = [
      `grid-cols-${m}`,
      `sm:grid-cols-${t}`,
      `lg:grid-cols-${d}`,
    ];
    return cls.join(" ");
  }, [columnsMobile, columnsTablet, columnsDesktop]);

  const currentCols = device === "desktop" ? (columnsDesktop || 4) : device === "tablet" ? (columnsTablet || 2) : (columnsMobile || 1);
  const itemsPerPage = (currentCols as number) * (carouselRows as number);
  const pages = useMemo(() => {
    if (mode !== "carousel" || !products.length) return [] as Product[][];
    const chunks: Product[][] = [];
    for (let i = 0; i < products.length; i += itemsPerPage) {
      chunks.push(products.slice(i, i + itemsPerPage));
    }
    return chunks;
  }, [products, itemsPerPage, mode]);

  const [pageIndex, setPageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  useEffect(() => setPageIndex(0), [itemsPerPage, mode, products.length]);

  // Handle touch events for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 30; // Reduced threshold for better sensitivity
    const isRightSwipe = distance < -30;

    if (isLeftSwipe && pageIndex < pages.length - 1) {
      setPageIndex(prev => prev + 1);
    }
    if (isRightSwipe && pageIndex > 0) {
      setPageIndex(prev => prev - 1);
    }
    
    // Reset touch states
    setTouchStart(null);
    setTouchEnd(null);
  };

  if (loading) {
    return (
      <section className="py-12 overflow-x-hidden" ref={containerRef}>
        {title && (
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">{title}</h2>
          </div>
        )}
        {description && (
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-6">{description}</p>
        )}
        <div className={cn("grid gap-6", gridCols)}>
          {Array.from({ length: limit || 8 }).map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse h-80 rounded" />
          ))}
        </div>
      </section>
    );
  }

  // Empty state: show fallback filter chips when no products
  if (!loading && products.length === 0) {
    const chips = ["soap", "oil", "powder"];
    return (
      <section className="py-12 overflow-x-hidden" ref={containerRef}>
        {title && (
          <div className="text-center mb-2">
            <h2 className="text-3xl font-bold">{title}</h2>
          </div>
        )}
        {description && (
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-4">{description}</p>
        )}
        <p className="text-center text-sm text-muted-foreground mb-4">No products found. Try a quick filter:</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {chips.map((c) => (
            <button
              key={c}
              type="button"
              className={cn("px-3 py-1 rounded-full border text-sm", internalCategory.toLowerCase() === c ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted")}
              onClick={() => setInternalCategory(c)}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
          {internalCategory && (
            <button
              type="button"
              className="px-3 py-1 rounded-full border text-sm hover:bg-muted"
              onClick={() => setInternalCategory("")}
            >
              Clear
            </button>
          )}
        </div>
      </section>
    );
  }

  // Grid mode
  if (mode !== "carousel") {
    return (
      <section className="py-12" ref={containerRef}>
        {title && (
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold">{title}</h2>
          </div>
        )}
        {description && (
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-6">{description}</p>
        )}
        <div className={cn("grid gap-6", gridCols)}>
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 4}
            />
          ))}
        </div>
      </section>
    );
  }

  // Carousel mode
  return (
    <section className="py-12 overflow-x-hidden" ref={containerRef}>
      {title && (
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold">{title}</h2>
        </div>
      )}
      {description && (
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-6">{description}</p>
      )}

      <div className="relative">
        {showArrows && pages.length > 1 && (
          <>
            <button
              aria-label="Previous"
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 h-6 w-6 rounded-full bg-primary/80 text-primary-foreground hover:bg-primary text-xs font-bold shadow-md"
              onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
            >
              ‹
            </button>
            <button
              aria-label="Next"
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 h-6 w-6 rounded-full bg-primary/80 text-primary-foreground hover:bg-primary text-xs font-bold shadow-md"
              onClick={() => setPageIndex((p) => Math.min(pages.length - 1, p + 1))}
            >
              ›
            </button>
          </>
        )}

        <div 
          className="overflow-hidden rounded-lg"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex carousel-smooth" 
            style={{ 
              transform: `translate3d(-${pageIndex * 100}%, 0, 0)`
            }}
          >
            {pages.map((group, gi) => (
              <div key={gi} className="shrink-0 w-full px-1">
                <div 
                  className={cn("grid gap-6", `grid-cols-${currentCols}`)} 
                  style={{ 
                    gridAutoRows: "1fr",
                    minHeight: "400px" // Prevent layout shifts
                  }}
                >
                  {group.map((product, index) => (
                    <ProductCard key={product.id} product={product} priority={index < currentCols} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {showDots && pages.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            {pages.map((_, di) => (
              <button key={di} aria-label={`Go to page ${di + 1}`} className={cn("h-2.5 w-2.5 rounded-full", di === pageIndex ? "bg-foreground" : "bg-foreground/40")} onClick={() => setPageIndex(di)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export const ProductGrid: ComponentConfig<ProductGridProps> = {
  fields: {
    title: { type: "text", label: "Section Title" },
    description: { type: "textarea", label: "Description (optional)" },
    category: { type: "text", label: "Category Filter" },
    limit: { type: "number", label: "Number of Products", min: 1, max: 40 },
    mode: { type: "select", label: "Display Mode", options: [
      { label: "Grid", value: "grid" },
      { label: "Carousel", value: "carousel" },
    ]},
    columnsDesktop: { type: "select", label: "Desktop Columns", options: [
      { label: "2", value: 2 }, { label: "3", value: 3 }, { label: "4", value: 4 }
    ]},
    columnsTablet: { type: "select", label: "Tablet Columns", options: [
      { label: "1", value: 1 }, { label: "2", value: 2 }, { label: "3", value: 3 }, { label: "4", value: 4 }
    ]},
    columnsMobile: { type: "select", label: "Mobile Columns", options: [
      { label: "1", value: 1 }, { label: "2", value: 2 }, { label: "3", value: 3 }, { label: "4", value: 4 }
    ]},
    showFeatured: {
      type: "radio",
      options: [
        { label: "All Products", value: false },
        { label: "Featured Only", value: true },
      ],
    },
    carouselRows: { type: "select", label: "Carousel Rows", options: [
      { label: "1", value: 1 }, { label: "2", value: 2 }
    ]},
    showArrows: { type: "radio", label: "Show Arrows", options: [{ label: "No", value: false }, { label: "Yes", value: true }] },
    showDots: { type: "radio", label: "Show Dots", options: [{ label: "No", value: false }, { label: "Yes", value: true }] },
  },
  defaultProps: {
    title: "Featured Products",
    description: "Explore our most-loved picks, tailored just for you.",
    limit: 8,
    mode: "grid",
    columnsDesktop: 4,
    columnsTablet: 2,
    columnsMobile: 2,
    showFeatured: false,
    carouselRows: 1,
    showArrows: true,
    showDots: true,
  },
  render: (props) => {
    return <ProductGridContent {...props} />;
  },
};

// Backward compatibility exports (kept to avoid breaking existing pages)
export const KarigaiProductGrid: ComponentConfig<ProductGridProps> = ProductGrid;
export const poructgrind: ComponentConfig<ProductGridProps> = ProductGrid;
