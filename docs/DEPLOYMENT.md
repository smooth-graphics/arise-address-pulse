# Deployment Guide

## Building and Deploying with Docker

### Production Build

```bash
# Build the Docker image
docker build -t genietal-app .

# Run the container
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop the container
docker-compose down
```

### Environment Variables

The application supports the following environment variables:

- `VITE_API_BASE_URL`: API endpoint (use `/api` for nginx proxy in production)
- `VITE_USE_REAL_API`: Enable real API calls (true/false)
- `VITE_REAL_AUTH`: Enable real authentication (true/false)
- `VITE_REAL_WALLET`: Enable real wallet features (true/false)
- `VITE_REAL_VERIFICATION`: Enable real verification features (true/false)
- `VITE_REAL_NOTIFICATIONS`: Enable real notifications (true/false)

### Nginx Reverse Proxy Configuration

The application uses Nginx as a reverse proxy to handle API requests:

- **Frontend**: Served from `http://localhost:3000/`
- **API Proxy**: `http://localhost:3000/api/*` → `https://genietalapi.projectgenietalmetaverse.org/*`

This configuration eliminates CORS issues by making API calls appear as same-origin requests to the browser.

### How the Proxy Works

1. **Development Mode** (without Docker):
   - Frontend makes requests to: `https://genietalapi.projectgenietalmetaverse.org/api/v1/auth/login`
   - Direct connection to backend API
   - CORS must be enabled on backend for development domains

2. **Production Mode** (with Docker/Nginx):
   - Frontend makes requests to: `/api/api/v1/auth/login`
   - Nginx intercepts and proxies to: `https://genietalapi.projectgenietalmetaverse.org/api/v1/auth/login`
   - **No CORS issues** - browser sees same-origin request
   - CSP header allows direct API calls as backup

### Testing the Deployment

1. **Check nginx is running:**
   ```bash
   docker-compose ps
   ```

2. **Test the API proxy:**
   ```bash
   curl http://localhost:3000/api/v1/user/hello
   ```

3. **Check application logs:**
   ```bash
   docker-compose logs -f app
   ```

4. **Check nginx logs:**
   ```bash
   # API access logs
   docker exec -it $(docker-compose ps -q app) cat /var/log/nginx/api_access.log
   
   # API error logs
   docker exec -it $(docker-compose ps -q app) cat /var/log/nginx/api_error.log
   ```

5. **Open in browser:**
   ```
   http://localhost:3000
   ```

### Building for Different Environments

#### Production Build
```bash
docker build \
  --build-arg VITE_API_BASE_URL=/api \
  --build-arg VITE_USE_REAL_API=true \
  -t genietal-app:production .
```

#### Staging Build
```bash
docker build \
  --build-arg VITE_API_BASE_URL=https://staging-api.example.com \
  --build-arg VITE_USE_REAL_API=true \
  -t genietal-app:staging .
```

### Troubleshooting

#### Network Errors
- **Check nginx logs:**
  ```bash
  docker-compose logs -f app
  ```
- **Verify API proxy is working:**
  ```bash
  curl -v http://localhost:3000/api/v1/user/hello
  ```
- **Check backend API is accessible:**
  ```bash
  curl -v https://genietalapi.projectgenietalmetaverse.org/api/v1/user/hello
  ```

#### CORS Errors
- Verify CSP header in `nginx.conf` includes your API domain
- Check if backend is returning proper CORS headers
- Review browser console for specific CSP violations

#### Build Failures
- Ensure all environment variables are set correctly
- Check Node.js and npm versions match requirements
- Verify all dependencies are installed: `npm ci`
- Clear Docker cache: `docker builder prune -a`

#### Container Won't Start
- Check port 3000 is not already in use: `lsof -i :3000`
- Verify Docker daemon is running: `docker ps`
- Check container logs: `docker-compose logs app`

### Production Deployment Checklist

- [ ] Environment variables configured
- [ ] Backend API is accessible from production server
- [ ] Backend has CORS headers for production domain
- [ ] SSL/HTTPS certificates configured (if applicable)
- [ ] Docker and docker-compose installed on server
- [ ] Firewall rules allow port 3000 (or custom port)
- [ ] Monitoring and logging set up
- [ ] Backup strategy in place
- [ ] CI/CD pipeline configured (optional)

### Performance Optimization

1. **Enable Gzip Compression** (already configured in nginx.conf)
2. **Cache Static Assets** (already configured in nginx.conf)
3. **Add CDN** for static assets (optional)
4. **Enable HTTP/2** in nginx configuration
5. **Add Redis caching** for API responses (backend)

### Security Best Practices

1. **Keep dependencies updated:**
   ```bash
   npm audit
   npm audit fix
   ```

2. **Use secrets management:**
   - Never commit `.env` files to git
   - Use environment-specific configuration
   - Rotate API keys regularly

3. **Enable HTTPS:**
   - Use Let's Encrypt for free SSL certificates
   - Configure SSL in nginx
   - Redirect HTTP to HTTPS

4. **Monitor logs regularly:**
   - Set up log aggregation (e.g., ELK stack)
   - Configure alerts for errors
   - Review security logs

### Scaling

For high-traffic scenarios:

1. **Horizontal Scaling:**
   ```bash
   docker-compose up -d --scale app=3
   ```

2. **Load Balancer:**
   - Add nginx load balancer in front of app containers
   - Use Docker Swarm or Kubernetes for orchestration

3. **Database Optimization:**
   - Add read replicas
   - Implement caching layer
   - Optimize queries

### Support

For issues or questions:
- Check the [troubleshooting section](#troubleshooting)
- Review nginx error logs
- Contact backend team for API issues
- Check Docker documentation for container issues
