# API Integration Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Configuration Files](#configuration-files)
3. [Service Layer](#service-layer)
4. [React Query Hooks](#react-query-hooks)
5. [API Consumption Map](#api-consumption-map)
6. [Backend Requirements](#backend-requirements)
7. [Testing & Integration Guide](#testing--integration-guide)

---

## Architecture Overview

The project uses a **three-layer architecture** for API integration:

```
Components/Pages → React Query Hooks → Service Layer → Backend API
```

### Key Features:
- ✅ **Mock/Real API Toggle**: Switch between mock data and real API calls
- ✅ **Type Safety**: Full TypeScript interfaces for requests/responses
- ✅ **Error Handling**: Centralized error handling with toast notifications
- ✅ **Token Management**: Automatic JWT token refresh
- ✅ **Query Caching**: React Query for optimized data fetching

---

## Configuration Files

### 1. API Client Configuration
**File**: `src/config/api.ts`

#### Lines Requiring Backend Integration:

```typescript
// LINE 5: Set your backend API base URL
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  // ⚠️ BACKEND REQUIRED: Update this to your production API URL
  
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// LINES 21-32: Request Interceptor - Adds JWT token to all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // ⚠️ BACKEND REQUIRED: Your API must validate this JWT token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// LINES 43-66: Token Refresh Logic
if (error.response?.status === 401 && !originalRequest._retry) {
  originalRequest._retry = true;
  
  const refreshToken = localStorage.getItem('refresh_token');
  if (refreshToken) {
    try {
      const response = await axios.post(`${API_CONFIG.BASE_URL}/auth/refresh`, {
        refresh_token: refreshToken,
      });
      // ⚠️ BACKEND REQUIRED: Implement /auth/refresh endpoint
      // Expected response: { access_token: string }
      
      const { access_token } = response.data;
      localStorage.setItem('auth_token', access_token);
      
      originalRequest.headers.Authorization = `Bearer ${access_token}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      // Token refresh failed, redirect to login
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/auth/login';
      return Promise.reject(refreshError);
    }
  }
}
```

**Backend Requirements:**
- JWT token generation and validation
- Token refresh endpoint: `POST /auth/refresh`
- Token expiration handling (401 responses)

---

### 2. Feature Flags Configuration
**File**: `src/config/features.ts`

```typescript
// LINES 1-15: Feature Flags for API Integration
export const FEATURES = {
  // Set to true to use real API calls, false for mock data
  USE_REAL_API: import.meta.env.VITE_USE_REAL_API === 'true' || false,
  
  // Individual feature flags
  REAL_AUTH: import.meta.env.VITE_REAL_AUTH === 'true' || false,
  REAL_WALLET: import.meta.env.VITE_REAL_WALLET === 'true' || false,
  REAL_VERIFICATION: import.meta.env.VITE_REAL_VERIFICATION === 'true' || false,
  REAL_NOTIFICATIONS: import.meta.env.VITE_REAL_NOTIFICATIONS === 'true' || false,
  
  // WebSocket features
  REAL_TIME_NOTIFICATIONS: import.meta.env.VITE_REAL_TIME_NOTIFICATIONS === 'true' || false,
  REAL_TIME_WALLET: import.meta.env.VITE_REAL_TIME_WALLET === 'true' || false,
} as const;
```

**Environment Variables Needed:**
```env
VITE_API_BASE_URL=https://your-api.com/api
VITE_USE_REAL_API=true
VITE_REAL_AUTH=true
VITE_REAL_WALLET=true
VITE_REAL_VERIFICATION=true
VITE_REAL_NOTIFICATIONS=true
VITE_REAL_TIME_NOTIFICATIONS=true
VITE_REAL_TIME_WALLET=true
```

---

## Service Layer

### 1. Authentication Service
**File**: `src/services/authService.ts`

#### API Methods:

| Method | Endpoint | Lines | Description |
|--------|----------|-------|-------------|
| `login()` | `POST /auth/login` | 40-44 | User authentication |
| `signup()` | `POST /auth/signup` | 50-54 | User registration |
| `verifyOTP()` | `POST /auth/verify-otp` | 60-64 | OTP verification |
| `forgotPassword()` | `POST /auth/forgot-password` | 70-74 | Password reset request |
| `resetPassword()` | `POST /auth/reset-password` | 80-84 | Password reset with token |
| `refreshToken()` | `POST /auth/refresh` | 90-94 | JWT token refresh |
| `getCurrentUser()` | `GET /auth/me` | 99-101 | Get current user profile |
| `logout()` | `POST /auth/logout` | 106-110 | User logout |
| `updateProfile()` | `PATCH /auth/profile` | 116-120 | Update user profile |
| `changePassword()` | `POST /auth/change-password` | 126-130 | Change password |

#### Detailed Integration Points:

```typescript
// LINE 40-44: Login
async login(data: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<ApiResponse<LoginResponse>>('/auth/login', data);
  // ⚠️ BACKEND REQUIRED
  // Request: { email: string, password: string }
  // Response: { 
  //   user: User, 
  //   access_token: string, 
  //   refresh_token: string,
  //   requires_otp?: boolean 
  // }
  return handleApiResponse(response);
}

// LINE 50-54: Signup
async signup(data: SignupRequest): Promise<SignupResponse> {
  const response = await apiClient.post<ApiResponse<SignupResponse>>('/auth/signup', data);
  // ⚠️ BACKEND REQUIRED
  // Request: { 
  //   email: string, 
  //   password: string, 
  //   firstName: string, 
  //   lastName: string,
  //   phone?: string,
  //   organization?: string 
  // }
  // Response: { 
  //   user: User, 
  //   requires_verification: boolean,
  //   message?: string 
  // }
  return handleApiResponse(response);
}

// LINE 60-64: Verify OTP
async verifyOTP(data: VerifyOTPRequest): Promise<LoginResponse> {
  const response = await apiClient.post<ApiResponse<LoginResponse>>('/auth/verify-otp', data);
  // ⚠️ BACKEND REQUIRED
  // Request: { email: string, otp: string }
  // Response: { 
  //   user: User, 
  //   access_token: string, 
  //   refresh_token: string 
  // }
  return handleApiResponse(response);
}

// LINE 99-101: Get Current User
async getCurrentUser(): Promise<User> {
  const response = await apiClient.get<ApiResponse<User>>('/auth/me');
  // ⚠️ BACKEND REQUIRED
  // Headers: Authorization: Bearer {token}
  // Response: User object
  return handleApiResponse(response);
}
```

**Backend Requirements:**
- Email/password authentication
- JWT token generation (access + refresh tokens)
- OTP generation and validation
- Password hashing (bcrypt recommended)
- Email service for OTP delivery
- Session management

---

### 2. Verification Service
**File**: `src/services/verificationService.ts`

#### API Methods:

| Method | Endpoint | Lines | Description |
|--------|----------|-------|-------------|
| `verifyAddress()` | `POST /verifications/verify` | 34-38 | Single address verification |
| `getVerificationHistory()` | `GET /verifications` | 44-59 | Get verification history with pagination |
| `getVerification()` | `GET /verifications/:id` | 65-67 | Get single verification details |
| `bulkVerify()` | `POST /verifications/bulk` | 73-80 | Bulk verification upload |
| `getBulkVerifications()` | `GET /verifications/bulk` | 86-88 | Get bulk verification list |
| `getBulkVerificationStatus()` | `GET /verifications/bulk/:id` | 94-96 | Get bulk verification status |
| `updateVerificationStatus()` | `PATCH /verifications/:id/status` | 102-104 | Update verification status |
| `uploadAdditionalDocuments()` | `POST /verifications/:id/documents` | 110-120 | Upload additional documents |
| `downloadBulkResults()` | `GET /verifications/bulk/:id/download` | 126-133 | Download bulk results |
| `getVerificationStats()` | `GET /verifications/stats` | 139-141 | Get verification statistics |

#### Detailed Integration Points:

```typescript
// LINE 34-38: Single Address Verification
async verifyAddress(data: VerificationRequest): Promise<VerificationResult> {
  const response = await apiClient.post<ApiResponse<VerificationResult>>('/verifications/verify', data);
  // ⚠️ BACKEND REQUIRED
  // Request: {
  //   firstName: string,
  //   lastName: string,
  //   dateOfBirth: string,
  //   address: string,
  //   city: string,
  //   state: string,
  //   zipCode: string,
  //   country: string,
  //   documentType?: string,
  //   documentNumber?: string
  // }
  // Response: {
  //   id: string,
  //   status: 'verified' | 'failed' | 'pending',
  //   matchScore: number,
  //   timestamp: string,
  //   ...
  // }
  return handleApiResponse(response);
}

// LINE 73-80: Bulk Verification
async bulkVerify(file: File): Promise<BulkVerificationResult> {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await apiClient.post<ApiResponse<BulkVerificationResult>>(
    '/verifications/bulk',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  // ⚠️ BACKEND REQUIRED
  // Request: multipart/form-data with CSV/Excel file
  // File format: firstName, lastName, dateOfBirth, address, city, state, zipCode, country
  // Response: {
  //   id: string,
  //   status: 'processing' | 'completed' | 'failed',
  //   totalRecords: number,
  //   processedRecords: number,
  //   uploadedAt: string
  // }
  return handleApiResponse(response);
}

// LINE 110-120: Upload Additional Documents
async uploadAdditionalDocuments(verificationId: string, files: File[]): Promise<{ message: string }> {
  const formData = new FormData();
  files.forEach((file, index) => {
    formData.append(`documents[${index}]`, file);
  });
  
  const response = await apiClient.post<ApiResponse<{ message: string }>>(
    `/verifications/${verificationId}/documents`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  // ⚠️ BACKEND REQUIRED
  // Request: multipart/form-data with multiple files
  // Supported formats: PDF, JPG, PNG
  // Max file size: 10MB per file
  // Response: { message: string }
  return handleApiResponse(response);
}
```

**Backend Requirements:**
- Address verification API integration (e.g., USPS, Melissa Data)
- File upload handling (multipart/form-data)
- CSV/Excel parsing for bulk verifications
- Background job processing for bulk operations
- Document storage (AWS S3, Azure Blob, etc.)
- Result generation and download (CSV/Excel)

---

### 3. Wallet Service
**File**: `src/services/walletService.ts`

#### API Methods:

| Method | Endpoint | Lines | Description |
|--------|----------|-------|-------------|
| `getBalance()` | `GET /wallet/balance` | 55-57 | Get wallet balance |
| `getTransactions()` | `GET /wallet/transactions` | 63-77 | Get transaction history |
| `topUp()` | `POST /wallet/top-up` | 83-85 | Top up wallet balance |
| `getUsageStats()` | `GET /wallet/usage-stats` | 91-93 | Get usage statistics |
| `getPaymentMethods()` | `GET /wallet/payment-methods` | 99-101 | Get saved payment methods |
| `addPaymentMethod()` | `POST /wallet/payment-methods` | 107-109 | Add new payment method |
| `removePaymentMethod()` | `DELETE /wallet/payment-methods/:id` | 115-117 | Remove payment method |
| `setDefaultPaymentMethod()` | `PATCH /wallet/payment-methods/:id/default` | 123-125 | Set default payment method |
| `downloadInvoice()` | `GET /wallet/invoices/:id` | 131-133 | Download invoice |

#### Detailed Integration Points:

```typescript
// LINE 55-57: Get Wallet Balance
async getBalance(): Promise<WalletBalance> {
  const response = await apiClient.get<WalletBalance>('/wallet/balance');
  // ⚠️ BACKEND REQUIRED
  // Headers: Authorization: Bearer {token}
  // Response: {
  //   balance: number,
  //   currency: string,
  //   lastUpdated: string
  // }
  return response.data;
}

// LINE 83-85: Top Up Wallet
async topUp(data: TopUpRequest): Promise<TopUpResponse> {
  const response = await apiClient.post<TopUpResponse>('/wallet/top-up', data);
  // ⚠️ BACKEND REQUIRED - PAYMENT GATEWAY INTEGRATION
  // Request: {
  //   amount: number,
  //   paymentMethodId: string,
  //   currency?: string
  // }
  // Response: {
  //   transactionId: string,
  //   status: 'success' | 'pending' | 'failed',
  //   newBalance: number,
  //   receiptUrl?: string
  // }
  // Integration needed: Stripe, PayPal, or similar
  return response.data;
}

// LINE 99-101: Get Payment Methods
async getPaymentMethods(): Promise<PaymentMethod[]> {
  const response = await apiClient.get<PaymentMethod[]>('/wallet/payment-methods');
  // ⚠️ BACKEND REQUIRED
  // Headers: Authorization: Bearer {token}
  // Response: Array of {
  //   id: string,
  //   type: 'card' | 'bank',
  //   last4: string,
  //   expiryDate?: string,
  //   isDefault: boolean
  // }
  return response.data;
}

// LINE 131-133: Download Invoice
async downloadInvoice(transactionId: string): Promise<Blob> {
  const response = await apiClient.get(`/wallet/invoices/${transactionId}`, {
    responseType: 'blob',
  });
  // ⚠️ BACKEND REQUIRED
  // Headers: Authorization: Bearer {token}
  // Response: PDF file as Blob
  // Must generate invoice PDF with transaction details
  return response.data;
}
```

**Backend Requirements:**
- Payment gateway integration (Stripe recommended)
- Secure payment method storage (use tokenization)
- Transaction recording and history
- Invoice generation (PDF)
- Balance management and concurrency handling
- Webhook handling for payment status updates

---

### 4. Notification Service
**File**: `src/services/notificationService.ts`

#### API Methods:

| Method | Endpoint | Lines | Description |
|--------|----------|-------|-------------|
| `getNotifications()` | `GET /notifications` | 39-57 | Get notifications with filters |
| `getNotification()` | `GET /notifications/:id` | 63-65 | Get single notification |
| `markAsRead()` | `PATCH /notifications/:id/read` | 71-73 | Mark notification as read |
| `markAllAsRead()` | `PATCH /notifications/read-all` | 79-81 | Mark all as read |
| `deleteNotification()` | `DELETE /notifications/:id` | 87-89 | Delete notification |
| `deleteAllNotifications()` | `DELETE /notifications` | 95-97 | Delete all notifications |
| `getNotificationStats()` | `GET /notifications/stats` | 103-105 | Get notification stats |
| `getPreferences()` | `GET /notifications/preferences` | 111-113 | Get user preferences |
| `updatePreferences()` | `PUT /notifications/preferences` | 119-121 | Update preferences |
| `testNotification()` | `POST /notifications/test` | 127-129 | Send test notification |
| `connectToNotifications()` | `WebSocket` | 135-154 | Real-time notifications |

#### Detailed Integration Points:

```typescript
// LINE 39-57: Get Notifications
async getNotifications(params?: {
  type?: string;
  status?: 'read' | 'unread';
  page?: number;
  limit?: number;
}): Promise<{ notifications: Notification[]; total: number }> {
  const response = await apiClient.get<{ notifications: Notification[]; total: number }>(
    '/notifications',
    { params }
  );
  // ⚠️ BACKEND REQUIRED
  // Query params: type, status, page, limit
  // Response: {
  //   notifications: Array of Notification objects,
  //   total: number
  // }
  return response.data;
}

// LINE 135-154: WebSocket Connection for Real-Time Notifications
connectToNotifications(onNotification: (notification: Notification) => void): () => void {
  const wsUrl = API_CONFIG.BASE_URL.replace('http', 'ws') + '/notifications/stream';
  const ws = new WebSocket(wsUrl);
  // ⚠️ BACKEND REQUIRED - WEBSOCKET ENDPOINT
  // URL: ws://your-api.com/api/notifications/stream
  // Authentication: Send JWT token on connection
  // Message format: JSON stringified Notification object
  // Must handle: connection, message, close, error events
  // Reconnection logic included in implementation
  
  ws.onopen = () => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      ws.send(JSON.stringify({ type: 'auth', token }));
    }
  };

  ws.onmessage = (event) => {
    try {
      const notification = JSON.parse(event.data) as Notification;
      onNotification(notification);
    } catch (error) {
      console.error('Failed to parse notification:', error);
    }
  };

  return () => ws.close();
}
```

**Backend Requirements:**
- WebSocket server for real-time notifications
- Notification queue system (Redis/RabbitMQ)
- User preference management
- Email/SMS notification services
- Push notification service (optional)
- Notification templates

---

### 5. User Service
**File**: `src/services/userService.ts`

#### API Methods:

| Method | Endpoint | Lines | Description |
|--------|----------|-------|-------------|
| `getUserProfile()` | `GET /users/profile` | 38-40 | Get user profile |
| `updateUserProfile()` | `PATCH /users/profile` | 46-48 | Update user profile |
| `uploadAvatar()` | `POST /users/avatar` | 54-64 | Upload avatar image |
| `getNotificationSettings()` | `GET /users/settings/notifications` | 70-72 | Get notification settings |
| `updateNotificationSettings()` | `PATCH /users/settings/notifications` | 78-80 | Update notification settings |
| `getSecuritySettings()` | `GET /users/settings/security` | 86-88 | Get security settings |
| `updateSecuritySettings()` | `PATCH /users/settings/security` | 94-96 | Update security settings |
| `enableTwoFactor()` | `POST /users/2fa/enable` | 102-104 | Enable 2FA |
| `verifyTwoFactor()` | `POST /users/2fa/verify` | 110-112 | Verify 2FA code |
| `disableTwoFactor()` | `POST /users/2fa/disable` | 118-120 | Disable 2FA |
| `getOrganizationMembers()` | `GET /organizations/:id/members` | 126-132 | Get org members |
| `inviteUser()` | `POST /organizations/:id/invite` | 138-140 | Invite user to org |
| `removeMember()` | `DELETE /organizations/:id/members/:memberId` | 146-148 | Remove org member |
| `updateMemberRole()` | `PATCH /organizations/:id/members/:memberId` | 154-156 | Update member role |
| `getActiveSessions()` | `GET /users/sessions` | 162-164 | Get active sessions |
| `terminateSession()` | `DELETE /users/sessions/:sessionId` | 170-172 | Terminate session |
| `deleteAccount()` | `DELETE /users/account` | 178-180 | Delete user account |

#### Detailed Integration Points:

```typescript
// LINE 54-64: Upload Avatar
async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
  const formData = new FormData();
  formData.append('avatar', file);
  
  const response = await apiClient.post<ApiResponse<{ avatarUrl: string }>>(
    '/users/avatar',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  // ⚠️ BACKEND REQUIRED
  // Request: multipart/form-data with image file
  // Supported formats: JPG, PNG, GIF
  // Max file size: 5MB
  // Must resize to standard dimensions (e.g., 200x200)
  // Response: { avatarUrl: string }
  return handleApiResponse(response);
}

// LINE 102-104: Enable Two-Factor Authentication
async enableTwoFactor(): Promise<{ qrCode: string; secret: string }> {
  const response = await apiClient.post<ApiResponse<{ qrCode: string; secret: string }>>(
    '/users/2fa/enable'
  );
  // ⚠️ BACKEND REQUIRED - 2FA IMPLEMENTATION
  // Must generate TOTP secret
  // Generate QR code for authenticator apps
  // Response: {
  //   qrCode: string (base64 or URL),
  //   secret: string (for manual entry)
  // }
  // Libraries: speakeasy, qrcode
  return handleApiResponse(response);
}

// LINE 126-132: Get Organization Members
async getOrganizationMembers(
  organizationId: string,
  params?: { page?: number; limit?: number }
): Promise<{ members: OrganizationMember[]; total: number }> {
  const response = await apiClient.get<ApiResponse<{ members: OrganizationMember[]; total: number }>>(
    `/organizations/${organizationId}/members`,
    { params }
  );
  // ⚠️ BACKEND REQUIRED
  // Must validate user has permission to view organization
  // Response: {
  //   members: Array of {
  //     id: string,
  //     email: string,
  //     role: string,
  //     permissions: string[],
  //     status: string,
  //     joinedAt: string
  //   },
  //   total: number
  // }
  return handleApiResponse(response);
}
```

**Backend Requirements:**
- User profile management
- File upload for avatars (with image processing)
- Two-factor authentication (TOTP)
- Organization/team management
- Role-based access control (RBAC)
- Session management
- Account deletion with data cleanup

---

### 6. Usage Limit Service
**File**: `src/services/usageLimitService.ts`

#### API Methods:

| Method | Endpoint | Lines | Description |
|--------|----------|-------|-------------|
| `getMemberUsageLimit()` | `GET /usage-limits/:userId` | 8-11 | Get usage limit info |
| `checkUsageLimit()` | `GET /usage-limits/:userId` | 16-19 | Check if has units |
| `decrementUsage()` | `POST /usage-limits/:userId/decrement` | 24-29 | Decrement usage units |
| `getUsageNotifications()` | `GET /usage-limits/:userId/notifications` | 34-37 | Get usage notifications |
| `markNotificationRead()` | `PATCH /usage-limits/notifications/:id/read` | 43 | Mark notification read |

#### Detailed Integration Points:

```typescript
// LINE 8-11: Get Member Usage Limit
async getMemberUsageLimit(userId: string): Promise<MemberUsageLimit> {
  const response = await apiClient.get<MemberUsageLimit>(`/api/usage-limits/${userId}`);
  // ⚠️ BACKEND REQUIRED
  // Headers: Authorization: Bearer {token}
  // Response: {
  //   userId: string,
  //   allocatedUnits: number,
  //   usedUnits: number,
  //   remainingUnits: number,
  //   resetDate: string,
  //   warningThreshold: number,
  //   criticalThreshold: number
  // }
  return response.data;
}

// LINE 24-29: Decrement Usage
async decrementUsage(userId: string, units: number = 1): Promise<MemberUsageLimit> {
  const response = await apiClient.post<MemberUsageLimit>(`/api/usage-limits/${userId}/decrement`, {
    units
  });
  // ⚠️ BACKEND REQUIRED
  // Request: { units: number }
  // Must be atomic (prevent race conditions)
  // Must check remaining units before decrementing
  // Response: Updated MemberUsageLimit object
  // Should trigger notifications if thresholds reached
  return response.data;
}

// LINE 34-37: Get Usage Notifications
async getUsageNotifications(userId: string): Promise<UsageLimitNotification[]> {
  const response = await apiClient.get<UsageLimitNotification[]>(`/api/usage-limits/${userId}/notifications`);
  // ⚠️ BACKEND REQUIRED
  // Headers: Authorization: Bearer {token}
  // Response: Array of {
  //   id: string,
  //   userId: string,
  //   type: 'warning' | 'critical' | 'depleted',
  //   message: string,
  //   threshold: number,
  //   createdAt: string,
  //   read: boolean
  // }
  return response.data;
}
```

**Backend Requirements:**
- Usage tracking with atomic operations
- Scheduled jobs for usage reset (monthly/periodic)
- Threshold monitoring and notification triggers
- Organization admin controls for allocation
- Usage analytics and reporting

---

## React Query Hooks

### Hook Usage Pattern

Each service has corresponding React Query hooks in `src/hooks/api/`:

| Service | Hook File | Key Hooks |
|---------|-----------|-----------|
| Auth | `useAuth.ts` | useLogin, useSignup, useCurrentUser |
| Verification | `useVerification.ts` | useVerifyAddress, useBulkVerification, useVerificationHistory |
| Wallet | `useWallet.ts` | useWalletBalance, useTopUp, useTransactions |
| Notification | `useNotifications.ts` | useNotifications, useMarkNotificationAsRead, useRealTimeNotifications |
| User | `useUser.ts` | useUserProfile, useUpdateUserProfile, useOrganizationMembers |
| Usage Limit | `useUsageLimit.ts` | useUsageLimit, useDecrementUsage, useCheckUsageLimit |

### Hook Features:
- ✅ Automatic caching and revalidation
- ✅ Optimistic updates
- ✅ Error handling with toast notifications
- ✅ Loading states
- ✅ Query invalidation on mutations
- ✅ Real-time updates with WebSockets

---

## API Consumption Map

### Pages → Hooks → Services → Endpoints

#### Authentication Pages

| Page | Hook | Service Method | Endpoint |
|------|------|----------------|----------|
| `/auth/login` | `useLogin()` | `authService.login()` | `POST /auth/login` |
| `/auth/signup` | `useSignup()` | `authService.signup()` | `POST /auth/signup` |
| `/auth/verify-otp` | `useVerifyOTP()` | `authService.verifyOTP()` | `POST /auth/verify-otp` |
| `/auth/forgot-password` | `useForgotPassword()` | `authService.forgotPassword()` | `POST /auth/forgot-password` |

#### Dashboard Pages

| Page | Hook | Service Method | Endpoint |
|------|------|----------------|----------|
| `/dashboard` | `useWalletBalance()` | `walletService.getBalance()` | `GET /wallet/balance` |
| `/dashboard` | `useNotifications()` | `notificationService.getNotifications()` | `GET /notifications` |
| `/dashboard` | `useUsageLimit()` | `usageLimitService.getMemberUsageLimit()` | `GET /usage-limits/:userId` |
| `/dashboard/search` | `useVerifyAddress()` | `verificationService.verifyAddress()` | `POST /verifications/verify` |
| `/dashboard/bulk-upload` | `useBulkVerification()` | `verificationService.bulkVerify()` | `POST /verifications/bulk` |
| `/dashboard/history` | `useVerificationHistory()` | `verificationService.getVerificationHistory()` | `GET /verifications` |
| `/dashboard/billing` | `useTopUp()` | `walletService.topUp()` | `POST /wallet/top-up` |
| `/dashboard/billing` | `useTransactions()` | `walletService.getTransactions()` | `GET /wallet/transactions` |
| `/dashboard/profile` | `useUserProfile()` | `userService.getUserProfile()` | `GET /users/profile` |
| `/dashboard/settings` | `useUpdateUserProfile()` | `userService.updateUserProfile()` | `PATCH /users/profile` |
| `/dashboard/team-management` | `useOrganizationMembers()` | `userService.getOrganizationMembers()` | `GET /organizations/:id/members` |
| `/dashboard/notifications` | `useNotifications()` | `notificationService.getNotifications()` | `GET /notifications` |

---

## Backend Requirements

### Priority 1 - Core Authentication
- [ ] JWT token generation and validation
- [ ] User registration endpoint
- [ ] Login endpoint with password hashing
- [ ] Token refresh endpoint
- [ ] Password reset flow with email
- [ ] OTP generation and validation
- [ ] User session management

### Priority 2 - Verification System
- [ ] Address verification API integration
- [ ] Single verification endpoint
- [ ] Bulk verification with file upload
- [ ] Background job processing for bulk operations
- [ ] Verification history with pagination
- [ ] File upload handling (multipart/form-data)
- [ ] CSV/Excel parsing and validation

### Priority 3 - Wallet & Payments
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Wallet balance management
- [ ] Transaction recording
- [ ] Payment method storage (tokenized)
- [ ] Invoice generation (PDF)
- [ ] Webhook handling for payment events
- [ ] Refund processing

### Priority 4 - Real-Time Features
- [ ] WebSocket server for notifications
- [ ] Real-time notification delivery
- [ ] Connection management and authentication
- [ ] Reconnection handling

### Priority 5 - Organization Management
- [ ] Organization/team CRUD operations
- [ ] Member invitation system
- [ ] Role-based access control (RBAC)
- [ ] Permission management
- [ ] Usage limit allocation for members

### Priority 6 - Advanced Features
- [ ] Two-factor authentication (TOTP)
- [ ] Active session management
- [ ] Usage analytics and reporting
- [ ] Scheduled jobs for usage reset
- [ ] Document storage and retrieval
- [ ] Audit logging

### Infrastructure Requirements
- [ ] PostgreSQL/MySQL database
- [ ] Redis for caching and queues
- [ ] S3/Blob storage for files
- [ ] Email service (SendGrid/AWS SES)
- [ ] SMS service (Twilio) - optional
- [ ] Background job processor (Bull/Sidekiq)
- [ ] WebSocket server (Socket.io/ws)
- [ ] API rate limiting
- [ ] CORS configuration
- [ ] SSL/TLS certificates

---

## Testing & Integration Guide

### 1. Switch from Mock to Real API

**Option A: Enable All Real APIs**
```bash
# In your .env file or environment variables
VITE_API_BASE_URL=https://your-api.com/api
VITE_USE_REAL_API=true
```

**Option B: Enable Specific Features**
```bash
# Enable only authentication with real API
VITE_REAL_AUTH=true

# Continue using mock data for other features
VITE_REAL_WALLET=false
VITE_REAL_VERIFICATION=false
```

### 2. Testing Individual Endpoints

**Using Browser DevTools:**
1. Open DevTools → Network tab
2. Perform action in the app
3. Check request/response in Network tab
4. Verify status codes and payloads

**Using Postman/Insomnia:**
1. Import endpoints from this documentation
2. Add authentication token to headers
3. Test each endpoint individually
4. Validate response format matches expected interfaces

### 3. Testing WebSocket Connections

```javascript
// In browser console
const ws = new WebSocket('ws://your-api.com/api/notifications/stream');
ws.onopen = () => console.log('Connected');
ws.onmessage = (e) => console.log('Message:', e.data);
ws.onerror = (e) => console.error('Error:', e);
```

### 4. Common Integration Issues

**Issue: 401 Unauthorized**
- Check if JWT token is being sent in Authorization header
- Verify token is not expired
- Ensure `/auth/refresh` endpoint is working

**Issue: CORS Errors**
- Add frontend origin to backend CORS whitelist
- Check if credentials are allowed
- Verify preflight requests are handled

**Issue: File Upload Failing**
- Check `Content-Type: multipart/form-data` header
- Verify max file size limits
- Ensure file field name matches backend

**Issue: WebSocket Connection Failed**
- Verify WebSocket URL uses `ws://` or `wss://`
- Check if authentication is handled on connection
- Ensure WebSocket server is running

### 5. Debug Mode

Enable detailed logging in services:
```typescript
// Add to src/config/api.ts
apiClient.interceptors.request.use(config => {
  console.log('API Request:', config.method?.toUpperCase(), config.url, config.data);
  return config;
});

apiClient.interceptors.response.use(
  response => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  error => {
    console.error('API Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);
```

### 6. Integration Checklist

Before deploying to production:

- [ ] All environment variables are set correctly
- [ ] API base URL points to production backend
- [ ] SSL/TLS is enabled (HTTPS)
- [ ] JWT token expiration is configured
- [ ] CORS is properly configured
- [ ] Rate limiting is implemented
- [ ] Error logging is set up
- [ ] File upload limits are enforced
- [ ] Payment webhooks are tested
- [ ] WebSocket reconnection works
- [ ] Email/SMS services are configured
- [ ] Database migrations are applied
- [ ] Backup strategy is in place

---

## Quick Reference: Code Comments

All API integration points are marked with `⚠️ BACKEND REQUIRED` comments in the codebase.

### Search for Integration Points
```bash
# Find all backend integration points
grep -r "⚠️ BACKEND REQUIRED" src/

# Find specific service integration points
grep "⚠️ BACKEND REQUIRED" src/services/authService.ts
```

### Key Files to Review
1. `src/config/api.ts` - API client setup
2. `src/config/features.ts` - Feature flags
3. `src/services/*.ts` - All service files
4. `src/hooks/api/*.ts` - React Query hooks

---

## Support & Resources

### Documentation
- **React Query**: https://tanstack.com/query/latest
- **Axios**: https://axios-http.com/docs/intro
- **TypeScript**: https://www.typescriptlang.org/docs/

### Recommended Tools
- **Postman**: API testing
- **Redis Commander**: Redis management
- **pgAdmin**: PostgreSQL management
- **Stripe Dashboard**: Payment testing

### Backend Frameworks (Recommended)
- **Node.js**: Express, Fastify, NestJS
- **Python**: FastAPI, Django
- **Go**: Gin, Echo
- **Ruby**: Rails, Sinatra

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-XX | Initial documentation |

---

## Contributing

When adding new API endpoints:
1. Add method to appropriate service file
2. Mark with `⚠️ BACKEND REQUIRED` comment
3. Document request/response format
4. Create corresponding React Query hook
5. Update this documentation
6. Add to API Consumption Map

---

**Last Updated**: 2025-01-XX
**Maintained By**: Development Team
