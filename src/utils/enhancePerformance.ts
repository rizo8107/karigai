/**
 * Performance enhancement module for Karigai
 * This module applies various optimizations to improve page loading speed
 */

import { preloadCriticalResources, setupImageLazyLoading, deferNonCriticalResources } from './performance';
import { preloadImage } from './imageOptimizer';
import { LayoutShift, PerformanceEventTiming } from './performanceTypes';

/**
 * Initialize all performance optimizations
 */
export function initializePerformanceOptimizations(): void {
  // Apply optimizations only in production to avoid development overhead
  if (import.meta.env.PROD) {
    // Set up performance monitoring
    setupPerformanceMonitoring();
    
    // Apply optimizations with slight delay to prioritize initial render
    setTimeout(() => {
      // Preload critical resources
      preloadCriticalResources();
      
      // Set up lazy loading for images
      setupImageLazyLoading();
      
      // Defer non-critical resources
      deferNonCriticalResources();
      
      // Preload common product images
      preloadCommonProductImages();
      
      // Apply route-based optimizations
      applyRouteBasedOptimizations();
    }, 1000);
  }
}

/**
 * Set up performance monitoring
 */
function setupPerformanceMonitoring(): void {
  // Report Web Vitals
  if ('performance' in window) {
    // Listen for largest contentful paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log(`LCP: ${lastEntry.startTime}ms`);
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    
    // Listen for first input delay
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        // Use type assertion for first-input entries
        const firstInputEntry = entry as PerformanceEventTiming;
        console.log(`FID: ${firstInputEntry.processingStart - firstInputEntry.startTime}ms`);
      });
    }).observe({ type: 'first-input', buffered: true });
    
    // Listen for cumulative layout shift
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      let cumulativeScore = 0;
      entries.forEach(entry => {
        // Use type assertion for layout-shift entries
        const layoutShiftEntry = entry as LayoutShift;
        cumulativeScore += layoutShiftEntry.value;
      });
      console.log(`CLS: ${cumulativeScore}`);
    }).observe({ type: 'layout-shift', buffered: true });
  }
}

/**
 * Preload common product images
 */
function preloadCommonProductImages(): void {
  // Preload featured product images
  const featuredProducts = [
    { id: 'featured1', collection: 'products' },
    { id: 'featured2', collection: 'products' },
    { id: 'featured3', collection: 'products' }
  ];
  
  featuredProducts.forEach(product => {
    preloadImage(`${product.id}/image.jpg`, product.collection, 'small', 'webp');
  });
}

/**
 * Apply route-based optimizations
 */
function applyRouteBasedOptimizations(): void {
  const currentPath = window.location.pathname;
  
  // Product detail page optimizations
  if (currentPath.includes('/product/')) {
    // Preload related products
    preloadRelatedProducts();
    
    // Preload checkout page for quick add-to-cart flow
    prefetchRoute('/cart');
    prefetchRoute('/checkout');
  }
  
  // Cart page optimizations
  if (currentPath === '/cart') {
    // Preload checkout page
    prefetchRoute('/checkout');
  }
  
  // Checkout page optimizations
  if (currentPath === '/checkout') {
    // Preload order confirmation page
    prefetchRoute('/order-confirmation');
    
    // Ensure Razorpay is loaded early
    preloadRazorpay();
  }
}

/**
 * Preload related products (for product detail page)
 */
function preloadRelatedProducts(): void {
  // This would ideally use actual product data
  // For now, we'll just preload common product images
  for (let i = 1; i <= 3; i++) {
    preloadImage(`product${i}/image.jpg`, 'products', 'thumbnail', 'webp');
  }
}

/**
 * Prefetch a route for faster navigation
 */
function prefetchRoute(route: string): void {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = route;
  document.head.appendChild(link);
}

/**
 * Preload Razorpay script
 */
function preloadRazorpay(): void {
  // Only preload if not already loaded
  if (!window.Razorpay) {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.head.appendChild(script);
  }
}

// Razorpay type is defined in performanceTypes.ts
