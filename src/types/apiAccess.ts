export interface ApiKey {
  id: string;
  name: string;
  key: string;
  maskedKey: string;
  description?: string;
  scopes: string[];
  rateLimit: {
    requestsPerMinute: number;
    requestsPerDay: number;
  };
  status: 'active' | 'revoked' | 'expired';
  createdAt: string;
  lastUsedAt?: string;
  expiresAt?: string;
  environment: 'production' | 'development' | 'staging';
}

export interface ApiKeyUsageStats {
  keyId: string;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  avgResponseTime: number;
  lastUsed: string;
  dailyUsage: DailyUsage[];
}

export interface DailyUsage {
  date: string;
  requests: number;
  errors: number;
}

export interface CreateApiKeyRequest {
  name: string;
  description?: string;
  scopes: string[];
  rateLimit?: {
    requestsPerMinute: number;
    requestsPerDay: number;
  };
  expiresAt?: string;
  environment: 'production' | 'development' | 'staging';
}

export interface UpdateApiKeyRequest {
  name?: string;
  description?: string;
  scopes?: string[];
  rateLimit?: {
    requestsPerMinute: number;
    requestsPerDay: number;
  };
}

export interface ApiScope {
  id: string;
  name: string;
  description: string;
  category: 'verification' | 'wallet' | 'admin' | 'reports';
}
