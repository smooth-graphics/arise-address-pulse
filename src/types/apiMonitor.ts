export interface ApiMetrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  errorRate: number;
  avgResponseTime: number;
  requestsPerMinute: number;
  activeConnections: number;
}

export interface EndpointStats {
  endpoint: string;
  method: string;
  totalCalls: number;
  successRate: number;
  avgResponseTime: number;
  errorCount: number;
  lastCalled: string;
}

export interface ApiError {
  id: string;
  endpoint: string;
  method: string;
  statusCode: number;
  errorMessage: string;
  timestamp: string;
  userId?: string;
  ipAddress?: string;
  requestBody?: any;
  responseBody?: any;
}

export interface RateLimitStatus {
  endpoint: string;
  limit: number;
  remaining: number;
  resetAt: string;
  status: 'ok' | 'warning' | 'exceeded';
}

export interface MetricsTimeRange {
  period: '1h' | '24h' | '7d' | '30d';
  dataPoints: MetricDataPoint[];
}

export interface MetricDataPoint {
  timestamp: string;
  requests: number;
  errors: number;
  avgResponseTime: number;
}

export interface ApiMonitorFilters {
  timeRange: '1h' | '24h' | '7d' | '30d';
  endpoint?: string;
  statusCode?: number;
  page?: number;
  limit?: number;
}
