import { BrowserRouter, Routes as RouterRoutes, Route, Navigate, useLocation } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { lazy, Suspense, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { trackPageView } from "@/lib/analytics"
import useUtmParams from "@/hooks/useUtmParams"
import { getUtmParamsForAnalytics } from "@/lib/utm"
import { MetaPixelRouterTracker } from "./components/MetaPixelRouterTracker"
import { PluginProvider } from "@/plugins/Provider"
import { DynamicThemeProvider } from "@/contexts/ThemeContext"
import AdminRoute from "./routes/AdminRoute"
import EmbedBridge from "@/components/EmbedBridge"

// Eager load critical pages
import Index from "./pages/Index"
import PuckHome from "./pages/PuckHome"

// Lazy load non-critical pages
const Shop = lazy(() => import("./pages/Shop"))
const ProductDetail = lazy(() => import("./pages/ProductDetail"))
const Bestsellers = lazy(() => import("./pages/Bestsellers"))
const NewArrivals = lazy(() => import("./pages/NewArrivals"))
const About = lazy(() => import("./pages/About"))
const Checkout = lazy(() => import("./pages/Checkout"))
const NotFound = lazy(() => import("./pages/NotFound"))
const LoginPage = lazy(() => import("./pages/auth/login"))
const SignupPage = lazy(() => import("./pages/auth/signup"))
const ForgotPasswordPage = lazy(() => import("./pages/auth/forgot-password"))
const ResetPasswordPage = lazy(() => import("./pages/auth/reset-password"))
const ProfilePage = lazy(() => import("./pages/profile"))
const OrderDetail = lazy(() => import("./pages/OrderDetail"))
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"))
const OrderTracking = lazy(() => import("./pages/OrderTracking"))
const Orders = lazy(() => import("./pages/Orders"))

// Builder.io pages
const BuilderPage = lazy(() => import("./pages/BuilderPage"))
const BuilderExample = lazy(() => import("./pages/BuilderExample"))

// Policy pages
const ContactUs = lazy(() => import("./pages/ContactUs"))
const ShippingPolicy = lazy(() => import("./pages/ShippingPolicy"))
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"))
const CancellationsRefunds = lazy(() => import("./pages/CancellationsRefunds"))
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"))

// Add the webhook test page to the import
const WebhookTest = lazy(() => import("./pages/WebhookTest"))

// Puck CMS pages
const PuckEditor = lazy(() => import("./pages/PuckEditor"))
const PuckRenderer = lazy(() => import("./pages/PuckRenderer"))
const PagesManager = lazy(() => import("./pages/PagesManager"))
const PluginsManager = lazy(() => import("./pages/PluginsManager"))
const ThemeManager = lazy(() => import("./pages/ThemeManager"))
const Forbidden = lazy(() => import("./pages/Forbidden"))

// Import Builder.io initialization
import "@/lib/builder"

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />
  }

  return <>{children}</>
}

// Loading fallback for lazy-loaded components
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}

// Scroll restoration component to ensure pages start at the top when navigating
// Also tracks page views for Google Analytics and handles UTM parameters
function ScrollToTop() {
  const { pathname } = useLocation();
  // Initialize UTM parameter tracking
  useUtmParams();
  
  useEffect(() => {
    // Scroll to top of page
    window.scrollTo(0, 0);
    
    // Get UTM parameters for analytics
    const utmParams = getUtmParamsForAnalytics();
    
    // Track page view in Google Analytics with UTM data
    trackPageView(pathname, document.title);
  }, [pathname]);
  
  return null;
}

export function Routes() {
  return (
    <BrowserRouter>
      <MetaPixelRouterTracker />
      <DynamicThemeProvider>
      <PluginProvider>
        <TooltipProvider>
          <Sonner />
          {(() => {
            const isEmbed = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('embed') === '1';
            return (
              <div className="flex flex-col min-h-screen">
                {!isEmbed && <Navbar />}
                {isEmbed && <EmbedBridge />}
                <main className="flex-grow">
                  <Suspense fallback={<PageLoader />}>
                    <ScrollToTop />
                    <RouterRoutes>
                      <Route path="/" element={<PuckHome />} />

                      <Route path="/shop" element={<Shop />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/bestsellers" element={<Bestsellers />} />
                      <Route path="/new-arrivals" element={<NewArrivals />} />
                      <Route path="/about" element={<About />} />
                      
                      {/* Policy Pages */}
                      <Route path="/contact-us" element={<ContactUs />} />
                      <Route path="/shipping-policy" element={<ShippingPolicy />} />
                      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                      <Route path="/cancellations-refunds" element={<CancellationsRefunds />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      
                      <Route
                        path="/checkout"
                        element={<Checkout />}
                      />
                      <Route
                        path="/order-confirmation/:orderId"
                        element={<OrderConfirmation />}
                      />
                      <Route
                        path="/track-order"
                        element={<OrderTracking />}
                      />
                      <Route
                        path="/orders"
                        element={
                          <PrivateRoute>
                            <Orders />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/orders/:orderId"
                        element={
                          <PrivateRoute>
                            <OrderDetail />
                          </PrivateRoute>
                        }
                      />
                      <Route path="/auth/login" element={<LoginPage />} />
                      <Route path="/auth/signup" element={<SignupPage />} />
                      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
                      <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
                      <Route
                        path="/profile"
                        element={
                          <PrivateRoute>
                            <ProfilePage />
                          </PrivateRoute>
                        }
                      />
                      <Route path="/webhook-test" element={<WebhookTest />} />
                      
                      {/* Puck CMS routes */}
                      <Route path="/page/:slug" element={<PuckRenderer />} />
                      <Route path="/admin" element={<AdminRoute />}>
                        <Route path="pages" element={<PagesManager />} />
                        <Route path="pages/:pageId/edit" element={<PuckEditor />} />
                        <Route path="plugins" element={<PluginsManager />} />
                        <Route path="themes" element={<ThemeManager />} />
                      </Route>
                      <Route path="/403" element={<Forbidden />} />
                      
                      {/* Builder.io routes */}
                      <Route path="/builder/*" element={<BuilderPage />} />
                      <Route path="/builder-preview/:path*" element={<BuilderPage />} />
                      <Route path="/builder-example" element={<BuilderExample />} />

                      {/* Fallback */}
                      <Route path="*" element={<NotFound />} />
                    </RouterRoutes>
                  </Suspense>
                </main>
                {!isEmbed && <Footer />}
              </div>
            )
          })()}
        </TooltipProvider>
      </PluginProvider>
      </DynamicThemeProvider>
    </BrowserRouter>
  )
}