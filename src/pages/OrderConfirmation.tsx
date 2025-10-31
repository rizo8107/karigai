import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { pocketbase } from '@/lib/pocketbase';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingBag, CheckCircle, Package, Receipt, Loader2, Copy, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { trackPurchase, trackPageView, trackDynamicConversion } from '@/lib/analytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OrderProduct {
  productId?: string;
  product?: { id?: string; name?: string; price?: number; images?: string[] };
  name?: string;
  price?: number;
  quantity: number;
  color?: string;
  discount?: number;
  coupon?: string;
}
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
    shipping_address?: { street: string; city: string; state: string; postalCode: string; country: string };
    user?: { id: string; email: string };
  };
  tax?: number;
  shipping_address_text?: string;
  status?: string;
  created?: string;
}

const OrderInvoice = lazy(() => import('@/components/OrderInvoice').then(m => ({ default: m.OrderInvoice })));

const getImageUrl = (product: OrderProduct['product'], productId: string | undefined): string => {
  const baseUrl = import.meta.env.VITE_POCKETBASE_URL?.replace(/\/$/, '') || 'https://backend-karigaibackend.7za6uc.easypanel.host';
  const collectionId = 'products';
  const pId = product?.id || productId;
  const imageName = product?.images?.[0];
  if (pId && imageName) return `${baseUrl}/api/files/${collectionId}/${pId}/${imageName}`;
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
  const [activeTab, setActiveTab] = useState<string>('order');

  useEffect(() => {
    document.title = 'Order Confirmation | Konipai';
    trackPageView('Order Confirmation', window.location.pathname);

    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        if (!orderId) throw new Error('Order ID not found');

        const orderData = await pocketbase.collection('orders').getOne(orderId, { expand: 'user,shipping_address' });

        if (orderData.shipping_address_text) {
          try {
            const parsed = JSON.parse(orderData.shipping_address_text);
            orderData.expand = orderData.expand || {};
            orderData.expand.shipping_address = parsed;
          } catch {}
        }

        let productsFromOrder: OrderProduct[] = [];
        if (typeof orderData.products === 'string') {
          try { productsFromOrder = JSON.parse(orderData.products); } catch {}
        } else if (Array.isArray(orderData.products)) {
          productsFromOrder = orderData.products;
        }

        const ids = productsFromOrder.map(p => p.productId || p.product?.id).filter(Boolean) as string[];
        if (ids.length) {
          const productRecords = await Promise.all(ids.map(id => pocketbase.collection('products').getOne(id)));
          const byId = Object.fromEntries(productRecords.map((p: any) => [p.id, p]));
          orderData.products = productsFromOrder.map(item => {
            const pid = item.productId || item.product?.id;
            const full = pid ? byId[pid] : null;
            return { ...item, product: full ? { ...item.product, ...full } : item.product };
          });
        }

        setOrder(orderData as unknown as Order);

        if (orderData && paymentStatus === 'success') {
          try {
            let orderProducts: OrderProduct[] = Array.isArray(orderData.products)
              ? orderData.products
              : JSON.parse(orderData.products || '[]');

            const items = orderProducts.map(i => ({
              item_id: i.productId || i.product?.id || '',
              item_name: i.name || i.product?.name || 'Product',
              price: Number(i.price || i.product?.price || 0),
              quantity: i.quantity || 1,
              item_variant: i.color || undefined,
            }));

            trackPurchase(items, orderData.id, orderData.total, orderData.shipping_cost, orderData.tax, orderData.coupon_code);
            trackDynamicConversion({
              transaction_id: orderData.id,
              value: orderData.total,
              shipping: orderData.shipping_cost,
              tax: orderData.tax,
              currency: 'INR',
              items,
              conversion_type: 'Purchase',
            });
          } catch {}
        }
      } catch (e: any) {
        setError(e?.message || 'Failed to load order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, paymentStatus]);

  if (loading) {
    return (
      <div className="min-h-[70vh] grid place-items-center bg-background">
        <div className="text-center text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-3" />
          Loading order details…
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container max-w-md mx-auto py-16 px-4 text-center">
        <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-3">Order Not Found</h1>
        <p className="text-muted-foreground mb-6">{error || 'Could not find the requested order.'}</p>
        <Button asChild><Link to="/shop">Continue Shopping</Link></Button>
      </div>
    );
  }

  const products: OrderProduct[] =
    typeof order.products === 'string' ? (() => { try { return JSON.parse(order.products); } catch { return []; } })() : (order.products as OrderProduct[]);
  const isPaid = ['paid', 'captured', 'authorized'].includes(order.payment_status);
  const subtotalNum = Number(order.subtotal || 0);
  const discountNum = Number(order.discount_amount || 0);
  const shippingNum = Number(order.shipping_cost || 0);
  const totalCalc = subtotalNum + shippingNum - discountNum;

  const orderLink = typeof window !== 'undefined' ? window.location.href : `https://konipai.com/orders/${order.id}`;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(orderLink)}`;

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="mx-auto max-w-[420px]">
        <div className="text-center mb-5 text-foreground">
          <CheckCircle className="h-10 w-10 text-emerald-600 mx-auto mb-2" />
          <div className="text-lg font-semibold">{isPaid ? 'Payment Successful' : 'Order Placed'}</div>
          <div className="text-muted-foreground text-sm">Order #{order.id}</div>
        </div>

        <div className="relative">
          <div className="absolute left-[-10px] top-[110px] h-5 w-5 rounded-full bg-background" />
          <div className="absolute right-[-10px] top-[110px] h-5 w-5 rounded-full bg-background" />

          <Card className="rounded-[22px] px-0 py-0 overflow-hidden shadow-md">
            <div className="px-6 pt-6 pb-4 bg-white">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">KONIPAI</div>
                  <div className="text-[15px] font-semibold">Thank you for your purchase!</div>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <div>{new Date().toLocaleDateString()}</div>
                  <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                    <ShieldCheck className="h-3.5 w-3.5" /> {isPaid ? 'PAID' : 'PENDING'}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 border-t border-dashed border-muted"></div>

            <div className="px-6 py-4 bg-white">
              <ul className="space-y-3">
                {products.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-10 w-10 overflow-hidden rounded-md bg-neutral-100 flex-shrink-0">
                        {item.product?.images?.length ? (
                          <img
                            src={getImageUrl(item.product, item.productId)}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full grid place-items-center">
                            <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-[13px] font-medium text-foreground">
                          {item.product?.name || 'Product'}
                        </div>
                        <div className="text-[12px] text-muted-foreground">
                          Qty {item.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="text-[13px] font-semibold text-foreground">
                      {formatCurrency((item.product?.price || item.price || 0) * (item.quantity || 1))}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 space-y-2 text-[13px]">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotalNum)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{shippingNum ? formatCurrency(shippingNum) : 'Free'}</span>
                </div>
                {discountNum > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span>-{formatCurrency(discountNum)}</span>
                  </div>
                )}
                <div className="border-t border-muted pt-2 flex justify-between text-[15px] font-semibold text-foreground">
                  <span>Total</span>
                  <span>{formatCurrency(totalCalc)}</span>
                </div>
              </div>
            </div>

            <div className="px-6 border-t border-dashed border-muted"></div>

            <div className="px-6 py-5 bg-white">
              <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                <div className="text-[12px] text-muted-foreground leading-relaxed">
                  <div className="font-medium text-foreground mb-1">Track & Save</div>
                  Scan to revisit your order anytime. We’ve also emailed a copy to{' '}
                  <span className="font-medium">{order.customer_email || 'your email'}</span>.
                </div>
                <img
                  src={qrSrc}
                  alt="Order QR"
                  className="h-28 w-28 rounded-md border border-muted p-1 bg-white"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="order" className="flex items-center gap-2">
                <Package className="h-4 w-4" /> Order
              </TabsTrigger>
              <TabsTrigger value="invoice" className="flex items-center gap-2">
                <Receipt className="h-4 w-4" /> Invoice
              </TabsTrigger>
            </TabsList>

            <TabsContent value="invoice" className="mt-4">
              {isPaid ? (
                <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin mx-auto" />}>
                  <OrderInvoice order={order} products={products} />
                </Suspense>
              ) : (
                <Card className="p-6">
                  <div className="text-center">
                    <h2 className="text-lg font-semibold mb-2">Invoice Not Available</h2>
                    <p className="text-muted-foreground">Invoice will be available once payment is confirmed.</p>
                  </div>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button asChild variant="outline" className="w-full">
            <Link to="/orders">View Orders</Link>
          </Button>
          <Button asChild className="w-full"><Link to="/shop">Continue Shopping</Link></Button>
        </div>
      </div>
    </div>
  );
}
