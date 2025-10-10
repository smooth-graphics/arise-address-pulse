import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, DollarSign, Users, TrendingUp } from 'lucide-react';
import { usePricingPlans, usePricingAnalytics } from '@/hooks/api/usePricingManagement';
import { Skeleton } from '@/components/ui/skeleton';

export function PricingManagementDashboard() {
  const { data: plans, isLoading: plansLoading } = usePricingPlans();
  const { data: analytics, isLoading: analyticsLoading } = usePricingAnalytics();

  if (plansLoading || analyticsLoading) {
    return <div className="space-y-4"><Skeleton className="h-32 w-full" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{analytics?.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.totalSubscriptions}</div>
            <p className="text-xs text-muted-foreground">Active subscribers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Revenue/User</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{analytics?.averageRevenuePerUser.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per subscriber</p>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Plans */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Pricing Plans</CardTitle>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Plan
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {plans?.map((plan) => (
              <div key={plan.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{plan.name}</h3>
                    {plan.isActive ? (
                      <Badge>Active</Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                    <Badge variant="outline">{plan.targetAudience}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{plan.description}</p>
                  <div className="text-lg font-bold text-primary">
                    {plan.currency} {plan.price.toLocaleString()}/{plan.billingPeriod}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
