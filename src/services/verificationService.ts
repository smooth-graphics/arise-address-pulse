import { javaApiClient as apiClient, handleApiResponse, ApiResponse } from '@/config/api';
import { 
  VerificationRequest, 
  VerificationDocument, 
  VerificationSearchResult 
} from '@/types/dashboard';

export interface AddressVerificationRequest {
  address: string;
  documents?: File[];
  requestedBy?: string;
  notes?: string;
}

export interface BulkVerificationRequest {
  file: File;
  batchName?: string;
}

export interface BulkVerificationStatus {
  id: string;
  fileName: string;
  batchName?: string;
  totalRecords: number;
  processedRecords: number;
  successfulRecords: number;
  failedRecords: number;
  status: 'processing' | 'completed' | 'failed';
  uploadedAt: string;
  completedAt?: string;
  downloadUrl?: string;
}

export interface VerificationHistory {
  verifications: VerificationRequest[];
  total: number;
  page: number;
  totalPages: number;
}

export interface VerificationStats {
  totalVerifications: number;
  successfulVerifications: number;
  pendingVerifications: number;
  rejectedVerifications: number;
  monthlyVerifications: Array<{
    month: string;
    count: number;
  }>;
}

class VerificationService {
  async verifyAddress(data: AddressVerificationRequest): Promise<VerificationRequest> {
    const formData = new FormData();
    formData.append('address', data.address);
    
    if (data.documents) {
      data.documents.forEach((file, index) => {
        formData.append(`documents[${index}]`, file);
      });
    }
    
    if (data.requestedBy) {
      formData.append('requestedBy', data.requestedBy);
    }
    
    if (data.notes) {
      formData.append('notes', data.notes);
    }

    const response = await apiClient.post<ApiResponse<VerificationRequest>>(
      '/verification/verify-address',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return handleApiResponse(response);
  }

  async bulkVerification(data: BulkVerificationRequest): Promise<BulkVerificationStatus> {
    const formData = new FormData();
    formData.append('file', data.file);
    
    if (data.batchName) {
      formData.append('batchName', data.batchName);
    }

    const response = await apiClient.post<ApiResponse<BulkVerificationStatus>>(
      '/verification/bulk-upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return handleApiResponse(response);
  }

  async getVerificationHistory(params?: {
    page?: number;
    limit?: number;
    status?: 'pending' | 'verified' | 'rejected' | 'needs_more_info';
    startDate?: string;
    endDate?: string;
    search?: string;
  }): Promise<VerificationHistory> {
    const response = await apiClient.get<ApiResponse<VerificationHistory>>(
      '/verification/history',
      { params }
    );
    return handleApiResponse(response);
  }

  async getVerification(verificationId: string): Promise<VerificationRequest> {
    const response = await apiClient.get<ApiResponse<VerificationRequest>>(
      `/verification/${verificationId}`
    );
    return handleApiResponse(response);
  }

  async getBulkVerifications(params?: {
    page?: number;
    limit?: number;
    status?: 'processing' | 'completed' | 'failed';
  }): Promise<{ bulkUploads: BulkVerificationStatus[]; total: number; page: number; totalPages: number }> {
    const response = await apiClient.get<ApiResponse<{
      bulkUploads: BulkVerificationStatus[];
      total: number;
      page: number;
      totalPages: number;
    }>>('/verification/bulk-uploads', { params });
    return handleApiResponse(response);
  }

  async getBulkVerificationStatus(bulkId: string): Promise<BulkVerificationStatus> {
    const response = await apiClient.get<ApiResponse<BulkVerificationStatus>>(
      `/verification/bulk-uploads/${bulkId}`
    );
    return handleApiResponse(response);
  }

  async downloadBulkResults(bulkId: string): Promise<Blob> {
    const response = await apiClient.get(`/verification/bulk-uploads/${bulkId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  }

  async getVerificationStats(): Promise<VerificationStats> {
    const response = await apiClient.get<ApiResponse<VerificationStats>>('/verification/stats');
    return handleApiResponse(response);
  }

  async updateVerificationStatus(
    verificationId: string,
    status: 'verified' | 'rejected' | 'needs_more_info',
    notes?: string
  ): Promise<VerificationRequest> {
    const response = await apiClient.put<ApiResponse<VerificationRequest>>(
      `/verification/${verificationId}/status`,
      { status, notes }
    );
    return handleApiResponse(response);
  }

  async uploadAdditionalDocuments(
    verificationId: string,
    documents: File[]
  ): Promise<VerificationDocument[]> {
    const formData = new FormData();
    documents.forEach((file, index) => {
      formData.append(`documents[${index}]`, file);
    });

    const response = await apiClient.post<ApiResponse<VerificationDocument[]>>(
      `/verification/${verificationId}/documents`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return handleApiResponse(response);
  }

  async searchIdentity(fullName: string, fullAddress: string): Promise<VerificationSearchResult> {
    const response = await apiClient.post<ApiResponse<VerificationSearchResult>>(
      '/verification/search-identity',
      { fullName, fullAddress }
    );
    return handleApiResponse(response);
  }
}

export const verificationService = new VerificationService();