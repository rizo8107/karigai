/**
 * Shipping Configuration Service
 * 
 * This service manages shipping configuration from PocketBase
 * It provides functions to get shipping costs and delivery times
 */

import { pocketbase, type RecordModel } from './pocketbase';

export interface ShippingConfig {
  tnShippingCost: number;
  otherStatesShippingCost: number;
  tnDeliveryDays: string;
  otherStatesDeliveryDays: string;
  isActive: boolean;
}

export const DEFAULT_SHIPPING_CONFIG: ShippingConfig = {
  tnShippingCost: 45,
  otherStatesShippingCost: 60,
  tnDeliveryDays: '2 days',
  otherStatesDeliveryDays: '3-4 days',
  isActive: true
};

// Cache the config to avoid repeated API calls
let cachedConfig: ShippingConfig | null = null;
let cacheExpiry: number = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

const mapRecordToConfig = (record: RecordModel): ShippingConfig => ({
  tnShippingCost: record.tn_shipping_cost ?? DEFAULT_SHIPPING_CONFIG.tnShippingCost,
  otherStatesShippingCost: record.other_states_shipping_cost ?? DEFAULT_SHIPPING_CONFIG.otherStatesShippingCost,
  tnDeliveryDays: record.tn_delivery_days ?? DEFAULT_SHIPPING_CONFIG.tnDeliveryDays,
  otherStatesDeliveryDays: record.other_states_delivery_days ?? DEFAULT_SHIPPING_CONFIG.otherStatesDeliveryDays,
  isActive: record.is_active ?? DEFAULT_SHIPPING_CONFIG.isActive
});

/**
 * Get shipping configuration from PocketBase
 * @returns ShippingConfig object with shipping costs and delivery times
 */
export const getShippingConfig = async (): Promise<ShippingConfig> => {
  const now = Date.now();
  
  // Return cached config if it's still valid
  if (cachedConfig && cacheExpiry > now) {
    return cachedConfig;
  }
  
  try {
    // Get active config from PocketBase
    const record = await pocketbase.collection('shipping_config').getFirstListItem('is_active=true');
    
    // Map record to config object
    const config = mapRecordToConfig(record);
    
    // Update cache
    cachedConfig = config;
    cacheExpiry = now + CACHE_DURATION;
    
    return config;
  } catch (error) {
    console.error('Failed to load shipping configuration:', error);
    
    // Return default config if API call fails
    return DEFAULT_SHIPPING_CONFIG;
  }
};

/**
 * Calculate shipping cost based on state or pincode
 * @param stateOrPincode The delivery state or pincode
 * @returns Shipping cost in rupees
 */
export const calculateShippingCostFromConfig = async (stateOrPincode: string): Promise<number> => {
  const config = await getShippingConfig();
  const raw = (stateOrPincode ?? '').toString().trim();
  
  // First check if it's a pincode
  if (/^\d{6}$/.test(raw)) {
    // Import dynamically to avoid circular dependencies
    const { isTamilNaduPincode } = await import('./utils/tn-pincodes');
    if (await isTamilNaduPincode(raw)) {
      return config.tnShippingCost;
    }
    return config.otherStatesShippingCost;
  }
  
  // If not a pincode, check if the state is Tamil Nadu (case insensitive, ignore spaces)
  const normalized = raw.toLowerCase().replace(/\s+/g, '');
  if (normalized === 'tamilnadu' || normalized === 'tn') {
    return config.tnShippingCost;
  }
  
  // For all other states
  return config.otherStatesShippingCost;
};

/**
 * Get estimated delivery time based on state or pincode
 * @param stateOrPincode The delivery state or pincode
 * @returns Delivery time as a string
 */
export const getDeliveryTimeFromConfig = async (stateOrPincode: string): Promise<string> => {
  const config = await getShippingConfig();
  const raw = (stateOrPincode ?? '').toString().trim();
  
  // First check if it's a pincode
  if (/^\d{6}$/.test(raw)) {
    // Import dynamically to avoid circular dependencies
    const { isTamilNaduPincode } = await import('./utils/tn-pincodes');
    if (await isTamilNaduPincode(raw)) {
      return config.tnDeliveryDays;
    }
    return config.otherStatesDeliveryDays;
  }
  
  // If not a pincode, check if the state is Tamil Nadu (case insensitive, ignore spaces)
  const normalized = raw.toLowerCase().replace(/\s+/g, '');
  if (normalized === 'tamilnadu' || normalized === 'tn') {
    return config.tnDeliveryDays;
  }
  
  // For all other states
  return config.otherStatesDeliveryDays;
};
