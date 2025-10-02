import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services';
import { NotificationSettings, SecuritySettings, InviteUserRequest } from '@/services/userService';
import { useToast } from '@/hooks/use-toast';

export const USER_QUERY_KEYS = {
  profile: ['user', 'profile'] as const,
  notificationSettings: ['user', 'notifications'] as const,
  securitySettings: ['user', 'security'] as const,
  organizationMembers: ['user', 'organization', 'members'] as const,
  activeSessions: ['user', 'sessions'] as const,
} as const;

export const useUserProfile = () => {
  return useQuery({
    queryKey: USER_QUERY_KEYS.profile,
    queryFn: userService.getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: any) => userService.updateProfile(data),
    onSuccess: (updatedProfile) => {
      // Update profile cache
      queryClient.setQueryData(USER_QUERY_KEYS.profile, updatedProfile);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    },
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (file: File) => userService.uploadAvatar(file),
    onSuccess: (data) => {
      // Update profile with new avatar URL
      queryClient.setQueryData(USER_QUERY_KEYS.profile, (old: any) => 
        old ? { ...old, avatar: data.avatarUrl } : old
      );
      
      toast({
        title: "Avatar updated",
        description: "Your profile picture has been updated",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload avatar",
        variant: "destructive",
      });
    },
  });
};

export const useNotificationSettings = () => {
  return useQuery({
    queryKey: USER_QUERY_KEYS.notificationSettings,
    queryFn: userService.getNotificationSettings,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useUpdateNotificationSettings = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (settings: Partial<NotificationSettings>) => 
      userService.updateNotificationSettings(settings),
    onSuccess: (updatedSettings) => {
      queryClient.setQueryData(USER_QUERY_KEYS.notificationSettings, updatedSettings);
      
      toast({
        title: "Settings updated",
        description: "Your notification settings have been saved",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update settings",
        variant: "destructive",
      });
    },
  });
};

export const useSecuritySettings = () => {
  return useQuery({
    queryKey: USER_QUERY_KEYS.securitySettings,
    queryFn: userService.getSecuritySettings,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useUpdateSecuritySettings = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (settings: Partial<SecuritySettings>) => 
      userService.updateSecuritySettings(settings),
    onSuccess: (updatedSettings) => {
      queryClient.setQueryData(USER_QUERY_KEYS.securitySettings, updatedSettings);
      
      toast({
        title: "Security settings updated",
        description: "Your security preferences have been saved",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update security settings",
        variant: "destructive",
      });
    },
  });
};

export const useEnableTwoFactor = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: userService.enableTwoFactor,
    onSuccess: () => {
      toast({
        title: "Two-factor authentication setup",
        description: "Scan the QR code with your authenticator app",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Setup failed",
        description: error.message || "Failed to setup two-factor authentication",
        variant: "destructive",
      });
    },
  });
};

export const useVerifyTwoFactor = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (token: string) => userService.verifyTwoFactor(token),
    onSuccess: () => {
      // Refresh security settings
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.securitySettings });
      
      toast({
        title: "Two-factor authentication enabled",
        description: "Your account is now more secure",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Verification failed",
        description: error.message || "Invalid authentication code",
        variant: "destructive",
      });
    },
  });
};

export const useDisableTwoFactor = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (token: string) => userService.disableTwoFactor(token),
    onSuccess: () => {
      // Refresh security settings
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.securitySettings });
      
      toast({
        title: "Two-factor authentication disabled",
        description: "Two-factor authentication has been turned off",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to disable",
        description: error.message || "Could not disable two-factor authentication",
        variant: "destructive",
      });
    },
  });
};

// Organization management hooks
export const useOrganizationMembers = () => {
  return useQuery({
    queryKey: USER_QUERY_KEYS.organizationMembers,
    queryFn: userService.getOrganizationMembers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useInviteUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: InviteUserRequest) => userService.inviteUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.organizationMembers });
      
      toast({
        title: "Invitation sent",
        description: "User has been invited to join your organization",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Invitation failed",
        description: error.message || "Failed to send invitation",
        variant: "destructive",
      });
    },
  });
};

export const useRemoveMember = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (memberId: string) => userService.removeMember(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.organizationMembers });
      
      toast({
        title: "Member removed",
        description: "User has been removed from your organization",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Removal failed",
        description: error.message || "Failed to remove member",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateMemberRole = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ 
      memberId, 
      role, 
      permissions 
    }: { 
      memberId: string; 
      role: 'admin' | 'member'; 
      permissions?: string[]; 
    }) => userService.updateMemberRole(memberId, role, permissions),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.organizationMembers });
      
      toast({
        title: "Role updated",
        description: "Member role has been updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update member role",
        variant: "destructive",
      });
    },
  });
};

export const useActiveSessions = () => {
  return useQuery({
    queryKey: USER_QUERY_KEYS.activeSessions,
    queryFn: userService.getActiveSessions,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useTerminateSession = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (sessionId: string) => userService.terminateSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.activeSessions });
      
      toast({
        title: "Session terminated",
        description: "The session has been terminated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Termination failed",
        description: error.message || "Failed to terminate session",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteAccount = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (password: string) => userService.deleteAccount(password),
    onSuccess: () => {
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted",
      });
      
      // Clear local storage and redirect
      localStorage.clear();
      window.location.href = '/';
    },
    onError: (error: any) => {
      toast({
        title: "Deletion failed",
        description: error.message || "Failed to delete account",
        variant: "destructive",
      });
    },
  });
};