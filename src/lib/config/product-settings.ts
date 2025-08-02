/**
 * Product Display Settings Configuration
 * 
 * This file contains settings for product display and checkout process
 * Settings can be overridden with environment variables
 */
import { isTamilNaduPincode } from '../utils/tn-pincodes';

export interface ProductDisplaySettings {
  // Display options
  showFreeShipping: boolean;
  showStarRating: boolean;
  showDimensions: boolean;
  showUsageGuidelines: boolean;
  showReturnOption: boolean;
  
  // Product defaults
  defaultWeight: string;
  
  // Shipping configuration
  tnShippingCost: number;
  otherStatesShippingCost: number;
  tnDeliveryDays: string;
  otherStatesDeliveryDays: string;
}

// Default values as per requirements
const defaultSettings: ProductDisplaySettings = {
  // Display options - all disabled as requested
  showFreeShipping: false,
  showStarRating: false,
  showDimensions: false,
  showUsageGuidelines: false,
  showReturnOption: false,
  
  // Product defaults
  defaultWeight: '100 grams',
  
  // Shipping configuration
  tnShippingCost: 45,
  otherStatesShippingCost: 60,
  tnDeliveryDays: '2 days',
  otherStatesDeliveryDays: '3-4 days',
};

/**
 * Get product display settings with environment variable overrides
 * This allows for different settings in different environments
 */
export const getProductSettings = (): ProductDisplaySettings => {
  return {
    // Display options
    showFreeShipping: import.meta.env.VITE_SHOW_FREE_SHIPPING === 'true',
    showStarRating: import.meta.env.VITE_SHOW_STAR_RATING === 'true',
    showDimensions: import.meta.env.VITE_SHOW_DIMENSIONS === 'true',
    showUsageGuidelines: import.meta.env.VITE_SHOW_USAGE_GUIDELINES === 'true',
    showReturnOption: import.meta.env.VITE_SHOW_RETURN_OPTION === 'true',
    
    // Product defaults
    defaultWeight: import.meta.env.VITE_DEFAULT_WEIGHT || defaultSettings.defaultWeight,
    
    // Shipping configuration
    tnShippingCost: Number(import.meta.env.VITE_TN_SHIPPING_COST || defaultSettings.tnShippingCost),
    otherStatesShippingCost: Number(import.meta.env.VITE_OTHER_STATES_SHIPPING_COST || defaultSettings.otherStatesShippingCost),
    tnDeliveryDays: import.meta.env.VITE_TN_DELIVERY_DAYS || defaultSettings.tnDeliveryDays,
    otherStatesDeliveryDays: import.meta.env.VITE_OTHER_STATES_DELIVERY_DAYS || defaultSettings.otherStatesDeliveryDays,
  };
};

/**
 * Calculate shipping cost based on state or pincode
 * @param stateOrPincode The delivery state or pincode
 * @returns Shipping cost in rupees
 */
export const calculateShippingCost = (stateOrPincode: string): number => {
  const settings = getProductSettings();
  
  // First check if it's a pincode
  if (/^\d{6}$/.test(stateOrPincode)) {
    if (isTamilNaduPincode(stateOrPincode)) {
      return settings.tnShippingCost;
    }
    return settings.otherStatesShippingCost;
  }
  
  // If not a pincode, check if the state is Tamil Nadu (case insensitive)
  if (stateOrPincode.toLowerCase() === 'tamil nadu' || 
      stateOrPincode.toLowerCase() === 'tamilnadu' || 
      stateOrPincode.toLowerCase() === 'tn') {
    return settings.tnShippingCost;
  }
  
  // For all other states
  return settings.otherStatesShippingCost;
};

/**
 * Get estimated delivery time based on state or pincode
 * @param stateOrPincode The delivery state or pincode
 * @returns Delivery time as a string
 */
export const getDeliveryTime = (stateOrPincode: string): string => {
  const settings = getProductSettings();
  
  // First check if it's a pincode
  if (/^\d{6}$/.test(stateOrPincode)) {
    if (isTamilNaduPincode(stateOrPincode)) {
      return settings.tnDeliveryDays;
    }
    return settings.otherStatesDeliveryDays;
  }
  
  // If not a pincode, check if the state is Tamil Nadu (case insensitive)
  if (stateOrPincode.toLowerCase() === 'tamil nadu' || 
      stateOrPincode.toLowerCase() === 'tamilnadu' || 
      stateOrPincode.toLowerCase() === 'tn') {
    return settings.tnDeliveryDays;
  }
  
  // For all other states
  return settings.otherStatesDeliveryDays;
};

export default defaultSettings;
