import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { mockActivityLogService } from '@/services/mock/mockActivityLogService';
import { activityLogService } from '@/services/activityLogService';
import { FEATURES } from '@/config/features';
import { ActivityFilters } from '@/types/activityLog';

const service = FEATURES.USE_REAL_API ? activityLogService : mockActivityLogService;

export function useActivities(filters?: ActivityFilters) {
  return useQuery({
    queryKey: ['activity', filters],
    queryFn: () => service.getActivities(filters),
    staleTime: 1 * 60 * 1000,
  });
}

export function useActivityStats() {
  return useQuery({
    queryKey: ['activity', 'stats'],
    queryFn: () => service.getActivityStats(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useActivityDetails(activityId: string) {
  return useQuery({
    queryKey: ['activity', activityId],
    queryFn: () => service.getActivityDetails(activityId),
    enabled: !!activityId,
    staleTime: 10 * 60 * 1000,
  });
}

export function useExportActivities() {
  return useMutation({
    mutationFn: ({ filters, format }: { filters?: ActivityFilters; format: 'csv' | 'xlsx' | 'json' }) =>
      service.exportActivities(filters, format),
    onSuccess: (blob, variables) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `activity-log.${variables.format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast({ title: 'Success', description: 'Activity log exported successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to export activity log', variant: 'destructive' });
    },
  });
}
