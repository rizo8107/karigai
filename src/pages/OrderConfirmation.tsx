import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { pocketbase } from '@/lib/pocketbase';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingBag, CheckCircle, Package, Receipt, Loader2, Copy } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { trackPurchase, trackPageView, trackDynamicConversion } from '@/lib/analytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define interfaces for products in order
interface OrderProduct {
  productId?: string;
  product?: {
    id?: string;
    name?: string;
    price?: number;
    images?: string[];
  };
  name?: string;
  price?: number;
  quantity: number;
  color?: string;
  discount?: number;
  coupon?: string;
}

// Define interface for order
interface Order {
  id: string;
  products: string | OrderProduct[];
  subtotal: number;
  total: number;
  shipping_cost: number | null;
  payment_status: string;
  payment_id?: string;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  coupon_code?: string;
  discount_amount?: number;
  is_guest_order?: boolean;
  expand?: {
    shipping_address?: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    user?: {
      id: string;
      email: string;
    };
  };
  tax?: number;
  shipping_address_text?: string;
}

// Lazy load the OrderInvoice component
const OrderInvoice = lazy(() => import('@/components/OrderInvoice').then(module => ({ default: module.OrderInvoice })));

// Helper to construct image URL
const getImageUrl = (product: OrderProduct['product'], productId: string | undefined): string => {
  const baseUrl = 'https://backend-karigaibackend.7za6uc.easypanel.host';
  const collectionId = 'products'; // Assuming 'products' is the collection name for product images

  const pId = product?.id || productId;
  const imageName = product?.images?.[0];

  if (pId && imageName) {
    return `${baseUrl}/api/files/${collectionId}/${pId}/${imageName}`;
  }
  
  // Fallback if image is not available
  return 'https://via.placeholder.com/150'; 
};

export default function OrderConfirmation() {
  const { orderId } = useParams<{ orderId: string }>();
  const [searchParams] = useSearchParams();
  const paymentStatus = searchParams.get('status');
  
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("order");

  useEffect(() => {
    document.title = 'Order Confirmation | Konipai';
    
    // Track page view with GTM
    trackPageView(
      'Order Confirmation', 
      window.location.pathname
    );
    
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        
        if (!orderId) {
          setError('Order ID not found');
          setLoading(false);
          return;
        }
        
        console.log(`Fetching order details for order ID: ${orderId}`);
        
        const orderData = await pocketbase.collection('orders').getOne(orderId, {
          expand: 'user,shipping_address'
        });
        
        console.log('Fetched order data:', {
          id: orderData.id,
          status: orderData.status,
          payment_status: orderData.payment_status,
          payment_id: orderData.payment_id,
          has_shipping_address: !!orderData.expand?.shipping_address,
          has_shipping_address_text: !!orderData.shipping_address_text
        });
        
        // Parse shipping address from text field
        let parsedShippingAddress = null;
        
        if (orderData.shipping_address_text) {
          try {
            console.log('Parsing shipping address from text field');
            parsedShippingAddress = JSON.parse(orderData.shipping_address_text);
            console.log('Successfully parsed shipping address:', parsedShippingAddress);
            
            orderData.expand = orderData.expand || {};
            orderData.expand.shipping_address = parsedShippingAddress;
          } catch (addressError) {
            console.error('Failed to parse shipping address:', addressError);
          }
        }

        // Enhance order data with full product details
        let productsFromOrder: OrderProduct[] = [];
        if (typeof orderData.products === 'string') {
          try {
            productsFromOrder = JSON.parse(orderData.products);
          } catch (e) { console.error('Failed to parse products from order', e); }
        } else if (Array.isArray(orderData.products)) {
          productsFromOrder = orderData.products;
        }

        const productIds = productsFromOrder.map(p => p.productId || p.product?.id).filter(Boolean) as string[];
        
        if (productIds.length > 0) {
          const productRecords = await Promise.all(
            productIds.map(id => pocketbase.collection('products').getOne(id))
          );

          const productsById = productRecords.reduce((acc, p) => {
            acc[p.id] = p;
            return acc;
          }, {} as { [key: string]: Record<string, any> });

          const enhancedProducts = productsFromOrder.map(item => {
            const productId = item.productId || item.product?.id;
            const fullProduct = productId ? productsById[productId] : null;
            return {
              ...item,
              product: fullProduct ? { ...item.product, ...fullProduct } : item.product,
            };
          });
          orderData.products = enhancedProducts;
        }
        
        setOrder(orderData as unknown as Order);
        
        // Track purchase
        if (orderData && paymentStatus === 'success') {
          try {
            console.log('Tracking purchase event');
            
            // Parse the products array from the order
            let orderProducts: OrderProduct[] = [];
            
            if (typeof orderData.products === 'string') {
              try {
                orderProducts = JSON.parse(orderData.products);
              } catch (e) {
                console.error('Failed to parse order products:', e);
              }
            } else if (Array.isArray(orderData.products)) {
              orderProducts = orderData.products;
            }
            
            // Format products for analytics
            const items = orderProducts.map(item => ({
              item_id: item.productId || item.product?.id || '',
              item_name: item.name || item.product?.name || 'Product',
              price: Number(item.price || item.product?.price || 0),
              quantity: item.quantity || 1,
              item_variant: item.color || undefined
            }));
            
            // Track the purchase event
            trackPurchase(
              items,
              orderData.id,
              orderData.total,
              orderData.shipping_cost,
              orderData.tax,
              orderData.coupon_code
            );
            
            // Track conversion for Meta Pixel
            trackDynamicConversion({
              transaction_id: orderData.id,
              value: orderData.total,
              shipping: orderData.shipping_cost,
              tax: orderData.tax,
              currency: 'INR',
              items: items,
              conversion_type: 'Purchase'
            });
          } catch (analyticsError) {
            console.error('Failed to track purchase:', analyticsError);
          }
        }
      } catch (error) {
        console.error('Error fetching order:', error);
        setError('Failed to load order details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [orderId, paymentStatus]);

  if (loading) {
    return (
      <div className="container max-w-2xl mx-auto py-16 px-4 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        <p className="mt-4">Loading order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container max-w-2xl mx-auto py-16 px-4 text-center">
        <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p className="text-muted-foreground mb-8">{error || 'Could not find the requested order.'}</p>
        <Button asChild>
          <Link to="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  // Parse the products from the JSON string if it's a string, otherwise use as is
  let products: OrderProduct[] = [];
  try {
    // Check if products is a string that needs parsing
    if (typeof order.products === 'string') {
      products = JSON.parse(order.products || '[]');
    } else {
      // Products is already an object
      products = order.products as OrderProduct[];
    }
  } catch (err) {
    console.error('Error parsing products:', err);
    products = [];
  }

  const shippingAddress = order.expand?.shipping_address;
  
  // Check for any of the valid "paid" payment statuses
  const isPaid = ['paid', 'captured', 'authorized'].includes(order.payment_status);
  
  console.log('Payment status check:', {
    status: order.payment_status,
    isPaid: isPaid,
    paymentId: order.payment_id
  });

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground">
          {isPaid 
            ? 'Your payment was successful and your order has been placed.' 
            : 'Your order has been placed but payment confirmation is pending.'}
        </p>
        <p className="font-medium mt-2">Order #{order.id}</p>
        
        {/* Show special message for guest checkout orders with order tracking info */}
        {(order.is_guest_order || !order.expand?.user) && (
          <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-md">
            <p>You completed this order as a guest. Order details have been sent to {order.customer_email}.</p>
            <p className="text-sm mt-1">To track this order in the future, bookmark this page or save this link:</p>
            <div className="mt-2 flex items-center justify-between bg-white p-2 rounded border">
              <code className="text-xs sm:text-sm truncate">{window.location.href}</code>
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-2 flex-shrink-0"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast({
                    title: "Link Copied",
                    description: "Order tracking link copied to clipboard"
                  });
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm mt-3">Create an account to track all your orders in one place and get faster checkout next time.</p>
          </div>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="order" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Order Details
          </TabsTrigger>
          <TabsTrigger value="invoice" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            Invoice
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="order" className="mt-4">
          <Card className="p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {products.map((item, index) => (
                <div key={index} className="flex justify-between py-3 border-b">
                  <div className="flex">
                    <div className="w-16 h-16 rounded-md overflow-hidden mr-4 bg-gray-100 flex-shrink-0">
                      {item.product?.images && item.product.images.length > 0 ? (
                        <img 
                          src={getImageUrl(item.product, item.productId)}
                          alt={item.product?.name || 'Product image'}
                          className="w-20 h-20 object-cover rounded-md mr-4"
                          alt={item.product?.name || 'Product'}
                          className="w-full h-full object-cover"
                          loading="eager"
                          onError={(e) => {
                            console.error('Image load error:', e.currentTarget.src);
                            // Try fallback with different collection ID
                            const target = e.target as HTMLImageElement;
                            if (!target.src.includes('fallback')) {
                              const baseUrl = import.meta.env.VITE_POCKETBASE_URL?.replace(/\/$/, '') || 'https://backend-karigaibackend.7za6uc.easypanel.host';
                              const productId = item.productId || item.product?.id;
                              
                              if (item.product?.images && item.product.images[0]) {
                                const firstImage = item.product.images[0];
                                const imageName = typeof firstImage === 'string' 
                                  ? firstImage 
                                  : String(firstImage) || 'default.jpg';
                                target.src = `${baseUrl}/api/files/products/${productId}/${imageName}?fallback=1`;
                              } else {
                                target.style.display = 'none';
                                target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-200"><svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h2v10z"/></svg></div>';
                              }
                            } else {
                              // Final fallback to placeholder
                              target.style.display = 'none';
                              target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-200"><svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h2v10z"/></svg></div>';
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <ShoppingBag className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{item.product?.name || 'Product'}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity} {item.color && `• Color: ${item.color}`}
                      </p>
                    </div>
                  </div>
                  <div className="font-medium">{formatCurrency((item.product?.price || 0) * item.quantity)}</div>
                </div>
              ))}
              <Separator className="my-2" />
              <div className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>
                  {(() => {
                    let subtotal = Number(order.subtotal || 0);
                    if (subtotal > order.products.length * 1000) subtotal /= 100;
                    return formatCurrency(subtotal);
                  })()}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span>Shipping Cost</span>
                <span>{order.shipping_cost ? formatCurrency(Number(order.shipping_cost)) : 'Free'}</span>
              </div>
              {order.discount_amount && order.discount_amount > 0 && (
                <div className="flex justify-between py-1 text-green-600">
                  <span>Discount</span>
                  <span>
                    - {formatCurrency(Number(order.discount_amount))}
                  </span>
                </div>
              )}
              <div className="flex justify-between py-1 font-semibold">
                <span>Total</span>
                <span>
                  {(() => {
                    // Recalculate total to ensure accuracy
                    const calculatedTotal = (
                      Number(order.subtotal || 0) + 
                      Number(order.shipping_cost || 0) - 
                      Number(order.discount_amount || 0)
                    );
                    return formatCurrency(calculatedTotal);
                  })()}
                </span>
              </div>
            </div>
          </Card>

          {shippingAddress && (
            <Card className="p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>
              <p className="font-medium">{order.customer_name}</p>
              <p>{shippingAddress.street}</p>
              <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}</p>
              <p>{shippingAddress.country}</p>
              <p className="mt-2">Phone: {order.customer_phone}</p>
              <p>Email: {order.customer_email}</p>
            </Card>
          )}

          <Card className="p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isPaid ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <p className="font-medium">{isPaid ? 'Paid' : 'Payment Pending'}</p>
            </div>
            {order.payment_id && (
              <p className="text-sm text-gray-600 mt-2">
                Payment ID: {order.payment_id}
              </p>
            )}
            <div className="flex items-center mt-4 space-x-2">
              <img src="https://razorpay.com/assets/razorpay-logo.svg" alt="Razorpay" className="h-5" />
              <p className="text-sm text-gray-600">Paid via Razorpay</p>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="invoice" className="mt-4">
          {isPaid ? (
            <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin mx-auto" />}>
              <OrderInvoice order={order} products={products} />
            </Suspense>
          ) : (
            <Card className="p-6">
              <div className="text-center">
                <h2 className="text-lg font-semibold mb-2">Invoice Not Available</h2>
                <p className="text-muted-foreground mb-4">
                  An invoice will be available once your payment has been confirmed.
                </p>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <div className="flex flex-col space-y-4 mt-8">
        <div className="flex justify-center space-x-4">
          {/* Only show View All Orders button for logged-in users */}
          {!order.is_guest_order && order.expand?.user ? (
            <Button asChild variant="outline" className="w-full">
              <Link to="/orders">View All Orders</Link>
            </Button>
          ) : (
            <Button asChild variant="outline" className="w-full">
              <Link to="/">Back to Home</Link>
            </Button>
          )}
          <Button asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
        
        {/* Show track order link for guest users */}
        {(order.is_guest_order || !order.expand?.user) && (
          <div className="text-center">
            <Link to="/track-order" className="text-primary hover:underline text-sm">
              Need to track another order? Use our order tracking page
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}