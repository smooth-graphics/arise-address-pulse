import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// API Configuration - Direct Backend URLs (No Proxy)
export const API_CONFIG = {
  // Java Backend (Auth, Verification) - Always use direct URL
  JAVA_BASE_URL: import.meta.env.VITE_JAVA_API_BASE_URL || 
                 "https://genietalapi.projectgenietalmetaverse.org",
  
  // Next.js Backend (Notifications, Wallet) - Always use direct URL
  NEXTJS_BASE_URL: import.meta.env.VITE_NEXTJS_API_BASE_URL || 
                   (import.meta.env.PROD 
                     ? "https://api.projectgenietalmetaverse.org" 
                     : "http://localhost:3000"),
  
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// Java Backend API Client (Auth, Verification)
export const javaApiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.JAVA_BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Next.js Backend API Client (Notifications, Wallet)
export const nextApiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.NEXTJS_BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Legacy apiClient - defaults to Java backend for backward compatibility
export const apiClient: AxiosInstance = javaApiClient;

// Shared request interceptor for adding auth tokens
const createRequestInterceptor = (clientName: string) => (config: any) => {
  console.log(`🔵 ${clientName} Request:`, {
    url: config.url,
    method: config.method,
    baseURL: config.baseURL,
    fullURL: `${config.baseURL}${config.url}`,
  });
  
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const requestErrorInterceptor = (error: any) => {
  console.error('🔴 Request Error:', error);
  return Promise.reject(error);
};

// Shared response interceptor for handling common errors
const createResponseInterceptor = (clientName: string, client: AxiosInstance) => {
  return [
    (response: AxiosResponse) => {
      console.log(`✅ ${clientName} Response:`, response.status, response.config.url);
      return response;
    },
    async (error: any) => {
      console.error(`❌ ${clientName} Error:`, {
        message: error.message,
        code: error.code,
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        requestData: error.config?.data,
      });
      
      // Log detailed backend validation errors for 400 responses
      if (error.response?.status === 400) {
        console.error('🔴 Backend Validation Error (400):', {
          endpoint: error.config?.url,
          sentData: error.config?.data ? JSON.parse(error.config.data) : null,
          backendResponse: error.response?.data,
        });
      }
      
      const originalRequest = error.config;

      // Handle 405 errors (Method Not Allowed)
      if (error.response?.status === 405) {
        console.error('⚠️ HTTP 405 - Method Not Allowed:', {
          url: error.config?.url,
          method: error.config?.method,
          fullURL: `${error.config?.baseURL}${error.config?.url}`,
        });
      }

      // Handle 401 errors (token expired) - Only refresh from Java backend
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = localStorage.getItem("refresh_token");
        if (refreshToken) {
          try {
            // Always refresh from Java backend (auth service)
            const response = await javaApiClient.post("/auth/refresh", {
              refresh_token: refreshToken,
            });

            const { access_token } = response.data;
            localStorage.setItem("auth_token", access_token);

            // Retry original request with new token on the original client
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
            return client(originalRequest);
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
    }
  ];
};

// Apply interceptors to Java Backend Client
javaApiClient.interceptors.request.use(
  createRequestInterceptor("Java API"),
  requestErrorInterceptor
);
javaApiClient.interceptors.response.use(
  ...createResponseInterceptor("Java API", javaApiClient)
);

// Apply interceptors to Next.js Backend Client
nextApiClient.interceptors.request.use(
  createRequestInterceptor("Next.js API"),
  requestErrorInterceptor
);
nextApiClient.interceptors.response.use(
  ...createResponseInterceptor("Next.js API", nextApiClient)
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
