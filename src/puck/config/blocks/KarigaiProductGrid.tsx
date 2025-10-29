import { ComponentConfig } from "@measured/puck";
// Import your existing ProductCard component
import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";
import { getProducts, Product } from "@/lib/pocketbase";
import { cn } from "@/lib/utils";

export interface KarigaiProductGridProps {
  title?: string;
  category?: string;
  limit?: number;
  columns?: 2 | 3 | 4;
  showFeatured?: boolean;
}

// Wrapper component that can use hooks
const KarigaiProductGridContent = ({ title, category, limit, columns, showFeatured }: KarigaiProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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
        
        if (category) {
          filtered = filtered.filter(p => 
            p.category?.toLowerCase().includes(category.toLowerCase())
          );
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
  }, [limit, category, showFeatured]);

  const columnClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3", 
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  if (loading) {
    return (
      <section className="py-12">
        {title && (
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">{title}</h2>
          </div>
        )}
        <div className={cn("grid gap-6", columnClasses[columns || 4])}>
          {Array.from({ length: limit || 8 }).map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse h-80 rounded" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      {title && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">{title}</h2>
        </div>
      )}
      
      <div className={cn("grid gap-6", columnClasses[columns || 4])}>
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
};

export const KarigaiProductGrid: ComponentConfig<KarigaiProductGridProps> = {
  fields: {
    title: { type: "text", label: "Section Title" },
    category: { type: "text", label: "Category Filter" },
    limit: { type: "number", label: "Number of Products", min: 1, max: 20 },
    columns: {
      type: "select",
      options: [
        { label: "2 Columns", value: 2 },
        { label: "3 Columns", value: 3 },
        { label: "4 Columns", value: 4 },
      ],
    },
    showFeatured: {
      type: "radio",
      options: [
        { label: "All Products", value: false },
        { label: "Featured Only", value: true },
      ],
    },
  },
  defaultProps: {
    title: "Featured Products",
    limit: 8,
    columns: 4,
    showFeatured: false,
  },
  render: (props) => {
    return <KarigaiProductGridContent {...props} />;
  },
};
