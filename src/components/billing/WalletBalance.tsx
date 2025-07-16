
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  AlertTriangle,
  Plus,
  History,
  Download,
  Zap
} from 'lucide-react';

interface WalletBalanceProps {
  currentPlan: 'basic' | 'pro' | 'enterprise';
  balance: number;
  monthlyLimit: number;
  usedThisMonth: number;
  onTopUp?: () => void;
  onViewHistory?: () => void;
  onUpgradePlan?: () => void;
}

const WalletBalance: React.FC<WalletBalanceProps> = ({
  currentPlan,
  balance,
  monthlyLimit,
  usedThisMonth,
  onTopUp,
  onViewHistory,
  onUpgradePlan
}) => {
  const [showUsageDetails, setShowUsageDetails] = useState(false);
  
  const usagePercentage = (usedThisMonth / monthlyLimit) * 100;
  const remainingVerifications = monthlyLimit - usedThisMonth;
  const isLowBalance = balance < 10;
  const isNearLimit = usagePercentage > 80;

  const planDetails = {
    basic: { 
      name: 'Basic', 
      color: 'text-gray-600', 
      bgColor: 'bg-gray-100',
      limit: 50 
    },
    pro: { 
      name: 'Pro', 
      color: 'text-vibrant-orange', 
      bgColor: 'bg-vibrant-orange/10',
      limit: 500 
    },
    enterprise: { 
      name: 'Enterprise', 
      color: 'text-bold-red', 
      bgColor: 'bg-bold-red/10',
      limit: Infinity 
    }
  };

  const currentPlanInfo = planDetails[currentPlan];

  return (
    <div className="space-y-6">
      {/* Main Wallet Card */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bold-red/5 via-vibrant-orange/5 to-bright-yellow/5"></div>
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-bold-red" />
              Wallet Balance
            </CardTitle>
            <Badge className={`${currentPlanInfo.bgColor} ${currentPlanInfo.color} border-0`}>
              {currentPlanInfo.name} Plan
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="relative space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900">₦{balance.toLocaleString()}</div>
              <p className="text-sm text-gray-600">Available Balance</p>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={onViewHistory}
                className="flex items-center gap-2"
              >
                <History className="h-4 w-4" />
                History
              </Button>
              <Button 
                size="sm" 
                onClick={onTopUp}
                className="bg-gradient-to-r from-bold-red to-vibrant-orange text-white flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Top Up
              </Button>
            </div>
          </div>

          {isLowBalance && (
            <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm text-yellow-800">
                Low balance warning! Add funds to continue using verification services.
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-vibrant-orange" />
              Monthly Usage
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUsageDetails(!showUsageDetails)}
            >
              {showUsageDetails ? 'Hide Details' : 'Show Details'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Verifications Used</span>
              <span className="font-medium">
                {usedThisMonth} / {monthlyLimit === Infinity ? '∞' : monthlyLimit}
              </span>
            </div>
            {monthlyLimit !== Infinity && (
              <Progress 
                value={usagePercentage} 
                className={`h-2 ${isNearLimit ? 'text-red-500' : 'text-green-500'}`}
              />
            )}
            <div className="flex justify-between text-xs text-gray-500">
              <span>
                {remainingVerifications === Infinity 
                  ? 'Unlimited remaining' 
                  : `${remainingVerifications} remaining`
                }
              </span>
              <span>{usagePercentage.toFixed(1)}% used</span>
            </div>
          </div>

          {isNearLimit && monthlyLimit !== Infinity && (
            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-800">
                  You're approaching your monthly limit
                </span>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={onUpgradePlan}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <Zap className="h-4 w-4 mr-1" />
                Upgrade
              </Button>
            </div>
          )}

          {showUsageDetails && (
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round((usedThisMonth / monthlyLimit) * 100 * 0.92)}
                </div>
                <div className="text-xs text-green-600">Successful</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {Math.round((usedThisMonth / monthlyLimit) * 100 * 0.08)}
                </div>
                <div className="text-xs text-red-600">Failed</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 h-12"
              onClick={onTopUp}
            >
              <CreditCard className="h-4 w-4" />
              Add Funds
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 h-12"
              onClick={onUpgradePlan}
            >
              <Zap className="h-4 w-4" />
              Upgrade Plan
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 h-12"
              onClick={onViewHistory}
            >
              <History className="h-4 w-4" />
              View History
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 h-12"
            >
              <Download className="h-4 w-4" />
              Download Invoice
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletBalance;
