# OpenPanel Analytics Integration Guide

## Overview
OpenPanel has been integrated into your Karigai e-commerce application to provide comprehensive analytics tracking alongside your existing Google Tag Manager and Facebook Pixel implementations.

## Features Tracked

### 📊 Core Analytics
- **Page Views**: All page navigation
- **User Authentication**: Login and signup events
- **User Identification**: Profile tracking with email

### 🛒 E-commerce Tracking
- **Product Views**: When users view product details
- **Add to Cart**: When products are added to cart
- **Remove from Cart**: When products are removed
- **Begin Checkout**: When checkout process starts
- **Purchase**: Complete purchase with transaction details

### 📝 Form Tracking
- **Form Start**: When users begin filling forms
- **Form Complete**: Successful form submissions
- **Form Error**: Form validation errors

### 💳 Payment Tracking
- **Payment Start**: When payment process begins
- **Payment Success**: Successful payment completion
- **Payment Failure**: Failed payment attempts

### 🖱️ Interaction Tracking
- **Button Clicks**: All button interactions
- **Outgoing Links**: External link clicks (auto-tracked)
- **Screen Views**: Page transitions (auto-tracked)

## Setup Instructions

### 1. Self-Hosted OpenPanel Setup

#### For Self-Hosted Instance:

1. **Deploy OpenPanel** (if not already done)
   - Follow [OpenPanel Self-Hosting Guide](https://docs.openpanel.dev/docs/self-hosting)
   - Or use Docker: `docker-compose up -d`
   - Note your instance URL (e.g., `https://openpanel.yourdomain.com`)

2. **Create Project in Your Instance**
   - Access your OpenPanel dashboard
   - Create a new project
   - Navigate to Settings → API Keys
   - Copy your:
     - **Client ID** (required)
     - **Client Secret** (optional, for server-side events)

#### For Cloud Hosted (Alternative):

1. Go to [OpenPanel Cloud](https://openpanel.dev)
2. Sign up or log in to your account
3. Create a new project or select an existing one
4. Navigate to Settings → API Keys
5. Copy your Client ID and Client Secret

### 2. Configure Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

#### For Self-Hosted OpenPanel:

```bash
# OpenPanel Configuration (Self-Hosted)
VITE_OPENPANEL_CLIENT_ID=your_client_id_here
VITE_OPENPANEL_CLIENT_SECRET=your_client_secret_here  # Optional
VITE_OPENPANEL_API_URL=https://openpanel.yourdomain.com  # Your self-hosted instance URL
```

**Important for Self-Hosted:**
- Replace `https://openpanel.yourdomain.com` with your actual OpenPanel instance URL
- Include the full URL with protocol (http:// or https://)
- If using Docker locally: `http://localhost:3000`
- If behind a proxy: Use your proxy URL

#### For Cloud Hosted:

```bash
# OpenPanel Configuration (Cloud)
VITE_OPENPANEL_CLIENT_ID=your_client_id_here
VITE_OPENPANEL_CLIENT_SECRET=your_client_secret_here  # Optional
VITE_OPENPANEL_API_URL=https://api.openpanel.dev
```

### 3. Restart Development Server

```bash
npm run dev
```

## How It Works

### Automatic Tracking

OpenPanel automatically tracks:
- ✅ **Page Views**: Enabled via `trackScreenViews: true`
- ✅ **Outgoing Links**: Enabled via `trackOutgoingLinks: true`  
- ✅ **HTML Attributes**: Use `data-track="event_name"` on elements

Example:
```html
<button data-track="cta_clicked" data-track-properties='{"location":"header"}'>
  Click Me
</button>
```

### Manual Tracking

All tracking functions in `src/lib/analytics.ts` now send events to:
1. **Google Tag Manager** (existing)
2. **Facebook Pixel** (existing)
3. **OpenPanel** (new)

Example usage:
```typescript
import { trackProductView, trackAddToCart } from '@/lib/analytics';

// Track product view
trackProductView({
  item_id: 'product_123',
  item_name: 'Product Name',
  price: 499,
  item_category: 'Category'
});

// Track add to cart
await trackAddToCart({
  item_id: 'product_123',
  item_name: 'Product Name',
  price: 499,
  quantity: 1,
  item_category: 'Category'
});
```

## Integration Points

### Pages with OpenPanel Tracking

1. **Homepage** (`src/pages/Index.tsx`)
   - Page views
   - Product impressions
   - Button clicks

2. **Product Detail** (`src/pages/ProductDetail.tsx`)
   - Product views
   - Add to cart
   - Button clicks

3. **Cart** (`src/pages/Cart.tsx`)
   - Cart views
   - Remove from cart
   - Begin checkout

4. **Checkout** (`src/pages/Checkout.tsx`)
   - Checkout steps
   - Form interactions
   - Payment initiation

5. **Order Confirmation** (`src/pages/OrderConfirmation.tsx`)
   - Purchase completion
   - Payment success/failure

6. **Authentication** (`src/pages/Login.tsx`, `src/pages/Signup.tsx`)
   - Login events
   - Signup events
   - User identification

## Viewing Analytics

### OpenPanel Dashboard

1. Log in to [OpenPanel Dashboard](https://dashboard.openpanel.dev)
2. Select your project
3. View real-time and historical analytics:
   - **Overview**: Key metrics at a glance
   - **Events**: All tracked events
   - **Users**: User profiles and journeys
   - **Funnels**: Conversion funnels
   - **Retention**: User retention analysis
   - **Real-time**: Live user activity

### Event Explorer

Navigate to **Events** to see all tracked events:
- Filter by event name
- View event properties
- Analyze event trends
- Export data

## Testing

### Verify Integration

1. Open your application in browser
2. Open browser console (F12)
3. Navigate through your site
4. Look for OpenPanel logs (if debug mode is enabled)
5. Check OpenPanel Dashboard for real-time events

### Test Events

```typescript
// Test from browser console
import { op } from '@/lib/openpanel';

op.track('test_event', {
  test_property: 'test_value'
});
```

## Troubleshooting

### Events Not Appearing

1. **Check Environment Variables**
   ```bash
   echo $VITE_OPENPANEL_CLIENT_ID
   ```

2. **Verify OpenPanel is Enabled**
   - Ensure `VITE_OPENPANEL_CLIENT_ID` is set
   - Plugin auto-disables if Client ID is missing

3. **Check Network Tab**
   - Open DevTools → Network
   - Filter by "openpanel"
   - Verify requests are being sent

4. **Console Errors**
   - Check browser console for errors
   - Look for OpenPanel-related messages

### Common Issues

**Issue**: Events tracked multiple times
- **Solution**: OpenPanel SDK handles deduplication automatically

**Issue**: User not identified
- **Solution**: Ensure `identify()` is called with email on login/signup

**Issue**: Events missing properties
- **Solution**: Verify all required properties are passed to tracking functions

### Self-Hosted Specific Issues

**Issue**: Connection refused / Network error
- **Solution**: 
  - Verify your OpenPanel instance is running
  - Check API URL is correct (including protocol)
  - Ensure CORS is configured in your OpenPanel instance
  - Check firewall/network settings

**Issue**: 401 Unauthorized
- **Solution**:
  - Verify Client ID is correct
  - Check project exists in your instance
  - Verify API keys are active

**Issue**: Events not appearing in dashboard
- **Solution**:
  - Check OpenPanel logs: `docker logs openpanel-api`
  - Verify database connection in OpenPanel
  - Check event ingestion queue
  - Look for errors in OpenPanel admin panel

**Issue**: CORS errors in browser console
- **Solution**:
  - Add your domain to allowed origins in OpenPanel config
  - Update OpenPanel `.env`:
    ```bash
    CORS_ORIGINS=http://localhost:8080,https://yourdomain.com
    ```
  - Restart OpenPanel: `docker-compose restart`

## Best Practices

### 1. Event Naming
Use consistent, descriptive event names:
- ✅ `product_viewed`
- ✅ `checkout_started`
- ❌ `click`
- ❌ `event1`

### 2. Property Standards
Include standard e-commerce properties:
```typescript
{
  product_id: string,
  product_name: string,
  price: number,
  currency: 'INR',
  quantity: number
}
```

### 3. User Identification
Identify users as soon as possible:
```typescript
op.identify({
  profileId: userId,
  email: userEmail
});
```

### 4. Testing
- Test in development before deploying
- Verify events in OpenPanel dashboard
- Check data accuracy

## Data Privacy

### GDPR Compliance
- OpenPanel is GDPR compliant
- User data can be deleted on request
- Configure data retention in OpenPanel settings

### User Consent
Implement consent management:
```typescript
if (userConsent.analytics) {
  trackPageView(pageTitle, pagePath);
}
```

## Advanced Configuration

### Self-Hosted Instance Configuration

#### Basic Setup
```typescript
const op = new OpenPanel({
  clientId: 'YOUR_CLIENT_ID',
  apiUrl: 'https://your-openpanel-instance.com'
});
```

#### With Authentication
```typescript
const op = new OpenPanel({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',  // For server-side events
  apiUrl: 'https://your-openpanel-instance.com'
});
```

#### Multiple Environments
```typescript
// .env.development
VITE_OPENPANEL_API_URL=http://localhost:3000

// .env.staging  
VITE_OPENPANEL_API_URL=https://openpanel-staging.yourdomain.com

// .env.production
VITE_OPENPANEL_API_URL=https://openpanel.yourdomain.com
```

### Filtering Events
```typescript
const op = new OpenPanel({
  clientId: 'YOUR_CLIENT_ID',
  apiUrl: 'https://your-openpanel-instance.com',
  filter: (event) => {
    // Return false to block event
    if (event.name === 'test_event') return false;
    return true;
  }
});
```

### Disabling in Development
```typescript
const op = new OpenPanel({
  clientId: 'YOUR_CLIENT_ID',
  apiUrl: 'https://your-openpanel-instance.com',
  disabled: import.meta.env.DEV  // Disable in development
});
```

### Docker Compose Example for Self-Hosted

```yaml
version: '3.8'

services:
  openpanel:
    image: openpanel/openpanel:latest
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:password@postgres:5432/openpanel
      - CORS_ORIGINS=http://localhost:8080,https://yourdomain.com
      - JWT_SECRET=your-secret-key
    depends_on:
      - postgres
  
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=openpanel
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Support

- **OpenPanel Documentation**: https://docs.openpanel.dev
- **API Reference**: https://docs.openpanel.dev/api
- **Discord Community**: https://discord.gg/openpanel
- **GitHub**: https://github.com/Openpanel-dev/openpanel

## Migration Notes

### From Google Analytics
- OpenPanel provides similar e-commerce tracking
- Event structure is compatible
- User identification works similarly

### From Mixpanel
- Event tracking API is similar
- Profile properties map directly
- Funnel analysis available

## Summary

✅ **Installed**: `@openpanel/web` package  
✅ **Configured**: `src/lib/openpanel.ts`  
✅ **Integrated**: All tracking functions in `src/lib/analytics.ts`  
✅ **Environment**: `.env.example` template created  
✅ **Features**: Page views, e-commerce, forms, payments, buttons  
✅ **Auto-tracking**: Screen views, outgoing links, HTML attributes  

Your application now sends comprehensive analytics to:
1. **Google Tag Manager** → Google Analytics, Google Ads
2. **Facebook Pixel** → Facebook Ads, Facebook CAPI  
3. **OpenPanel** → OpenPanel Dashboard

All tracking happens simultaneously with a single function call!
