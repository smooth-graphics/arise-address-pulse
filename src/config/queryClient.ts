import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: How long data is considered fresh (prevents unnecessary refetches)
      staleTime: 5 * 60 * 1000, // 5 minutes default
      
      // Cache time: How long data stays in cache after component unmounts
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
      
      // Retry configuration
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      
      // Retry delay (exponential backoff)
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Refetch on window focus for important data
      refetchOnWindowFocus: true,
      
      // Refetch on reconnect
      refetchOnReconnect: true,
      
      // Don't refetch on mount if data is fresh
      refetchOnMount: true,
    },
    mutations: {
      // Retry mutations once on network errors
      retry: (failureCount, error: any) => {
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        return failureCount < 1;
      },
      
      // Mutation retry delay
      retryDelay: 1000,
    },
  },
});

// Global error handler for queries
queryClient.setMutationDefaults(['auth', 'login'], {
  onError: (error: any) => {
    if (error?.response?.status === 401) {
      // Redirect to login on authentication errors
      window.location.href = '/auth/login';
    }
  },
});

// Utility function to prefetch common data
export const prefetchUserData = async (userId: string) => {
  const promises = [
    queryClient.prefetchQuery({
      queryKey: ['auth', 'currentUser'],
      staleTime: 10 * 60 * 1000, // 10 minutes
    }),
    queryClient.prefetchQuery({
      queryKey: ['wallet', 'balance'],
      staleTime: 1 * 60 * 1000, // 1 minute
    }),
    queryClient.prefetchQuery({
      queryKey: ['notifications', 'stats'],
      staleTime: 2 * 60 * 1000, // 2 minutes
    }),
  ];

  await Promise.allSettled(promises);
};

// Utility to clear sensitive data on logout
export const clearSensitiveData = () => {
  queryClient.removeQueries({ 
    predicate: (query) => {
      const queryKey = query.queryKey[0] as string;
      return ['auth', 'wallet', 'verification', 'notifications'].includes(queryKey);
    }
  });
};