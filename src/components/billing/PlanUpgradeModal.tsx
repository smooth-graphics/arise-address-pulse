
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  X,
  Crown,
  Zap,
  Shield,
  Users,
  ArrowRight
} from 'lucide-react';

interface PlanUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: 'basic' | 'pro' | 'enterprise';
  lockedFeature?: string;
  onUpgrade?: (plan: string) => void;
}

const PlanUpgradeModal: React.FC<PlanUpgradeModalProps> = ({
  isOpen,
  onClose,
  currentPlan,
  lockedFeature,
  onUpgrade
}) => {
  const plans = [
    {
      name: 'Basic',
      price: '₦5,000',
      period: '/month',
      icon: Shield,
      features: [
        '50 verifications/month',
        'Basic address matching',
        'Email support',
        'Limited history (5 records)',
        'Standard confidence scores'
      ],
      limitations: [
        'No full address details',
        'No bulk uploads',
        'No API access',
        'No custom exports'
      ],
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    },
    {
      name: 'Pro',
      price: '₦25,000',
      period: '/month',
      icon: Zap,
      popular: true,
      features: [
        '500 verifications/month',
        'Advanced AI matching',
        'Priority support',
        'Full history access',
        'Detailed confidence metrics',
        'Bulk upload (up to 100)',
        'CSV/PDF exports',
        'Map integration'
      ],
      limitations: [
        'No API access',
        'Limited bulk size'
      ],
      color: 'text-vibrant-orange',
      bgColor: 'bg-gradient-to-br from-vibrant-orange/5 to-bright-yellow/5'
    },
    {
      name: 'Enterprise',
      price: '₦100,000',
      period: '/month',
      icon: Crown,
      features: [
        'Unlimited verifications',
        'Premium AI algorithms',
        '24/7 dedicated support',
        'Complete data access',
        'Advanced analytics',
        'Unlimited bulk uploads',
        'Full API access',
        'Custom integrations',
        'White-label options',
        'SLA guarantees'
      ],
      limitations: [],
      color: 'text-bold-red',
      bgColor: 'bg-gradient-to-br from-bold-red/5 to-vibrant-orange/5'
    }
  ];

  const currentPlanIndex = plans.findIndex(p => p.name.toLowerCase() === currentPlan);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {lockedFeature ? `Upgrade to Access ${lockedFeature}` : 'Choose Your Plan'}
          </DialogTitle>
          {lockedFeature && (
            <p className="text-center text-gray-600 mt-2">
              This feature requires a higher plan. Upgrade now to unlock full potential!
            </p>
          )}
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isCurrent = index === currentPlanIndex;
            const isUpgrade = index > currentPlanIndex;

            return (
              <div
                key={plan.name}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                  plan.popular 
                    ? 'border-vibrant-orange shadow-lg transform scale-105' 
                    : isCurrent
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${plan.bgColor}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-vibrant-orange to-bright-yellow text-white px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                {isCurrent && (
                  <div className="absolute -top-3 right-4">
                    <Badge className="bg-green-500 text-white px-3 py-1">
                      Current Plan
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`inline-flex p-3 rounded-full ${plan.bgColor} mb-4`}>
                    <Icon className={`h-8 w-8 ${plan.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Features Included:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.limitations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <X className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-500">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <Button
                  className={`w-full ${
                    isCurrent
                      ? 'bg-green-500 hover:bg-green-600 text-white cursor-default'
                      : isUpgrade
                      ? 'bg-gradient-to-r from-bold-red to-vibrant-orange text-white hover:shadow-lg transition-all duration-300'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={() => isUpgrade && onUpgrade?.(plan.name.toLowerCase())}
                  disabled={!isUpgrade}
                >
                  {isCurrent ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Current Plan
                    </>
                  ) : isUpgrade ? (
                    <>
                      Upgrade to {plan.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    'Downgrade'
                  )}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">Need a custom solution?</h4>
              <p className="text-sm text-gray-600">Contact our sales team for enterprise pricing and custom features.</p>
            </div>
            <Button variant="outline">
              Contact Sales
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlanUpgradeModal;
