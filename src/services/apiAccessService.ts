import { apiClient, handleApiResponse } from '@/config/api';
import {
  ApiKey,
  ApiKeyUsageStats,
  CreateApiKeyRequest,
  UpdateApiKeyRequest,
  ApiScope
} from '@/types/apiAccess';

class ApiAccessService {
  async getApiKeys() {
    const response = await apiClient.get('/api/keys');
    return handleApiResponse<ApiKey[]>(response);
  }

  async getApiKey(keyId: string) {
    const response = await apiClient.get(`/api/keys/${keyId}`);
    return handleApiResponse<ApiKey>(response);
  }

  async generateApiKey(request: CreateApiKeyRequest) {
    const response = await apiClient.post('/api/keys', request);
    return handleApiResponse<ApiKey>(response);
  }

  async updateApiKey(keyId: string, request: UpdateApiKeyRequest) {
    const response = await apiClient.patch(`/api/keys/${keyId}`, request);
    return handleApiResponse<ApiKey>(response);
  }

  async revokeApiKey(keyId: string) {
    const response = await apiClient.delete(`/api/keys/${keyId}`);
    return handleApiResponse<void>(response);
  }

  async getApiKeyUsage(keyId: string) {
    const response = await apiClient.get(`/api/keys/${keyId}/usage`);
    return handleApiResponse<ApiKeyUsageStats>(response);
  }

  async getAvailableScopes() {
    const response = await apiClient.get('/api/scopes');
    return handleApiResponse<ApiScope[]>(response);
  }
}

export const apiAccessService = new ApiAccessService();
