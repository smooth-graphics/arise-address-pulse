import { 
  UserManagementRecord, 
  UserManagementFilters, 
  UserManagementStats,
  UserDetailsResponse,
  UserActivity
} from '@/types/userManagement';

class MockUserManagementService {
  private delay = (ms: number = 600) => new Promise(resolve => setTimeout(resolve, ms));

  private mockUsers: UserManagementRecord[] = [
    {
      id: '1',
      email: 'adebayo.johnson@example.com',
      firstName: 'Adebayo',
      lastName: 'Johnson',
      fullName: 'Adebayo Johnson',
      phoneNumber: '+234 803 456 7890',
      role: 'individual',
      status: 'active',
      createdAt: '2024-01-15T10:30:00Z',
      lastActive: '2024-03-10T14:22:00Z',
      totalVerifications: 45,
      accountBalance: 15000
    },
    {
      id: '2',
      email: 'chioma.okafor@techcorp.ng',
      firstName: 'Chioma',
      lastName: 'Okafor',
      fullName: 'Chioma Okafor',
      phoneNumber: '+234 901 234 5678',
      role: 'organization-admin',
      status: 'active',
      organization: 'TechCorp Nigeria',
      createdAt: '2024-02-01T09:15:00Z',
      lastActive: '2024-03-10T16:45:00Z',
      totalVerifications: 230,
      accountBalance: 450000
    },
    {
      id: '3',
      email: 'ibrahim.mohammed@verifyng.gov',
      firstName: 'Ibrahim',
      lastName: 'Mohammed',
      fullName: 'Ibrahim Mohammed',
      phoneNumber: '+234 805 678 9012',
      role: 'government-admin',
      status: 'active',
      organization: 'Ministry of Interior',
      createdAt: '2023-11-20T08:00:00Z',
      lastActive: '2024-03-10T17:10:00Z',
      totalVerifications: 1250
    },
    {
      id: '4',
      email: 'ngozi.eze@example.com',
      firstName: 'Ngozi',
      lastName: 'Eze',
      fullName: 'Ngozi Eze',
      phoneNumber: '+234 807 890 1234',
      role: 'individual',
      status: 'suspended',
      createdAt: '2024-02-20T11:45:00Z',
      lastActive: '2024-03-05T10:20:00Z',
      totalVerifications: 12,
      accountBalance: 3000
    },
    {
      id: '5',
      email: 'oluwaseun.balogun@enterprise.ng',
      firstName: 'Oluwaseun',
      lastName: 'Balogun',
      fullName: 'Oluwaseun Balogun',
      phoneNumber: '+234 809 012 3456',
      role: 'organization-member',
      status: 'active',
      organization: 'Enterprise Solutions Ltd',
      createdAt: '2024-03-01T07:30:00Z',
      lastActive: '2024-03-10T15:30:00Z',
      totalVerifications: 67,
      accountBalance: 0
    }
  ];

  async getUsers(filters?: UserManagementFilters): Promise<{
    users: UserManagementRecord[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    await this.delay();

    let filtered = [...this.mockUsers];

    // Apply filters
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(u => 
        u.fullName.toLowerCase().includes(search) ||
        u.email.toLowerCase().includes(search)
      );
    }

    if (filters?.role) {
      filtered = filtered.filter(u => u.role === filters.role);
    }

    if (filters?.status) {
      filtered = filtered.filter(u => u.status === filters.status);
    }

    // Pagination
    const page = filters?.page || 1;
    const limit = filters?.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedUsers = filtered.slice(start, end);

    return {
      users: paginatedUsers,
      total: filtered.length,
      page,
      totalPages: Math.ceil(filtered.length / limit)
    };
  }

  async getUserStats(): Promise<UserManagementStats> {
    await this.delay(300);

    return {
      totalUsers: this.mockUsers.length,
      activeUsers: this.mockUsers.filter(u => u.status === 'active').length,
      suspendedUsers: this.mockUsers.filter(u => u.status === 'suspended').length,
      pendingUsers: this.mockUsers.filter(u => u.status === 'pending').length
    };
  }

  async getUserDetails(userId: string): Promise<UserDetailsResponse> {
    await this.delay();

    const user = this.mockUsers.find(u => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }

    const activities: UserActivity[] = [
      {
        id: '1',
        action: 'Login',
        description: 'Logged in from Chrome browser',
        timestamp: '2024-03-10T16:45:00Z',
        ipAddress: '197.210.85.123',
        userAgent: 'Mozilla/5.0 Chrome/121.0.0.0'
      },
      {
        id: '2',
        action: 'Verification',
        description: 'Performed address verification',
        timestamp: '2024-03-10T15:30:00Z'
      },
      {
        id: '3',
        action: 'Payment',
        description: 'Added ₦10,000 to wallet',
        timestamp: '2024-03-09T10:15:00Z'
      }
    ];

    return {
      user,
      activities,
      stats: {
        totalVerifications: user.totalVerifications || 0,
        totalSpent: 25000,
        avgVerificationTime: '2.5 mins'
      }
    };
  }

  async updateUserRole(userId: string, role: string): Promise<UserManagementRecord> {
    await this.delay();

    const user = this.mockUsers.find(u => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.role = role as any;
    return user;
  }

  async updateUserStatus(userId: string, status: 'active' | 'suspended'): Promise<UserManagementRecord> {
    await this.delay();

    const user = this.mockUsers.find(u => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.status = status;
    return user;
  }

  async deleteUser(userId: string): Promise<void> {
    await this.delay();

    const index = this.mockUsers.findIndex(u => u.id === userId);
    if (index === -1) {
      throw new Error('User not found');
    }

    this.mockUsers.splice(index, 1);
  }

  async bulkInviteUsers(emails: string[]): Promise<{ success: number; failed: number }> {
    await this.delay(1500);

    return {
      success: emails.length,
      failed: 0
    };
  }
}

export const mockUserManagementService = new MockUserManagementService();
