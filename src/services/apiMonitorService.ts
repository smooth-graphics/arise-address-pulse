import { apiClient, handleApiResponse } from '@/config/api';
import {
  ApiMetrics,
  EndpointStats,
  ApiError,
  RateLimitStatus,
  MetricsTimeRange,
  ApiMonitorFilters
} from '@/types/apiMonitor';

class ApiMonitorService {
  async getMetrics(timeRange: string = '24h') {
    const response = await apiClient.get('/admin/api/metrics', { params: { timeRange } });
    return handleApiResponse<ApiMetrics>(response);
  }

  async getEndpointStats() {
    const response = await apiClient.get('/admin/api/endpoints');
    return handleApiResponse<EndpointStats[]>(response);
  }

  async getErrorLogs(filters?: ApiMonitorFilters) {
    const response = await apiClient.get('/admin/api/errors', { params: filters });
    return handleApiResponse<{
      errors: ApiError[];
      total: number;
      page: number;
      totalPages: number;
    }>(response);
  }

  async getRateLimitStatus() {
    const response = await apiClient.get('/admin/api/rate-limits');
    return handleApiResponse<RateLimitStatus[]>(response);
  }

  async getMetricsTimeSeries(timeRange: string = '24h') {
    const response = await apiClient.get('/admin/api/metrics/timeseries', { params: { timeRange } });
    return handleApiResponse<MetricsTimeRange>(response);
  }
}

export const apiMonitorService = new ApiMonitorService();
