/**
 * Performance optimization utilities for Karigai
 * This file contains functions to improve page loading speed and overall performance
 */

// Component lazy loading with preload capability
import { lazy, ComponentType } from 'react';

// Track which components have been preloaded
const preloadedComponents = new Set<string>();

// Define the extended component type with preload method
interface PreloadableComponent<T extends ComponentType<any>> extends React.LazyExoticComponent<T> {
  preload: () => void;
}

/**
 * Enhanced lazy loading with preload capability
 * @param factory Function that imports the component
 * @param id Unique identifier for the component
 */
export function lazyWithPreload<T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>,
  id: string
): PreloadableComponent<T> {
  const Component = lazy(factory);
  
  // Create the preloadable component
  const PreloadableComponent = Component as PreloadableComponent<T>;
  
  // Add preload capability
  PreloadableComponent.preload = () => {
    if (!preloadedComponents.has(id)) {
      // Start loading the component in the background
      factory().then(() => {
        preloadedComponents.add(id);
        console.log(`Preloaded component: ${id}`);
      });
    }
  };
  
  return PreloadableComponent;
}

/**
 * Preload critical resources based on user navigation patterns
 */
export function preloadCriticalResources() {
  // Detect idle time to preload resources
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      // Preload common images
      preloadCommonImages();
      
      // Preload next likely pages based on current page
      preloadLikelyPages();
    }, { timeout: 2000 });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      preloadCommonImages();
      preloadLikelyPages();
    }, 2000);
  }
}

/**
 * Preload common images used across the site
 */
function preloadCommonImages() {
  const commonImages = [
    '/logo.png',
    '/hero-banner.jpg',
    // Add other commonly used images
  ];
  
  commonImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

/**
 * Preload likely next pages based on current page
 */
function preloadLikelyPages() {
  const currentPath = window.location.pathname;
  
  // Define page relationships for preloading
  const pageRelationships: Record<string, string[]> = {
    '/': ['/products', '/about', '/contact'],
    '/products': ['/cart', '/checkout'],
    '/product/': ['/cart', '/checkout'],
    '/cart': ['/checkout'],
  };
  
  // Find matching path pattern
  const matchingPattern = Object.keys(pageRelationships).find(
    pattern => currentPath.includes(pattern)
  );
  
  if (matchingPattern) {
    // Preload related pages
    pageRelationships[matchingPattern].forEach(path => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = path;
      document.head.appendChild(link);
    });
  }
}

/**
 * Optimize images on the page by using IntersectionObserver
 * to lazy load images only when they're about to enter viewport
 */
export function setupImageLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '200px 0px', // Start loading 200px before the image enters viewport
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

/**
 * Defer non-critical JavaScript and CSS
 */
export function deferNonCriticalResources() {
  // Defer non-critical scripts
  document.querySelectorAll('script[data-defer]').forEach(script => {
    const newScript = document.createElement('script');
    Array.from(script.attributes).forEach(attr => {
      if (attr.name !== 'data-defer') {
        newScript.setAttribute(attr.name, attr.value);
      }
    });
    newScript.innerHTML = script.innerHTML;
    script.parentNode?.replaceChild(newScript, script);
  });
  
  // Defer non-critical stylesheets
  document.querySelectorAll('link[data-defer]').forEach(link => {
    link.setAttribute('media', 'print');
    link.setAttribute('onload', "this.media='all'");
  });
}

/**
 * Cache API wrapper for improved data fetching performance
 */
type CacheEntry<T> = { data: T, timestamp: number };

class PerformanceCache {
  // In-memory cache for API responses
  private _cache: Map<string, CacheEntry<unknown>> = new Map();
  
  // Default TTL in milliseconds (5 minutes)
  public defaultTTL: number = 5 * 60 * 1000;
  
  /**
   * Get data from cache or fetch it
   */
  async get<T>(
    key: string, 
    fetchFn: () => Promise<T>, 
    ttl: number = this.defaultTTL
  ): Promise<T> {
    const cached = this._cache.get(key) as CacheEntry<T> | undefined;
    const now = Date.now();
    
    // Return cached data if valid
    if (cached && (now - cached.timestamp < ttl)) {
      return cached.data;
    }
    
    // Fetch fresh data
    try {
      const data = await fetchFn();
      this._cache.set(key, { data, timestamp: now });
      return data;
    } catch (error) {
      // If fetch fails but we have cached data, return it even if expired
      if (cached) {
        console.warn(`Failed to fetch fresh data for ${key}, using expired cache`);
        return cached.data;
      }
      throw error;
    }
  }
  
  /**
   * Invalidate a specific cache entry
   */
  invalidate(key: string): void {
    this._cache.delete(key);
  }
  
  /**
   * Clear entire cache
   */
  clear(): void {
    this._cache.clear();
  }
}

export const performanceCache = new PerformanceCache();
