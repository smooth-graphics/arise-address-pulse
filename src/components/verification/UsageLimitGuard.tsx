import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUsageLimit } from '@/hooks/api/useUsageLimit';
import { mockUsageLimitService } from '@/services/mock/mockUsageLimitService';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Ban, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface UsageLimitGuardProps {
  children: ReactNode;
  requiredUnits?: number;
}

export function UsageLimitGuard({ children, requiredUnits = 1 }: UsageLimitGuardProps) {
  const { user } = useAuth();
  const { data: usageLimit, isLoading } = useUsageLimit(user?.id || '');

  // Only apply to organization members
  if (user?.role !== 'organization-member') {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!usageLimit) {
    return <>{children}</>;
  }

  const alertLevel = mockUsageLimitService.getAlertLevel(usageLimit);
  const percentage = mockUsageLimitService.calculateUsagePercentage(usageLimit);

  // Depleted - Block access
  if (alertLevel === 'depleted') {
    return (
      <div className="space-y-6">
        <Alert variant="destructive" className="border-2">
          <Ban className="h-5 w-5" />
          <AlertTitle className="text-lg font-semibold">Verification Units Depleted</AlertTitle>
          <AlertDescription className="mt-2 space-y-3">
            <p>
              You have used all {usageLimit.allocatedUnits} of your allocated verification units.
              You cannot perform any more verifications until your administrator allocates more units.
            </p>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => window.location.href = 'mailto:admin@arisetech.com?subject=Request for More Verification Units'}
            >
              <Mail className="h-4 w-4" />
              Contact Administrator
            </Button>
          </AlertDescription>
        </Alert>

        <div className="rounded-lg border-2 border-dashed border-muted p-12 text-center">
          <Ban className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Verification Access Blocked
          </h3>
          <p className="text-sm text-muted-foreground">
            Please contact your administrator to continue using verification services.
          </p>
        </div>
      </div>
    );
  }

  // Critical warning
  if (alertLevel === 'critical') {
    return (
      <div className="space-y-4">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Critical: Low Verification Units</AlertTitle>
          <AlertDescription>
            You have only <strong>{usageLimit.remainingUnits}</strong> units remaining out of {usageLimit.allocatedUnits}.
            Contact your administrator before running out.
          </AlertDescription>
        </Alert>
        {children}
      </div>
    );
  }

  // Warning
  if (alertLevel === 'warning') {
    return (
      <div className="space-y-4">
        <Alert className="border-yellow-500 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-900">Usage Warning</AlertTitle>
          <AlertDescription className="text-yellow-800">
            You've used {percentage}% of your allocated units. {usageLimit.remainingUnits} units remaining.
          </AlertDescription>
        </Alert>
        {children}
      </div>
    );
  }

  return <>{children}</>;
}
