import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { verificationService, AddressVerificationRequest, BulkVerificationRequest } from '@/services/verificationService';
import { useToast } from '@/hooks/use-toast';

export const VERIFICATION_QUERY_KEYS = {
  history: (params?: any) => ['verification', 'history', params] as const,
  verification: (id: string) => ['verification', 'single', id] as const,
  bulkUploads: (params?: any) => ['verification', 'bulk', params] as const,
  bulkStatus: (id: string) => ['verification', 'bulk', 'status', id] as const,
  stats: ['verification', 'stats'] as const,
} as const;

export const useVerificationHistory = (params?: {
  page?: number;
  limit?: number;
  status?: 'pending' | 'verified' | 'rejected' | 'needs_more_info';
  startDate?: string;
  endDate?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: VERIFICATION_QUERY_KEYS.history(params),
    queryFn: () => verificationService.getVerificationHistory(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useVerification = (verificationId: string) => {
  return useQuery({
    queryKey: VERIFICATION_QUERY_KEYS.verification(verificationId),
    queryFn: () => verificationService.getVerification(verificationId),
    enabled: !!verificationId,
    staleTime: 30 * 1000, // 30 seconds
  });
};

export const useBulkVerifications = (params?: {
  page?: number;
  limit?: number;
  status?: 'processing' | 'completed' | 'failed';
}) => {
  return useQuery({
    queryKey: VERIFICATION_QUERY_KEYS.bulkUploads(params),
    queryFn: () => verificationService.getBulkVerifications(params),
    staleTime: 30 * 1000, // 30 seconds
  });
};

export const useBulkVerificationStatus = (bulkId: string) => {
  return useQuery({
    queryKey: VERIFICATION_QUERY_KEYS.bulkStatus(bulkId),
    queryFn: () => verificationService.getBulkVerificationStatus(bulkId),
    enabled: !!bulkId,
    refetchInterval: (query) => {
      // Poll every 5 seconds if still processing
      return query.state.data?.status === 'processing' ? 5000 : undefined;
    },
    staleTime: 0, // Always fresh for processing status
  });
};

export const useVerificationStats = () => {
  return useQuery({
    queryKey: VERIFICATION_QUERY_KEYS.stats,
    queryFn: verificationService.getVerificationStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useVerifyAddress = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: AddressVerificationRequest) => verificationService.verifyAddress(data),
    onSuccess: (verification) => {
      // Invalidate verification history to show new entry
      queryClient.invalidateQueries({ queryKey: ['verification', 'history'] });
      queryClient.invalidateQueries({ queryKey: VERIFICATION_QUERY_KEYS.stats });
      
      toast({
        title: "Verification submitted",
        description: `Address verification request created with ID: ${verification.id}`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Verification failed",
        description: error.message || "Failed to submit verification request",
        variant: "destructive",
      });
    },
  });
};

export const useBulkVerification = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: BulkVerificationRequest) => verificationService.bulkVerification(data),
    onSuccess: (bulkUpload) => {
      // Invalidate bulk uploads list
      queryClient.invalidateQueries({ queryKey: ['verification', 'bulk'] });
      queryClient.invalidateQueries({ queryKey: VERIFICATION_QUERY_KEYS.stats });
      
      toast({
        title: "Bulk upload started",
        description: `Processing ${bulkUpload.totalRecords} records. You'll be notified when complete.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Bulk upload failed",
        description: error.message || "Failed to process bulk upload",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateVerificationStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ 
      verificationId, 
      status, 
      notes 
    }: { 
      verificationId: string; 
      status: 'verified' | 'rejected' | 'needs_more_info'; 
      notes?: string; 
    }) => verificationService.updateVerificationStatus(verificationId, status, notes),
    onSuccess: (verification) => {
      // Update specific verification and invalidate lists
      queryClient.setQueryData(
        VERIFICATION_QUERY_KEYS.verification(verification.id), 
        verification
      );
      queryClient.invalidateQueries({ queryKey: ['verification', 'history'] });
      queryClient.invalidateQueries({ queryKey: VERIFICATION_QUERY_KEYS.stats });
      
      toast({
        title: "Status updated",
        description: `Verification status has been updated to ${verification.status}`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update verification status",
        variant: "destructive",
      });
    },
  });
};

export const useUploadAdditionalDocuments = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ 
      verificationId, 
      documents 
    }: { 
      verificationId: string; 
      documents: File[]; 
    }) => verificationService.uploadAdditionalDocuments(verificationId, documents),
    onSuccess: (documents, { verificationId }) => {
      // Invalidate verification to refresh document list
      queryClient.invalidateQueries({ 
        queryKey: VERIFICATION_QUERY_KEYS.verification(verificationId) 
      });
      
      toast({
        title: "Documents uploaded",
        description: `${documents.length} document(s) uploaded successfully`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload documents",
        variant: "destructive",
      });
    },
  });
};

export const useDownloadBulkResults = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (bulkId: string) => verificationService.downloadBulkResults(bulkId),
    onSuccess: (blob, bulkId) => {
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bulk-results-${bulkId}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Results downloaded",
        description: "Bulk verification results downloaded successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Download failed",
        description: error.message || "Failed to download results",
        variant: "destructive",
      });
    },
  });
};