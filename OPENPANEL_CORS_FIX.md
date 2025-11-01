# OpenPanel CORS Configuration Fix

## Problem
```
Access to fetch at 'http://web-openpanel-1c2cef-157-180-36-139.traefik.me/track' 
from origin 'http://localhost:8080' has been blocked by CORS policy
```

## Solution

### Option 1: Docker Compose (Recommended)

1. **Edit your OpenPanel docker-compose.yml or .env file:**

```bash
# SSH into your OpenPanel server
ssh user@your-server

# Navigate to OpenPanel directory
cd /path/to/openpanel

# Edit .env file
nano .env
```

2. **Add/Update CORS_ORIGINS:**

```bash
# Add your frontend URLs (comma-separated, no spaces)
CORS_ORIGINS=http://localhost:8080,http://web-openpanel-1c2cef-157-180-36-139.traefik.me

# For production, add your production domain too
CORS_ORIGINS=http://localhost:8080,https://yourdomain.com,https://www.yourdomain.com
```

3. **Restart OpenPanel:**

```bash
docker-compose restart

# Or if using Docker directly
docker restart openpanel-api
```

### Option 2: Environment Variables

If using environment variables directly:

```bash
# Set environment variable
export CORS_ORIGINS="http://localhost:8080,http://web-openpanel-1c2cef-157-180-36-139.traefik.me"

# Restart service
systemctl restart openpanel
```

### Option 3: Traefik Configuration

Since you're using Traefik, you might need to configure CORS headers there:

**traefik.yml or docker-compose.yml:**

```yaml
http:
  middlewares:
    cors-headers:
      headers:
        accessControlAllowOriginList:
          - "http://localhost:8080"
          - "https://yourdomain.com"
        accessControlAllowMethods:
          - "GET"
          - "POST"
          - "PUT"
          - "DELETE"
          - "OPTIONS"
        accessControlAllowHeaders:
          - "Content-Type"
          - "Authorization"
        accessControlMaxAge: 3600
        addVaryHeader: true

  routers:
    openpanel:
      middlewares:
        - cors-headers
```

## Quick Test After Configuration

1. **Verify CORS headers:**

```bash
curl -I -X OPTIONS \
  -H "Origin: http://localhost:8080" \
  -H "Access-Control-Request-Method: POST" \
  http://web-openpanel-1c2cef-157-180-36-139.traefik.me/track
```

Should return:
```
Access-Control-Allow-Origin: http://localhost:8080
Access-Control-Allow-Methods: POST, OPTIONS
```

2. **Restart your frontend:**

```bash
npm run dev
```

3. **Check browser console** - CORS errors should be gone

## Development Workaround (Temporary)

If you can't modify OpenPanel server immediately, use a proxy:

### Add Vite Proxy Configuration:

**vite.config.ts:**

```typescript
export default defineConfig({
  server: {
    proxy: {
      '/openpanel': {
        target: 'http://web-openpanel-1c2cef-157-180-36-139.traefik.me',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/openpanel/, ''),
      },
    },
  },
});
```

**Update your .env:**

```bash
# Use local proxy instead of direct URL
VITE_OPENPANEL_API_URL=http://localhost:8080/openpanel
```

This routes OpenPanel requests through your Vite dev server, bypassing CORS.

## Production Checklist

- [ ] CORS_ORIGINS includes all production domains
- [ ] Both http and https variants included if needed
- [ ] No trailing slashes in URLs
- [ ] Wildcard (*) avoided for security
- [ ] CORS headers configured in reverse proxy (if applicable)

## Complete Example

**OpenPanel .env:**
```bash
NODE_ENV=production
CORS_ORIGINS=http://localhost:8080,http://localhost:3000,https://karigai.com,https://www.karigai.com
DATABASE_URL=postgresql://user:password@postgres:5432/openpanel
JWT_SECRET=your-secret-key
```

**Your frontend .env:**
```bash
VITE_OPENPANEL_CLIENT_ID=your_client_id
VITE_OPENPANEL_API_URL=http://web-openpanel-1c2cef-157-180-36-139.traefik.me
```

After configuration, OpenPanel will accept requests from your specified origins! 🎉
