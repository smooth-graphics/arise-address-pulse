import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { mockPricingManagementService } from '@/services/mock/mockPricingManagementService';
import { pricingManagementService } from '@/services/pricingManagementService';
import { FEATURES } from '@/config/features';
import { CreatePlanRequest, UpdatePlanRequest } from '@/types/pricingManagement';

const service = FEATURES.USE_REAL_API ? pricingManagementService : mockPricingManagementService;

export function usePricingPlans() {
  return useQuery({
    queryKey: ['admin', 'pricing', 'plans'],
    queryFn: () => service.getPlans(),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePricingPlan(planId: string) {
  return useQuery({
    queryKey: ['admin', 'pricing', 'plans', planId],
    queryFn: () => service.getPlan(planId),
    enabled: !!planId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreatePlanRequest) => service.createPlan(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'pricing', 'plans'] });
      toast({ title: 'Success', description: 'Pricing plan created successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to create pricing plan', variant: 'destructive' });
    },
  });
}

export function useUpdatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ planId, request }: { planId: string; request: UpdatePlanRequest }) =>
      service.updatePlan(planId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'pricing', 'plans'] });
      toast({ title: 'Success', description: 'Pricing plan updated successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to update pricing plan', variant: 'destructive' });
    },
  });
}

export function useDeletePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (planId: string) => service.deletePlan(planId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'pricing', 'plans'] });
      toast({ title: 'Success', description: 'Pricing plan deleted successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to delete pricing plan', variant: 'destructive' });
    },
  });
}

export function usePricingAnalytics() {
  return useQuery({
    queryKey: ['admin', 'pricing', 'analytics'],
    queryFn: () => service.getPricingAnalytics(),
    staleTime: 10 * 60 * 1000,
  });
}
