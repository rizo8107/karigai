# Self-Hosted OpenPanel Quick Start Guide

## Prerequisites

- Self-hosted OpenPanel instance running
- OpenPanel dashboard accessible
- Client ID from your OpenPanel project

## Quick Setup (5 Minutes)

### 1. Get Your OpenPanel Details

Access your self-hosted OpenPanel dashboard and note:

```
OpenPanel URL: https://your-openpanel-instance.com
Client ID: (from Settings → API Keys)
Client Secret: (optional, from Settings → API Keys)
```

### 2. Configure Environment

Create or update `.env` file in your project root:

```bash
# OpenPanel Self-Hosted Configuration
VITE_OPENPANEL_CLIENT_ID=your_client_id_from_dashboard
VITE_OPENPANEL_CLIENT_SECRET=your_client_secret  # Optional
VITE_OPENPANEL_API_URL=https://your-openpanel-instance.com
```

**Replace:**
- `your_client_id_from_dashboard` → Your actual Client ID
- `https://your-openpanel-instance.com` → Your OpenPanel URL

**Examples:**
```bash
# Local Docker instance
VITE_OPENPANEL_API_URL=http://localhost:3000

# Production instance
VITE_OPENPANEL_API_URL=https://analytics.mycompany.com

# Staging instance
VITE_OPENPANEL_API_URL=https://openpanel-staging.mycompany.com
```

### 3. Configure CORS in Your OpenPanel Instance

In your OpenPanel instance, update the `.env` file:

```bash
# Add your frontend URLs
CORS_ORIGINS=http://localhost:8080,https://yourdomain.com
```

Then restart:
```bash
docker-compose restart
# or
docker restart openpanel-api
```

### 4. Restart Your Application

```bash
npm run dev
```

### 5. Verify Integration

Open browser console and look for:
```
[OpenPanel] Initialized with: {
  apiUrl: "https://your-openpanel-instance.com",
  clientId: "✓ Set",
  disabled: false
}
```

Navigate your site and check OpenPanel dashboard for events!

## Testing Checklist

- [ ] Console shows OpenPanel initialized with your API URL
- [ ] No CORS errors in browser console
- [ ] Network tab shows requests to your OpenPanel instance
- [ ] Events appear in OpenPanel dashboard within seconds
- [ ] Page views are tracked
- [ ] User interactions are captured

## Common Issues & Quick Fixes

### ❌ "Connection Refused"
```bash
# Check if OpenPanel is running
docker ps | grep openpanel

# Check logs
docker logs openpanel-api
```

### ❌ "CORS Error"
```bash
# Update OpenPanel .env
CORS_ORIGINS=http://localhost:8080,https://yourdomain.com

# Restart
docker-compose restart
```

### ❌ "401 Unauthorized"
- Verify Client ID is correct
- Check project exists in OpenPanel
- Ensure API key is active

### ❌ Events Not Appearing
```bash
# Check OpenPanel API logs
docker logs -f openpanel-api

# Check database connection
docker logs -f openpanel-postgres

# Verify event queue
# Access OpenPanel admin → System Health
```

## Production Deployment

### Security Checklist

- [ ] Use HTTPS for OpenPanel instance
- [ ] Set strong JWT_SECRET in OpenPanel
- [ ] Enable authentication/authorization
- [ ] Configure firewall rules
- [ ] Set up backup for PostgreSQL
- [ ] Monitor OpenPanel logs
- [ ] Set up alerts for errors

### Environment Variables for Production

```bash
# Production .env
VITE_OPENPANEL_CLIENT_ID=prod_client_id
VITE_OPENPANEL_CLIENT_SECRET=prod_client_secret
VITE_OPENPANEL_API_URL=https://analytics.yourdomain.com
```

### Docker Production Setup

```yaml
version: '3.8'

services:
  openpanel:
    image: openpanel/openpanel:latest
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@postgres:5432/openpanel
      - CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
      - JWT_SECRET=${JWT_SECRET}
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    networks:
      - openpanel-network
  
  postgres:
    image: postgres:15
    restart: always
    environment:
      - POSTGRES_DB=openpanel
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - openpanel-network
  
  redis:
    image: redis:7-alpine
    restart: always
    networks:
      - openpanel-network

  # Optional: Nginx reverse proxy
  nginx:
    image: nginx:alpine
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - openpanel
    networks:
      - openpanel-network

volumes:
  postgres_data:

networks:
  openpanel-network:
    driver: bridge
```

## Monitoring & Maintenance

### Health Check

```bash
# Check if OpenPanel is responding
curl https://your-openpanel-instance.com/health

# Check API version
curl https://your-openpanel-instance.com/api/version
```

### Logs

```bash
# View real-time logs
docker logs -f openpanel-api

# View last 100 lines
docker logs --tail 100 openpanel-api

# Save logs to file
docker logs openpanel-api > openpanel.log 2>&1
```

### Database Backup

```bash
# Backup PostgreSQL
docker exec openpanel-postgres pg_dump -U user openpanel > backup.sql

# Restore
docker exec -i openpanel-postgres psql -U user openpanel < backup.sql
```

### Performance Tuning

```yaml
# Increase resources in docker-compose.yml
services:
  openpanel:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '1'
          memory: 1G
```

## Next Steps

1. ✅ Configure custom events for your specific business needs
2. ✅ Set up funnels in OpenPanel dashboard
3. ✅ Create retention cohorts
4. ✅ Set up alerts for key metrics
5. ✅ Integrate with your CI/CD pipeline
6. ✅ Train team on OpenPanel dashboard

## Support & Resources

- **Self-Hosting Docs**: https://docs.openpanel.dev/docs/self-hosting
- **GitHub**: https://github.com/Openpanel-dev/openpanel
- **Discord**: https://discord.gg/openpanel
- **Issues**: https://github.com/Openpanel-dev/openpanel/issues

## Complete Example

Here's your complete setup:

```bash
# 1. Your .env file
VITE_OPENPANEL_CLIENT_ID=abc123xyz
VITE_OPENPANEL_API_URL=https://analytics.mycompany.com

# 2. OpenPanel .env
CORS_ORIGINS=https://mycompany.com,https://www.mycompany.com,http://localhost:8080
DATABASE_URL=postgresql://openpanel:secure_password@postgres:5432/openpanel
JWT_SECRET=your_super_secret_key_here
```

That's it! Your self-hosted OpenPanel is now tracking all your application analytics. 🎉
