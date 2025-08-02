import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { AlertCircle, Package, Truck } from "lucide-react";

const ShippingPolicy = () => {
  return (
    <div className="konipai-container py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Shipping Policy</h1>

      <div className="max-w-3xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-4 mb-8">
          <Package className="h-12 w-12 text-primary" />
          <Truck className="h-12 w-12 text-primary" />
        </div>
        
        <Alert variant="default" className="mb-8">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle>Last Updated</AlertTitle>
          <AlertDescription>
            August 2, 2025
          </AlertDescription>
        </Alert>

        <Card className="p-6 space-y-6">
          <div>
            <p className="mb-4">
              At Karigai, we strive to deliver your products with the utmost care and efficiency.
              We are committed to providing efficient and reliable delivery services to our customers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Shipping Charges</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>For all deliveries within Tamilnadu, are charged Rs.45 as minimum</li>
              <li>Shipping Charges beyond Tamilnadu are charged Rs.60 as minimum.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Delivery Timeline</h2>
            <p className="mb-3">
              We at Karigai are dedicated to ensuring that your ordered products reach you in the best condition 
              and within the promised time frame. Please find our delivery timeline conditions below:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Minimum Delivery Time:</strong> 2 days</li>
              <li><strong>Maximum Delivery Time:</strong> 3 days</li>
            </ul>
            <p className="mt-3">
              We aim to dispatch all orders within 2 working days of receiving payment.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Delivery Process</h2>
            <p>
              Once your order is confirmed and payment is received, we will process your order and hand it over 
              to our shipping partners. You will receive updates about your shipment via email or SMS.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Delivery Address</h2>
            <p>
              Delivery of all orders will be to the address provided by you during checkout. Please ensure 
              that the shipping address is accurate and complete to avoid any delays in delivery.
            </p>
          </div>

          <div className="pt-4 border-t">
            <h2 className="text-xl font-bold mb-3">Contact Us</h2>
            <p>
              For any issues regarding shipping or delivery of your order, please contact us at:
            </p>
            <ul className="list-none mt-2">
              <li><strong>Email:</strong> karigaishree@gmail.com</li>
              <li><strong>Phone:</strong> 9486054899</li>
              <li><strong>Address:</strong> Old busstand, Salem, Tamil Nadu, India - 636001</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ShippingPolicy;