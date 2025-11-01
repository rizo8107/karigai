// OpenPanel Analytics Configuration - DISABLED
import { OpenPanel } from '@openpanel/web';

// Initialize OpenPanel with DISABLED state
// OpenPanel tracking has been removed from the application
export const op = new OpenPanel({
  clientId: '',
  clientSecret: '',
  apiUrl: 'https://api.openpanel.dev',
  trackScreenViews: false,
  trackOutgoingLinks: false,
  trackAttributes: false,
  disabled: true, // Always disabled
});

console.log('[OpenPanel] Disabled - OpenPanel tracking has been removed from the application');

// Track page views
export const opTrackPageView = (pageTitle: string, pagePath: string) => {
  op.track('page_view', {
    page_title: pageTitle,
    page_path: pagePath,
    timestamp: new Date().toISOString(),
  });
};

// Track user authentication
export const opTrackLogin = (userId: string, method: string, email?: string) => {
  if (email) {
    op.identify({
      profileId: userId,
      email,
    });
  }
  op.track('login', {
    user_id: userId,
    method,
    timestamp: new Date().toISOString(),
  });
};

export const opTrackSignup = (userId: string, method: string, email?: string) => {
  if (email) {
    op.identify({
      profileId: userId,
      email,
    });
  }
  op.track('sign_up', {
    user_id: userId,
    method,
    timestamp: new Date().toISOString(),
  });
};

// E-commerce tracking
export const opTrackProductView = (product: {
  item_id: string;
  item_name: string;
  price: number;
  item_category?: string;
}) => {
  op.track('view_item', {
    product_id: product.item_id,
    product_name: product.item_name,
    price: product.price,
    category: product.item_category,
    currency: 'INR',
    timestamp: new Date().toISOString(),
  });
};

export const opTrackAddToCart = (product: {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
  item_category?: string;
}) => {
  op.track('add_to_cart', {
    product_id: product.item_id,
    product_name: product.item_name,
    price: product.price,
    quantity: product.quantity,
    value: product.price * product.quantity,
    category: product.item_category,
    currency: 'INR',
    timestamp: new Date().toISOString(),
  });
};

export const opTrackRemoveFromCart = (product: {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
}) => {
  op.track('remove_from_cart', {
    product_id: product.item_id,
    product_name: product.item_name,
    price: product.price,
    quantity: product.quantity,
    value: product.price * product.quantity,
    currency: 'INR',
    timestamp: new Date().toISOString(),
  });
};

interface ProductItem {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
}

export const opTrackBeginCheckout = (products: ProductItem[], value: number) => {
  op.track('begin_checkout', {
    value,
    currency: 'INR',
    items: products.map(p => ({
      product_id: p.item_id,
      product_name: p.item_name,
      price: p.price,
      quantity: p.quantity,
    })),
    timestamp: new Date().toISOString(),
  });
};

export const opTrackPurchase = (
  products: ProductItem[],
  transactionId: string,
  value: number,
  shipping: number = 0,
  tax: number = 0,
  coupon?: string
) => {
  op.track('purchase', {
    transaction_id: transactionId,
    value,
    tax,
    shipping,
    currency: 'INR',
    coupon,
    items: products.map(p => ({
      product_id: p.item_id,
      product_name: p.item_name,
      price: p.price,
      quantity: p.quantity,
    })),
    timestamp: new Date().toISOString(),
  });
};

// Form tracking
export const opTrackFormStart = (formName: string, formId: string) => {
  op.track('form_start', {
    form_name: formName,
    form_id: formId,
    timestamp: new Date().toISOString(),
  });
};

export const opTrackFormComplete = (formName: string, formId: string) => {
  op.track('form_complete', {
    form_name: formName,
    form_id: formId,
    timestamp: new Date().toISOString(),
  });
};

export const opTrackFormError = (formName: string, formId: string, errorMessage: string) => {
  op.track('form_error', {
    form_name: formName,
    form_id: formId,
    error_message: errorMessage,
    timestamp: new Date().toISOString(),
  });
};

// Button clicks
export const opTrackButtonClick = (buttonName: string, buttonText: string, pagePath: string) => {
  op.track('button_click', {
    button_name: buttonName,
    button_text: buttonText,
    page_path: pagePath,
    timestamp: new Date().toISOString(),
  });
};

// Payment tracking
export const opTrackPaymentStart = (orderId: string, amount: number, paymentMethod: string) => {
  op.track('payment_start', {
    order_id: orderId,
    value: amount,
    currency: 'INR',
    payment_method: paymentMethod,
    timestamp: new Date().toISOString(),
  });
};

export const opTrackPaymentSuccess = (
  orderId: string,
  transactionId: string,
  amount: number,
  paymentMethod: string
) => {
  op.track('payment_success', {
    order_id: orderId,
    transaction_id: transactionId,
    value: amount,
    currency: 'INR',
    payment_method: paymentMethod,
    timestamp: new Date().toISOString(),
  });
};

export const opTrackPaymentFailure = (
  orderId: string,
  amount: number,
  paymentMethod: string,
  errorMessage: string
) => {
  op.track('payment_failure', {
    order_id: orderId,
    value: amount,
    currency: 'INR',
    payment_method: paymentMethod,
    error_message: errorMessage,
    timestamp: new Date().toISOString(),
  });
};

// Search tracking
export const opTrackSearch = (searchTerm: string, resultsCount: number) => {
  op.track('search', {
    search_term: searchTerm,
    results_count: resultsCount,
    timestamp: new Date().toISOString(),
  });
};

export default op;
