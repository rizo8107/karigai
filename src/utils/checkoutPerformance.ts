/**
 * Checkout performance monitoring utilities
 * Tracks and optimizes the checkout flow performance
 */

import { performanceCache } from './performance';
import { preloadImage } from './imageOptimizer';

// Cache keys for checkout-related data
const CACHE_KEYS = {
  SHIPPING_CONFIG: 'shipping-config',
  PAYMENT_CONFIG: 'payment-config',
  USER_ADDRESS: 'user-address',
  CART_ITEMS: 'cart-items'
};

// Cache TTL in milliseconds
const CACHE_TTL = {
  SHIPPING_CONFIG: 3600000, // 1 hour
  PAYMENT_CONFIG: 3600000,  // 1 hour
  USER_ADDRESS: 86400000,   // 24 hours
  CART_ITEMS: 300000        // 5 minutes
};

/**
 * Initialize checkout performance optimizations
 */
export function initializeCheckoutOptimizations(): void {
  // Only run in production
  if (import.meta.env.PROD) {
    // Preload payment gateway script
    preloadPaymentGateway();
    
    // Set up performance monitoring for checkout flow
    setupCheckoutMonitoring();
  }
}

/**
 * Preload payment gateway script
 */
function preloadPaymentGateway(): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'script';
  link.href = 'https://checkout.razorpay.com/v1/checkout.js';
  document.head.appendChild(link);
}

/**
 * Set up performance monitoring for checkout flow
 */
function setupCheckoutMonitoring(): void {
  // Track checkout step timing
  window.addEventListener('load', () => {
    // Mark checkout page load
    if (window.location.pathname === '/checkout') {
      performance.mark('checkout-page-loaded');
    }
  });

  // Track form interactions
  document.addEventListener('submit', (event) => {
    const form = event.target as HTMLFormElement;
    if (form.id === 'checkout-form') {
      performance.mark('checkout-form-submitted');
      
      // Measure time from page load to form submission
      performance.measure(
        'checkout-completion-time',
        'checkout-page-loaded',
        'checkout-form-submitted'
      );
      
      // Log the measurement
      const measures = performance.getEntriesByName('checkout-completion-time');
      if (measures.length > 0) {
        console.log(`Checkout completion time: ${measures[0].duration.toFixed(2)}ms`);
      }
    }
  });
}

/**
 * Cache shipping configuration
 * @param config Shipping configuration object
 */
export function cacheShippingConfig(config: unknown): void {
  performanceCache.set(
    CACHE_KEYS.SHIPPING_CONFIG,
    config,
    CACHE_TTL.SHIPPING_CONFIG
  );
}

/**
 * Get cached shipping configuration
 * @returns Cached shipping configuration or null if not found
 */
export function getCachedShippingConfig<T>(): T | null {
  return performanceCache.get<T>(CACHE_KEYS.SHIPPING_CONFIG);
}

/**
 * Cache user address for faster checkout
 * @param address User address object
 */
export function cacheUserAddress(address: unknown): void {
  performanceCache.set(
    CACHE_KEYS.USER_ADDRESS,
    address,
    CACHE_TTL.USER_ADDRESS
  );
}

/**
 * Get cached user address
 * @returns Cached user address or null if not found
 */
export function getCachedUserAddress<T>(): T | null {
  return performanceCache.get<T>(CACHE_KEYS.USER_ADDRESS);
}

/**
 * Preload product images for cart items
 * @param cartItems Array of cart items
 */
export function preloadCartItemImages(cartItems: Array<{ id: string, collection?: string }>): void {
  if (!Array.isArray(cartItems) || cartItems.length === 0) return;
  
  // Preload first 3 items immediately
  cartItems.slice(0, 3).forEach(item => {
    preloadImage(`${item.id}/image.jpg`, item.collection || 'products', 'small', 'webp');
  });
  
  // Preload remaining items during idle time
  if (cartItems.length > 3) {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        cartItems.slice(3).forEach(item => {
          preloadImage(`${item.id}/image.jpg`, item.collection || 'products', 'thumbnail', 'webp');
        });
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        cartItems.slice(3).forEach(item => {
          preloadImage(`${item.id}/image.jpg`, item.collection || 'products', 'thumbnail', 'webp');
        });
      }, 1000);
    }
  }
}

/**
 * Track checkout step completion
 * @param step Checkout step name
 */
export function trackCheckoutStep(step: string): void {
  performance.mark(`checkout-step-${step}`);
  
  // If first step, measure from page load
  if (step === 'address') {
    if (performance.getEntriesByName('checkout-page-loaded').length > 0) {
      performance.measure(
        'checkout-address-time',
        'checkout-page-loaded',
        `checkout-step-${step}`
      );
    }
  }
  
  // If previous step exists, measure time between steps
  const previousSteps: Record<string, string> = {
    'payment': 'address',
    'confirmation': 'payment'
  };
  
  const previousStep = previousSteps[step];
  if (previousStep) {
    const previousMark = `checkout-step-${previousStep}`;
    if (performance.getEntriesByName(previousMark).length > 0) {
      performance.measure(
        `checkout-${previousStep}-to-${step}-time`,
        previousMark,
        `checkout-step-${step}`
      );
    }
  }
}
