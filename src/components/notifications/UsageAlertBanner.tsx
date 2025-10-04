import { useAuth } from '@/contexts/AuthContext';
import { useUsageLimit } from '@/hooks/api/useUsageLimit';
import { mockUsageLimitService } from '@/services/mock/mockUsageLimitService';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Info, X } from 'lucide-react';
import { useState } from 'react';

export function UsageAlertBanner() {
  const { user } = useAuth();
  const { data: usageLimit } = useUsageLimit(user?.id || '');
  const [dismissed, setDismissed] = useState(false);

  // Only show for organization members
  if (user?.role !== 'organization-member' || !usageLimit || dismissed) {
    return null;
  }

  const alertLevel = mockUsageLimitService.getAlertLevel(usageLimit);
  const percentage = mockUsageLimitService.calculateUsagePercentage(usageLimit);

  if (alertLevel === 'none') {
    return null;
  }

  const alertConfig = {
    warning: {
      variant: 'default' as const,
      icon: Info,
      title: 'Usage Notice',
      message: `You've used ${percentage}% of your verification units (${usageLimit.remainingUnits} remaining).`,
      className: 'border-yellow-500 bg-yellow-50',
      iconClassName: 'text-yellow-600',
      titleClassName: 'text-yellow-900',
      descClassName: 'text-yellow-800',
    },
    critical: {
      variant: 'destructive' as const,
      icon: AlertTriangle,
      title: 'Critical: Low Units',
      message: `Only ${usageLimit.remainingUnits} units left! Contact your administrator immediately.`,
      className: 'border-red-500 bg-red-50',
      iconClassName: 'text-red-600',
      titleClassName: 'text-red-900',
      descClassName: 'text-red-800',
    },
    depleted: {
      variant: 'destructive' as const,
      icon: AlertTriangle,
      title: 'Units Depleted',
      message: 'All verification units used. Contact your administrator to continue.',
      className: 'border-red-600 bg-red-100',
      iconClassName: 'text-red-700',
      titleClassName: 'text-red-900',
      descClassName: 'text-red-900',
    },
  };

  const config = alertConfig[alertLevel];
  if (!config) return null;

  const IconComponent = config.icon;

  return (
    <div className="relative">
      <Alert variant={config.variant} className={config.className}>
        <IconComponent className={`h-4 w-4 ${config.iconClassName}`} />
        <AlertTitle className={config.titleClassName}>{config.title}</AlertTitle>
        <AlertDescription className={config.descClassName}>
          {config.message}
        </AlertDescription>
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 p-1 rounded-md hover:bg-black/5 transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </Alert>
    </div>
  );
}
