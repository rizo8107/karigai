import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { AlertCircle, ShieldCheck } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="konipai-container py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
      
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center justify-center mb-8">
          <ShieldCheck className="h-16 w-16 text-primary" />
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
              Karigai, Salem ("We" or "Us") is committed to protecting the privacy and security of your personal information. 
              This Privacy Policy describes how we collect, use, and disclose personal information when you visit our website 
              or make a purchase from our shop.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Information We Collect</h2>
            <p className="mb-3">When you visit our website or place an order, we may collect certain information from you, including:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Personal information such as your name, email address, mailing address, and phone number.</li>
              <li>Payment information, such as credit card details or other payment methods.</li>
              <li>Order details, including the products you purchase and the shipping address.</li>
              <li>Information collected automatically through cookies and other tracking technologies, such as your IP address, browser type, and browsing preferences.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">How We Use Your Information</h2>
            <p className="mb-3">We may use the information we collect for various purposes, including to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Process and fulfill your orders.</li>
              <li>Communicate with you about your orders, account, or inquiries.</li>
              <li>Send you marketing communications about our products and promotions, if you have opted in to receive such communications.</li>
              <li>Improve our website and services.</li>
              <li>Prevent and detect fraud or abuse.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Information Sharing and Disclosure</h2>
            <p className="mb-3">We may share your personal information with third parties in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>With service providers who help us operate our business and provide services to you, such as payment processors, shipping carriers, and IT service providers.</li>
              <li>With our business partners for marketing purposes, if you have opted in to receive such communications.</li>
              <li>When required by law or to protect our rights, property, or safety, or the rights, property, or safety of others.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Data Retention</h2>
            <p>
              We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
              unless a longer retention period is required or permitted by law.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. You may also have the right to object to 
              or restrict certain processing of your personal information. If you would like to exercise any of these rights, please 
              contact us using the contact information provided below.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Changes to this Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. 
              We encourage you to review this Privacy Policy periodically for any updates.
            </p>
          </div>

          <div className="pt-4 border-t">
            <h2 className="text-xl font-bold mb-3">Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
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

export default PrivacyPolicy;