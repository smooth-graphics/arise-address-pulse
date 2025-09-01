
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface PlanUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan?: 'basic' | 'pro' | 'enterprise';
  onUpgrade?: (plan: string) => void;
}

const PlanUpgradeModal: React.FC<PlanUpgradeModalProps> = ({
  isOpen,
  onClose,
  currentPlan = 'basic',
  onUpgrade
}) => {
  const plans = [
    {
      name: 'Basic',
      price: '$5',
      period: '/ month',
      icon: '⚠️',
      features: [
        '50 address verifications.',
        '20 identity verifications.',
        'Email support.'
      ],
      isCurrent: currentPlan === 'basic'
    },
    {
      name: 'Pro',
      price: '$10',
      period: '/ month',
      icon: '📦',
      features: [
        '100 address verifications.',
        '40 identity verifications.',
        'Priority support.',
        'Detailed Confidence Metrics.'
      ],
      isCurrent: currentPlan === 'pro'
    },
    {
      name: 'Enterprise',
      price: '$15',
      period: '/ month',
      icon: '👑',
      features: [
        '150 address verifications.',
        '80 identity verifications.',
        '24/7 support.',
        'Detailed Confidence Metrics.'
      ],
      isCurrent: currentPlan === 'enterprise'
    }
  ];

  const handleUpgrade = (planName: string) => {
    console.log('Upgrading to:', planName);
    onUpgrade?.(planName.toLowerCase());
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold">
            Upgrade Plan
          </DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="border border-gray-200 rounded-2xl p-6 bg-white"
              >
                {/* Plan Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-lg">
                    {plan.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mb-6">
                  {plan.isCurrent ? (
                    <Button
                      className="w-full bg-gray-200 text-gray-600 hover:bg-gray-200 cursor-default"
                      disabled
                    >
                      Current Plan
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-orange-primary text-white hover:bg-orange-primary/90"
                      onClick={() => handleUpgrade(plan.name)}
                    >
                      Get Started
                    </Button>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Custom Solution Section */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Need a custom solution?</h4>
                <p className="text-sm text-gray-600">Contact our sales team.</p>
              </div>
              <Button variant="outline" className="border-orange-primary text-orange-primary hover:bg-orange-primary/5">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlanUpgradeModal;
