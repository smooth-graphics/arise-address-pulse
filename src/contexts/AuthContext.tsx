
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, SignupData } from '@/types/auth';

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
    if (token) {
      // TODO: Validate token with API
      console.log('Token found, validating with API...');
      // Simulate API call
      setTimeout(() => {
        const mockUser: User = {
          id: '1',
          email: 'user@example.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'individual',
          isVerified: true,
          createdAt: new Date().toISOString(),
        };
        setUser(mockUser);
        setIsLoading(false);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      console.log('Logging in with:', { email, password });
      
      // Simulate API response
      const response = await new Promise<{ user: User; token: string }>((resolve) => {
        setTimeout(() => {
          resolve({
            user: {
              id: '1',
              email,
              firstName: 'John',
              lastName: 'Doe',
              role: 'individual',
              isVerified: true,
              createdAt: new Date().toISOString(),
            },
            token: 'mock_jwt_token',
          });
        }, 1000);
      });

      localStorage.setItem('auth_token', response.token);
      setUser(response.user);
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
    setUser(null);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
