import { apiClient, handleApiResponse } from '@/config/api';
import {
  PricingPlan,
  CreatePlanRequest,
  UpdatePlanRequest,
  PricingAnalytics
} from '@/types/pricingManagement';

class PricingManagementService {
  async getPlans() {
    const response = await apiClient.get('/admin/pricing/plans');
    return handleApiResponse<PricingPlan[]>(response);
  }

  async getPlan(planId: string) {
    const response = await apiClient.get(`/admin/pricing/plans/${planId}`);
    return handleApiResponse<PricingPlan>(response);
  }

  async createPlan(request: CreatePlanRequest) {
    const response = await apiClient.post('/admin/pricing/plans', request);
    return handleApiResponse<PricingPlan>(response);
  }

  async updatePlan(planId: string, request: UpdatePlanRequest) {
    const response = await apiClient.put(`/admin/pricing/plans/${planId}`, request);
    return handleApiResponse<PricingPlan>(response);
  }

  async deletePlan(planId: string) {
    const response = await apiClient.delete(`/admin/pricing/plans/${planId}`);
    return handleApiResponse<void>(response);
  }

  async getPricingAnalytics() {
    const response = await apiClient.get('/admin/pricing/analytics');
    return handleApiResponse<PricingAnalytics>(response);
  }
}

export const pricingManagementService = new PricingManagementService();
