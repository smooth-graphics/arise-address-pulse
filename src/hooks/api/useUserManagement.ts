import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { mockUserManagementService } from '@/services/mock/mockUserManagementService';
import { userManagementService } from '@/services/userManagementService';
import { FEATURES } from '@/config/features';
import { UserManagementFilters } from '@/types/userManagement';

const service = FEATURES.USE_REAL_API ? userManagementService : mockUserManagementService;

export function useUsers(filters?: UserManagementFilters) {
  return useQuery({
    queryKey: ['admin', 'users', filters],
    queryFn: () => service.getUsers(filters),
    staleTime: 2 * 60 * 1000,
  });
}

export function useUserStats() {
  return useQuery({
    queryKey: ['admin', 'users', 'stats'],
    queryFn: () => service.getUserStats(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useUserDetails(userId: string) {
  return useQuery({
    queryKey: ['admin', 'users', userId],
    queryFn: () => service.getUserDetails(userId),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000,
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: string }) =>
      service.updateUserRole(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast({ title: 'Success', description: 'User role updated successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to update user role', variant: 'destructive' });
    },
  });
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: 'active' | 'suspended' }) =>
      service.updateUserStatus(userId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast({ title: 'Success', description: 'User status updated successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to update user status', variant: 'destructive' });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => service.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast({ title: 'Success', description: 'User deleted successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to delete user', variant: 'destructive' });
    },
  });
}

export function useBulkInviteUsers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (emails: string[]) => service.bulkInviteUsers(emails),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast({
        title: 'Success',
        description: `Successfully invited ${data.success} users${data.failed > 0 ? `, ${data.failed} failed` : ''}`
      });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to send invitations', variant: 'destructive' });
    },
  });
}
