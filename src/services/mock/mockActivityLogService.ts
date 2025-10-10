import {
  ActivityRecord,
  ActivityFilters,
  ActivityStats
} from '@/types/activityLog';

class MockActivityLogService {
  private delay = (ms: number = 600) => new Promise(resolve => setTimeout(resolve, ms));

  private mockActivities: ActivityRecord[] = [
    {
      id: '1',
      userId: 'user-1',
      userName: 'Adebayo Johnson',
      userEmail: 'adebayo.johnson@example.com',
      action: 'User Login',
      actionType: 'auth',
      description: 'User logged in successfully',
      timestamp: '2024-03-10T16:45:00Z',
      ipAddress: '197.210.85.123',
      userAgent: 'Mozilla/5.0 Chrome/121.0.0.0',
      severity: 'info'
    },
    {
      id: '2',
      userId: 'user-2',
      userName: 'Chioma Okafor',
      userEmail: 'chioma.okafor@techcorp.ng',
      action: 'Verification Submitted',
      actionType: 'verification',
      description: 'New verification request submitted',
      entityType: 'verification',
      entityId: 'VER-2024-001',
      timestamp: '2024-03-10T15:30:00Z',
      severity: 'info'
    },
    {
      id: '3',
      userId: 'user-3',
      userName: 'Ibrahim Mohammed',
      userEmail: 'ibrahim.mohammed@verifyng.gov',
      action: 'User Role Updated',
      actionType: 'admin',
      description: 'Changed user role from member to admin',
      entityType: 'user',
      entityId: 'user-5',
      timestamp: '2024-03-10T14:20:00Z',
      severity: 'warning'
    },
    {
      id: '4',
      userId: 'user-4',
      userName: 'Ngozi Eze',
      userEmail: 'ngozi.eze@example.com',
      action: 'Payment Failed',
      actionType: 'payment',
      description: 'Wallet top-up payment failed',
      entityType: 'payment',
      entityId: 'PAY-2024-042',
      timestamp: '2024-03-10T13:15:00Z',
      severity: 'error'
    },
    {
      id: '5',
      userId: 'user-2',
      userName: 'Chioma Okafor',
      userEmail: 'chioma.okafor@techcorp.ng',
      action: 'API Key Generated',
      actionType: 'admin',
      description: 'New API key created for production environment',
      entityType: 'api_key',
      entityId: 'key-prod-001',
      timestamp: '2024-03-10T12:00:00Z',
      severity: 'warning'
    },
    {
      id: '6',
      userId: 'system',
      userName: 'System',
      userEmail: 'system@verifyng.com',
      action: 'System Backup',
      actionType: 'system',
      description: 'Automated daily backup completed successfully',
      timestamp: '2024-03-10T02:00:00Z',
      severity: 'info'
    },
    {
      id: '7',
      userId: 'user-1',
      userName: 'Adebayo Johnson',
      userEmail: 'adebayo.johnson@example.com',
      action: 'Multiple Failed Login Attempts',
      actionType: 'auth',
      description: 'Account locked after 5 failed login attempts',
      timestamp: '2024-03-09T18:30:00Z',
      ipAddress: '102.89.32.45',
      severity: 'critical'
    }
  ];

  async getActivities(filters?: ActivityFilters): Promise<{
    activities: ActivityRecord[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    await this.delay();

    let filtered = [...this.mockActivities];

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(a =>
        a.userName.toLowerCase().includes(search) ||
        a.action.toLowerCase().includes(search) ||
        a.description.toLowerCase().includes(search)
      );
    }

    if (filters?.actionType) {
      filtered = filtered.filter(a => a.actionType === filters.actionType);
    }

    if (filters?.severity) {
      filtered = filtered.filter(a => a.severity === filters.severity);
    }

    if (filters?.userId) {
      filtered = filtered.filter(a => a.userId === filters.userId);
    }

    if (filters?.startDate) {
      filtered = filtered.filter(a => new Date(a.timestamp) >= new Date(filters.startDate!));
    }

    if (filters?.endDate) {
      filtered = filtered.filter(a => new Date(a.timestamp) <= new Date(filters.endDate!));
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      activities: filtered.slice(start, end),
      total: filtered.length,
      page,
      totalPages: Math.ceil(filtered.length / limit)
    };
  }

  async getActivityStats(): Promise<ActivityStats> {
    await this.delay(300);

    const today = new Date().toISOString().split('T')[0];
    const todayActivities = this.mockActivities.filter(a =>
      a.timestamp.startsWith(today)
    );

    return {
      totalActivities: this.mockActivities.length,
      todayActivities: todayActivities.length,
      criticalEvents: this.mockActivities.filter(a => a.severity === 'critical').length,
      activeUsers: new Set(this.mockActivities.map(a => a.userId)).size
    };
  }

  async getActivityDetails(activityId: string): Promise<ActivityRecord> {
    await this.delay();

    const activity = this.mockActivities.find(a => a.id === activityId);
    if (!activity) {
      throw new Error('Activity not found');
    }

    return activity;
  }

  async exportActivities(filters?: ActivityFilters): Promise<Blob> {
    await this.delay(1000);

    // Mock CSV export
    const csvContent = 'id,user,action,timestamp,severity\n';
    return new Blob([csvContent], { type: 'text/csv' });
  }
}

export const mockActivityLogService = new MockActivityLogService();
