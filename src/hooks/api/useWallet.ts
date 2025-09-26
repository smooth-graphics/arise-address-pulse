import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { walletService, TopUpRequest } from '@/services/walletService';
import { useToast } from '@/hooks/use-toast';

export const WALLET_QUERY_KEYS = {
  balance: ['wallet', 'balance'] as const,
  transactions: (params?: any) => ['wallet', 'transactions', params] as const,
  usageStats: ['wallet', 'usage'] as const,
  paymentMethods: ['wallet', 'paymentMethods'] as const,
} as const;

export const useWalletBalance = () => {
  return useQuery({
    queryKey: WALLET_QUERY_KEYS.balance,
    queryFn: walletService.getBalance,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute
  });
};

export const useTransactions = (params?: {
  page?: number;
  limit?: number;
  type?: 'credit' | 'debit';
  status?: 'pending' | 'completed' | 'failed';
  startDate?: string;
  endDate?: string;
}) => {
  return useQuery({
    queryKey: WALLET_QUERY_KEYS.transactions(params),
    queryFn: () => walletService.getTransactions(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useUsageStats = () => {
  return useQuery({
    queryKey: WALLET_QUERY_KEYS.usageStats,
    queryFn: walletService.getUsageStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const usePaymentMethods = () => {
  return useQuery({
    queryKey: WALLET_QUERY_KEYS.paymentMethods,
    queryFn: walletService.getPaymentMethods,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useTopUp = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: TopUpRequest) => walletService.topUp(data),
    onSuccess: (data) => {
      // Invalidate balance and transactions
      queryClient.invalidateQueries({ queryKey: WALLET_QUERY_KEYS.balance });
      queryClient.invalidateQueries({ queryKey: ['wallet', 'transactions'] });
      
      toast({
        title: "Top-up initiated",
        description: data.payment_url 
          ? "Redirecting to payment page..." 
          : "Your wallet will be updated shortly",
      });

      // Redirect to payment URL if provided
      if (data.payment_url) {
        window.open(data.payment_url, '_blank');
      }
    },
    onError: (error: any) => {
      toast({
        title: "Top-up failed",
        description: error.message || "Failed to process payment",
        variant: "destructive",
      });
    },
  });
};

export const useAddPaymentMethod = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: {
      type: 'card' | 'bank_account';
      token: string;
      isDefault?: boolean;
    }) => walletService.addPaymentMethod(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WALLET_QUERY_KEYS.paymentMethods });
      
      toast({
        title: "Payment method added",
        description: "Your payment method has been added successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to add payment method",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });
};

export const useRemovePaymentMethod = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (methodId: string) => walletService.removePaymentMethod(methodId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WALLET_QUERY_KEYS.paymentMethods });
      
      toast({
        title: "Payment method removed",
        description: "Payment method has been removed successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to remove payment method",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });
};

export const useSetDefaultPaymentMethod = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (methodId: string) => walletService.setDefaultPaymentMethod(methodId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WALLET_QUERY_KEYS.paymentMethods });
      
      toast({
        title: "Default payment method updated",
        description: "Your default payment method has been updated",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to update default payment method",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });
};

export const useDownloadInvoice = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (transactionId: string) => walletService.downloadInvoice(transactionId),
    onSuccess: (blob, transactionId) => {
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${transactionId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Invoice downloaded",
        description: "Invoice has been downloaded successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Download failed",
        description: error.message || "Failed to download invoice",
        variant: "destructive",
      });
    },
  });
};