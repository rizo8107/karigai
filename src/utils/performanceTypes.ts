/**
 * Type definitions for Web Vitals and Performance API
 */

// Layout Shift interface for Cumulative Layout Shift (CLS) metric
export interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

// Performance Event Timing interface for First Input Delay (FID) metric
export interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: DOMHighResTimeStamp;
  processingEnd: DOMHighResTimeStamp;
  cancelable: boolean;
}

// Largest Contentful Paint interface for LCP metric
export interface LargestContentfulPaint extends PerformanceEntry {
  element: Element | null;
  url: string;
  size: number;
  loadTime: DOMHighResTimeStamp;
  renderTime: DOMHighResTimeStamp;
}

// We're not redefining Razorpay types here since they're already defined in razorpay-client.ts
// This avoids type conflicts

// Just define the Window interface extension for performance monitoring
declare global {
  // No need to extend Window interface here as it's already defined elsewhere
  // This avoids type conflicts with existing definitions
}
