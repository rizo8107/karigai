import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { AlertCircle, XCircle } from "lucide-react";

const ReturnPolicy = () => {
  return (
    <div className="konipai-container py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Return Policy</h1>
      
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center justify-center mb-8">
          <XCircle className="h-16 w-16 text-primary" />
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
              At Karigai, we strive to ensure the highest quality of products. Please note that we currently do not support returns or exchanges once an order has been placed and processed.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">1. No Returns Policy</h2>
            <p className="mb-4">
              Due to the nature of our products and to maintain quality standards, we do not accept returns of any items once they have been delivered. Please ensure that you review your order carefully before confirming your purchase.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">2. Cancellation Policy</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cancellations will be considered only if the request is made within 24 hours of placing the order and before the order has been shipped.</li>
              <li>The cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.</li>
              <li>Karigai does not accept cancellation requests for perishable items once they have been processed for shipping.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">3. Damaged or Defective Items</h2>
            <p className="mb-4">
              If you receive a damaged product, please contact our customer service team at karigaishree@gmail.com or Mobile no: 9486054899 
              within 24 hours of delivery. Include your order number and clear photographs of the damaged item.
            </p>
            <p>
              Our customer service team will review your claim and respond with next steps. After verification of the damage claim, we may offer store credit or replacement at our discretion. Please note that we reserve the right to make the final decision on all damage claims based on the evidence provided.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">4. Refund Policy</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Refunds are only provided in case of order cancellation before the order has been shipped.</li>
              <li>In case of any refunds approved by Karigai (for pre-shipment cancellations only), it'll take 3-5 working days for the refund to be processed.</li>
              <li>Please note that it may take additional time for the refunded amount to appear in your account, depending on your bank or credit card issuer's policies.</li>
              <li>Refunds, when approved, will be issued to the original form of payment used for the purchase.</li>
            </ul>
          </div>

          <div className="pt-4 border-t">
            <h2 className="text-xl font-bold mb-3">Contact Us</h2>
            <p>
              If you have any questions or concerns about our policies, please contact our customer service team at:
            </p>
            <ul className="list-none mt-2">
              <li><strong>Email:</strong> karigaishree@gmail.com</li>
              <li><strong>Phone:</strong> 9486054899</li>
              <li><strong>Address:</strong> Old busstand, Salem, Tamil Nadu, India - 636001</li>
            </ul>
            <p className="mt-4">
              We are here to assist you and ensure your satisfaction with every purchase.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReturnPolicy;
