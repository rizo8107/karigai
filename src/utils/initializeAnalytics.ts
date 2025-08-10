/**
 * Analytics Initializer
 * 
 * This file handles the initialization of various analytics services
 * based on the configuration from analytics-config.ts.
 */

import { analyticsConfig, analyticsEnabled } from '../config/analytics-config';

/**
 * Initialize Google Analytics
 */
const initializeGA = (): void => {
  if (!analyticsEnabled || !analyticsConfig.googleAnalytics.enabled) return;

  const { measurementId } = analyticsConfig.googleAnalytics;
  
  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
  
  // Initialize gtag using the official stub
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // Use function declaration to access the built-in 'arguments' object per GA snippet
  // This mirrors: function gtag(){dataLayer.push(arguments);}
  // @ts-expect-error - arguments typed as any for GA compatibility
  function gtag() { (window.dataLayer as any).push(arguments); }

  // Expose on window
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  window.gtag = gtag as any;

  // Queue initial commands
  // @ts-expect-error - GA expects Date, arguments marshalled by snippet
  gtag('js', new Date());
  // @ts-expect-error - config signature managed by GA
  gtag('config', measurementId, {
    send_page_view: true,
    anonymize_ip: true
  });
  
  console.log('Google Analytics initialized');
};

/**
 * Initialize Facebook Pixel
 */
const initializeFBPixel = (): void => {
  if (!analyticsEnabled || !analyticsConfig.facebookPixel.enabled) return;
  
  const { pixelId } = analyticsConfig.facebookPixel;
  
  // Initialize Facebook Pixel - using standard pixel initialization code
  // but refactored to avoid TypeScript errors
  const addPixelScript = () => {
    if (window.fbq) return; // Already initialized
    
    // Define fbq function
    const fbq = function(...args: unknown[]) {
      const f = fbq as unknown as {
        callMethod?: boolean;
        queue: unknown[];
        push?: unknown;
        loaded?: boolean;
        version?: string;
      };
      
      if (f.callMethod) {
        // @ts-expect-error - Dynamic call method
        f.callMethod.apply(f, args);
      } else {
        f.queue.push(args);
      }
    };
    
    // Set up fbq properties
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    
    // Add to window
    window.fbq = fbq;
    window._fbq = fbq;
    
    // Create and insert script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    const head = document.getElementsByTagName('script')[0];
    head?.parentNode?.insertBefore(script, head);
  };
  
  // Add the script
  addPixelScript();
  
  // Initialize and send PageView
  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');
  
  console.log('Facebook Pixel initialized');
};

/**
 * Initialize Microsoft Clarity
 */
const initializeClarity = (): void => {
  if (!analyticsEnabled || !analyticsConfig.clarity.enabled) return;
  
  const { projectId } = analyticsConfig.clarity;
  
  // Initialize Microsoft Clarity with TypeScript-safe implementation
  const addClarityScript = () => {
    // Define clarity namespace on window if it doesn't exist
    type ClarityFunction = (...args: unknown[]) => void;
    
    // Create clarity function
    const clarity: ClarityFunction = (...args: unknown[]) => {
      const c = window.clarity || {};
      if (!c.q) c.q = [];
      // @ts-expect-error - Dynamic property access
      c.q.push(args);
      window.clarity = c;
    };
    
    window.clarity = clarity;
    
    // Create and insert script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${projectId}`;
    const head = document.getElementsByTagName('script')[0];
    head?.parentNode?.insertBefore(script, head);
  };
  
  addClarityScript();
  console.log('Microsoft Clarity initialized');
};

/**
 * Initialize Google Tag Manager
 */
const initializeGTM = (): void => {
  if (!analyticsEnabled || !analyticsConfig.tagManager.enabled) return;
  
  const { containerId } = analyticsConfig.tagManager;
  
  // Initialize Google Tag Manager in a TypeScript-safe way
  const addGTMScript = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      'event': 'gtm.js'
    });
    
    const script = document.createElement('script');
    script.async = true;
    
    // Handle dataLayer name parameter
    const dataLayerName = 'dataLayer';
    const dlParam = dataLayerName !== 'dataLayer' ? `&l=${dataLayerName}` : '';
    
    script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}${dlParam}`;
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript?.parentNode?.insertBefore(script, firstScript);
  };
  
  // Add GTM script
  addGTMScript();
  
  // Add GTM noscript fallback to body
  const noscript = document.createElement('noscript');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${containerId}`;
  iframe.height = '0';
  iframe.width = '0';
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  noscript.appendChild(iframe);
  document.body.insertBefore(noscript, document.body.firstChild);
  
  console.log('Google Tag Manager initialized');
};

/**
 * Initialize all analytics services
 */
export const initializeAnalytics = (): void => {
  if (!analyticsEnabled) {
    console.log('Analytics disabled');
    return;
  }
  
  try {
    // Initialize each service
    initializeGTM();
    initializeGA();
    initializeFBPixel();
    initializeClarity();
    
    console.log('All analytics services initialized');
  } catch (error) {
    console.error('Error initializing analytics:', error);
  }
};

/**
 * Global declaration for analytics-related window properties
 */
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
    clarity: unknown;
  }
}
