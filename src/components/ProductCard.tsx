import { memo, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Heart, Minus } from 'lucide-react';
import { Product } from '@/lib/pocketbase';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ProductImage } from '@/components/ProductImage';
import { useDynamicTheme } from '@/contexts/ThemeContext';

type ProductCardProps = {
  product: Product;
  priority?: boolean; // above-the-fold image priority
};

const ProductCard = ({ product, priority = false }: ProductCardProps) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { themeData } = useDynamicTheme();


  const pc = useMemo(() => ({
    corner: themeData?.productCard?.corner || 'rounded',
    shadow: themeData?.productCard?.shadow || 'soft',
    showWishlist: themeData?.productCard?.showWishlist ?? true,
    showTags: themeData?.productCard?.showTags ?? true,
    showDescription: themeData?.productCard?.showDescription ?? true,
    ctaLabel: themeData?.productCard?.ctaLabel || 'Add to Cart',
    ctaStyle: themeData?.productCard?.ctaStyle || 'pill',
    imageRatio: themeData?.productCard?.imageRatio || 'portrait',
    titleSize: themeData?.productCard?.titleSize || 'md',
    descSize: themeData?.productCard?.descSize || 'sm',
    ctaSize: themeData?.productCard?.ctaSize || 'md',
    spacing: themeData?.productCard?.spacing || 'compact',
  }), [themeData]);

  const cardRadius = pc.corner === 'pill' ? 'rounded-3xl' : pc.corner === 'square' ? 'rounded-md' : 'rounded-xl';
  const shadowCls = pc.shadow === 'none' ? '' : pc.shadow === 'soft' ? 'shadow-sm' : pc.shadow === 'medium' ? 'shadow-md' : 'shadow-lg';
  const ctaRounded = pc.ctaStyle === 'pill' ? 'rounded-full' : '';
  const aspectCls = pc.imageRatio === 'square' ? 'aspect-square' : pc.imageRatio === 'wide' ? 'aspect-[4/3]' : 'aspect-[3/4]';
  const titleSizeCls = pc.titleSize === 'lg' ? 'text-lg' : pc.titleSize === 'sm' ? 'text-sm' : 'text-base';
  const descSizeCls = pc.descSize === 'lg' ? 'text-base' : pc.descSize === 'sm' ? 'text-xs' : 'text-sm';
  const ctaSize: 'sm' | 'default' | 'lg' = pc.ctaSize === 'lg' ? 'lg' : pc.ctaSize === 'sm' ? 'sm' : 'default';
  const bodyPadding = pc.spacing === 'comfortable' ? 'p-4' : 'p-3';
  
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
      className={cn('group block bg-card overflow-hidden transition-all duration-300 relative', cardRadius, shadowCls, 'hover:shadow-lg')}
    >
      <div className={cn('relative overflow-hidden bg-muted', aspectCls)}>
        <ProductImage
          url={product.images?.[0] || ''}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          aspectRatio="portrait"
          priority={priority}
          size="small"
        />
        {/* Tags / badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
          {product.bestseller && (
            <Badge variant="secondary" className="bg-foreground/80 text-background backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
              Bestseller
            </Badge>
          )}
          {product.new && (
            <Badge variant="secondary" className="bg-primary/80 backdrop-blur-sm text-primary-foreground rounded-full px-3 py-1 text-xs font-medium">
              New
            </Badge>
          )}
          {pc.showTags && Array.isArray(product.tags) && product.tags.slice(0, 3).map((t) => (
            <span key={String(t)} className="px-2 py-0.5 rounded-full bg-background/90 text-foreground text-[10px] shadow-sm">
              {String(t)}
            </span>
          ))}
        </div>
        {/* Wishlist */}
        {pc.showWishlist && (
          <button
            className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm opacity-100 transition-all duration-300 hover:bg-background"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            aria-label="Add to wishlist"
            title="Add to wishlist"
          >
            <Heart className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
          </button>
        )}

        {/* Price overlay */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="px-3 py-1 rounded-full bg-background/90 text-foreground shadow-sm flex items-center gap-2">
            <span className="text-sm font-semibold">
              ₹{typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
            </span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-xs text-muted-foreground line-through">
                ₹{product.original_price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={cn(bodyPadding)}>
        <h3 className={cn('font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2', titleSizeCls)}>
          {product.name}
        </h3>
        {pc.showDescription && (
          <p className={cn('text-muted-foreground line-clamp-2 mb-2', descSizeCls)}>{product.description}</p>
        )}

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center border rounded-md overflow-hidden bg-background">
              <Button onClick={(e) => handleQuantityChange(e, -1)} variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-none">
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center text-sm font-medium">{quantity}</span>
              <Button onClick={(e) => handleQuantityChange(e, 1)} variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-none">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <Button onClick={handleQuickAdd} size={ctaSize} className={cn(ctaRounded, pc.ctaStyle === 'outline' ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground' : '!bg-primary !text-primary-foreground hover:!bg-primary/90')}>
              <Plus className="mr-2 h-4 w-4" />
              {pc.ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default memo(ProductCard);
