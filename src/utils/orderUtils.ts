/**
 * Order utility functions for consistent order data handling across components
 */

/**
 * Format a date string consistently using Indian locale format
 * @param dateString ISO date string
 * @returns Formatted date string (e.g., "05 Aug, 2025")
 */
export const formatOrderDate = (dateString?: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });
};

/**
 * Calculate the order total consistently across all components
 * @param subtotal Order subtotal
 * @param shippingCost Shipping cost
 * @param discountAmount Discount amount
 * @returns Calculated total
 */
export const calculateOrderTotal = (
  subtotal: number = 0, 
  shippingCost: number = 0, 
  discountAmount: number = 0
): number => {
  return subtotal + shippingCost - discountAmount;
};

/**
 * Order interface for consistent typing across components
 */
export interface OrderData {
  id: string;
  created: string;
  updated: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address?: string;
  shipping_address_text?: string;
  products: string; // JSON string of OrderItem[]
  subtotal: number;
  shipping_cost: number;
  discount_amount: number;
  total: number;
  status: string;
  payment_status: string;
  payment_id?: string;
  payment_date?: string;
  payment_method?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  coupon_code?: string | null;
  notes?: string;
  is_guest_order?: boolean;
  expand?: {
    shipping_address?: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      zipCode: string;
      country: string;
    }
  };
}
