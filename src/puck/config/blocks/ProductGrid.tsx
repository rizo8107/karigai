import { ComponentConfig } from "@measured/puck";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";
import { getProducts, Product } from "@/lib/pocketbase";

export interface ProductGridProps {
  title?: string;
  columns?: 2 | 3 | 4 | 5;
  limit?: number;
  category?: string;
  featured?: boolean;
  showTitle?: boolean;
}

// Wrapper component that can use hooks
const ProductGridContent = ({ title, showTitle, columns, limit, category, featured }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        
        // Filter products based on props
        let filtered = allProducts;
        
        if (featured) {
          filtered = filtered.filter(p => p.bestseller);
        }
        
        if (category) {
          filtered = filtered.filter(p => 
            p.category?.toLowerCase().includes(category.toLowerCase())
          );
        }
        
        // Limit the results
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
  }, [limit, category, featured]);

  const columnClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 md:grid-cols-3 lg:grid-cols-5",
  };

  if (loading) {
    return (
      <section className="py-12">
        {showTitle && title && (
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-muted-foreground mt-2">
              Our most popular products loved by customers. High-quality, sustainable, and effective solutions for everyday use.
            </p>
          </div>
        )}
        <div className={cn("grid gap-6", columnClasses[columns || 4])}>
          {Array.from({ length: limit || 8 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-square bg-gray-100 rounded-lg mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-12">
        {showTitle && title && (
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">{title}</h2>
          </div>
        )}
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      {showTitle && title && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-muted-foreground mt-2">
            Our most popular products loved by customers. High-quality, sustainable, and effective solutions for everyday use.
          </p>
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
      
      <div className="text-center mt-12">
        <button className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors rounded">
          Load More Products
        </button>
      </div>
    </section>
  );
};

export const ProductGrid: ComponentConfig<ProductGridProps> = {
  fields: {
    title: {
      type: "text",
      label: "Section Title",
    },
    showTitle: {
      type: "radio",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    columns: {
      type: "select",
      options: [
        { label: "2 Columns", value: 2 },
        { label: "3 Columns", value: 3 },
        { label: "4 Columns", value: 4 },
        { label: "5 Columns", value: 5 },
      ],
    },
    limit: {
      type: "number",
      label: "Number of Products",
      min: 1,
      max: 20,
    },
    category: {
      type: "text",
      label: "Category Filter (optional)",
    },
    featured: {
      type: "radio",
      options: [
        { label: "All Products", value: false },
        { label: "Featured Only", value: true },
      ],
    },
  },
  defaultProps: {
    title: "Featured Products",
    showTitle: true,
    columns: 4,
    limit: 8,
    featured: false,
  },
  render: (props) => {
    return <ProductGridContent {...props} />;
  },
};
