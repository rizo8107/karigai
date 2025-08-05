import React, { Suspense } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import './LazyComponent.css';

interface LazyComponentProps {
  children: React.ReactNode;
  height?: string | number;
  className?: string;
}

/**
 * LazyComponent wrapper for React.lazy loaded components
 * Provides a consistent loading experience with fallback UI
 */
export function LazyComponent({ 
  children, 
  height = "200px",
  className = ""
}: LazyComponentProps) {
  // Convert height prop to CSS class
  const heightClass = typeof height === 'number' ? `h-${height}` : height === 'auto' ? 'h-auto' : 'h-200';
  
  return (
    <Suspense fallback={
      <div className={`lazy-component-skeleton ${heightClass} ${className}`}>
        <div className="space-y-2 w-full">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-32 w-full rounded-md" />
        </div>
      </div>
    }>
      {children}
    </Suspense>
  );
}

/**
 * LazyImage component for optimized image loading
 * Uses native lazy loading and blur-up technique
 */
interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholderColor?: string;
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  placeholderColor = "#f3f4f6"
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  
  // Convert dimensions to CSS classes
  const widthClass = width ? `w-${width}` : 'w-full';
  const heightClass = height ? `h-${height}` : 'h-auto';
  
  // Determine placeholder color class
  const colorClass = (() => {
    switch(placeholderColor) {
      case '#f3f4f6': return 'placeholder-light';
      case '#e5e7eb': return 'placeholder-medium';
      case '#d1d5db': return 'placeholder-dark';
      default: return 'placeholder-light';
    }
  })();
  
  return (
    <div 
      className={`lazy-image-container ${widthClass} ${heightClass} ${colorClass} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`lazy-image ${
          isLoaded ? 'lazy-image-loaded' : 'lazy-image-loading'
        }`}
      />
    </div>
  );
}
