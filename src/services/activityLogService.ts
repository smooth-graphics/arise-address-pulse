import { apiClient, handleApiResponse } from '@/config/api';
import {
  ActivityRecord,
  ActivityFilters,
  ActivityStats
} from '@/types/activityLog';

class ActivityLogService {
  async getActivities(filters?: ActivityFilters) {
    const response = await apiClient.get('/activity', { params: filters });
    return handleApiResponse<{
      activities: ActivityRecord[];
      total: number;
      page: number;
      totalPages: number;
    }>(response);
  }

  async getActivityStats() {
    const response = await apiClient.get('/activity/stats');
    return handleApiResponse<ActivityStats>(response);
  }

  async getActivityDetails(activityId: string) {
    const response = await apiClient.get(`/activity/${activityId}`);
    return handleApiResponse<ActivityRecord>(response);
  }

  async exportActivities(filters?: ActivityFilters, format: 'csv' | 'xlsx' | 'json' = 'csv') {
    const response = await apiClient.get('/activity/export', {
      params: { ...filters, format },
      responseType: 'blob'
    });
    return response.data;
  }
}

export const activityLogService = new ActivityLogService();
