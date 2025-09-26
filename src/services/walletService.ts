import { apiClient, handleApiResponse, ApiResponse } from '@/config/api';

export interface WalletBalance {
  balance: number;
  currency: string;
  lastUpdated: string;
}

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  currency: string;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  reference?: string;
}

export interface TopUpRequest {
  amount: number;
  paymentMethod: 'card' | 'bank_transfer' | 'crypto';
  currency?: string;
}

export interface TopUpResponse {
  transaction_id: string;
  payment_url?: string;
  status: string;
  message: string;
}

export interface UsageStats {
  currentPlan: 'basic' | 'pro' | 'enterprise';
  monthlyLimit: number;
  usedThisMonth: number;
  remainingVerifications: number;
  resetDate: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_account';
  last4: string;
  brand?: string;
  isDefault: boolean;
  expiryMonth?: number;
  expiryYear?: number;
}

class WalletService {
  async getBalance(): Promise<WalletBalance> {
    const response = await apiClient.get<ApiResponse<WalletBalance>>('/wallet/balance');
    return handleApiResponse(response);
  }

  async getTransactions(params?: {
    page?: number;
    limit?: number;
    type?: 'credit' | 'debit';
    status?: 'pending' | 'completed' | 'failed';
    startDate?: string;
    endDate?: string;
  }): Promise<{ transactions: Transaction[]; total: number; page: number; totalPages: number }> {
    const response = await apiClient.get<ApiResponse<{
      transactions: Transaction[];
      total: number;
      page: number;
      totalPages: number;
    }>>('/wallet/transactions', { params });
    return handleApiResponse(response);
  }

  async topUp(data: TopUpRequest): Promise<TopUpResponse> {
    const response = await apiClient.post<ApiResponse<TopUpResponse>>('/wallet/top-up', data);
    return handleApiResponse(response);
  }

  async getUsageStats(): Promise<UsageStats> {
    const response = await apiClient.get<ApiResponse<UsageStats>>('/wallet/usage');
    return handleApiResponse(response);
  }

  async getPaymentMethods(): Promise<PaymentMethod[]> {
    const response = await apiClient.get<ApiResponse<PaymentMethod[]>>('/wallet/payment-methods');
    return handleApiResponse(response);
  }

  async addPaymentMethod(data: {
    type: 'card' | 'bank_account';
    token: string; // Payment processor token
    isDefault?: boolean;
  }): Promise<PaymentMethod> {
    const response = await apiClient.post<ApiResponse<PaymentMethod>>('/wallet/payment-methods', data);
    return handleApiResponse(response);
  }

  async removePaymentMethod(methodId: string): Promise<{ message: string }> {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(
      `/wallet/payment-methods/${methodId}`
    );
    return handleApiResponse(response);
  }

  async setDefaultPaymentMethod(methodId: string): Promise<{ message: string }> {
    const response = await apiClient.put<ApiResponse<{ message: string }>>(
      `/wallet/payment-methods/${methodId}/default`
    );
    return handleApiResponse(response);
  }

  async downloadInvoice(transactionId: string): Promise<Blob> {
    const response = await apiClient.get(`/wallet/transactions/${transactionId}/invoice`, {
      responseType: 'blob',
    });
    return response.data;
  }
}

export const walletService = new WalletService();