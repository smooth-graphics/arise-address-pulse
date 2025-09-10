import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Download, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { pricingPlans, formatPrice, calculateYearlyDiscount } from '@/data/pricingPlans';
import PlanUpgradeModal from '@/components/billing/PlanUpgradeModal';
import type { BillingPeriod } from '@/types/billing';

const Billing = () => {
  const { user } = useAuth();
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // Determine user type based on role
  const userType = user?.role === 'organization' || user?.role === 'organization-admin' || user?.role === 'organization-member' ? 'business' : 'individual';
  const currentPlans = pricingPlans[userType];
  
  // Mock current plan - in real app this would come from user data
  const currentPlanId = user?.role === 'organization' ? 'business-pro' : 'individual-basic';
  const currentPlan = currentPlans.find(plan => plan.id === currentPlanId) || currentPlans[0];

  const getPrice = (plan: any) => {
    const price = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    return formatPrice(price);
  };

  const getPriceLabel = () => {
    return billingPeriod === 'monthly' ? '/month' : '/year';
  };

  const handleUpgrade = (planName: string) => {
    console.log(`Upgrading to ${planName}`);
    setIsUpgradeModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing & Usage</h1>
        <p className="text-gray-600">Manage your subscription and view usage statistics</p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Current Plan</span>
            <Badge variant="secondary" className="ml-2">
              {currentPlan.name}
            </Badge>
          </CardTitle>
          <CardDescription>
            You are currently on the {currentPlan.name} plan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold">{currentPlan.name}</h3>
              <p className="text-sm text-gray-600">{currentPlan.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {getPrice(currentPlan)}{getPriceLabel()}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button onClick={() => setIsUpgradeModalOpen(true)}>
              Upgrade Plan
            </Button>
            <Button variant="outline">
              <CreditCard className="w-4 h-4 mr-2" />
              Manage Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing Period Toggle */}
      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>
            Showing {userType} plans - Switch billing period to see different pricing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Billing Period Toggle */}
          <div className="flex justify-center">
            <div className="bg-gray-100 rounded-lg p-1 flex items-center">
              <Button
                variant={billingPeriod === 'monthly' ? 'default' : 'ghost'}
                onClick={() => setBillingPeriod('monthly')}
                className="px-4 py-2"
              >
                Monthly
              </Button>
              <Button
                variant={billingPeriod === 'yearly' ? 'default' : 'ghost'}
                onClick={() => setBillingPeriod('yearly')}
                className="px-4 py-2 relative"
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  20% off
                </span>
              </Button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative ${
                  plan.id === currentPlanId ? 'border-primary shadow-lg' : ''
                } ${plan.popular ? 'border-2 border-primary' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                {plan.id === currentPlanId && (
                  <div className="absolute -top-3 right-4">
                    <Badge variant="secondary">Current</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">
                    {getPrice(plan)}
                    <span className="text-sm text-gray-500 font-normal">{getPriceLabel()}</span>
                  </div>
                  {billingPeriod === 'yearly' && (
                    <div className="text-sm text-green-600 font-medium">
                      Save {calculateYearlyDiscount(plan.monthlyPrice, plan.yearlyPrice)}% annually
                    </div>
                  )}
                  <p className="text-sm text-gray-600">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {plan.features.slice(0, 5).map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.features.length > 5 && (
                      <div className="text-sm text-gray-500">
                        +{plan.features.length - 5} more features
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full" 
                    variant={plan.id === currentPlanId ? "outline" : "default"}
                    disabled={plan.id === currentPlanId}
                    onClick={() => plan.id !== currentPlanId && setIsUpgradeModalOpen(true)}
                  >
                    {plan.id === currentPlanId ? 'Current Plan' : plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Usage This Month</CardTitle>
          <CardDescription>Track your address verification usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">1,247</div>
              <div className="text-sm text-gray-600">Verifications Used</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">8,753</div>
              <div className="text-sm text-gray-600">Remaining</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">12.5%</div>
              <div className="text-sm text-gray-600">Usage Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Invoices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent Invoices</span>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download All
            </Button>
          </CardTitle>
          <CardDescription>Your billing history and invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: '2024-01-01', amount: '₦15,000', status: 'Paid', plan: 'Pro' },
              { date: '2023-12-01', amount: '₦15,000', status: 'Paid', plan: 'Pro' },
              { date: '2023-11-01', amount: '₦5,000', status: 'Paid', plan: 'Basic' }
            ].map((invoice, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="font-medium">{invoice.plan} Plan</div>
                    <div className="text-sm text-gray-600">{invoice.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-medium">{invoice.amount}</div>
                    <Badge variant="secondary" className="text-xs">
                      {invoice.status}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

        <PlanUpgradeModal
          isOpen={isUpgradeModalOpen}
          onClose={() => setIsUpgradeModalOpen(false)}
          currentPlan={currentPlan.name}
          onUpgrade={handleUpgrade}
          userRole={user?.role || 'individual'}
          billingPeriod={billingPeriod}
        />
    </div>
  );
};

export default Billing;