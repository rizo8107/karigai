import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Plus, Heart, Minus } from 'lucide-react';
import { Product } from '@/lib/pocketbase';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ProductImage } from '@/components/ProductImage';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.colors || !Array.isArray(product.colors) || product.colors.length === 0) {
      addItem(product, quantity, '');
      return;
    }
    
    addItem(product, quantity, product.colors[0].value);
    setQuantity(1); // Reset quantity after adding to cart
  };
  
  const handleQuantityChange = (e: React.MouseEvent, change: number) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity((prev: number) => Math.max(1, prev + change));
  };
  
  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group block bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        <ProductImage 
          url={product.images?.[0] || ''}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          aspectRatio="portrait"
          priority={false}
          size="small"
        />
        
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
          {product.bestseller && (
            <Badge variant="secondary" className="bg-black/80 backdrop-blur-sm text-white rounded-full px-3 py-1 text-xs font-medium">
              Bestseller
            </Badge>
          )}
          {product.new && (
            <Badge variant="secondary" className="bg-primary/80 backdrop-blur-sm text-primary-foreground rounded-full px-3 py-1 text-xs font-medium">
              New
            </Badge>
          )}
        </div>

        {/* Desktop hover overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block">
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
            <Button
              onClick={handleQuickAdd}
              variant="default"
              size="sm"
              className="w-full bg-white text-black hover:bg-gray-50 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
            >
              <Plus className="mr-2 h-4 w-4" />
              Quick Add
            </Button>
          </div>
        </div>
        
        {/* Mobile always visible controls */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-white md:hidden">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center border rounded-md overflow-hidden bg-white">
              <Button
                onClick={(e) => handleQuantityChange(e, -1)}
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 rounded-none hover:bg-gray-100"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-7 text-center text-sm font-medium">
                {quantity}
              </span>
              <Button
                onClick={(e) => handleQuantityChange(e, 1)}
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 rounded-none hover:bg-gray-100"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <Button
              onClick={handleQuickAdd}
              variant="default"
              size="sm"
              className="flex-1 h-7 text-xs bg-primary hover:bg-primary/80 text-primary-foreground"
            >
              Add
            </Button>
          </div>
        </div>

        <button 
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Add wishlist functionality here
          }}
          aria-label="Add to wishlist"
        >
          <Heart className="h-4 w-4 text-gray-700 hover:text-primary transition-colors" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-base mb-2 group-hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <p className={cn(
                "text-base font-semibold",
                product.original_price && product.original_price > product.price ? "text-primary" : ""
              )}>
                ₹{typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
              </p>
              {product.original_price && product.original_price > product.price && (
                <p className="text-sm text-gray-400 line-through">
                  ₹{product.original_price.toFixed(2)}
                </p>
              )}
            </div>
            {product.original_price && product.original_price > product.price && (
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-medium text-primary px-2 py-0.5">
                  Save ₹{(product.original_price - product.price).toFixed(2)}
                </span>
                <span className="text-xs font-medium text-black">
                  ({Math.round((1 - product.price / product.original_price) * 100)}% OFF)
                </span>
              </div>
            )}
          </div>
          {product.colors?.length > 0 && (
            <div className="flex -space-x-1.5 pt-1">
              {product.colors.map((color) => (
                <div 
                  key={color.value}
                  className="w-5 h-5 rounded-full border-2 border-white ring-1 ring-gray-200 shadow-sm transition-transform hover:scale-110"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
