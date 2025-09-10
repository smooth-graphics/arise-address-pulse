import { PricingPlan, PlanSet } from '@/types/billing';

export const pricingPlans: PlanSet = {
  individual: [
    {
      id: 'individual-basic',
      name: 'Basic',
      description: 'Perfect for personal use and small projects',
      monthlyPrice: 500, // $5.00 in cents
      yearlyPrice: 4800, // $48.00 in cents (20% discount)
      features: [
        '1,000 address verifications/month',
        'Basic API access',
        'Email support',
        'Standard validation accuracy',
        'Basic reporting dashboard'
      ],
      notIncluded: [
        'Bulk upload',
        'Priority support',
        'Advanced analytics'
      ],
      buttonText: 'Start Basic Plan',
      buttonVariant: 'outline'
    },
    {
      id: 'individual-pro',
      name: 'Pro',
      description: 'For growing businesses and developers',
      monthlyPrice: 1500, // $15.00 in cents
      yearlyPrice: 14400, // $144.00 in cents (20% discount)
      popular: true,
      features: [
        '10,000 address verifications/month',
        'Advanced API access',
        'Priority email support',
        'Enhanced validation accuracy',
        'Advanced reporting & analytics',
        'Bulk CSV upload (up to 1,000)',
        'Custom validation rules'
      ],
      notIncluded: [
        'Phone support',
        'Custom integrations'
      ],
      buttonText: 'Start Pro Plan',
      buttonVariant: 'default'
    },
    {
      id: 'individual-enterprise',
      name: 'Enterprise',
      description: 'For large-scale operations and teams',
      monthlyPrice: 2500, // $25.00 in cents
      yearlyPrice: 24000, // $240.00 in cents (20% discount)
      features: [
        'Unlimited address verifications',
        'Full API access',
        '24/7 phone & email support',
        'Premium validation accuracy',
        'Custom reporting & analytics',
        'Unlimited bulk uploads',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantee'
      ],
      buttonText: 'Start Enterprise Plan',
      buttonVariant: 'default'
    }
  ],
  business: [
    {
      id: 'business-basic',
      name: 'Business Basic',
      description: 'Essential features for growing businesses',
      monthlyPrice: 19900, // $199.00 in cents
      yearlyPrice: 191040, // $1910.40 in cents (20% discount)
      features: [
        '50,000 address verifications/month',
        'Business API access',
        'Priority email support',
        'Enhanced validation accuracy',
        'Team collaboration (up to 10 users)',
        'Business reporting dashboard',
        'Bulk CSV upload (up to 10,000)'
      ],
      notIncluded: [
        'Phone support',
        'Custom branding',
        'Advanced integrations'
      ],
      buttonText: 'Start Business Basic',
      buttonVariant: 'outline'
    },
    {
      id: 'business-pro',
      name: 'Business Pro',
      description: 'Advanced features for established businesses',
      monthlyPrice: 29900, // $299.00 in cents
      yearlyPrice: 287040, // $2870.40 in cents (20% discount)
      popular: true,
      features: [
        '250,000 address verifications/month',
        'Advanced business API',
        'Priority support (email & chat)',
        'Premium validation accuracy',
        'Team collaboration (up to 25 users)',
        'Advanced analytics & reporting',
        'Bulk uploads (up to 50,000)',
        'Custom validation workflows',
        'White-label options'
      ],
      notIncluded: [
        'Phone support',
        'Custom integrations'
      ],
      buttonText: 'Start Business Pro',
      buttonVariant: 'default'
    },
    {
      id: 'business-enterprise',
      name: 'Business Enterprise',
      description: 'Complete solution for enterprise organizations',
      monthlyPrice: null, // Contact Sales - no fixed price
      yearlyPrice: null,  // Contact Sales - no fixed price
      features: [
        'Unlimited address verifications',
        'Enterprise API access',
        '24/7 dedicated support',
        'Premium validation accuracy',
        'Unlimited team members',
        'Custom analytics & reporting',
        'Unlimited bulk uploads',
        'Custom integrations & APIs',
        'Full white-label solution',
        'Dedicated account manager',
        'SLA guarantee',
        'On-premise deployment options'
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'default'
    }
  ]
};

export const formatPrice = (price: number | null): string => {
  if (price === null) return 'Contact Sales';
  return `$${(price / 100).toFixed(2)}`;
};

export const calculateYearlyDiscount = (monthlyPrice: number | null, yearlyPrice: number | null): number => {
  if (!monthlyPrice || !yearlyPrice) return 0;
  const yearlyFromMonthly = monthlyPrice * 12;
  return Math.round(((yearlyFromMonthly - yearlyPrice) / yearlyFromMonthly) * 100);
};