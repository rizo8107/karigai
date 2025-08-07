import React, { useRef, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Download, Printer } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Logo } from './Logo';
import { useToast } from './ui/use-toast';
import { formatOrderDate, calculateOrderTotal, OrderData } from '@/utils/orderUtils';

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
  created?: string;
  updated?: string;
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
}

interface OrderInvoiceProps {
  order: Order;
  products: OrderProduct[];
}

// Using the declaration file in src/types/html2pdf.d.ts

export function OrderInvoice({ order, products }: OrderInvoiceProps) {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [logoUrl, setLogoUrl] = useState<string>('');
  const { toast } = useToast();

  // Get the logo URL for embedding in the invoice
  useEffect(() => {
    // Try to get the logo from the environment variables
    const envLogo = import.meta.env.VITE_SITE_LOGO;
    
    // Default hardcoded logo URL as fallback
    const defaultLogo = `${import.meta.env.VITE_POCKETBASE_URL || 'http://localhost:8090'}/api/files/pbc_3420988878/m8l91o34i2i54z0/logo_lbgs7rzev4.svg?thumb=0x0`;
    
    setLogoUrl(envLogo || defaultLogo);
  }, []);

  const handlePrint = () => {
    try {
      const printContents = invoiceRef.current?.innerHTML;
      const originalContents = document.body.innerHTML;

      if (printContents) {
        document.body.innerHTML = `
          <html>
            <head>
              <title>Order Invoice #${order.id}</title>
              <style>
                body { font-family: Arial, sans-serif; }
                .invoice-header { display: flex; justify-content: space-between; margin-bottom: 2rem; }
                .invoice-section { margin-bottom: 1.5rem; }
                .invoice-table { width: 100%; border-collapse: collapse; }
                .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 0.75rem; text-align: left; }
                .invoice-table th { background-color: #f9fafb; }
                .text-right { text-align: right; }
                .totals-table { width: 100%; max-width: 400px; margin-left: auto; }
                .totals-table td { padding: 0.5rem 0; }
                .totals-table .total-row { font-weight: bold; border-top: 1px solid #ddd; }
                .company-info { margin-top: 3rem; font-size: 0.875rem; color: #6b7280; }
                @media print {
                  body { -webkit-print-color-adjust: exact; color-adjust: exact; }
                }
              </style>
            </head>
            <body>
              ${printContents}
            </body>
          </html>
        `;
        
        // Track the print event before actual printing
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'invoice_print',
            order_id: order.id,
            order_value: order.total
          });
        }
        
        window.print();
        document.body.innerHTML = originalContents;
      }
    } catch (error) {
      console.error('Error printing invoice:', error);
      toast({
        title: "Error",
        description: "Failed to print invoice. Please try downloading instead.",
        variant: "destructive"
      });
    }
  };

  const handleDownload = () => {
    try {
      const invoiceContent = invoiceRef.current?.cloneNode(true) as HTMLElement;
      
      // Replace Logo component with direct image tag for HTML export
      if (invoiceContent) {
        const logoDiv = invoiceContent.querySelector('.logo-container');
        if (logoDiv && logoUrl) {
          logoDiv.innerHTML = `<img src="${logoUrl}" alt="Karigai" class="h-12" />`;
        }
      }

      const invoiceHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Order Invoice #${order.id}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 2rem; }
              .invoice-header { display: flex; justify-content: space-between; margin-bottom: 2rem; }
              .invoice-section { margin-bottom: 1.5rem; }
              .invoice-table { width: 100%; border-collapse: collapse; }
              .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 0.75rem; text-align: left; }
              .invoice-table th { background-color: #f9fafb; }
              .text-right { text-align: right; }
              .totals-table { width: 100%; max-width: 400px; margin-left: auto; }
              .totals-table td { padding: 0.5rem 0; }
              .totals-table .total-row { font-weight: bold; border-top: 1px solid #ddd; }
              .company-info { margin-top: 3rem; font-size: 0.875rem; color: #6b7280; }
            </style>
          </head>
          <body>
            ${invoiceContent?.innerHTML || invoiceRef.current?.innerHTML}
          </body>
        </html>
      `;

      const blob = new Blob([invoiceHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Invoice-${order.id}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Track the download event
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'invoice_download',
          download_format: 'html',
          order_id: order.id,
          order_value: order.total
        });
      }
    } catch (error) {
      console.error('Error generating HTML invoice:', error);
      toast({
        title: "Error",
        description: "Failed to generate HTML invoice.",
        variant: "destructive"
      });
    }
  };



  const shippingAddress = order.expand?.shipping_address;
  const orderDate = formatOrderDate(order.created);
  const invoiceDate = formatOrderDate(order.updated);
  
  // Format order created date and time from ISO string format
  const orderDateTime = order.created ? new Date(order.created).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }) : 'Not available';
  
  // Parse order date with fallback for empty fields
  const parseOrderDate = (dateString: string | undefined) => {
    // If date string is empty, use current date as fallback
    if (!dateString) {
      console.log('Order created date is empty, using current date as fallback');
      const currentDate = new Date();
      return currentDate.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }
    
    try {
      // Handle ISO format or custom format
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.log('Invalid date, using current date as fallback');
        const currentDate = new Date();
        return currentDate.toLocaleString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
      }
      
      return date.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error('Error parsing date:', error);
      // Use current date as fallback
      const currentDate = new Date();
      return currentDate.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-end space-x-3 mb-4">
        <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2">
          <Printer className="h-4 w-4" />
          Print
        </Button>
        <Button onClick={handleDownload} variant="default" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          HTML
        </Button>
      </div>
      
      <div 
        ref={invoiceRef} 
        className="bg-white p-6 border rounded-lg shadow-sm print:shadow-none print:border-none"
      >
        <div className="invoice-header flex justify-between items-start mb-10">
          <div>
            <div className="mb-4 logo-container">
              <Logo className="h-12" />
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-bold text-gray-800">Karigai</p>
              <p>Old busstand</p>
              <p>Salem, Tamil Nadu 636001</p>
              <p>India</p>
            </div>
          </div>
          
          <div className="text-right">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">INVOICE</h1>
            <p className="text-sm text-gray-600 mb-4">{order.id ? `#INV-${order.id}` : ''}</p>
            <div className="text-sm text-gray-600">
              <p className="mb-1"><span className="font-medium">Order Date:</span> {orderDate}</p>
              <p className="mb-1"><span className="font-medium">Invoice Date:</span> {invoiceDate}</p>
              <p className="mb-1"><span className="font-medium">Order Date & Time:</span> {parseOrderDate(order.created)}</p>
              <p className="mb-1"><span className="font-medium">Payment Status:</span> {order.payment_status === 'paid' ? 'Paid' : 'Pending'}</p>
              {order.payment_id && (
                <p className="mb-1"><span className="font-medium">Payment ID:</span> {order.payment_id}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="invoice-section grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h2 className="text-sm font-bold text-gray-800 mb-3 uppercase">BILL TO</h2>
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-800 mb-1">{order.customer_name || 'Customer'}</p>
              {shippingAddress && (
                <>
                  <p className="mb-1">{shippingAddress.street || ''}</p>
                  <p className="mb-1">
                    {shippingAddress.city || ''}{shippingAddress.city && shippingAddress.state ? ', ' : ''}
                    {shippingAddress.state || ''} {shippingAddress.postalCode || ''}
                  </p>
                  <p className="mb-1">{shippingAddress.country || ''}</p>
                </>
              )}
              {order.customer_email && <p className="mb-1">{order.customer_email}</p>}
              {order.customer_phone && <p className="mb-1">{order.customer_phone}</p>}
            </div>
          </div>
          
          <div>
            <h2 className="text-sm font-bold text-gray-800 mb-3 uppercase">SHIP TO</h2>
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-800 mb-1">{order.customer_name || 'Customer'}</p>
              {shippingAddress && (
                <>
                  <p className="mb-1">{shippingAddress.street || ''}</p>
                  <p className="mb-1">
                    {shippingAddress.city || ''}{shippingAddress.city && shippingAddress.state ? ', ' : ''}
                    {shippingAddress.state || ''} {shippingAddress.postalCode || ''}
                  </p>
                  <p className="mb-1">{shippingAddress.country || ''}</p>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="invoice-section mb-8 overflow-x-auto">
          <h2 className="text-sm font-bold text-gray-800 mb-4 uppercase">ORDER SUMMARY</h2>
          <table className="invoice-table w-full text-sm border-collapse table-fixed">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left border-b w-[8%]">Item</th>
                <th className="px-4 py-3 text-left border-b w-[42%]">Description</th>
                <th className="px-4 py-3 text-center border-b w-[10%]">Quantity</th>
                <th className="px-4 py-3 text-right border-b w-[20%]">Unit Price</th>
                <th className="px-4 py-3 text-right border-b w-[20%]">Amount</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => {
                const name = item.name || item.product?.name || 'Product';
                const price = Number(item.price || item.product?.price || 0);
                const quantity = item.quantity || 1;
                const total = price * quantity;
                
                return (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{name}</p>
                        {item.color && <p className="text-gray-500 text-xs mt-1">Color: {item.color}</p>}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">{quantity}</td>
                    <td className="px-4 py-3 text-right">{formatCurrency(price)}</td>
                    <td className="px-4 py-3 text-right">{formatCurrency(total)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="invoice-section mt-6">
          <div className="flex justify-end">
            <table className="w-72 text-sm border-collapse">
              <tbody>
                <tr>
                  <td className="font-medium py-2">Subtotal</td>
                  <td className="text-right py-2">{formatCurrency(Number(order.subtotal || 0))}</td>
                </tr>
                <tr>
                  <td className="font-medium py-2">Shipping cost</td>
                  <td className="text-right py-2">{order.shipping_cost ? formatCurrency(Number(order.shipping_cost)) : 'Free'}</td>
                </tr>
                {/* Only render discount row if there is a discount */}
                {order.discount_amount !== null && order.discount_amount !== undefined && Number(order.discount_amount) > 0 && (
                  <tr>
                    <td className="font-medium py-2">Discount</td>
                    <td className="text-right py-2 text-red-600">
                      - {formatCurrency(Number(order.discount_amount))}
                    </td>
                  </tr>
                )}
                {order.tax && order.tax > 0 && (
                  <tr>
                    <td className="font-medium py-2">Tax</td>
                    <td className="text-right py-2">{formatCurrency(order.tax)}</td>
                  </tr>
                )}
                <tr className="total-row">
                  <td className="font-bold py-3 border-t border-gray-300">Total</td>
                  <td className="text-right font-bold py-3 border-t border-gray-300">
                    {formatCurrency(
                      // Recalculate total to ensure accuracy: subtotal + shipping - discount
                      Number(order.subtotal || 0) + 
                      Number(order.shipping_cost || 0) - 
                      Number(order.discount_amount || 0) +
                      Number(order.tax || 0)
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="invoice-section mt-12 border-t pt-8">
          <div className="max-w-2xl mx-auto text-center text-sm text-gray-600">
            <p className="mb-2 font-medium">Thank you for your purchase!</p>
            <p>If you have any questions about this invoice, please contact our customer support:</p>
            <p className="mt-2">karigaishree@gmail.com | +91 9486054899</p>
          </div>
        </div>
        
        <div className="company-info text-xs text-gray-500 mt-12 pt-4 border-t">
          <p>Karigai | Registered in India</p>
        </div>
      </div>
    </div>
  );
} 