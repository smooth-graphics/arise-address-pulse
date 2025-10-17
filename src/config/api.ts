import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "https://genietalapi.projectgenietalmetaverse.org",
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// Create axios instance with default configuration
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth tokens
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Try to refresh token or redirect to login
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_CONFIG.BASE_URL}/api/v1/auth/refresh`, {
            refresh_token: refreshToken,
          });

          const { access_token } = response.data;
          localStorage.setItem("auth_token", access_token);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          // Refresh failed, redirect to login
          localStorage.removeItem("auth_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/auth/login";
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token, redirect to login
        localStorage.removeItem("auth_token");
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  },
);

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Utility function for handling API responses
export const handleApiResponse = <T,>(response: AxiosResponse<ApiResponse<T>>): T => {
  if (response.data.success) {
    return response.data.data;
  }
  throw new Error(response.data.message || "API request failed");
};

// Retry utility for failed requests
export const retryRequest = async <T,>(
  fn: () => Promise<T>,
  attempts: number = API_CONFIG.RETRY_ATTEMPTS,
  delay: number = API_CONFIG.RETRY_DELAY,
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (attempts > 1) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retryRequest(fn, attempts - 1, delay * 2);
    }
    throw error;
  }
};
