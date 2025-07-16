
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Eye, Zap } from 'lucide-react';
import { UserPlan, RedactionConfig, shouldShowUpgradePrompt } from '@/utils/redactionUtils';

interface RedactedDataDisplayProps {
  data: any;
  field: string;
  config: RedactionConfig;
  userPlan: UserPlan;
  onUpgradeClick?: () => void;
  className?: string;
}

const RedactedDataDisplay: React.FC<RedactedDataDisplayProps> = ({
  data,
  field,
  config,
  userPlan,
  onUpgradeClick,
  className = ''
}) => {
  const isRedacted = shouldShowUpgradePrompt(field, config);
  
  if (!isRedacted) {
    return <span className={className}>{data}</span>;
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md border-2 border-dashed border-gray-300">
        <Lock className="h-3 w-3 text-gray-500" />
        <span className="text-xs text-gray-500 font-mono">****</span>
      </div>
      <Badge variant="outline" className="text-xs">
        {userPlan} plan
      </Badge>
      {onUpgradeClick && (
        <Button
          size="sm"
          variant="ghost"
          onClick={onUpgradeClick}
          className="h-6 text-xs text-vibrant-orange hover:text-bold-red"
        >
          <Eye className="h-3 w-3 mr-1" />
          View
        </Button>
      )}
    </div>
  );
};

export default RedactedDataDisplay;
