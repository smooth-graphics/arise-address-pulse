import {
  ApiMetrics,
  EndpointStats,
  ApiError,
  RateLimitStatus,
  MetricsTimeRange,
  MetricDataPoint,
  ApiMonitorFilters
} from '@/types/apiMonitor';

class MockApiMonitorService {
  private delay = (ms: number = 600) => new Promise(resolve => setTimeout(resolve, ms));

  async getMetrics(timeRange: string = '24h'): Promise<ApiMetrics> {
    await this.delay();

    return {
      totalRequests: 45678,
      successfulRequests: 44123,
      failedRequests: 1555,
      errorRate: 3.4,
      avgResponseTime: 245,
      requestsPerMinute: 31.8,
      activeConnections: 127
    };
  }

  async getEndpointStats(): Promise<EndpointStats[]> {
    await this.delay();

    return [
      {
        endpoint: '/api/verify',
        method: 'POST',
        totalCalls: 15234,
        successRate: 98.2,
        avgResponseTime: 320,
        errorCount: 274,
        lastCalled: '2024-03-10T16:45:00Z'
      },
      {
        endpoint: '/api/wallet/balance',
        method: 'GET',
        totalCalls: 8912,
        successRate: 99.5,
        avgResponseTime: 145,
        errorCount: 45,
        lastCalled: '2024-03-10T16:44:00Z'
      },
      {
        endpoint: '/api/auth/login',
        method: 'POST',
        totalCalls: 6543,
        successRate: 95.8,
        avgResponseTime: 280,
        errorCount: 275,
        lastCalled: '2024-03-10T16:40:00Z'
      },
      {
        endpoint: '/api/verifications/history',
        method: 'GET',
        totalCalls: 5234,
        successRate: 99.8,
        avgResponseTime: 190,
        errorCount: 10,
        lastCalled: '2024-03-10T16:43:00Z'
      },
      {
        endpoint: '/api/users',
        method: 'GET',
        totalCalls: 3456,
        successRate: 97.5,
        avgResponseTime: 210,
        errorCount: 86,
        lastCalled: '2024-03-10T16:42:00Z'
      }
    ];
  }

  async getErrorLogs(filters?: ApiMonitorFilters): Promise<{
    errors: ApiError[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    await this.delay();

    const mockErrors: ApiError[] = [
      {
        id: 'err-1',
        endpoint: '/api/verify',
        method: 'POST',
        statusCode: 500,
        errorMessage: 'Internal server error: Database connection timeout',
        timestamp: '2024-03-10T16:30:00Z',
        userId: 'user-123',
        ipAddress: '197.210.85.123'
      },
      {
        id: 'err-2',
        endpoint: '/api/auth/login',
        method: 'POST',
        statusCode: 401,
        errorMessage: 'Unauthorized: Invalid credentials',
        timestamp: '2024-03-10T16:25:00Z',
        ipAddress: '102.89.32.45'
      },
      {
        id: 'err-3',
        endpoint: '/api/wallet/topup',
        method: 'POST',
        statusCode: 422,
        errorMessage: 'Validation error: Amount must be greater than 0',
        timestamp: '2024-03-10T16:20:00Z',
        userId: 'user-456'
      },
      {
        id: 'err-4',
        endpoint: '/api/verify',
        method: 'POST',
        statusCode: 429,
        errorMessage: 'Rate limit exceeded',
        timestamp: '2024-03-10T16:15:00Z',
        userId: 'user-789',
        ipAddress: '41.203.72.45'
      }
    ];

    const page = filters?.page || 1;
    const limit = filters?.limit || 10;

    return {
      errors: mockErrors,
      total: mockErrors.length,
      page,
      totalPages: Math.ceil(mockErrors.length / limit)
    };
  }

  async getRateLimitStatus(): Promise<RateLimitStatus[]> {
    await this.delay(300);

    return [
      {
        endpoint: '/api/verify',
        limit: 1000,
        remaining: 723,
        resetAt: '2024-03-10T17:00:00Z',
        status: 'ok'
      },
      {
        endpoint: '/api/wallet',
        limit: 500,
        remaining: 89,
        resetAt: '2024-03-10T17:00:00Z',
        status: 'warning'
      },
      {
        endpoint: '/api/bulk-upload',
        limit: 100,
        remaining: 0,
        resetAt: '2024-03-10T17:00:00Z',
        status: 'exceeded'
      }
    ];
  }

  async getMetricsTimeSeries(timeRange: string = '24h'): Promise<MetricsTimeRange> {
    await this.delay();

    const dataPoints: MetricDataPoint[] = [];
    const hours = timeRange === '1h' ? 1 : timeRange === '24h' ? 24 : timeRange === '7d' ? 168 : 720;

    for (let i = hours; i > 0; i--) {
      const timestamp = new Date(Date.now() - i * 60 * 60 * 1000).toISOString();
      dataPoints.push({
        timestamp,
        requests: Math.floor(Math.random() * 2000) + 1000,
        errors: Math.floor(Math.random() * 100) + 10,
        avgResponseTime: Math.floor(Math.random() * 200) + 150
      });
    }

    return {
      period: timeRange as any,
      dataPoints
    };
  }
}

export const mockApiMonitorService = new MockApiMonitorService();
