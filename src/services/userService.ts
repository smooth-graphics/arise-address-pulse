import { apiClient, handleApiResponse, ApiResponse } from '@/config/api';
import { User, UserRole } from '@/types/auth';

export interface UserProfile extends User {
  avatar?: string;
  timezone?: string;
  language?: string;
  notifications?: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  twoFactorEnabled?: boolean;
}

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  verificationUpdates: boolean;
  walletUpdates: boolean;
  securityAlerts: boolean;
  marketingEmails: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  loginNotifications: boolean;
  deviceTrust: boolean;
  sessionTimeout: number; // in minutes
}

export interface OrganizationMember {
  id: string;
  user: User;
  role: 'admin' | 'member';
  permissions: string[];
  joinedAt: string;
  lastActive?: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface InviteUserRequest {
  email: string;
  role: 'admin' | 'member';
  permissions?: string[];
}

class UserService {
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>('/api/v1/user/me');
    return handleApiResponse(response);
  }

  async getUserHello(): Promise<{ message: string; firstName: string }> {
    const response = await apiClient.get<ApiResponse<{ message: string; firstName: string }>>('/api/v1/user/hello');
    return handleApiResponse(response);
  }

  async getProfile(): Promise<UserProfile> {
    const response = await apiClient.get<ApiResponse<UserProfile>>('/api/v1/user/profile');
    return handleApiResponse(response);
  }

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    const response = await apiClient.put<ApiResponse<UserProfile>>('/api/v1/user/profile', data);
    return handleApiResponse(response);
  }

  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await apiClient.post<ApiResponse<{ avatarUrl: string }>>(
      '/api/v1/user/avatar',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return handleApiResponse(response);
  }

  async getNotificationSettings(): Promise<NotificationSettings> {
    const response = await apiClient.get<ApiResponse<NotificationSettings>>('/api/v1/user/notifications');
    return handleApiResponse(response);
  }

  async updateNotificationSettings(settings: Partial<NotificationSettings>): Promise<NotificationSettings> {
    const response = await apiClient.put<ApiResponse<NotificationSettings>>(
      '/api/v1/user/notifications',
      settings
    );
    return handleApiResponse(response);
  }

  async getSecuritySettings(): Promise<SecuritySettings> {
    const response = await apiClient.get<ApiResponse<SecuritySettings>>('/api/v1/user/security');
    return handleApiResponse(response);
  }

  async updateSecuritySettings(settings: Partial<SecuritySettings>): Promise<SecuritySettings> {
    const response = await apiClient.put<ApiResponse<SecuritySettings>>(
      '/api/v1/user/security',
      settings
    );
    return handleApiResponse(response);
  }

  async enableTwoFactor(): Promise<{ qrCode: string; backupCodes: string[] }> {
    const response = await apiClient.post<ApiResponse<{ qrCode: string; backupCodes: string[] }>>(
      '/api/v1/user/2fa/enable'
    );
    return handleApiResponse(response);
  }

  async verifyTwoFactor(token: string): Promise<{ message: string }> {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      '/api/v1/user/2fa/verify',
      { token }
    );
    return handleApiResponse(response);
  }

  async disableTwoFactor(token: string): Promise<{ message: string }> {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      '/api/v1/user/2fa/disable',
      { token }
    );
    return handleApiResponse(response);
  }

  // Organization management (for organization users)
  async getOrganizationMembers(): Promise<OrganizationMember[]> {
    const response = await apiClient.get<ApiResponse<OrganizationMember[]>>('/api/v1/user/organization/members');
    return handleApiResponse(response);
  }

  async inviteUser(data: InviteUserRequest): Promise<{ message: string }> {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      '/api/v1/user/organization/invite',
      data
    );
    return handleApiResponse(response);
  }

  async removeMember(memberId: string): Promise<{ message: string }> {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(
      `/api/v1/user/organization/members/${memberId}`
    );
    return handleApiResponse(response);
  }

  async updateMemberRole(
    memberId: string,
    role: 'admin' | 'member',
    permissions?: string[]
  ): Promise<OrganizationMember> {
    const response = await apiClient.put<ApiResponse<OrganizationMember>>(
      `/api/v1/user/organization/members/${memberId}`,
      { role, permissions }
    );
    return handleApiResponse(response);
  }

  async getActiveSessions(): Promise<Array<{
    id: string;
    device: string;
    location: string;
    ip: string;
    lastActive: string;
    current: boolean;
  }>> {
    const response = await apiClient.get<ApiResponse<Array<{
      id: string;
      device: string;
      location: string;
      ip: string;
      lastActive: string;
      current: boolean;
    }>>>('/api/v1/user/sessions');
    return handleApiResponse(response);
  }

  async terminateSession(sessionId: string): Promise<{ message: string }> {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(
      `/api/v1/user/sessions/${sessionId}`
    );
    return handleApiResponse(response);
  }

  async deleteAccount(password: string): Promise<{ message: string }> {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      '/api/v1/user/delete-account',
      { password }
    );
    return handleApiResponse(response);
  }
}

export const userService = new UserService();