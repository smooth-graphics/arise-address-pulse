
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, SignupData, UserRole } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token on mount
    const token = localStorage.getItem('auth_token');
    const storedRole = localStorage.getItem('user_role') as UserRole;
    if (token) {
      // TODO: Validate token with API
      console.log('Token found, validating with API...');
      // Simulate API call with demo users based on role
      setTimeout(() => {
        const mockUser: User = getDemoUser(storedRole || 'individual');
        setUser(mockUser);
        setIsLoading(false);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  }, []);

  const getDemoUser = (role: UserRole): User => {
    const baseUser = {
      id: '1',
      email: 'user@example.com',
      firstName: 'Onu',
      lastName: 'Omar-Ikaige',
      isVerified: true,
      createdAt: new Date().toISOString(),
    };

    switch (role) {
      case 'organization-admin':
        return {
          ...baseUser,
          email: 'admin@techcorp.com',
          firstName: 'Onu',
          lastName: 'Omar-Ikaige',
          role: 'organization-admin',
          organizationId: 'org-1',
          organizationName: 'TechCorp Nigeria',
        };
      case 'organization-member':
        return {
          ...baseUser,
          email: 'member@techcorp.com',
          firstName: 'Onu',
          lastName: 'Omar-Ikaige',
          role: 'organization-member',
          organizationId: 'org-1',
          organizationName: 'TechCorp Nigeria',
        };
      case 'admin':
        return {
          ...baseUser,
          email: 'gov@fmc.gov.ng',
          firstName: 'Dr. Onu',
          lastName: 'Omar-Ikaige',
          role: 'admin',
        };
      default:
        return {
          ...baseUser,
          role: 'individual',
        };
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      console.log('Logging in with:', { email, password });
      
      // Determine role based on email for demo purposes
      let role: UserRole = 'individual';
      if (email.includes('admin@')) {
        role = 'organization-admin';
      } else if (email.includes('member@')) {
        role = 'organization-member';
      } else if (email.includes('gov@') || email.includes('@fmc.')) {
        role = 'admin';
      }
      
      const mockUser = getDemoUser(role);
      mockUser.email = email;

      localStorage.setItem('auth_token', 'mock_jwt_token');
      localStorage.setItem('user_role', role);
      setUser(mockUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      console.log('Signing up with:', data);
      
      // Simulate API response
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // After signup, user needs to verify OTP
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    const newUser = getDemoUser(role);
    localStorage.setItem('user_role', role);
    setUser(newUser);
  };

  const verifyOTP = async (otp: string) => {
    // TODO: Replace with actual API call
    console.log('Verifying OTP:', otp);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const forgotPassword = async (email: string) => {
    // TODO: Replace with actual API call
    console.log('Forgot password for:', email);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const resetPassword = async (token: string, password: string) => {
    // TODO: Replace with actual API call
    console.log('Resetting password with token:', token);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    verifyOTP,
    forgotPassword,
    resetPassword,
    switchRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
