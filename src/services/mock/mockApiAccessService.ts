import {
  ApiKey,
  ApiKeyUsageStats,
  CreateApiKeyRequest,
  UpdateApiKeyRequest,
  ApiScope,
  DailyUsage
} from '@/types/apiAccess';

class MockApiAccessService {
  private delay = (ms: number = 600) => new Promise(resolve => setTimeout(resolve, ms));

  private mockApiKeys: ApiKey[] = [
    {
      id: 'key-1',
      name: 'Production API Key',
      key: 'vng_prod_1234567890abcdef1234567890abcdef',
      maskedKey: 'vng_prod_****************************cdef',
      description: 'Main production API key for web application',
      scopes: ['verification:read', 'verification:write', 'wallet:read'],
      rateLimit: {
        requestsPerMinute: 60,
        requestsPerDay: 10000
      },
      status: 'active',
      createdAt: '2024-01-15T10:00:00Z',
      lastUsedAt: '2024-03-10T16:45:00Z',
      environment: 'production'
    },
    {
      id: 'key-2',
      name: 'Development API Key',
      key: 'vng_dev_abcdef1234567890abcdef1234567890',
      maskedKey: 'vng_dev_****************************7890',
      description: 'Development environment testing',
      scopes: ['verification:read', 'verification:write'],
      rateLimit: {
        requestsPerMinute: 30,
        requestsPerDay: 5000
      },
      status: 'active',
      createdAt: '2024-02-01T09:00:00Z',
      lastUsedAt: '2024-03-10T14:20:00Z',
      environment: 'development'
    },
    {
      id: 'key-3',
      name: 'Legacy API Key',
      key: 'vng_prod_oldkey1234567890abcdef123456',
      maskedKey: 'vng_prod_****************************3456',
      scopes: ['verification:read'],
      rateLimit: {
        requestsPerMinute: 20,
        requestsPerDay: 1000
      },
      status: 'revoked',
      createdAt: '2023-11-10T08:00:00Z',
      lastUsedAt: '2024-02-28T10:00:00Z',
      environment: 'production'
    }
  ];

  async getApiKeys(): Promise<ApiKey[]> {
    await this.delay();
    return this.mockApiKeys;
  }

  async getApiKey(keyId: string): Promise<ApiKey> {
    await this.delay();

    const key = this.mockApiKeys.find(k => k.id === keyId);
    if (!key) {
      throw new Error('API key not found');
    }

    return key;
  }

  async generateApiKey(request: CreateApiKeyRequest): Promise<ApiKey> {
    await this.delay(800);

    const newKey: ApiKey = {
      id: `key-${Date.now()}`,
      name: request.name,
      key: `vng_${request.environment}_${this.generateRandomString(32)}`,
      maskedKey: `vng_${request.environment}_****************************`,
      description: request.description,
      scopes: request.scopes,
      rateLimit: request.rateLimit || {
        requestsPerMinute: 60,
        requestsPerDay: 10000
      },
      status: 'active',
      createdAt: new Date().toISOString(),
      environment: request.environment,
      expiresAt: request.expiresAt
    };

    this.mockApiKeys.push(newKey);
    return newKey;
  }

  async updateApiKey(keyId: string, request: UpdateApiKeyRequest): Promise<ApiKey> {
    await this.delay();

    const key = this.mockApiKeys.find(k => k.id === keyId);
    if (!key) {
      throw new Error('API key not found');
    }

    if (request.name) key.name = request.name;
    if (request.description !== undefined) key.description = request.description;
    if (request.scopes) key.scopes = request.scopes;
    if (request.rateLimit) key.rateLimit = request.rateLimit;

    return key;
  }

  async revokeApiKey(keyId: string): Promise<void> {
    await this.delay();

    const key = this.mockApiKeys.find(k => k.id === keyId);
    if (!key) {
      throw new Error('API key not found');
    }

    key.status = 'revoked';
  }

  async getApiKeyUsage(keyId: string): Promise<ApiKeyUsageStats> {
    await this.delay();

    const dailyUsage: DailyUsage[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dailyUsage.push({
        date: date.toISOString().split('T')[0],
        requests: Math.floor(Math.random() * 5000) + 1000,
        errors: Math.floor(Math.random() * 100) + 10
      });
    }

    return {
      keyId,
      totalRequests: 23456,
      successfulRequests: 22890,
      failedRequests: 566,
      avgResponseTime: 245,
      lastUsed: '2024-03-10T16:45:00Z',
      dailyUsage
    };
  }

  async getAvailableScopes(): Promise<ApiScope[]> {
    await this.delay(300);

    return [
      {
        id: 'verification:read',
        name: 'Read Verifications',
        description: 'View verification results and history',
        category: 'verification'
      },
      {
        id: 'verification:write',
        name: 'Create Verifications',
        description: 'Submit new verification requests',
        category: 'verification'
      },
      {
        id: 'wallet:read',
        name: 'Read Wallet',
        description: 'View wallet balance and transactions',
        category: 'wallet'
      },
      {
        id: 'wallet:write',
        name: 'Manage Wallet',
        description: 'Add funds and manage payment methods',
        category: 'wallet'
      },
      {
        id: 'admin:users',
        name: 'User Management',
        description: 'Manage users and permissions',
        category: 'admin'
      },
      {
        id: 'reports:read',
        name: 'Read Reports',
        description: 'Access analytics and reports',
        category: 'reports'
      }
    ];
  }

  private generateRandomString(length: number): string {
    const chars = 'abcdef0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}

export const mockApiAccessService = new MockApiAccessService();
