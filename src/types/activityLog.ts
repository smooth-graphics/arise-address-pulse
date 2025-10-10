export interface ActivityRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  action: string;
  actionType: 'auth' | 'verification' | 'payment' | 'settings' | 'admin' | 'system';
  description: string;
  entityType?: 'user' | 'verification' | 'payment' | 'api_key' | 'organization';
  entityId?: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
}

export interface ActivityFilters {
  search?: string;
  userId?: string;
  actionType?: string;
  severity?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface ActivityStats {
  totalActivities: number;
  todayActivities: number;
  criticalEvents: number;
  activeUsers: number;
}

export interface ActivityExportRequest {
  filters: ActivityFilters;
  format: 'csv' | 'xlsx' | 'json';
}
