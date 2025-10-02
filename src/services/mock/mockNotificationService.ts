import {
  Notification,
  NotificationPreferences,
  NotificationStats,
} from '../notificationService';

class MockNotificationService {
  private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  private notifications: Notification[] = this.generateMockNotifications();

  private generateMockNotifications(): Notification[] {
    const titles = [
      'Verification Complete',
      'Wallet Top-up Successful',
      'Bulk Upload Processing',
      'New Feature Available',
      'System Maintenance Notice',
    ];

    const messages = [
      'Your address verification has been completed successfully.',
      'Your wallet has been topped up with ₦10,000.',
      'Your bulk upload of 50 addresses is now processing.',
      'Check out our new API integration features.',
      'Scheduled maintenance on Sunday 2AM-4AM WAT.',
    ];

    const types = ['success', 'info', 'warning', 'error'] as const;

    return Array.from({ length: 20 }, (_, i) => ({
      id: `notif-${String(i + 1).padStart(6, '0')}`,
      userId: 'demo-user',
      type: types[Math.floor(Math.random() * types.length)],
      title: titles[Math.floor(Math.random() * titles.length)],
      message: messages[Math.floor(Math.random() * messages.length)],
      isRead: i > 5,
      createdAt: new Date(Date.now() - i * 3 * 60 * 60 * 1000).toISOString(),
      actionUrl: i % 3 === 0 ? '/dashboard/history' : undefined,
    }));
  }

  async getNotifications(params?: any): Promise<any> {
    await this.delay(500);

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;

    let filtered = [...this.notifications];
    
    if (params?.type) {
      filtered = filtered.filter(n => n.type === params.type);
    }
    
    if (params?.isRead !== undefined) {
      filtered = filtered.filter(n => n.isRead === params.isRead);
    }

    const unreadCount = this.notifications.filter(n => !n.isRead).length;

    return {
      notifications: filtered.slice(start, end),
      total: filtered.length,
      page,
      totalPages: Math.ceil(filtered.length / limit),
      unreadCount,
    };
  }

  async getNotification(notificationId: string): Promise<Notification> {
    await this.delay(300);

    const notification = this.notifications.find(n => n.id === notificationId);
    if (!notification) {
      throw new Error('Notification not found');
    }

    return notification;
  }

  async markAsRead(notificationId: string): Promise<{ message: string }> {
    await this.delay(300);

    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
    }

    return { message: 'Notification marked as read' };
  }

  async markAllAsRead(): Promise<{ message: string; updatedCount: number }> {
    await this.delay(500);

    const unreadCount = this.notifications.filter(n => !n.isRead).length;
    this.notifications.forEach(n => n.isRead = true);

    return {
      message: 'All notifications marked as read',
      updatedCount: unreadCount,
    };
  }

  async deleteNotification(notificationId: string): Promise<{ message: string }> {
    await this.delay(400);

    const index = this.notifications.findIndex(n => n.id === notificationId);
    if (index > -1) {
      this.notifications.splice(index, 1);
    }

    return { message: 'Notification deleted' };
  }

  async deleteAllNotifications(): Promise<{ message: string; deletedCount: number }> {
    await this.delay(600);

    const count = this.notifications.length;
    this.notifications = [];

    return {
      message: 'All notifications deleted',
      deletedCount: count,
    };
  }

  async getNotificationStats(): Promise<NotificationStats> {
    await this.delay(400);

    const unreadCount = this.notifications.filter(n => !n.isRead).length;

    return {
      total: this.notifications.length,
      unread: unreadCount,
      byType: {
        info: this.notifications.filter(n => n.type === 'info').length,
        success: this.notifications.filter(n => n.type === 'success').length,
        warning: this.notifications.filter(n => n.type === 'warning').length,
        error: this.notifications.filter(n => n.type === 'error').length,
      },
    };
  }

  async getPreferences(): Promise<NotificationPreferences> {
    await this.delay(400);

    return {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      categories: {
        verificationUpdates: true,
        walletUpdates: true,
        securityAlerts: true,
        systemUpdates: true,
        marketingEmails: false,
      },
    };
  }

  async updatePreferences(preferences: Partial<NotificationPreferences>): Promise<NotificationPreferences> {
    await this.delay(500);

    const current = await this.getPreferences();
    
    return {
      ...current,
      ...preferences,
      categories: {
        ...current.categories,
        ...(preferences.categories || {}),
      },
    };
  }

  async testNotification(type: 'email' | 'sms' | 'push'): Promise<{ message: string }> {
    await this.delay(800);

    return {
      message: `Test ${type} notification sent successfully`,
    };
  }

  connectToNotifications(onNotification: (notification: Notification) => void): WebSocket | null {
    // Mock WebSocket - return null for demo mode
    console.log('[Demo Mode] WebSocket notifications not available in demo mode');
    return null;
  }
}

export const mockNotificationService = new MockNotificationService();
