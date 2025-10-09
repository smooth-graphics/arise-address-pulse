import { LoginRequest, LoginResponse, VerifyOTPRequest, ForgotPasswordRequest, ResetPasswordRequest } from '../authService';
import { SignupData, User } from '@/types/auth';

// Demo users with predefined credentials
const DEMO_USERS = {
  individual: {
    id: 'demo-individual-001',
    email: 'demo@individual.com',
    phone: '+234-801-234-5678',
    firstName: 'onu.omar-ikaige',
    lastName: '',
    role: 'individual' as const,
    isVerified: true,
    createdAt: '2024-01-15T10:30:00Z',
  },
  organizationAdmin: {
    id: 'demo-org-admin-001',
    email: 'admin@arisetech.com',
    phone: '+234-802-345-6789',
    firstName: 'onu.omar-ikaige',
    lastName: '',
    role: 'organization-admin' as const,
    organizationId: 'org-arise-001',
    organizationName: 'AriseTech Solutions',
    isVerified: true,
    createdAt: '2024-01-10T08:00:00Z',
  },
  organizationMember: {
    id: 'demo-org-member-001',
    email: 'member@arisetech.com',
    phone: '+234-803-456-7890',
    firstName: 'onu.omar-ikaige',
    lastName: '',
    role: 'organization-member' as const,
    organizationId: 'org-arise-001',
    organizationName: 'AriseTech Solutions',
    isVerified: true,
    createdAt: '2024-01-12T09:15:00Z',
  },
};

const DEMO_PASSWORD = 'Demo123!';

class MockAuthService {
  private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    await this.delay(800);

    const user = Object.values(DEMO_USERS).find(u => u.email === credentials.email);
    
    if (!user || credentials.password !== DEMO_PASSWORD) {
      throw new Error('Invalid email or password');
    }

    return {
      access_token: `mock_access_token_${user.id}`,
      refresh_token: `mock_refresh_token_${user.id}`,
      user,
    };
  }

  async signup(data: SignupData): Promise<{ message: string; requiresVerification: boolean }> {
    await this.delay(1000);
    
    const existingUser = Object.values(DEMO_USERS).find(u => u.email === data.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    return {
      message: 'Account created successfully. Please check your email to verify your account.',
      requiresVerification: true,
    };
  }

  async verifyOTP(data: VerifyOTPRequest): Promise<LoginResponse> {
    await this.delay(600);

    const user = Object.values(DEMO_USERS).find(u => u.email === data.email);
    
    if (!user) {
      throw new Error('User not found');
    }

    if (data.otp !== '123456') {
      throw new Error('Invalid verification code');
    }

    return {
      access_token: `mock_access_token_${user.id}`,
      refresh_token: `mock_refresh_token_${user.id}`,
      user,
    };
  }

  async resendOTP(email: string): Promise<{ message: string }> {
    await this.delay(800);
    
    const user = Object.values(DEMO_USERS).find(u => u.email === email);
    
    if (!user) {
      throw new Error('User not found');
    }

    return {
      message: 'A new verification code has been sent to your email.',
    };
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<{ message: string }> {
    await this.delay(800);
    
    return {
      message: 'Password reset instructions have been sent to your email.',
    };
  }

  async resetPassword(data: ResetPasswordRequest): Promise<{ message: string }> {
    await this.delay(800);
    
    return {
      message: 'Password has been reset successfully. You can now log in with your new password.',
    };
  }

  async refreshToken(): Promise<{ access_token: string; refresh_token: string }> {
    await this.delay(300);
    
    const token = localStorage.getItem('auth_token') || '';
    const userId = token.replace('mock_access_token_', '').replace('_refreshed', '');
    
    return {
      access_token: `mock_access_token_${userId}_refreshed`,
      refresh_token: `mock_refresh_token_${userId}_refreshed`,
    };
  }

  async getCurrentUser(): Promise<User> {
    await this.delay(400);
    
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('Not authenticated');
    }

    const userId = token.replace('mock_access_token_', '').replace('_refreshed', '');
    const user = Object.values(DEMO_USERS).find(u => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async logout(): Promise<void> {
    await this.delay(300);
    
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    await this.delay(600);
    
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('Not authenticated');
    }

    const userId = token.replace('mock_access_token_', '').replace('_refreshed', '');
    const user = Object.values(DEMO_USERS).find(u => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    return { ...user, ...data };
  }

  async changePassword(): Promise<{ message: string }> {
    await this.delay(600);
    
    return {
      message: 'Password changed successfully',
    };
  }
}

export const mockAuthService = new MockAuthService();
export { DEMO_USERS, DEMO_PASSWORD };
