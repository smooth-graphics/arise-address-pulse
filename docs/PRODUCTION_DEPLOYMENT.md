# Production Deployment Guide

## Overview

This guide covers deploying the frontend to:
- **Vercel** (with custom domain support)
- **Custom Domain** (projectgenietalmetaverse.org) using Docker + Nginx

## Backend URLs to Provide to Backend Team

### CORS Configuration Required

The Java backend team must whitelist these origins in their CORS configuration:

**Development URLs:**
- `http://localhost:5173`
- `http://localhost:4173`

**Production URLs:**
- `https://projectgenietalmetaverse.org`
- `https://www.projectgenietalmetaverse.org`
- `https://your-project.vercel.app` (replace with actual Vercel URL)
- `https://*.vercel.app` (for Vercel preview deployments)

### Java Backend CORS Configuration

Share this Spring Boot configuration with your backend team:

```java
// CorsConfig.java
package com.genietal.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins(
                        // Development
                        "http://localhost:5173",
                        "http://localhost:4173",
                        
                        // Production
                        "https://projectgenietalmetaverse.org",
                        "https://www.projectgenietalmetaverse.org",
                        
                        // Vercel - Update with your actual URL
                        "https://your-project.vercel.app"
                    )
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                    .allowedHeaders("*")
                    .allowCredentials(true)
                    .maxAge(3600);
            }
        };
    }
}
```

**Alternative: Using application.yml**

```yaml
# application.yml
spring:
  web:
    cors:
      allowed-origins:
        - http://localhost:5173
        - http://localhost:4173
        - https://projectgenietalmetaverse.org
        - https://www.projectgenietalmetaverse.org
        - https://your-project.vercel.app
      allowed-methods:
        - GET
        - POST
        - PUT
        - DELETE
        - OPTIONS
        - PATCH
      allowed-headers: "*"
      allow-credentials: true
      max-age: 3600
```

---

## 1. Vercel Deployment

### Prerequisites
- Vercel account
- GitHub repository connected to Vercel
- Updated `vercel.json` (already configured)

### Environment Variables

Set these in Vercel Dashboard (Settings → Environment Variables):

```env
# Production Environment Variables
VITE_JAVA_API_BASE_URL=/api/java
VITE_NEXTJS_API_BASE_URL=/api/nextjs
VITE_NEXTJS_WS_URL=wss://your-project.vercel.app/api/nextjs
VITE_USE_REAL_API=true
NODE_ENV=production
```

**Important:** Replace `your-project.vercel.app` with your actual Vercel domain.

### Deployment Steps

#### Option 1: Automatic Deployment (Recommended)

1. **Connect GitHub Repository:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure project settings

2. **Configure Build Settings:**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm ci`

3. **Add Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add all variables from above

4. **Deploy:**
   - Vercel automatically deploys on every push to main branch
   - Preview deployments for pull requests

#### Option 2: Manual Deployment via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Or deploy to preview
vercel
```

### Custom Domain on Vercel

1. Go to Project Settings → Domains
2. Add your custom domain: `projectgenietalmetaverse.org`
3. Update DNS records as shown in Vercel dashboard
4. Vercel automatically provisions SSL certificate

### Update Environment Variables for Custom Domain

Once custom domain is configured, update:

```env
VITE_NEXTJS_WS_URL=wss://projectgenietalmetaverse.org/api/nextjs
```

---

## 2. Custom Domain Deployment (Docker + Nginx)

### Prerequisites
- Linux server with Docker and Docker Compose installed
- Domain DNS pointing to server IP
- SSL certificate (Let's Encrypt recommended)

### Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose -y

# Verify installation
docker --version
docker-compose --version
```

### Environment Configuration

Create `.env.production` on the server:

```env
# Production API Configuration
VITE_JAVA_API_BASE_URL=/api/java
VITE_NEXTJS_API_BASE_URL=/api/nextjs
VITE_NEXTJS_WS_URL=wss://projectgenietalmetaverse.org/api/nextjs
VITE_API_BASE_URL=/api
VITE_USE_REAL_API=true
NODE_ENV=production
```

### Build and Deploy

```bash
# Clone repository
git clone https://github.com/your-repo/genietal-frontend.git
cd genietal-frontend

# Copy production environment
cp .env.production .env

# Build Docker image
docker build -t genietal-frontend:latest .

# Start with Docker Compose
docker-compose up -d

# Verify container is running
docker-compose ps

# Check logs
docker-compose logs -f app
```

### SSL Certificate Setup (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Stop nginx temporarily
docker-compose down

# Get SSL certificate
sudo certbot certonly --standalone \
  -d projectgenietalmetaverse.org \
  -d www.projectgenietalmetaverse.org \
  --email your-email@example.com \
  --agree-tos

# Certificates will be saved to:
# /etc/letsencrypt/live/projectgenietalmetaverse.org/fullchain.pem
# /etc/letsencrypt/live/projectgenietalmetaverse.org/privkey.pem

# Update nginx.conf to use SSL (see SSL section below)

# Restart containers
docker-compose up -d
```

### Update nginx.conf for SSL

Add to `nginx.conf`:

```nginx
server {
    listen 80;
    server_name projectgenietalmetaverse.org www.projectgenietalmetaverse.org;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name projectgenietalmetaverse.org www.projectgenietalmetaverse.org;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/projectgenietalmetaverse.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/projectgenietalmetaverse.org/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # ... rest of existing nginx configuration
}
```

### Auto-Renewal for SSL

```bash
# Test renewal
sudo certbot renew --dry-run

# Setup cron job for auto-renewal
sudo crontab -e

# Add this line (runs twice daily)
0 0,12 * * * certbot renew --quiet --post-hook "docker-compose restart app"
```

---

## 3. DNS Configuration

### For Vercel Deployment

Vercel will provide DNS records. Typically:

```
Type: A
Name: @
Value: 76.76.21.21 (Vercel's IP)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### For Custom Server Deployment

```
Type: A
Name: @
Value: YOUR_SERVER_IP

Type: A
Name: www
Value: YOUR_SERVER_IP
```

---

## 4. Testing Checklist

### Vercel Deployment Tests

- [ ] Visit `https://your-project.vercel.app`
- [ ] Test signup flow at `/auth/signup`
- [ ] Test login flow at `/auth/login`
- [ ] Verify API calls go through `/api/java` proxy
- [ ] Check browser Network tab for successful API responses
- [ ] Verify no CORS errors in console
- [ ] Test password reset flow
- [ ] Test OTP verification
- [ ] Test protected routes redirect to login

### Custom Domain Deployment Tests

- [ ] Visit `https://projectgenietalmetaverse.org`
- [ ] Verify SSL certificate is valid (green padlock)
- [ ] Test all authentication flows
- [ ] Test verification services
- [ ] Test dashboard access
- [ ] Test responsive design on mobile
- [ ] Check page load speed
- [ ] Verify static assets load correctly
- [ ] Test wallet features (when Next.js backend ready)
- [ ] Test notifications (when Next.js backend ready)

### Backend Integration Tests

```bash
# Test Java API proxy (from your local machine)
curl https://projectgenietalmetaverse.org/api/java/user/hello

# Expected response: Should not show CORS error
# Should return: {"message": "Hello from Java API"}

# Test with credentials
curl -X POST https://projectgenietalmetaverse.org/api/java/auth/public/onboard \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "1234567890",
    "password": "password123",
    "role": "individual"
  }'
```

---

## 5. Monitoring and Maintenance

### Vercel Monitoring

- **Analytics:** Available in Vercel Dashboard
- **Logs:** Real-time logs in Dashboard → Deployments → Logs
- **Alerts:** Configure in Project Settings → Notifications

### Docker/Nginx Monitoring

```bash
# View logs
docker-compose logs -f app

# View nginx access logs
docker exec -it $(docker-compose ps -q app) cat /var/log/nginx/access.log

# View nginx error logs
docker exec -it $(docker-compose ps -q app) cat /var/log/nginx/error.log

# Monitor container resources
docker stats

# Restart containers
docker-compose restart

# Update and redeploy
git pull
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

## 6. Troubleshooting

### CORS Errors Persist After Backend Update

**Problem:** Still seeing CORS errors after backend team updated configuration.

**Solutions:**
1. Clear browser cache and hard refresh (Ctrl+Shift+R)
2. Verify backend CORS configuration is deployed to production
3. Test backend directly:
   ```bash
   curl -I https://genietalapi.projectgenietalmetaverse.org/api/v1/auth/public/onboard
   ```
   Look for `Access-Control-Allow-Origin` header
4. Check if backend is behind a reverse proxy that strips CORS headers
5. Verify backend service restarted after configuration change

### Vercel Deployment Fails

**Problem:** Build fails on Vercel.

**Solutions:**
1. Check build logs in Vercel Dashboard
2. Verify all environment variables are set
3. Test build locally: `npm run build`
4. Check Node.js version matches Vercel (default: Node 18)
5. Clear Vercel build cache and redeploy

### Docker Container Won't Start

**Problem:** Container exits immediately or won't start.

**Solutions:**
```bash
# Check container logs
docker-compose logs app

# Check nginx configuration syntax
docker exec $(docker-compose ps -q app) nginx -t

# Rebuild without cache
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Check port availability
sudo lsof -i :80
sudo lsof -i :443
```

### 502 Bad Gateway Error

**Problem:** Nginx returns 502 error.

**Solutions:**
1. Check if backend services are running
2. Verify backend URLs in nginx.conf
3. Check network connectivity from server to backend:
   ```bash
   curl -I https://genietalapi.projectgenietalmetaverse.org/api/v1/user/hello
   ```
4. Check nginx error logs for specific error
5. Increase proxy timeout values in nginx.conf

### SSL Certificate Issues

**Problem:** SSL certificate expired or invalid.

**Solutions:**
```bash
# Check certificate expiration
sudo certbot certificates

# Manually renew
sudo certbot renew

# Force renewal
sudo certbot renew --force-renewal

# Restart nginx
docker-compose restart app
```

---

## 7. Performance Optimization

### Vercel
- Already optimized by default
- Enable Edge Network (automatic)
- Configure Image Optimization if using images

### Docker/Nginx
- Enable Gzip compression (already configured)
- Configure browser caching (already configured)
- Add CDN like Cloudflare in front
- Enable HTTP/2 (already configured in SSL setup)

### Application Level
- Code splitting (Vite handles automatically)
- Lazy load routes
- Optimize images
- Minify assets (Vite handles in production)

---

## 8. Security Best Practices

- [ ] Environment variables never committed to repository
- [ ] SSL/HTTPS enabled on all domains
- [ ] CORS configured on backend with specific origins
- [ ] CSP headers configured in nginx.conf
- [ ] Regular dependency updates: `npm audit fix`
- [ ] Regular security patches on server
- [ ] Firewall configured to only allow ports 80, 443, 22
- [ ] SSH key authentication only (disable password auth)
- [ ] Regular backups configured
- [ ] Monitor logs for suspicious activity

---

## 9. Rollback Procedure

### Vercel Rollback

1. Go to Vercel Dashboard → Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

### Docker Rollback

```bash
# Pull previous version from git
git log --oneline
git checkout <previous-commit-hash>

# Rebuild and deploy
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Or use tagged image
docker pull genietal-frontend:v1.0.0
docker tag genietal-frontend:v1.0.0 genietal-frontend:latest
docker-compose up -d
```

---

## 10. Support Contacts

### Backend Team
- **Java Backend:** Contact backend team for CORS configuration
- **Next.js Backend:** (Add contact when ready)

### DevOps/Infrastructure
- **Server Access:** (Add contact info)
- **DNS Management:** (Add contact info)

### Emergency Procedures
1. Check status of all services
2. Review error logs
3. Contact relevant team based on error type
4. Implement rollback if critical issue

---

## Summary

**For Vercel Deployment:**
- Configure environment variables in Vercel Dashboard
- Connect GitHub for automatic deployments
- Add custom domain in Vercel settings

**For Custom Domain (Docker):**
- Clone repository to server
- Configure `.env.production`
- Build and run with Docker Compose
- Setup SSL with Let's Encrypt
- Configure DNS to point to server

**Backend Requirements:**
- Java backend must whitelist frontend origins in CORS
- Next.js backend URL must be updated in vercel.json when available

**Testing:**
- Always test signup/login flows after deployment
- Verify no CORS errors in browser console
- Check API proxy is working correctly
