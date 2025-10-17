import { apiClient, handleApiResponse, ApiResponse } from "@/config/api";
import { User, SignupData, UserRole } from "@/types/auth";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>("/api/v1/auth/login", credentials);
    return handleApiResponse(response);
  }

  async signup(data: SignupData): Promise<{ message: string; requiresVerification: boolean }> {
    const response = await apiClient.post<ApiResponse<{ message: string; requiresVerification: boolean }>>(
      "/api/v1/auth/register",
      data,
    );
    return handleApiResponse(response);
  }

  async verifyOTP(data: VerifyOTPRequest): Promise<LoginResponse> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>("/api/v1/auth/verify-email", data);
    return handleApiResponse(response);
  }

  async resendOTP(email: string): Promise<{ message: string }> {
    const response = await apiClient.post<ApiResponse<{ message: string }>>("/api/v1/auth/resend-verification-email", { email });
    return handleApiResponse(response);
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<{ message: string }> {
    const response = await apiClient.post<ApiResponse<{ message: string }>>("/api/v1/auth/forgot-password", data);
    return handleApiResponse(response);
  }

  async resetPassword(data: ResetPasswordRequest): Promise<{ message: string }> {
    const response = await apiClient.post<ApiResponse<{ message: string }>>("/api/v1/auth/reset-password", data);
    return handleApiResponse(response);
  }

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const response = await apiClient.post<ApiResponse<RefreshTokenResponse>>("/api/v1/auth/refresh", {
      refresh_token: refreshToken,
    });
    return handleApiResponse(response);
  }

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>("/api/v1/user/me");
    return handleApiResponse(response);
  }

  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      try {
        await apiClient.post("/auth/logout", { refresh_token: refreshToken });
      } catch (error) {
        // Ignore logout errors, clear local storage anyway
        console.warn("Logout request failed:", error);
      }
    }

    // Clear local storage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await apiClient.put<ApiResponse<User>>("/api/v1/user/profile", data);
    return handleApiResponse(response);
  }

  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<{ message: string }> {
    const response = await apiClient.post<ApiResponse<{ message: string }>>("/auth/change-password", data);
    return handleApiResponse(response);
  }
}

export const authService = new AuthService();
