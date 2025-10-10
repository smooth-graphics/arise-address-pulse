import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { mockApiAccessService } from '@/services/mock/mockApiAccessService';
import { apiAccessService } from '@/services/apiAccessService';
import { FEATURES } from '@/config/features';
import { CreateApiKeyRequest, UpdateApiKeyRequest } from '@/types/apiAccess';

const service = FEATURES.USE_REAL_API ? apiAccessService : mockApiAccessService;

export function useApiKeys() {
  return useQuery({
    queryKey: ['api', 'keys'],
    queryFn: () => service.getApiKeys(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useApiKey(keyId: string) {
  return useQuery({
    queryKey: ['api', 'keys', keyId],
    queryFn: () => service.getApiKey(keyId),
    enabled: !!keyId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGenerateApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateApiKeyRequest) => service.generateApiKey(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api', 'keys'] });
      toast({ title: 'Success', description: 'API key generated successfully. Please save it securely as it won\'t be shown again.' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to generate API key', variant: 'destructive' });
    },
  });
}

export function useUpdateApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ keyId, request }: { keyId: string; request: UpdateApiKeyRequest }) =>
      service.updateApiKey(keyId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api', 'keys'] });
      toast({ title: 'Success', description: 'API key updated successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to update API key', variant: 'destructive' });
    },
  });
}

export function useRevokeApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (keyId: string) => service.revokeApiKey(keyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api', 'keys'] });
      toast({ title: 'Success', description: 'API key revoked successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to revoke API key', variant: 'destructive' });
    },
  });
}

export function useApiKeyUsage(keyId: string) {
  return useQuery({
    queryKey: ['api', 'keys', keyId, 'usage'],
    queryFn: () => service.getApiKeyUsage(keyId),
    enabled: !!keyId,
    staleTime: 2 * 60 * 1000,
  });
}

export function useAvailableScopes() {
  return useQuery({
    queryKey: ['api', 'scopes'],
    queryFn: () => service.getAvailableScopes(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
}
