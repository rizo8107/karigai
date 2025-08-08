import { pocketbase, type RecordModel } from './pocketbase';

/**
 * Interface for order details configuration
 * Controls display options and shipping rules
 */
export interface OrderDetailsConfig {
  // Display options
  showFreeShipping: boolean;
  showStarRating: boolean;
  showDimensions: boolean;
  showUsageGuidelines: boolean;
  showReturnOption: boolean;
  showReviewComments: boolean;
  showReviews: boolean;
  showDeliveryInformation: boolean;
  
  // Product page section toggles
  showCareInstructions: boolean; // controls Care Instructions section
  showFeaturesAndBenefits: boolean; // controls Features & Benefits section
  showProductSpecifications: boolean; // controls Product Specifications section
  
  // Home page display options
  showHero: boolean;
  showNewArrivals: boolean;
  showFeatures: boolean;
  showBestsellers: boolean;
  showTestimonials: boolean;
  showNewsletter: boolean;
  
  // Product defaults
  defaultWeight: string;
  
  // Shipping configuration
  tnShippingCost: number;
  otherStatesShippingCost: number;
  tnDeliveryDays: string;
  otherStatesDeliveryDays: string;
  
  // Status
  isActive: boolean;
}

/**
 * Default configuration values based on requirements
 */
export const DEFAULT_CONFIG: OrderDetailsConfig = {
  // Display options - all disabled as per requirements
  showFreeShipping: false,
  showStarRating: false,
  showDimensions: false,
  showUsageGuidelines: true, // default to showing Usage Guidelines
  showReturnOption: false,
  showReviewComments: true,
  showReviews: true,
  showDeliveryInformation: true,
  
  // Product page section toggles (defaults ON)
  showCareInstructions: true,
  showFeaturesAndBenefits: true,
  showProductSpecifications: true,
  
  // Home page display options - all enabled by default
  showHero: true,
  showNewArrivals: true,
  showFeatures: true,
  showBestsellers: true,
  showTestimonials: true,
  showNewsletter: true,
  
  // Product defaults
  defaultWeight: '100 grams',
  
  // Shipping configuration
  tnShippingCost: 45,
  otherStatesShippingCost: 60,
  tnDeliveryDays: '2 days',
  otherStatesDeliveryDays: '3-4 days',
  
  // Status
  isActive: true
};

/**
 * Cache the configuration to avoid repeated API calls
 */
let cachedConfig: OrderDetailsConfig | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Map PocketBase record to our TypeScript interface
 */
const mapRecordToConfig = (record: RecordModel): OrderDetailsConfig => {
  type OptionalToggles = {
    show_usage_guidelines?: boolean;
    show_care_instructions?: boolean;
    show_features_and_benefits?: boolean;
    show_product_specifications?: boolean;
  };
  const r = record as RecordModel & OptionalToggles;
  return {
    showFreeShipping: record.show_free_shipping,
    showStarRating: record.show_star_rating,
    showDimensions: record.show_dimensions,
    showUsageGuidelines: r.show_usage_guidelines ?? true,
    showReturnOption: record.show_return_option,
    showReviewComments: record.show_review_comments ?? true,
    showReviews: record.show_reviews ?? true,
    showDeliveryInformation: record.show_delivery_information ?? true,
    
    // Product page toggles
    showCareInstructions: r.show_care_instructions ?? true,
    showFeaturesAndBenefits: r.show_features_and_benefits ?? true,
    showProductSpecifications: r.show_product_specifications ?? true,
    
    // Home page display options
    showHero: record.show_hero ?? true,
    showNewArrivals: record.show_new_arrivals ?? true,
    showFeatures: record.show_features ?? true,
    showBestsellers: record.show_bestsellers ?? true,
    showTestimonials: record.show_testimonials ?? true,
    showNewsletter: record.show_newsletter ?? true,
    defaultWeight: record.default_weight,
    tnShippingCost: record.tn_shipping_cost,
    otherStatesShippingCost: record.other_states_shipping_cost,
    tnDeliveryDays: record.tn_delivery_days,
    otherStatesDeliveryDays: record.other_states_delivery_days,
    isActive: record.is_active
  };
};

/**
 * Get the active configuration from PocketBase
 * Falls back to default config if no active config exists or if there's an error
 */
export const getOrderConfig = async (options?: { forceRefresh?: boolean }): Promise<OrderDetailsConfig> => {
  // Return cached config if it's still valid
  const now = Date.now();
  const force = options?.forceRefresh === true;
  if (!force && cachedConfig && now - cacheTimestamp < CACHE_DURATION) {
    console.log('Using cached order configuration');
    return cachedConfig;
  }
  
  try {
    // Try to fetch the active configuration
    const result = await pocketbase
      .collection('order_details_config')
      .getFirstListItem('is_active=true');
    
    // Map the record and cache it
    cachedConfig = mapRecordToConfig(result);
    cacheTimestamp = now;
    console.log('Fetched order configuration from PocketBase', cachedConfig);
    return cachedConfig;
  } catch (error) {
    console.error('Error fetching order configuration, using defaults:', error);
    
    // Try to create a default configuration if none exists
    try {
      const mappedConfig = {
        show_free_shipping: DEFAULT_CONFIG.showFreeShipping,
        show_star_rating: DEFAULT_CONFIG.showStarRating,
        show_dimensions: DEFAULT_CONFIG.showDimensions,
        show_usage_guidelines: DEFAULT_CONFIG.showUsageGuidelines,
        show_care_instructions: DEFAULT_CONFIG.showCareInstructions,
        show_features_and_benefits: DEFAULT_CONFIG.showFeaturesAndBenefits,
        show_product_specifications: DEFAULT_CONFIG.showProductSpecifications,
        show_return_option: DEFAULT_CONFIG.showReturnOption,
        show_delivery_information: DEFAULT_CONFIG.showDeliveryInformation,
        default_weight: DEFAULT_CONFIG.defaultWeight,
        tn_shipping_cost: DEFAULT_CONFIG.tnShippingCost,
        other_states_shipping_cost: DEFAULT_CONFIG.otherStatesShippingCost,
        tn_delivery_days: DEFAULT_CONFIG.tnDeliveryDays,
        other_states_delivery_days: DEFAULT_CONFIG.otherStatesDeliveryDays,
        is_active: DEFAULT_CONFIG.isActive,
      };
      
      // Try to create default config in PocketBase if admin is logged in
      if (pocketbase.authStore.isValid && pocketbase.authStore.model?.type === 'admin') {
        const record = await pocketbase.collection('order_details_config').create(mappedConfig);
        console.log('Created default order configuration:', record);
        cachedConfig = mapRecordToConfig(record);
        cacheTimestamp = now;
        return cachedConfig;
      }
    } catch (createError) {
      console.error('Error creating default configuration:', createError);
    }
    
    return DEFAULT_CONFIG;
  }
};

/**
 * Calculate shipping cost based on state
 * @param state The delivery state
 * @returns Shipping cost in rupees
 */
export const calculateShippingCost = async (state: string): Promise<number> => {
  const config = await getOrderConfig();
  
  // Check if the state is Tamil Nadu (case insensitive)
  if (state.toLowerCase() === 'tamil nadu' || state.toLowerCase() === 'tamilnadu' || state.toLowerCase() === 'tn') {
    return config.tnShippingCost;
  }
  
  // For all other states
  return config.otherStatesShippingCost;
};

/**
 * Get estimated delivery time based on state
 * @param state The delivery state
 * @returns Delivery time as a string
 */
export const getDeliveryTime = async (state: string): Promise<string> => {
  const config = await getOrderConfig();
  
  // Check if the state is Tamil Nadu (case insensitive)
  if (state.toLowerCase() === 'tamil nadu' || state.toLowerCase() === 'tamilnadu' || state.toLowerCase() === 'tn') {
    return config.tnDeliveryDays;
  }
  
  // For all other states
  return config.otherStatesDeliveryDays;
};

/**
 * Get product weight (for display on product page)
 */
export const getProductWeight = async (): Promise<string> => {
  const config = await getOrderConfig();
  return config.defaultWeight;
};
