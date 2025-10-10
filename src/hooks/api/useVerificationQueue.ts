import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { mockVerificationQueueService } from '@/services/mock/mockVerificationQueueService';
import { verificationQueueService } from '@/services/verificationQueueService';
import { FEATURES } from '@/config/features';
import { QueueFilters, ProcessQueueItemRequest, AssignReviewerRequest } from '@/types/verificationQueue';

const service = FEATURES.USE_REAL_API ? verificationQueueService : mockVerificationQueueService;

export function useQueueItems(filters?: QueueFilters) {
  return useQuery({
    queryKey: ['admin', 'verification-queue', filters],
    queryFn: () => service.getQueueItems(filters),
    staleTime: 1 * 60 * 1000,
    refetchInterval: 30 * 1000, // Refresh every 30 seconds
  });
}

export function useQueueStats() {
  return useQuery({
    queryKey: ['admin', 'verification-queue', 'stats'],
    queryFn: () => service.getQueueStats(),
    staleTime: 2 * 60 * 1000,
    refetchInterval: 60 * 1000, // Refresh every minute
  });
}

export function useQueueItem(itemId: string) {
  return useQuery({
    queryKey: ['admin', 'verification-queue', itemId],
    queryFn: () => service.getQueueItem(itemId),
    enabled: !!itemId,
    staleTime: 1 * 60 * 1000,
  });
}

export function useProcessQueueItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: ProcessQueueItemRequest) => service.processItem(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'verification-queue'] });
      toast({ title: 'Success', description: 'Verification processed successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to process verification', variant: 'destructive' });
    },
  });
}

export function useAssignReviewer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: AssignReviewerRequest) => service.assignReviewer(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'verification-queue'] });
      toast({ title: 'Success', description: 'Reviewer assigned successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to assign reviewer', variant: 'destructive' });
    },
  });
}
