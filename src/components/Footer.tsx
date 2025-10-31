import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';

const Footer = () => {
  return (
    <footer className="bg-transparent">
      <div className="karigai-container py-10">
        <div className="rounded-3xl bg-primary text-primary-foreground shadow-lg overflow-hidden">
          <div className="px-6 md:px-10 py-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <Link to="/" className="inline-block mb-6">
              <Logo variant="light" className="h-8" />
            </Link>
            <p className="text-primary-foreground/80 mb-6">
            Karigai was founded with a simple mission to create beautiful, nourishing handmade soaps 
            that don't compromise on quality or sustainability.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-primary-foreground/80">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-primary-foreground/80">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-primary-foreground/80">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <h3 className="font-semibold mb-4 text-lg">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/shop" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/bestsellers" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-4">
            <h3 className="font-semibold mb-4 text-lg">Policies</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy-policy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/cancellations-refunds" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Cancellations & Refunds
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
              {/* Newsletter pill row */}
              <div className="md:col-span-12 mt-6">
                <div className="rounded-2xl bg-primary/20 p-5 md:flex md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <p className="text-xl md:text-2xl font-semibold">Subscribe our newsletter</p>
                    <p className="text-sm text-primary-foreground/80 mt-1">Stay up to date with new products and offers.</p>
                  </div>
                  <form className="flex items-center gap-2 w-full md:w-auto">
                    <div className="flex items-center bg-white/10 rounded-full px-4 py-2 w-full md:w-80">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="bg-transparent placeholder:text-primary-foreground/70 text-primary-foreground outline-none w-full text-sm"
                        aria-label="Email"
                      />
                    </div>
                    <Button type="submit" className="rounded-full px-5">Subscribe</Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/10">
            <div className="px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center text-primary-foreground/60 text-sm">
              <p>© {new Date().getFullYear()} Karigai. All rights reserved.</p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <Link to="/privacy-policy" className="hover:text-primary-foreground transition-colors">
                  Privacy
                </Link>
                <Link to="/terms-and-conditions" className="hover:text-primary-foreground transition-colors">
                  Terms
                </Link>
                <Link to="/cancellations-refunds" className="hover:text-primary-foreground transition-colors">
                  Refunds
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
