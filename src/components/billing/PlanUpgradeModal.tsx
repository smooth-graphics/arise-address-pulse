import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, Zap, Shield } from 'lucide-react';
import { pricingPlans, formatPrice, calculateYearlyDiscount } from '@/data/pricingPlans';
import type { UserRole } from '@/types/auth';
import type { BillingPeriod } from '@/types/billing';

interface PlanUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: string;
  lockedFeature?: string;
  onUpgrade: (planName: string) => void;
  userRole?: UserRole;
  billingPeriod?: BillingPeriod;
}

const PlanUpgradeModal: React.FC<PlanUpgradeModalProps> = ({
  isOpen,
  onClose,
  currentPlan,
  lockedFeature,
  onUpgrade,
  userRole = 'individual',
  billingPeriod = 'monthly'
}) => {

  // Determine user type based on role
  const userType = userRole === 'organization' || userRole === 'organization-admin' || userRole === 'organization-member' ? 'business' : 'individual';
  const availablePlans = pricingPlans[userType];

  const getPrice = (plan: any) => {
    const price = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    return formatPrice(price);
  };

  const getPriceLabel = () => {
    return billingPeriod === 'monthly' ? '/month' : '/year';
  };

  const handleUpgrade = (planName: string) => {
    onUpgrade(planName);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-6">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-vibrant-orange to-bright-yellow bg-clip-text text-transparent">
            Upgrade Your Plan
          </DialogTitle>
          {lockedFeature && (
            <p className="text-gray-600 mt-2">
              Unlock "{lockedFeature}" and more premium features
            </p>
          )}
        </DialogHeader>

        {/* Billing Period Indicator */}
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {billingPeriod} pricing for {userType} plans
            {billingPeriod === 'yearly' && (
              <span className="text-green-600 font-medium"> • Save 20% with yearly billing</span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {availablePlans.map((plan) => (
            <Card key={plan.id} className={`relative ${plan.popular ? 'border-2 border-primary shadow-lg' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-primary mb-2">
                  {getPrice(plan)}
                  <span className="text-sm text-muted-foreground font-normal">{getPriceLabel()}</span>
                </div>
                {billingPeriod === 'yearly' && (
                  <div className="text-sm text-green-600 font-medium">
                    Save {calculateYearlyDiscount(plan.monthlyPrice, plan.yearlyPrice)}% annually
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {plan.features.slice(0, 6).map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.features.length > 6 && (
                    <div className="text-sm text-muted-foreground">
                      +{plan.features.length - 6} more features
                    </div>
                  )}
                </div>
                
                <Button 
                  className="w-full" 
                  variant={plan.name === currentPlan ? "outline" : "default"}
                  disabled={plan.name === currentPlan}
                  onClick={() => plan.name !== currentPlan && handleUpgrade(plan.name)}
                >
                  {plan.name === currentPlan ? 'Current Plan' : plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mx-6 mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">Need a custom solution?</h4>
              <p className="text-sm text-gray-600">Contact our sales team for enterprise pricing and custom features.</p>
            </div>
            <Button variant="outline" className="border-vibrant-orange text-vibrant-orange hover:bg-orange-50">
              Contact Sales
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlanUpgradeModal;