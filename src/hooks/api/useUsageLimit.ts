import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockUsageLimitService } from '@/services/mock/mockUsageLimitService';
import { toast } from '@/hooks/use-toast';

const QUERY_KEYS = {
  usageLimit: (userId: string) => ['usageLimit', userId],
  notifications: (userId: string) => ['usageLimitNotifications', userId],
};

export function useUsageLimit(userId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.usageLimit(userId),
    queryFn: () => mockUsageLimitService.getMemberUsageLimit(userId),
    enabled: !!userId,
  });
}

export function useCheckUsageLimit(userId: string) {
  return useMutation({
    mutationFn: (requiredUnits: number = 1) => 
      mockUsageLimitService.checkUsageLimit(userId, requiredUnits),
  });
}

export function useDecrementUsage(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (units: number = 1) => 
      mockUsageLimitService.decrementUsage(userId, units),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.usageLimit(userId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.notifications(userId) });
      
      const alertLevel = mockUsageLimitService.getAlertLevel(data);
      if (alertLevel === 'warning') {
        toast({
          title: "Usage Warning",
          description: `You have ${data.remainingUnits} units remaining.`,
          variant: "default",
        });
      } else if (alertLevel === 'critical') {
        toast({
          title: "Critical Usage Alert",
          description: `Only ${data.remainingUnits} units left! Contact your admin.`,
          variant: "destructive",
        });
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to process verification unit usage.",
        variant: "destructive",
      });
    },
  });
}

export function useUsageNotifications(userId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.notifications(userId),
    queryFn: () => mockUsageLimitService.getUsageNotifications(userId),
    enabled: !!userId,
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) => 
      mockUsageLimitService.markNotificationRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usageLimitNotifications'] });
    },
  });
}
