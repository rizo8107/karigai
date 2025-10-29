
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** karigai
- **Date:** 2025-10-29
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001
- **Test Name:** Product Listing Load and Display
- **Test Code:** [TC001_Product_Listing_Load_and_Display.py](./TC001_Product_Listing_Load_and_Display.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/d1bf3db5-5191-4b7e-839f-dc7573ab7dee/bb4caa79-7e47-492b-b555-31d5e5847aa9
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002
- **Test Name:** Product Detail Page Display and Reviews
- **Test Code:** [TC002_Product_Detail_Page_Display_and_Reviews.py](./TC002_Product_Detail_Page_Display_and_Reviews.py)
- **Test Error:** Product detail page loaded with complete product information including name, description, price, and images. However, the user reviews section or tab is missing or not functional, preventing verification of user reviews display or no reviews message. This is a website issue that needs to be addressed.
Browser Console Logs:
[WARNING] Route path "/builder-preview/:path*" will be treated as if it were "/builder-preview/:path/*" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "/builder-preview/:path/*". (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:213:48)
[ERROR] Failed to load resource: the server responded with a status of 401 () (at https://cdn.builder.io/api/v3/query/bpk-95be79e29e1741cea04a96e53b5ace10/home-hero?omit=meta.componentsUsed&apiKey=bpk-95be79e29e1741cea04a96e53b5ace10&noTraverse=false&userAttributes=%7B%22urlPath%22%3A%22%2F%22%2C%22host%22%3A%22localhost%3A8080%22%2C%22device%22%3A%22desktop%22%7D&cachebust=true&options.home-hero.model=%22home-hero%22:0:0)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Failed to load resource: the server responded with a status of 401 () (at https://cdn.builder.io/api/v3/query/bpk-95be79e29e1741cea04a96e53b5ace10/home-features?omit=meta.componentsUsed&apiKey=bpk-95be79e29e1741cea04a96e53b5ace10&noTraverse=false&userAttributes=%7B%22urlPath%22%3A%22%2F%22%2C%22host%22%3A%22localhost%3A8080%22%2C%22device%22%3A%22desktop%22%7D&cachebust=true&options.home-features.model=%22home-features%22:0:0)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] Route path "/builder-preview/:path*" will be treated as if it were "/builder-preview/:path/*" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "/builder-preview/:path/*". (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:213:48)
[WARNING] Route path "/builder-preview/:path*" will be treated as if it were "/builder-preview/:path/*" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "/builder-preview/:path/*". (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:213:48)
[ERROR] Warning: Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.%s 

Check the render method of `ProductDetail`.  
    at button
    at ProductDetail (http://localhost:8080/src/pages/ProductDetail.tsx:37:20)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/product/u3w6blwo17tn26z:0:0)
[WARNING] The resource https://backend-pocketbase.p3ibd8.easypanel.host/api/files/products/u3w6blwo17tn26z/img_20250802_183524_rczoxkd3r0.jpg?thumb=600x0&format=webp&quality=80&v=2-medium-webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/product/u3w6blwo17tn26z:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/product/u3w6blwo17tn26z:0:0)
[WARNING] The resource https://backend-pocketbase.p3ibd8.easypanel.host/api/files/products/u3w6blwo17tn26z/img_20250802_183524_rczoxkd3r0.jpg?thumb=600x0&format=webp&quality=80&v=2-medium-webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/product/u3w6blwo17tn26z:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/product/u3w6blwo17tn26z:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/d1bf3db5-5191-4b7e-839f-dc7573ab7dee/6026da10-af76-4899-88ba-39349e081d59
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003
- **Test Name:** Add Products to Cart and Manage Quantities
- **Test Code:** [TC003_Add_Products_to_Cart_and_Manage_Quantities.py](./TC003_Add_Products_to_Cart_and_Manage_Quantities.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/d1bf3db5-5191-4b7e-839f-dc7573ab7dee/cfad5058-6cc3-4b70-9481-7e8bdf7a03f2
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004
- **Test Name:** Checkout Flow with Razorpay Integration - Successful Payment
- **Test Code:** [TC004_Checkout_Flow_with_Razorpay_Integration___Successful_Payment.py](./TC004_Checkout_Flow_with_Razorpay_Integration___Successful_Payment.py)
- **Test Error:** The checkout flow test was not fully successful. While items were added to the cart and the checkout page was reached, the form validation errors on the ZIP Code and coupon code fields prevented completion of the purchase. Attempts to input valid ZIP Code failed due to element restrictions, and the payment process through Razorpay could not be initiated or verified. The test ended back on the homepage without order creation or payment confirmation. Further investigation or fixes in the checkout form are needed to enable full end-to-end testing of the Razorpay payment flow.
Browser Console Logs:
[WARNING] Route path "/builder-preview/:path*" will be treated as if it were "/builder-preview/:path/*" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "/builder-preview/:path/*". (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:213:48)
[ERROR] Failed to load resource: the server responded with a status of 401 () (at https://cdn.builder.io/api/v3/query/bpk-95be79e29e1741cea04a96e53b5ace10/home-hero?omit=meta.componentsUsed&apiKey=bpk-95be79e29e1741cea04a96e53b5ace10&noTraverse=false&userAttributes=%7B%22urlPath%22%3A%22%2F%22%2C%22host%22%3A%22localhost%3A8080%22%2C%22device%22%3A%22desktop%22%7D&cachebust=true&options.home-hero.model=%22home-hero%22:0:0)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Failed to load resource: the server responded with a status of 401 () (at https://cdn.builder.io/api/v3/query/bpk-95be79e29e1741cea04a96e53b5ace10/home-features?omit=meta.componentsUsed&apiKey=bpk-95be79e29e1741cea04a96e53b5ace10&noTraverse=false&userAttributes=%7B%22urlPath%22%3A%22%2F%22%2C%22host%22%3A%22localhost%3A8080%22%2C%22device%22%3A%22desktop%22%7D&cachebust=true&options.home-features.model=%22home-features%22:0:0)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/d1bf3db5-5191-4b7e-839f-dc7573ab7dee/a007258e-c176-4356-9a80-4c3121e48f8b
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005
- **Test Name:** Checkout Flow - Payment Failure and Error Handling
- **Test Code:** [TC005_Checkout_Flow___Payment_Failure_and_Error_Handling.py](./TC005_Checkout_Flow___Payment_Failure_and_Error_Handling.py)
- **Test Error:** Tested Razorpay payment failure and cancellation handling. Payment cancellation simulation succeeded but no explicit error message was displayed to the user. Attempted to verify no order was created after cancellation but login to orders page failed due to disabled login button. Reporting login issue and stopping further testing.
Browser Console Logs:
[WARNING] Route path "/builder-preview/:path*" will be treated as if it were "/builder-preview/:path/*" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "/builder-preview/:path/*". (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:213:48)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Failed to load resource: the server responded with a status of 401 () (at https://cdn.builder.io/api/v3/query/bpk-95be79e29e1741cea04a96e53b5ace10/home-hero?omit=meta.componentsUsed&apiKey=bpk-95be79e29e1741cea04a96e53b5ace10&noTraverse=false&userAttributes=%7B%22urlPath%22%3A%22%2F%22%2C%22host%22%3A%22localhost%3A8080%22%2C%22device%22%3A%22desktop%22%7D&cachebust=true&options.home-hero.model=%22home-hero%22:0:0)
[ERROR] Failed to load resource: the server responded with a status of 401 () (at https://cdn.builder.io/api/v3/query/bpk-95be79e29e1741cea04a96e53b5ace10/home-features?omit=meta.componentsUsed&apiKey=bpk-95be79e29e1741cea04a96e53b5ace10&noTraverse=false&userAttributes=%7B%22urlPath%22%3A%22%2F%22%2C%22host%22%3A%22localhost%3A8080%22%2C%22device%22%3A%22desktop%22%7D&cachebust=true&options.home-features.model=%22home-features%22:0:0)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] Route path "/builder-preview/:path*" will be treated as if it were "/builder-preview/:path/*" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "/builder-preview/:path/*". (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:213:48)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/d1bf3db5-5191-4b7e-839f-dc7573ab7dee/2badc82b-7414-4750-afbe-621c854e31b9
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006
- **Test Name:** User Profile Personal Info Update
- **Test Code:** [TC006_User_Profile_Personal_Info_Update.py](./TC006_User_Profile_Personal_Info_Update.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/d1bf3db5-5191-4b7e-839f-dc7573ab7dee/a7889f86-9b18-4411-9b63-d105634b21e1
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007
- **Test Name:** User Address Book Management
- **Test Code:** [TC007_User_Address_Book_Management.py](./TC007_User_Address_Book_Management.py)
- **Test Error:** The task to verify user can add, edit, and delete addresses in the address book section could not be completed. Multiple attempts to log in with valid credentials failed due to the 'Sign In with Email' button being disabled and invalid credential errors. Attempts to create a new account or reset the password were unsuccessful in enabling login. The issue of the disabled sign-in button has been reported. Therefore, access to the address book section was not possible, and the add, edit, and delete address functionalities could not be tested.
Browser Console Logs:
[WARNING] Route path "/builder-preview/:path*" will be treated as if it were "/builder-preview/:path/*" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "/builder-preview/:path/*". (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:213:48)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Failed to load resource: the server responded with a status of 401 () (at https://cdn.builder.io/api/v3/query/bpk-95be79e29e1741cea04a96e53b5ace10/home-hero?omit=meta.componentsUsed&apiKey=bpk-95be79e29e1741cea04a96e53b5ace10&noTraverse=false&userAttributes=%7B%22urlPath%22%3A%22%2F%22%2C%22host%22%3A%22localhost%3A8080%22%2C%22device%22%3A%22desktop%22%7D&cachebust=true&options.home-hero.model=%22home-hero%22:0:0)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Failed to load resource: the server responded with a status of 401 () (at https://cdn.builder.io/api/v3/query/bpk-95be79e29e1741cea04a96e53b5ace10/home-features?omit=meta.componentsUsed&apiKey=bpk-95be79e29e1741cea04a96e53b5ace10&noTraverse=false&userAttributes=%7B%22urlPath%22%3A%22%2F%22%2C%22host%22%3A%22localhost%3A8080%22%2C%22device%22%3A%22desktop%22%7D&cachebust=true&options.home-features.model=%22home-features%22:0:0)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://backend-pocketbase.p3ibd8.easypanel.host/api/collections/users/auth-with-password:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/d1bf3db5-5191-4b7e-839f-dc7573ab7dee/ac1e1d1b-7764-4079-b0e7-ff59ddb99256
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008
- **Test Name:** Order History Display and Details
- **Test Code:** [TC008_Order_History_Display_and_Details.py](./TC008_Order_History_Display_and_Details.py)
- **Test Error:** The task to ensure user can view order list and detailed order information including invoices and tracking links cannot be completed due to inability to access order history or user account page after login or account creation. Website navigation to these pages is broken or missing. Reporting this issue and stopping further actions.
Browser Console Logs:
[WARNING] Route path "/builder-preview/:path*" will be treated as if it were "/builder-preview/:path/*" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "/builder-preview/:path/*". (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:213:48)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Failed to load resource: the server responded with a status of 401 () (at https://cdn.builder.io/api/v3/query/bpk-95be79e29e1741cea04a96e53b5ace10/home-hero?omit=meta.componentsUsed&apiKey=bpk-95be79e29e1741cea04a96e53b5ace10&noTraverse=false&userAttributes=%7B%22urlPath%22%3A%22%2F%22%2C%22host%22%3A%22localhost%3A8080%22%2C%22device%22%3A%22desktop%22%7D&cachebust=true&options.home-hero.model=%22home-hero%22:0:0)
[ERROR] Failed to load resource: the server responded with a status of 401 () (at https://cdn.builder.io/api/v3/query/bpk-95be79e29e1741cea04a96e53b5ace10/home-features?omit=meta.componentsUsed&apiKey=bpk-95be79e29e1741cea04a96e53b5ace10&noTraverse=false&userAttributes=%7B%22urlPath%22%3A%22%2F%22%2C%22host%22%3A%22localhost%3A8080%22%2C%22device%22%3A%22desktop%22%7D&cachebust=true&options.home-features.model=%22home-features%22:0:0)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://backend-pocketbase.p3ibd8.easypanel.host/api/collections/users/auth-with-password:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/forgot-password:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/forgot-password:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/d1bf3db5-5191-4b7e-839f-dc7573ab7dee/1dd54215-b753-4cf9-a1fd-1a64c35f329f
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009
- **Test Name:** Order Tracking Interface Functionality
- **Test Code:** [TC009_Order_Tracking_Interface_Functionality.py](./TC009_Order_Tracking_Interface_Functionality.py)
- **Test Error:** The task to validate that the order tracking page shows current order status updates correctly could not be fully completed. The user successfully logged in, created an account, navigated to the order tracking page, added a product to the cart, and proceeded to checkout. However, the payment process did not complete successfully, preventing order creation. Without an order, it was not possible to verify shipment status and tracking updates dynamically for delivered, in transit, and cancelled orders. The payment modal remained open without confirmation of payment completion, indicating a website issue that blocks further testing. Task ended with failure due to this payment issue.
Browser Console Logs:
[WARNING] Route path "/builder-preview/:path*" will be treated as if it were "/builder-preview/:path/*" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "/builder-preview/:path/*". (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:213:48)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Failed to load resource: the server responded with a status of 401 () (at https://cdn.builder.io/api/v3/query/bpk-95be79e29e1741cea04a96e53b5ace10/home-hero?omit=meta.componentsUsed&apiKey=bpk-95be79e29e1741cea04a96e53b5ace10&noTraverse=false&userAttributes=%7B%22urlPath%22%3A%22%2F%22%2C%22host%22%3A%22localhost%3A8080%22%2C%22device%22%3A%22desktop%22%7D&cachebust=true&options.home-hero.model=%22home-hero%22:0:0)
[ERROR] Failed to load resource: the server responded with a status of 401 () (at https://cdn.builder.io/api/v3/query/bpk-95be79e29e1741cea04a96e53b5ace10/home-features?omit=meta.componentsUsed&apiKey=bpk-95be79e29e1741cea04a96e53b5ace10&noTraverse=false&userAttributes=%7B%22urlPath%22%3A%22%2F%22%2C%22host%22%3A%22localhost%3A8080%22%2C%22device%22%3A%22desktop%22%7D&cachebust=true&options.home-features.model=%22home-features%22:0:0)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://backend-pocketbase.p3ibd8.easypanel.host/api/collections/users/auth-with-password:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/forgot-password:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/d1bf3db5-5191-4b7e-839f-dc7573ab7dee/6b196bc5-cf30-4501-b435-be0abf1a3827
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010
- **Test Name:** Security Settings Update and Validation
- **Test Code:** [TC010_Security_Settings_Update_and_Validation.py](./TC010_Security_Settings_Update_and_Validation.py)
- **Test Error:** The task to verify user can update password, enable two-factor authentication, and confirm changes take effect securely could not be completed. Multiple login attempts with original and reset passwords failed, preventing access to the user profile and security settings. Password reset process was initiated and retried, but login remained unsuccessful. Therefore, password update and two-factor authentication enabling could not be verified.
Browser Console Logs:
[WARNING] Route path "/builder-preview/:path*" will be treated as if it were "/builder-preview/:path/*" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "/builder-preview/:path/*". (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:213:48)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Failed to load resource: the server responded with a status of 401 () (at https://cdn.builder.io/api/v3/query/bpk-95be79e29e1741cea04a96e53b5ace10/home-hero?omit=meta.componentsUsed&apiKey=bpk-95be79e29e1741cea04a96e53b5ace10&noTraverse=false&userAttributes=%7B%22urlPath%22%3A%22%2F%22%2C%22host%22%3A%22localhost%3A8080%22%2C%22device%22%3A%22desktop%22%7D&cachebust=true&options.home-hero.model=%22home-hero%22:0:0)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Failed to load resource: the server responded with a status of 401 () (at https://cdn.builder.io/api/v3/query/bpk-95be79e29e1741cea04a96e53b5ace10/home-features?omit=meta.componentsUsed&apiKey=bpk-95be79e29e1741cea04a96e53b5ace10&noTraverse=false&userAttributes=%7B%22urlPath%22%3A%22%2F%22%2C%22host%22%3A%22localhost%3A8080%22%2C%22device%22%3A%22desktop%22%7D&cachebust=true&options.home-features.model=%22home-features%22:0:0)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://backend-pocketbase.p3ibd8.easypanel.host/api/collections/users/auth-with-password:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://backend-pocketbase.p3ibd8.easypanel.host/api/collections/users/auth-with-password:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/d1bf3db5-5191-4b7e-839f-dc7573ab7dee/08f79a1a-f942-4a6c-beb9-7afe552951c8
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC011
- **Test Name:** Dynamic Homepage Content Update via PocketBase
- **Test Code:** [TC011_Dynamic_Homepage_Content_Update_via_PocketBase.py](./TC011_Dynamic_Homepage_Content_Update_via_PocketBase.py)
- **Test Error:** The task to test that admin updates to homepage content via PocketBase reflect correctly on user homepage with caching handled properly could not be completed because valid admin login credentials were not available. Without successful admin login, it was not possible to update homepage content or verify that the changes appear correctly on the user homepage or that caching is handled properly. Please provide valid admin credentials to proceed with this test.
Browser Console Logs:
[WARNING] Route path "/builder-preview/:path*" will be treated as if it were "/builder-preview/:path/*" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "/builder-preview/:path/*". (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:213:48)
[ERROR] Failed to load resource: the server responded with a status of 401 () (at https://cdn.builder.io/api/v3/query/bpk-95be79e29e1741cea04a96e53b5ace10/home-hero?omit=meta.componentsUsed&apiKey=bpk-95be79e29e1741cea04a96e53b5ace10&noTraverse=false&userAttributes=%7B%22urlPath%22%3A%22%2F%22%2C%22host%22%3A%22localhost%3A8080%22%2C%22device%22%3A%22desktop%22%7D&cachebust=true&options.home-hero.model=%22home-hero%22:0:0)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Failed to load resource: the server responded with a status of 401 () (at https://cdn.builder.io/api/v3/query/bpk-95be79e29e1741cea04a96e53b5ace10/home-features?omit=meta.componentsUsed&apiKey=bpk-95be79e29e1741cea04a96e53b5ace10&noTraverse=false&userAttributes=%7B%22urlPath%22%3A%22%2F%22%2C%22host%22%3A%22localhost%3A8080%22%2C%22device%22%3A%22desktop%22%7D&cachebust=true&options.home-features.model=%22home-features%22:0:0)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://backend-pocketbase.p3ibd8.easypanel.host/api/collections/users/auth-with-password:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/auth/login:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/d1bf3db5-5191-4b7e-839f-dc7573ab7dee/8e641a1c-b610-45e6-948e-d012038bf3b7
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC012
- **Test Name:** SPA Navigation and Routing Responsiveness
- **Test Code:** [TC012_SPA_Navigation_and_Routing_Responsiveness.py](./TC012_SPA_Navigation_and_Routing_Responsiveness.py)
- **Test Error:** Testing SPA navigation routes and menu responsiveness completed. SPA navigation works correctly on desktop sizes with instant view loading and URL updates. However, the responsive navigation menu toggle on tablet and mobile sizes is unresponsive, blocking further responsiveness testing. Please fix this issue to enable full testing.
Browser Console Logs:
[WARNING] Route path "/builder-preview/:path*" will be treated as if it were "/builder-preview/:path/*" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "/builder-preview/:path/*". (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:213:48)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Failed to load resource: the server responded with a status of 401 () (at https://cdn.builder.io/api/v3/query/bpk-95be79e29e1741cea04a96e53b5ace10/home-hero?omit=meta.componentsUsed&apiKey=bpk-95be79e29e1741cea04a96e53b5ace10&noTraverse=false&userAttributes=%7B%22urlPath%22%3A%22%2F%22%2C%22host%22%3A%22localhost%3A8080%22%2C%22device%22%3A%22desktop%22%7D&cachebust=true&options.home-hero.model=%22home-hero%22:0:0)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Failed to load resource: the server responded with a status of 401 () (at https://cdn.builder.io/api/v3/query/bpk-95be79e29e1741cea04a96e53b5ace10/home-features?omit=meta.componentsUsed&apiKey=bpk-95be79e29e1741cea04a96e53b5ace10&noTraverse=false&userAttributes=%7B%22urlPath%22%3A%22%2F%22%2C%22host%22%3A%22localhost%3A8080%22%2C%22device%22%3A%22desktop%22%7D&cachebust=true&options.home-features.model=%22home-features%22:0:0)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] Route path "/builder-preview/:path*" will be treated as if it were "/builder-preview/:path/*" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "/builder-preview/:path/*". (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:213:48)
[WARNING] Route path "/builder-preview/:path*" will be treated as if it were "/builder-preview/:path/*" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "/builder-preview/:path/*". (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:213:48)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/shop:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/shop:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/shop:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/shop:0:0)
[WARNING] Route path "/builder-preview/:path*" will be treated as if it were "/builder-preview/:path/*" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "/builder-preview/:path/*". (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:213:48)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/d1bf3db5-5191-4b7e-839f-dc7573ab7dee/47078c96-9e12-4f79-abf9-889c0577bb54
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC013
- **Test Name:** Analytics Data Capture and Accuracy
- **Test Code:** [TC013_Analytics_Data_Capture_and_Accuracy.py](./TC013_Analytics_Data_Capture_and_Accuracy.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/d1bf3db5-5191-4b7e-839f-dc7573ab7dee/d488e99e-4e26-45bc-b1b5-4fc21f30417b
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC014
- **Test Name:** Local Express Server API Proxy Functionality
- **Test Code:** [TC014_Local_Express_Server_API_Proxy_Functionality.py](./TC014_Local_Express_Server_API_Proxy_Functionality.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/d1bf3db5-5191-4b7e-839f-dc7573ab7dee/e985bfa5-6a2a-442b-902a-f22164614985
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC015
- **Test Name:** UI Components Rendering Consistency
- **Test Code:** [TC015_UI_Components_Rendering_Consistency.py](./TC015_UI_Components_Rendering_Consistency.py)
- **Test Error:** The reusable UI components such as carousel, calendar, and toast notifications were not found on the accessible pages of the website. Therefore, the verification of these components could not be completed. Images are present but no explicit image optimizer component was identified. Task is stopped due to missing components.
Browser Console Logs:
[WARNING] Route path "/builder-preview/:path*" will be treated as if it were "/builder-preview/:path/*" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "/builder-preview/:path/*". (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:213:48)
[ERROR] Failed to load resource: the server responded with a status of 401 () (at https://cdn.builder.io/api/v3/query/bpk-95be79e29e1741cea04a96e53b5ace10/home-hero?omit=meta.componentsUsed&apiKey=bpk-95be79e29e1741cea04a96e53b5ace10&noTraverse=false&userAttributes=%7B%22urlPath%22%3A%22%2F%22%2C%22host%22%3A%22localhost%3A8080%22%2C%22device%22%3A%22desktop%22%7D&cachebust=true&options.home-hero.model=%22home-hero%22:0:0)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Failed to load resource: the server responded with a status of 401 () (at https://cdn.builder.io/api/v3/query/bpk-95be79e29e1741cea04a96e53b5ace10/home-features?omit=meta.componentsUsed&apiKey=bpk-95be79e29e1741cea04a96e53b5ace10&noTraverse=false&userAttributes=%7B%22urlPath%22%3A%22%2F%22%2C%22host%22%3A%22localhost%3A8080%22%2C%22device%22%3A%22desktop%22%7D&cachebust=true&options.home-features.model=%22home-features%22:0:0)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[ERROR] Warning: Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s data-lov-id 
    at Index (http://localhost:8080/src/pages/Index.tsx:121:41)
    at RenderedRoute (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4069:5)
    at Routes (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4508:5)
    at Suspense
    at main
    at div
    at Provider (http://localhost:8080/node_modules/.vite/deps/chunk-7J3LZCRP.js?v=510a3c22:38:15)
    at TooltipProvider (http://localhost:8080/node_modules/.vite/deps/@radix-ui_react-tooltip.js?v=7125b590:62:5)
    at Router (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:4451:15)
    at BrowserRouter (http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:5196:5)
    at Routes
    at CartProvider (http://localhost:8080/src/contexts/CartContext.tsx:21:32)
    at AuthProvider (http://localhost:8080/src/contexts/AuthContext.tsx:14:32)
    at DynamicThemeProvider (http://localhost:8080/src/contexts/ThemeContext.tsx:27:44)
    at ThemeProvider (http://localhost:8080/src/components/theme-provider.tsx:17:33)
    at App (at http://localhost:8080/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=3e65a35f:63:37)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/:0:0)
[WARNING] Route path "/builder-preview/:path*" will be treated as if it were "/builder-preview/:path/*" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "/builder-preview/:path/*". (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:213:48)
[WARNING] Route path "/builder-preview/:path*" will be treated as if it were "/builder-preview/:path/*" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "/builder-preview/:path/*". (at http://localhost:8080/node_modules/.vite/deps/react-router-dom.js?v=9226a782:213:48)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/shop:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/shop:0:0)
[WARNING] The resource http://localhost:8080/images/shop-hero.webp was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally. (at http://localhost:8080/shop:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/d1bf3db5-5191-4b7e-839f-dc7573ab7dee/80cc1119-59d5-4229-9067-133f09e66bae
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **33.33** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---