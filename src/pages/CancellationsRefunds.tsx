import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { AlertCircle, Building, Phone, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const CancellationsRefunds = () => {
  return (
    <div className="konipai-container py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Cancellations and Refunds Policy</h1>
      
      <div className="max-w-3xl mx-auto mb-12">
        <Alert variant="default" className="mb-8">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle>Last Updated</AlertTitle>
          <AlertDescription>
            August 2, 2025
          </AlertDescription>
        </Alert>

        <Card className="p-6 mb-8 bg-gray-50 border-gray-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Building className="h-5 w-5" />
            Billing Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Billing Entity</h3>
              <p className="text-gray-700 font-medium">Karigai</p>
              <p className="text-gray-700">Old busstand</p>
              <p className="text-gray-700">Salem, Tamil Nadu 636001</p>
              <p className="text-gray-700">India</p>
            
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Contact for Refunds</h3>
              <div className="flex items-center gap-2 mb-1">
                <Mail className="h-4 w-4 text-gray-500" />
                <p className="text-gray-700">karigaishree@gmail.com</p>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <Phone className="h-4 w-4 text-gray-500" />
                <p className="text-gray-700">9486054899</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                <p className="text-gray-700">Old busstand, Salem, Tamil Nadu 636001, India</p>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <p className="text-sm text-gray-600">
            All refunds will be processed by Karigai, the official billing entity for all purchases made on this website. 
            For any refund-related inquiries, please use the contact information above and include your order number in all communications.
          </p>
        </Card>

        <Card className="p-6 space-y-6">
          <div>
            <p className="mb-4">
              At Karigai, we strive to ensure the highest quality of products. Please note that we currently do not support returns or exchanges once an order has been placed and processed.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Cancellation Policy</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Cancellations will be considered only if the request is made within 24 hours of placing the order and before the order has been shipped.
              </li>
              <li>
                However, the cancellation request may not be entertained if the orders have been communicated to 
                the vendors/merchants and they have initiated the process of shipping them.
              </li>
              <li>
                Karigai does not accept cancellation requests for perishable items once they have been processed for shipping.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Refund Policy</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Refunds are only provided in case of order cancellation before the order has been shipped.
              </li>
              <li>
                If you receive damaged or defective items, please report it to our Customer Service team within 
                24 hours of receipt with clear photographs of the damaged product.
              </li>
              <li>
                After verification of the damage claim, we may offer store credit or replacement at our discretion.
              </li>
              <li>
                Please note that we do not accept returns of products once delivered.
              </li>
              <li>
                Refunds, when approved, will be issued to the original form of payment used for the purchase.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Damage Claims</h2>
            <p className="mb-4">
              If you receive a damaged product, please contact our customer service team at karigaishree@gmail.com or Mobile no: 9486054899 
              within 24 hours of delivery. Include your order number and clear photographs of the damaged item.
            </p>
            <p>
              Our customer service team will review your claim and respond with next steps. Please note that we reserve the right to 
              make the final decision on all damage claims based on the evidence provided.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Processing Time</h2>
            <p>
              In case of any refunds approved by Karigai (for pre-shipment cancellations only), it'll take 3-5 working days for the refund to be processed. 
              Please note that it may take additional time for the refunded amount to appear in your account, depending on your bank or credit card issuer's policies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Razorpay Refunds</h2>
            <p>
              For payments processed through Razorpay, refunds will be credited back to the original payment 
              method used for the purchase. The timing of the refund may vary depending on your payment provider.
            </p>
          </div>

          <div className="pt-4 border-t">
            <p>
              If you have any questions about our cancellations and refunds policy, please contact our customer 
              service team at karigaishree@gmail.com or call 9486054899.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CancellationsRefunds;