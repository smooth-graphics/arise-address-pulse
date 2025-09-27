import React from 'react';
import { useWalletBalance, useUsageStats, useTransactions } from '@/hooks/api/useWallet';
import WalletBalance from '@/components/billing/WalletBalance';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const WalletDashboard: React.FC = () => {
  const { data: walletBalance, isLoading: balanceLoading } = useWalletBalance();
  const { data: usageStats, isLoading: usageLoading } = useUsageStats();
  const { data: transactions, isLoading: transactionsLoading } = useTransactions({ limit: 5 });

  const handleTopUp = () => {
    // Navigate to top-up modal or page
    console.log('Navigate to top-up');
  };

  const handleViewHistory = () => {
    // Navigate to transaction history
    console.log('Navigate to history');
  };

  const handleUpgradePlan = () => {
    // Navigate to upgrade plan
    console.log('Navigate to upgrade plan');
  };

  if (balanceLoading || usageLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <WalletBalance
        currentPlan={usageStats?.currentPlan || 'basic'}
        balance={walletBalance?.balance || 0}
        monthlyLimit={usageStats?.monthlyLimit || 50}
        usedThisMonth={usageStats?.usedThisMonth || 0}
        onTopUp={handleTopUp}
        onViewHistory={handleViewHistory}
        onUpgradePlan={handleUpgradePlan}
      />

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {transactionsLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {transactions?.transactions?.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'credit' ? (
                        <ArrowDownLeft className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}
                      {transaction.currency === 'NGN' ? '₦' : '$'}{transaction.amount}
                    </p>
                    <Badge variant={
                      transaction.status === 'completed' ? 'default' : 
                      transaction.status === 'pending' ? 'secondary' : 'destructive'
                    }>
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              )) || (
                <p className="text-center text-gray-500 py-8">
                  No transactions found
                </p>
              )}
              {transactions?.transactions?.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No transactions yet</p>
                  <Button onClick={handleTopUp}>
                    Make your first top-up
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletDashboard;