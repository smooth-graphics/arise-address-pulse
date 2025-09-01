
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Crown, Zap, Shield } from 'lucide-react';

interface PlanUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan?: 'basic' | 'pro' | 'enterprise';
  lockedFeature?: string;
  onUpgrade?: (plan: string) => void;
}

const PlanUpgradeModal: React.FC<PlanUpgradeModalProps> = ({
  isOpen,
  onClose,
  currentPlan = 'basic',
  lockedFeature,
  onUpgrade
}) => {
  const plans = [
    {
      name: 'Basic',
      price: '$29',
      period: '/month',
      icon: Shield,
      popular: false,
      features: [
        'Up to 1,000 verifications per month',
        'Basic address validation',
        'Email support',
        'Standard processing speed'
      ],
      isCurrent: currentPlan === 'basic'
    },
    {
      name: 'Pro',
      price: '$79',
      period: '/month',
      icon: Zap,
      popular: true,
      features: [
        'Up to 10,000 verifications per month',
        'Advanced address validation',
        'Priority email & chat support',
        'Fast processing speed',
        'Detailed confidence metrics',
        'Bulk export functionality',
        'API access'
      ],
      isCurrent: currentPlan === 'pro'
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: '/month',
      icon: Crown,
      popular: false,
      features: [
        'Unlimited verifications',
        'Premium address validation',
        '24/7 phone support',
        'Fastest processing speed',
        'Complete history access',
        'Advanced analytics',
        'Custom integrations',
        'Dedicated account manager'
      ],
      isCurrent: currentPlan === 'enterprise'
    }
  ];

  const handleUpgrade = (planName: string) => {
    onUpgrade?.(planName.toLowerCase());
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-6">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl border-2 p-6 transition-all hover:scale-105 ${
                  plan.popular 
                    ? 'border-vibrant-orange bg-gradient-to-b from-orange-50 to-white shadow-lg' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                } ${plan.isCurrent ? 'opacity-75' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-vibrant-orange to-bright-yellow text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`inline-flex p-3 rounded-full mb-4 ${
                    plan.popular ? 'bg-vibrant-orange text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full py-3 ${
                    plan.isCurrent
                      ? 'bg-gray-200 text-gray-600 hover:bg-gray-200 cursor-default'
                      : plan.popular
                      ? 'bg-gradient-to-r from-vibrant-orange to-bright-yellow text-white hover:opacity-90'
                      : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                  onClick={() => !plan.isCurrent && handleUpgrade(plan.name)}
                  disabled={plan.isCurrent}
                >
                  {plan.isCurrent ? 'Current Plan' : 'Get Started'}
                </Button>
              </div>
            );
          })}
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
