import { nextApiClient as apiClient, handleApiResponse, ApiResponse } from '@/config/api';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  actionText?: string;
  metadata?: Record<string, any>;
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  categories: {
    verificationUpdates: boolean;
    walletUpdates: boolean;
    securityAlerts: boolean;
    systemUpdates: boolean;
    marketingEmails: boolean;
  };
}

export interface NotificationStats {
  total: number;
  unread: number;
  byType: Record<string, number>;
}

class NotificationService {
  async getNotifications(params?: {
    page?: number;
    limit?: number;
    type?: 'info' | 'success' | 'warning' | 'error';
    isRead?: boolean;
  }): Promise<{
    notifications: Notification[];
    total: number;
    page: number;
    totalPages: number;
    unreadCount: number;
  }> {
    const response = await apiClient.get<ApiResponse<{
      notifications: Notification[];
      total: number;
      page: number;
      totalPages: number;
      unreadCount: number;
    }>>('/notifications', { params });
    return handleApiResponse(response);
  }

  async getNotification(notificationId: string): Promise<Notification> {
    const response = await apiClient.get<ApiResponse<Notification>>(`/notifications/${notificationId}`);
    return handleApiResponse(response);
  }

  async markAsRead(notificationId: string): Promise<{ message: string }> {
    const response = await apiClient.put<ApiResponse<{ message: string }>>(
      `/notifications/${notificationId}/read`
    );
    return handleApiResponse(response);
  }

  async markAllAsRead(): Promise<{ message: string; updatedCount: number }> {
    const response = await apiClient.put<ApiResponse<{ message: string; updatedCount: number }>>(
      '/notifications/mark-all-read'
    );
    return handleApiResponse(response);
  }

  async deleteNotification(notificationId: string): Promise<{ message: string }> {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(
      `/notifications/${notificationId}`
    );
    return handleApiResponse(response);
  }

  async deleteAllNotifications(): Promise<{ message: string; deletedCount: number }> {
    const response = await apiClient.delete<ApiResponse<{ message: string; deletedCount: number }>>(
      '/notifications'
    );
    return handleApiResponse(response);
  }

  async getNotificationStats(): Promise<NotificationStats> {
    const response = await apiClient.get<ApiResponse<NotificationStats>>('/notifications/stats');
    return handleApiResponse(response);
  }

  async getPreferences(): Promise<NotificationPreferences> {
    const response = await apiClient.get<ApiResponse<NotificationPreferences>>('/notifications/preferences');
    return handleApiResponse(response);
  }

  async updatePreferences(preferences: Partial<NotificationPreferences>): Promise<NotificationPreferences> {
    const response = await apiClient.put<ApiResponse<NotificationPreferences>>(
      '/notifications/preferences',
      preferences
    );
    return handleApiResponse(response);
  }

  async testNotification(type: 'email' | 'sms' | 'push'): Promise<{ message: string }> {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      '/notifications/test',
      { type }
    );
    return handleApiResponse(response);
  }

  // WebSocket connection for real-time notifications with polling fallback
  connectToNotifications(onNotification: (notification: Notification) => void): WebSocket | { close: () => void } | null {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      console.warn('No auth token found, cannot connect to notifications');
      return null;
    }

    // Try WebSocket first (Next.js backend)
    const wsUrl = import.meta.env.VITE_NEXTJS_WS_URL;
    if (wsUrl) {
      try {
        const ws = new WebSocket(`${wsUrl}/notifications?token=${token}`);

        ws.onopen = () => {
          console.log('✅ Connected to Next.js notification WebSocket');
        };

        ws.onmessage = (event) => {
          try {
            const notification = JSON.parse(event.data);
            onNotification(notification);
          } catch (error) {
            console.error('Failed to parse notification:', error);
          }
        };

        ws.onerror = (error) => {
          console.error('WebSocket error, will attempt reconnect:', error);
        };

        ws.onclose = () => {
          console.log('Disconnected from notification service');
          // Attempt to reconnect after 5 seconds
          setTimeout(() => {
            this.connectToNotifications(onNotification);
          }, 5000);
        };

        return ws;
      } catch (error) {
        console.warn('WebSocket not available, falling back to polling:', error);
      }
    }

    // Fallback to polling if WebSocket is not available
    console.log('📡 Using polling fallback for notifications (checking every 30s)');
    let lastNotificationId: string | null = null;
    
    const pollInterval = setInterval(async () => {
      try {
        const data = await this.getNotifications({ isRead: false, limit: 5 });
        if (data.notifications.length > 0) {
          const latestNotification = data.notifications[0];
          // Only notify if it's a new notification
          if (latestNotification.id !== lastNotificationId) {
            lastNotificationId = latestNotification.id;
            onNotification(latestNotification);
          }
        }
      } catch (error) {
        console.error('Error polling notifications:', error);
      }
    }, 30000); // Poll every 30 seconds

    return { 
      close: () => {
        clearInterval(pollInterval);
        console.log('Stopped polling notifications');
      }
    };
  }
}

export const notificationService = new NotificationService();