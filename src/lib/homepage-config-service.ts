import { pocketbase, type RecordModel } from './pocketbase';

/**
 * Homepage configuration interface
 */
export interface HomepageConfig {
  // Home page display options
  showHero: boolean;
  showNewArrivals: boolean;
  showFeatures: boolean;
  showBestsellers: boolean;
  showTestimonials: boolean;
  showNewsletter: boolean;
  showFeatured: boolean;
  
  // Section order (lower numbers appear first)
  heroOrder: number;
  featuredOrder: number;
  newArrivalsOrder: number;
  featuresOrder: number;
  bestsellersOrder: number;
  testimonialsOrder: number;
  newsletterOrder: number;
  
  // Common fields
  isActive: boolean;
}

/**
 * Default configuration when no configuration is found
 */
export const DEFAULT_HOMEPAGE_CONFIG: HomepageConfig = {
  // Home page display options - all enabled by default
  showHero: true,
  showNewArrivals: true,
  showFeatures: true,
  showBestsellers: true,
  showTestimonials: true,
  showNewsletter: true,
  showFeatured: true,
  
  // Default section order (0-6)
  heroOrder: 0, // Hero always first by default
  featuredOrder: 1,
  newArrivalsOrder: 2,
  featuresOrder: 3,
  bestsellersOrder: 4,
  testimonialsOrder: 5,
  newsletterOrder: 6,
  
  // Default active status
  isActive: true,
};

// Cache for homepage config to avoid frequent API calls
let cachedHomepageConfig: HomepageConfig | null = null;
let lastFetchTime: number = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Maps a PocketBase record to the HomepageConfig interface
 */
const mapRecordToConfig = (record: RecordModel): HomepageConfig => {
  return {
    // Home page display options
    showHero: record.show_hero ?? true,
    showNewArrivals: record.show_new_arrivals ?? true,
    showFeatures: record.show_features ?? true,
    showBestsellers: record.show_bestsellers ?? true,
    showTestimonials: record.show_testimonials ?? true,
    showNewsletter: record.show_newsletter ?? true,
    showFeatured: record.show_featured ?? true,
    
    // Section order
    heroOrder: record.hero_order ?? 0,
    featuredOrder: record.featured_order ?? 1,
    newArrivalsOrder: record.new_arrivals_order ?? 2,
    featuresOrder: record.features_order ?? 3,
    bestsellersOrder: record.bestsellers_order ?? 4,
    testimonialsOrder: record.testimonials_order ?? 5,
    newsletterOrder: record.newsletter_order ?? 6,
    
    isActive: record.is_active ?? true,
  };
};

/**
 * Gets the homepage configuration from PocketBase
 */
export async function getHomepageConfig(): Promise<HomepageConfig> {
  const currentTime = Date.now();
  
  // Caching disabled to ensure fresh data from the backend
  /* if (cachedHomepageConfig && (currentTime - lastFetchTime < CACHE_TTL)) {
    return cachedHomepageConfig;
  } */
  
  try {
    // Get the first active homepage configuration
    const records = await pocketbase.collection('homepage_config').getList(1, 1, {
      filter: 'is_active=true',
    });
    
    if (records.items.length > 0) {
      const config = mapRecordToConfig(records.items[0]);
      
      // Caching disabled
      /* cachedHomepageConfig = config;
      lastFetchTime = currentTime; */
      
      return config;
    }
    
    // If no config found, return default
    return DEFAULT_HOMEPAGE_CONFIG;
  } catch (error) {
    console.error('Error fetching homepage configuration:', error);
    return DEFAULT_HOMEPAGE_CONFIG;
  }
}

/**
 * Clears the homepage config cache to force a fresh fetch on next request
 */
export function clearHomepageConfigCache(): void {
  cachedHomepageConfig = null;
  lastFetchTime = 0;
}
