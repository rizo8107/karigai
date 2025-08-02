import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const TermsAndConditions = () => {
  return (
    <div className="konipai-container py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Terms and Conditions</h1>
      
      <div className="max-w-3xl mx-auto mb-8">
        <Alert variant="default" className="mb-8">
          <AlertCircle className="h-5 w-5" />
          <AlertDescription>
            Last updated: August 2, 2025
          </AlertDescription>
        </Alert>

        <Card className="p-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-3">Product Availability</h2>
            <p className="mb-4">
              All products listed on our website or in-store are subject to availability. We strive to keep our inventory 
              up to date, but occasionally items may be out of stock.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Pricing</h2>
            <p>
              Prices of products are subject to change without prior notice. However, once you place an order, the price will remain 
              fixed for that transaction.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Order Confirmation</h2>
            <p>
              After placing an order, you will receive an email confirming receipt of your order. This email will only be an 
              acknowledgment and will not constitute acceptance of your order. A contract between us for the purchase of the 
              goods will not be formed until your payment has been approved by us and we have debited your credit or debit card.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Delivery</h2>
            <p>
              We aim to dispatch all orders within 2 to 3 working days of receiving payment. Delivery times may vary depending 
              on your location and other factors beyond our control.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Quality Assurance</h2>
            <p>
              We take great care in sourcing and packaging our products to ensure they reach you in perfect condition. However, 
              if you receive a product that is damaged or of unsatisfactory quality, please contact us immediately to arrange 
              for a replacement or refund.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Privacy Policy</h2>
            <p>
              We respect your privacy and are committed to protecting your personal information. Any personal information you 
              provide to us will be used solely for the purpose of processing your order and will not be shared with third parties.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Copyright</h2>
            <p>
              All content included on our website, such as text, graphics, logos, button icons, images, audio clips, digital 
              downloads, data compilations, and software, is the property of our company or its content suppliers and is 
              protected by international copyright laws.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Governing Law</h2>
            <p>
              These terms and conditions shall be governed by and construed in accordance with the laws of India, and any 
              disputes relating to these terms and conditions shall be subject to the exclusive jurisdiction of the courts of Salem.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Changes to Terms and Conditions</h2>
            <p>
              We reserve the right to update or modify these terms and conditions at any time without prior notice. Your 
              continued use of our website or services following any such changes constitutes your acceptance of the new 
              terms and conditions.
            </p>
          </div>

          <div className="pt-4 border-t">
            <h2 className="text-xl font-bold mb-3">Contact Us</h2>
            <p>
              If you have any questions about our Terms and Conditions, please contact us at:
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

export default TermsAndConditions;