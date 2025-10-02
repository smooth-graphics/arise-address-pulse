
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, SignupData, UserRole } from '@/types/auth';
import { authService } from '@/services';
import { useToast } from '@/hooks/use-toast';

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

  const { toast } = useToast();

  useEffect(() => {
    // Check for stored auth token and validate with API
    const token = localStorage.getItem('auth_token');
    if (token) {
      validateCurrentUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const validateCurrentUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Token validation failed:', error);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_role');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      
      localStorage.setItem('auth_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      localStorage.setItem('user_role', response.user.role);
      
      setUser(response.user);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error: any) {
      console.error('Login failed:', error);
      toast({
        title: "Login failed",
        description: error?.response?.data?.message || "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData) => {
    setIsLoading(true);
    try {
      await authService.signup(data);
      toast({
        title: "Account created",
        description: "Please check your email for verification code",
      });
    } catch (error: any) {
      console.error('Signup failed:', error);
      toast({
        title: "Signup failed",
        description: error?.response?.data?.message || "Failed to create account",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    try {
      authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_role');
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    }
  };

  const verifyOTP = async (otp: string) => {
    setIsLoading(true);
    try {
      const response = await authService.verifyOTP({ otp, email: user?.email || '' });
      
      localStorage.setItem('auth_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      localStorage.setItem('user_role', response.user.role);
      
      setUser(response.user);
      toast({
        title: "Account verified",
        description: "Your account has been successfully verified",
      });
    } catch (error: any) {
      console.error('OTP verification failed:', error);
      toast({
        title: "Verification failed",
        description: error?.response?.data?.message || "Invalid verification code",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword({ email });
      toast({
        title: "Reset email sent",
        description: "Check your email for password reset instructions",
      });
    } catch (error: any) {
      console.error('Forgot password failed:', error);
      toast({
        title: "Request failed",
        description: error?.response?.data?.message || "Failed to send reset email",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string) => {
    setIsLoading(true);
    try {
      await authService.resetPassword({ token, password, confirmPassword: password });
      toast({
        title: "Password reset",
        description: "Your password has been successfully reset",
      });
    } catch (error: any) {
      console.error('Password reset failed:', error);
      toast({
        title: "Reset failed",
        description: error?.response?.data?.message || "Failed to reset password",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const switchRole = (role: UserRole) => {
    // For demo purposes - in production this would require proper authorization
    if (user) {
      const updatedUser = { ...user, role };
      localStorage.setItem('user_role', role);
      setUser(updatedUser);
    }
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
