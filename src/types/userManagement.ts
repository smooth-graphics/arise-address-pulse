export interface UserManagementRecord {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber?: string;
  role: 'individual' | 'organization-admin' | 'organization-member' | 'government-admin' | 'government-agent';
  status: 'active' | 'suspended' | 'pending';
  organization?: string;
  createdAt: string;
  lastActive: string;
  totalVerifications?: number;
  accountBalance?: number;
}

export interface UserManagementFilters {
  search?: string;
  role?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface UserManagementStats {
  totalUsers: number;
  activeUsers: number;
  suspendedUsers: number;
  pendingUsers: number;
}

export interface UserActivity {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface UserDetailsResponse {
  user: UserManagementRecord;
  activities: UserActivity[];
  stats: {
    totalVerifications: number;
    totalSpent: number;
    avgVerificationTime: string;
  };
}
