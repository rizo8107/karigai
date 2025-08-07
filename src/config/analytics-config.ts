/**
 * Analytics Configuration
 * 
 * This file centralizes all analytics configurations and tracking IDs.
 * All values are loaded from environment variables for better security and environment-specific configuration.
 */

export interface AnalyticsConfig {
  // Google Analytics
  googleAnalytics: {
    enabled: boolean;
    measurementId: string;
  };
  
  // Facebook Pixel
  facebookPixel: {
    enabled: boolean;
    pixelId: string;
  };
  
  // Microsoft Clarity
  clarity: {
    enabled: boolean;
    projectId: string;
  };
  
  // Google Tag Manager
  tagManager: {
    enabled: boolean;
    containerId: string;
  };
}

/**
 * Load analytics configuration from environment variables
 */
export const getAnalyticsConfig = (): AnalyticsConfig => {
  return {
    googleAnalytics: {
      enabled: !!import.meta.env.VITE_GA_MEASUREMENT_ID,
      measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID as string || '',
    },
    
    facebookPixel: {
      enabled: !!import.meta.env.VITE_FB_PIXEL_ID,
      pixelId: import.meta.env.VITE_FB_PIXEL_ID as string || '',
    },
    
    clarity: {
      enabled: !!import.meta.env.VITE_CLARITY_PROJECT_ID,
      projectId: import.meta.env.VITE_CLARITY_PROJECT_ID as string || '',
    },
    
    tagManager: {
      enabled: !!import.meta.env.VITE_GTM_CONTAINER_ID,
      containerId: import.meta.env.VITE_GTM_CONTAINER_ID as string || '',
    },
  };
};

// Export the configuration
export const analyticsConfig = getAnalyticsConfig();

// Helper to check if we're in a production environment
export const isProduction = import.meta.env.PROD;

// Helper to determine if analytics should be enabled at all
// (can be used as a master switch via environment variable)
export const analyticsEnabled = 
  isProduction || import.meta.env.VITE_ENABLE_ANALYTICS === 'true';
