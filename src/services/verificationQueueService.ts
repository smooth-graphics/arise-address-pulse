import { apiClient, handleApiResponse } from '@/config/api';
import {
  QueueItem,
  QueueFilters,
  QueueStats,
  ProcessQueueItemRequest,
  AssignReviewerRequest
} from '@/types/verificationQueue';

class VerificationQueueService {
  async getQueueItems(filters?: QueueFilters) {
    const response = await apiClient.get('/admin/verification-queue', { params: filters });
    return handleApiResponse<{
      items: QueueItem[];
      total: number;
      page: number;
      totalPages: number;
    }>(response);
  }

  async getQueueStats() {
    const response = await apiClient.get('/admin/verification-queue/stats');
    return handleApiResponse<QueueStats>(response);
  }

  async getQueueItem(itemId: string) {
    const response = await apiClient.get(`/admin/verification-queue/${itemId}`);
    return handleApiResponse<QueueItem>(response);
  }

  async processItem(request: ProcessQueueItemRequest) {
    const response = await apiClient.post(`/admin/verification-queue/${request.itemId}/process`, {
      decision: request.decision,
      notes: request.notes,
      reviewerId: request.reviewerId
    });
    return handleApiResponse<QueueItem>(response);
  }

  async assignReviewer(request: AssignReviewerRequest) {
    const response = await apiClient.patch(`/admin/verification-queue/${request.itemId}/assign`, {
      reviewerId: request.reviewerId
    });
    return handleApiResponse<QueueItem>(response);
  }
}

export const verificationQueueService = new VerificationQueueService();
