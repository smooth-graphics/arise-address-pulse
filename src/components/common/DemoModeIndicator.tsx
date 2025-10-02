import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { X, Info } from 'lucide-react';
import { FEATURES } from '@/config/features';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

export const DemoModeIndicator = () => {
  const [dismissed, setDismissed] = useState(
    localStorage.getItem('demo_banner_dismissed') === 'true'
  );

  const isDemoMode = !FEATURES.USE_REAL_API || 
    !FEATURES.REAL_AUTH || 
    !FEATURES.REAL_VERIFICATION || 
    !FEATURES.REAL_WALLET;

  if (!isDemoMode) {
    return (
      <HoverCard>
        <HoverCardTrigger>
          <Badge variant="default" className="bg-success text-white">
            Live Mode
          </Badge>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-semibold">Live Mode Active</h4>
            <p className="text-sm text-muted-foreground">
              Connected to production API. All actions are real.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  }

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('demo_banner_dismissed', 'true');
  };

  return (
    <>
      {/* Badge Indicator */}
      <HoverCard>
        <HoverCardTrigger>
          <Badge variant="secondary" className="bg-warning/20 text-warning border-warning/30">
            <Info className="w-3 h-3 mr-1" />
            Demo Mode
          </Badge>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-semibold">Demo Mode Active</h4>
            <p className="text-sm text-muted-foreground">
              You're using mock data for demonstration. Use these credentials:
            </p>
            <div className="mt-2 p-2 bg-muted rounded text-xs font-mono">
              <div>Email: demo@individual.com</div>
              <div>Password: Demo123!</div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              All actions are simulated and no real verifications are performed.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>

      {/* Dismissible Banner */}
      {!dismissed && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-full mx-4">
          <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 shadow-lg backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">Demo Mode Active</h4>
                <p className="text-xs text-muted-foreground">
                  You're viewing a demonstration with mock data. Login with <strong>demo@individual.com</strong> / <strong>Demo123!</strong> to explore the platform.
                </p>
              </div>
              <button
                onClick={handleDismiss}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
