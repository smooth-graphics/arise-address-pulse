# API Mode Configuration Guide

This document explains how to switch between **Mock API Mode** and **Real API Mode** in the application.

## Table of Contents
1. [Overview](#overview)
2. [Enabling Real API Mode](#enabling-real-api-mode)
3. [Disabling Real API Mode (Using Mocks)](#disabling-real-api-mode-using-mocks)
4. [Granular Feature Control](#granular-feature-control)
5. [Environment Variables](#environment-variables)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## Overview

The application supports two modes of operation:

### **Mock API Mode** (Default for Development)
- Uses local mock data
- No backend required
- Instant responses
- Perfect for frontend development and testing
- No API costs

### **Real API Mode** (Production)
- Connects to actual backend API at `https://genietalapi.projectgenietalmetaverse.org`
- Requires valid authentication tokens
- Real data persistence
- Network latency applies

---

## Enabling Real API Mode

### Method 1: Environment Variable (Recommended)

Create or update your `.env` file in the project root:

```env
VITE_USE_REAL_API=true
VITE_API_BASE_URL=https://genietalapi.projectgenietalmetaverse.org
```

Then restart your development server:

```bash
npm run dev
```

### Method 2: Update Feature Configuration File

Edit `src/config/features.ts`:

```typescript
export const FEATURES = {
  USE_REAL_API: true, // Change from false to true
  // ... rest of config
} as const;
```

**Note**: This method is already enabled by default in your project.

---

## Disabling Real API Mode (Using Mocks)

To switch back to mock mode for testing:

### Method 1: Environment Variable

Update your `.env` file:

```env
VITE_USE_REAL_API=false
```

Then restart your development server:

```bash
npm run dev
```

### Method 2: Update Feature Configuration

Edit `src/config/features.ts`:

```typescript
export const FEATURES = {
  USE_REAL_API: false, // Change from true to false
  // ... rest of config
} as const;
```

---

## Granular Feature Control

You can enable/disable real API calls for specific features while keeping others in mock mode:

### Environment Variables

```env
# Global toggle (overrides individual flags)
VITE_USE_REAL_API=false

# Individual feature flags (only work when USE_REAL_API=false)
VITE_REAL_AUTH=true              # Use real authentication API
VITE_REAL_WALLET=false           # Use mock wallet data
VITE_REAL_VERIFICATION=true      # Use real verification API
VITE_REAL_NOTIFICATIONS=false    # Use mock notifications

# Real-time features (WebSocket)
VITE_REAL_TIME_NOTIFICATIONS=false
VITE_REAL_TIME_WALLET=false
```

### Configuration File

Edit `src/config/features.ts`:

```typescript
export const FEATURES = {
  USE_REAL_API: false,  // Global toggle
  
  // Individual toggles
  REAL_AUTH: true,                    // ✅ Real auth
  REAL_WALLET: false,                 // ❌ Mock wallet
  REAL_VERIFICATION: true,            // ✅ Real verification
  REAL_NOTIFICATIONS: false,          // ❌ Mock notifications
  
  // Real-time features
  REAL_TIME_NOTIFICATIONS: false,
  REAL_TIME_WALLET: false,
} as const;
```

**How it works:**
- If `USE_REAL_API=true`: All features use real API
- If `USE_REAL_API=false`: Each feature uses its individual flag

---

## Environment Variables

### Complete List

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `https://genietalapi.projectgenietalmetaverse.org` |
| `VITE_USE_REAL_API` | Enable/disable real API globally | `true` |
| `VITE_REAL_AUTH` | Enable real authentication API | `false` |
| `VITE_REAL_WALLET` | Enable real wallet API | `false` |
| `VITE_REAL_VERIFICATION` | Enable real verification API | `false` |
| `VITE_REAL_NOTIFICATIONS` | Enable real notification API | `false` |
| `VITE_REAL_TIME_NOTIFICATIONS` | Enable WebSocket notifications | `false` |
| `VITE_REAL_TIME_WALLET` | Enable WebSocket wallet updates | `false` |

### Example `.env` Files

#### Production Configuration
```env
VITE_API_BASE_URL=https://genietalapi.projectgenietalmetaverse.org
VITE_USE_REAL_API=true
VITE_REAL_AUTH=true
VITE_REAL_WALLET=true
VITE_REAL_VERIFICATION=true
VITE_REAL_NOTIFICATIONS=true
VITE_REAL_TIME_NOTIFICATIONS=true
VITE_REAL_TIME_WALLET=true
```

#### Development Configuration (All Mocks)
```env
VITE_API_BASE_URL=https://genietalapi.projectgenietalmetaverse.org
VITE_USE_REAL_API=false
```

#### Hybrid Configuration (Real Auth, Mock Everything Else)
```env
VITE_API_BASE_URL=https://genietalapi.projectgenietalmetaverse.org
VITE_USE_REAL_API=false
VITE_REAL_AUTH=true
```

---

## Testing

### Testing Real API Mode

1. **Enable real API mode**:
   ```env
   VITE_USE_REAL_API=true
   ```

2. **Test authentication flow**:
   - Sign up with a new account
   - Verify email/OTP
   - Log in
   - Check that JWT tokens are stored in localStorage

3. **Test API endpoints**:
   - Open browser DevTools > Network tab
   - Filter by "Fetch/XHR"
   - Perform actions (verify address, check wallet, etc.)
   - Verify requests go to `https://genietalapi.projectgenietalmetaverse.org`

4. **Check authentication headers**:
   - Inspect any API request in Network tab
   - Look for `Authorization: Bearer <token>` header

### Testing Mock Mode

1. **Disable real API mode**:
   ```env
   VITE_USE_REAL_API=false
   ```

2. **Verify mock data**:
   - All operations should work instantly
   - No network requests to backend
   - Data resets on page refresh

---

## Troubleshooting

### Issue: Changes Not Applied

**Problem**: Changed environment variables but seeing old behavior.

**Solution**:
1. Stop the development server (`Ctrl+C`)
2. Clear cache: `rm -rf node_modules/.vite`
3. Restart: `npm run dev`

### Issue: 401 Unauthorized Errors

**Problem**: Getting authentication errors with real API.

**Solutions**:
1. Check if `auth_token` exists in localStorage (DevTools > Application > Local Storage)
2. Try logging out and logging in again
3. Verify the token hasn't expired
4. Check that `VITE_API_BASE_URL` is correct

### Issue: CORS Errors

**Problem**: Browser blocks requests to API.

**Solution**:
1. Contact backend team to add your domain to CORS whitelist
2. For development, ensure `http://localhost:5173` is whitelisted
3. Check that API returns proper CORS headers:
   ```
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH
   Access-Control-Allow-Headers: Content-Type, Authorization
   ```

### Issue: Network Timeout

**Problem**: Requests timing out.

**Solutions**:
1. Check internet connection
2. Verify API base URL is correct
3. Increase timeout in `src/config/api.ts`:
   ```typescript
   export const API_CONFIG = {
     TIMEOUT: 60000, // Increase from 30000 to 60000
   }
   ```

### Issue: Mixed Mode Behavior

**Problem**: Some features use real API, others use mocks unexpectedly.

**Solutions**:
1. Check `src/config/features.ts` - verify global toggle
2. If `USE_REAL_API=true`, all features should use real API
3. If `USE_REAL_API=false`, check individual feature flags
4. Clear cache and restart dev server

### Issue: Real API Returns Unexpected Format

**Problem**: API responses don't match expected format.

**Solution**:
The API should return responses in this format:
```json
{
  "success": true,
  "data": {
    // actual data here
  },
  "message": "Optional message"
}
```

If your API uses a different format, update `src/config/api.ts`:
```typescript
export const handleApiResponse = <T,>(response: AxiosResponse<YourApiFormat<T>>): T => {
  // Adjust based on your API's response structure
  if (response.data.success) {
    return response.data.data;
  }
  throw new Error(response.data.message || "API request failed");
};
```

---

## Quick Reference

### Enable Real API
```bash
# Create/update .env
echo "VITE_USE_REAL_API=true" > .env

# Restart dev server
npm run dev
```

### Disable Real API
```bash
# Create/update .env
echo "VITE_USE_REAL_API=false" > .env

# Restart dev server
npm run dev
```

### Check Current Mode
```javascript
// Open browser console and run:
console.log('Real API Mode:', import.meta.env.VITE_USE_REAL_API === 'true');
```

---

## Additional Resources

- [API Integration Documentation](../API_INTEGRATION.md) - Complete API endpoint reference
- [Backend API Documentation](https://genietalapi.projectgenietalmetaverse.org/docs) - Backend API specs
- [Environment Variables Guide](https://vitejs.dev/guide/env-and-mode.html) - Vite env vars documentation

---

**Last Updated**: 2025-01-XX
**Version**: 1.0.0
