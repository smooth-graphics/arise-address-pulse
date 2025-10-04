import { MemberUsageLimit, UsageLimitNotification } from '@/types/dashboard';

export class MockUsageLimitService {
  private usageLimits: Map<string, MemberUsageLimit> = new Map();
  private notifications: UsageLimitNotification[] = [];

  constructor() {
    // Initialize mock data for demo organization member
    this.usageLimits.set('demo-org-member-001', {
      userId: 'demo-org-member-001',
      allocatedUnits: 100,
      usedUnits: 15,
      remainingUnits: 85,
      resetDate: '2025-11-04T00:00:00Z',
      warningThreshold: 80,
      criticalThreshold: 95,
    });
  }

  async getMemberUsageLimit(userId: string): Promise<MemberUsageLimit> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const limit = this.usageLimits.get(userId) || {
          userId,
          allocatedUnits: 100,
          usedUnits: 0,
          remainingUnits: 100,
          warningThreshold: 80,
          criticalThreshold: 95,
        };
        resolve(limit);
      }, 300);
    });
  }

  async checkUsageLimit(userId: string, requiredUnits: number = 1): Promise<boolean> {
    const limit = await this.getMemberUsageLimit(userId);
    return limit.remainingUnits >= requiredUnits;
  }

  async decrementUsage(userId: string, units: number = 1): Promise<MemberUsageLimit> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentLimit = this.usageLimits.get(userId) || {
          userId,
          allocatedUnits: 100,
          usedUnits: 0,
          remainingUnits: 100,
          warningThreshold: 80,
          criticalThreshold: 95,
        };

        const newLimit: MemberUsageLimit = {
          ...currentLimit,
          usedUnits: currentLimit.usedUnits + units,
          remainingUnits: Math.max(0, currentLimit.remainingUnits - units),
        };

        this.usageLimits.set(userId, newLimit);

        // Generate notification if threshold crossed
        const percentage = (newLimit.usedUnits / newLimit.allocatedUnits) * 100;
        if (percentage >= newLimit.criticalThreshold) {
          this.addNotification(userId, 'critical', percentage);
        } else if (percentage >= newLimit.warningThreshold) {
          this.addNotification(userId, 'warning', percentage);
        }

        resolve(newLimit);
      }, 300);
    });
  }

  async getUsageNotifications(userId: string): Promise<UsageLimitNotification[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userNotifications = this.notifications.filter(n => n.userId === userId);
        resolve(userNotifications);
      }, 300);
    });
  }

  async markNotificationRead(notificationId: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
          notification.isRead = true;
        }
        resolve();
      }, 300);
    });
  }

  private addNotification(
    userId: string, 
    type: 'warning' | 'critical' | 'depleted', 
    percentage: number
  ) {
    const messages = {
      warning: `You've used ${Math.round(percentage)}% of your allocated verification units.`,
      critical: `Critical: Only ${100 - Math.round(percentage)}% of your units remaining!`,
      depleted: 'You have no remaining verification units. Please contact your administrator.',
    };

    const notification: UsageLimitNotification = {
      id: `notif-${Date.now()}`,
      userId,
      type,
      message: messages[type],
      threshold: percentage,
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    this.notifications.push(notification);
  }

  calculateUsagePercentage(limit: MemberUsageLimit): number {
    if (limit.allocatedUnits === 0) return 0;
    return Math.round((limit.usedUnits / limit.allocatedUnits) * 100);
  }

  getAlertLevel(limit: MemberUsageLimit): 'none' | 'warning' | 'critical' | 'depleted' {
    const percentage = this.calculateUsagePercentage(limit);
    
    if (limit.remainingUnits === 0) return 'depleted';
    if (percentage >= limit.criticalThreshold) return 'critical';
    if (percentage >= limit.warningThreshold) return 'warning';
    return 'none';
  }
}

export const mockUsageLimitService = new MockUsageLimitService();
