import { apiClient, handleApiResponse } from '@/config/api';
import {
  UserManagementRecord,
  UserManagementFilters,
  UserManagementStats,
  UserDetailsResponse
} from '@/types/userManagement';

class UserManagementService {
  async getUsers(filters?: UserManagementFilters) {
    const response = await apiClient.get('/admin/users', { params: filters });
    return handleApiResponse<{
      users: UserManagementRecord[];
      total: number;
      page: number;
      totalPages: number;
    }>(response);
  }

  async getUserStats() {
    const response = await apiClient.get('/admin/users/stats');
    return handleApiResponse<UserManagementStats>(response);
  }

  async getUserDetails(userId: string) {
    const response = await apiClient.get(`/admin/users/${userId}`);
    return handleApiResponse<UserDetailsResponse>(response);
  }

  async updateUserRole(userId: string, role: string) {
    const response = await apiClient.patch(`/admin/users/${userId}/role`, { role });
    return handleApiResponse<UserManagementRecord>(response);
  }

  async updateUserStatus(userId: string, status: 'active' | 'suspended') {
    const response = await apiClient.patch(`/admin/users/${userId}/status`, { status });
    return handleApiResponse<UserManagementRecord>(response);
  }

  async deleteUser(userId: string) {
    const response = await apiClient.delete(`/admin/users/${userId}`);
    return handleApiResponse<void>(response);
  }

  async bulkInviteUsers(emails: string[]) {
    const response = await apiClient.post('/admin/users/bulk-invite', { emails });
    return handleApiResponse<{ success: number; failed: number }>(response);
  }
}

export const userManagementService = new UserManagementService();
