import { useQuery } from '@tanstack/react-query';
import { mockApiMonitorService } from '@/services/mock/mockApiMonitorService';
import { apiMonitorService } from '@/services/apiMonitorService';
import { FEATURES } from '@/config/features';
import { ApiMonitorFilters } from '@/types/apiMonitor';

const service = FEATURES.USE_REAL_API ? apiMonitorService : mockApiMonitorService;

export function useApiMetrics(timeRange: string = '24h') {
  return useQuery({
    queryKey: ['admin', 'api', 'metrics', timeRange],
    queryFn: () => service.getMetrics(timeRange),
    staleTime: 1 * 60 * 1000,
    refetchInterval: 30 * 1000, // Refresh every 30 seconds
  });
}

export function useEndpointStats() {
  return useQuery({
    queryKey: ['admin', 'api', 'endpoints'],
    queryFn: () => service.getEndpointStats(),
    staleTime: 2 * 60 * 1000,
    refetchInterval: 60 * 1000, // Refresh every minute
  });
}

export function useApiErrors(filters?: ApiMonitorFilters) {
  return useQuery({
    queryKey: ['admin', 'api', 'errors', filters],
    queryFn: () => service.getErrorLogs(filters),
    staleTime: 1 * 60 * 1000,
  });
}

export function useRateLimitStatus() {
  return useQuery({
    queryKey: ['admin', 'api', 'rate-limits'],
    queryFn: () => service.getRateLimitStatus(),
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000, // Refresh every 30 seconds
  });
}

export function useMetricsTimeSeries(timeRange: string = '24h') {
  return useQuery({
    queryKey: ['admin', 'api', 'metrics', 'timeseries', timeRange],
    queryFn: () => service.getMetricsTimeSeries(timeRange),
    staleTime: 2 * 60 * 1000,
  });
}
