import { apiClient } from '@/config/api';
import { MemberUsageLimit, UsageLimitNotification } from '@/types/dashboard';

export class UsageLimitService {
  /**
   * Get usage limit information for a member
   */
  async getMemberUsageLimit(userId: string): Promise<MemberUsageLimit> {
    const response = await apiClient.get<MemberUsageLimit>(`/api/usage-limits/${userId}`);
    return response.data;
  }

  /**
   * Check if member has sufficient units
   */
  async checkUsageLimit(userId: string, requiredUnits: number = 1): Promise<boolean> {
    const limit = await this.getMemberUsageLimit(userId);
    return limit.remainingUnits >= requiredUnits;
  }

  /**
   * Decrement usage when verification is performed
   */
  async decrementUsage(userId: string, units: number = 1): Promise<MemberUsageLimit> {
    const response = await apiClient.post<MemberUsageLimit>(`/api/usage-limits/${userId}/decrement`, {
      units
    });
    return response.data;
  }

  /**
   * Get usage notifications for member
   */
  async getUsageNotifications(userId: string): Promise<UsageLimitNotification[]> {
    const response = await apiClient.get<UsageLimitNotification[]>(`/api/usage-limits/${userId}/notifications`);
    return response.data;
  }

  /**
   * Mark notification as read
   */
  async markNotificationRead(notificationId: string): Promise<void> {
    await apiClient.patch(`/api/usage-limits/notifications/${notificationId}/read`);
  }

  /**
   * Calculate usage percentage
   */
  calculateUsagePercentage(limit: MemberUsageLimit): number {
    if (limit.allocatedUnits === 0) return 0;
    return Math.round((limit.usedUnits / limit.allocatedUnits) * 100);
  }

  /**
   * Get alert level based on usage percentage
   */
  getAlertLevel(limit: MemberUsageLimit): 'none' | 'warning' | 'critical' | 'depleted' {
    const percentage = this.calculateUsagePercentage(limit);
    
    if (limit.remainingUnits === 0) return 'depleted';
    if (percentage >= limit.criticalThreshold) return 'critical';
    if (percentage >= limit.warningThreshold) return 'warning';
    return 'none';
  }
}

export const usageLimitService = new UsageLimitService();
