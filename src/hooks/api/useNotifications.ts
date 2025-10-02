import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '@/services';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useRef } from 'react';

export const NOTIFICATION_QUERY_KEYS = {
  notifications: (params?: any) => ['notifications', params] as const,
  notification: (id: string) => ['notifications', 'single', id] as const,
  stats: ['notifications', 'stats'] as const,
  preferences: ['notifications', 'preferences'] as const,
} as const;

export const useNotifications = (params?: {
  page?: number;
  limit?: number;
  type?: 'info' | 'success' | 'warning' | 'error';
  isRead?: boolean;
}) => {
  return useQuery({
    queryKey: NOTIFICATION_QUERY_KEYS.notifications(params),
    queryFn: () => notificationService.getNotifications(params),
    staleTime: 30 * 1000, // 30 seconds
  });
};

export const useNotification = (notificationId: string) => {
  return useQuery({
    queryKey: NOTIFICATION_QUERY_KEYS.notification(notificationId),
    queryFn: () => notificationService.getNotification(notificationId),
    enabled: !!notificationId,
  });
};

export const useNotificationStats = () => {
  return useQuery({
    queryKey: NOTIFICATION_QUERY_KEYS.stats,
    queryFn: notificationService.getNotificationStats,
    staleTime: 60 * 1000, // 1 minute
    refetchInterval: 60 * 1000, // Refetch every minute
  });
};

export const useNotificationPreferences = () => {
  return useQuery({
    queryKey: NOTIFICATION_QUERY_KEYS.preferences,
    queryFn: notificationService.getPreferences,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) => notificationService.markAsRead(notificationId),
    onSuccess: (_, notificationId) => {
      // Update notification lists and stats
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.stats });
      
      // Optimistically update the specific notification
      queryClient.setQueryData(
        NOTIFICATION_QUERY_KEYS.notification(notificationId),
        (old: any) => old ? { ...old, isRead: true } : old
      );
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: notificationService.markAllAsRead,
    onSuccess: (data) => {
      // Invalidate all notification queries
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      
      toast({
        title: "All notifications marked as read",
        description: `${data.updatedCount} notifications updated`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to mark notifications as read",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (notificationId: string) => notificationService.deleteNotification(notificationId),
    onSuccess: () => {
      // Invalidate notification lists
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.stats });
      
      toast({
        title: "Notification deleted",
        description: "Notification has been deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to delete notification",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteAllNotifications = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: notificationService.deleteAllNotifications,
    onSuccess: (data) => {
      // Clear all notification caches
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      
      toast({
        title: "All notifications deleted",
        description: `${data.deletedCount} notifications deleted`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to delete notifications",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateNotificationPreferences = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (preferences: any) => notificationService.updatePreferences(preferences),
    onSuccess: (updatedPreferences) => {
      // Update preferences cache
      queryClient.setQueryData(NOTIFICATION_QUERY_KEYS.preferences, updatedPreferences);
      
      toast({
        title: "Preferences updated",
        description: "Your notification preferences have been saved",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to update preferences",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });
};

// Real-time notifications hook
export const useRealTimeNotifications = (onNewNotification?: (notification: any) => void) => {
  const queryClient = useQueryClient();
  const wsRef = useRef<WebSocket | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Connect to WebSocket for real-time notifications
    wsRef.current = notificationService.connectToNotifications((notification) => {
      // Update notification queries
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.stats });
      
      // Show toast for important notifications
      if (notification.type === 'error' || notification.type === 'warning') {
        toast({
          title: notification.title,
          description: notification.message,
          variant: notification.type === 'error' ? 'destructive' : 'default',
        });
      }
      
      // Call optional callback
      onNewNotification?.(notification);
    });

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [queryClient, toast, onNewNotification]);

  return {
    isConnected: wsRef.current?.readyState === WebSocket.OPEN,
    disconnect: () => wsRef.current?.close(),
  };
};