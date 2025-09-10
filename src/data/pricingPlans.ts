import { PricingPlan, PlanSet } from '@/types/billing';

export const pricingPlans: PlanSet = {
  individual: [
    {
      id: 'individual-basic',
      name: 'Basic',
      description: 'Perfect for personal use and small projects',
      monthlyPrice: 5000,
      yearlyPrice: 48000, // 20% discount
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
      monthlyPrice: 15000,
      yearlyPrice: 144000, // 20% discount
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
      monthlyPrice: 35000,
      yearlyPrice: 336000, // 20% discount
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
      monthlyPrice: 15000,
      yearlyPrice: 144000, // 20% discount
      features: [
        '5,000 address verifications/month',
        'Business API access',
        'Priority email support',
        'Enhanced validation accuracy',
        'Team collaboration (up to 5 users)',
        'Business reporting dashboard',
        'Bulk CSV upload (up to 5,000)'
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
      monthlyPrice: 45000,
      yearlyPrice: 432000, // 20% discount
      popular: true,
      features: [
        '25,000 address verifications/month',
        'Advanced business API',
        'Priority support (email & chat)',
        'Premium validation accuracy',
        'Team collaboration (up to 15 users)',
        'Advanced analytics & reporting',
        'Bulk uploads (up to 25,000)',
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
      monthlyPrice: 95000,
      yearlyPrice: 912000, // 20% discount
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

export const formatPrice = (price: number): string => {
  return `₦${price.toLocaleString()}`;
};

export const calculateYearlyDiscount = (monthlyPrice: number, yearlyPrice: number): number => {
  const yearlyFromMonthly = monthlyPrice * 12;
  return Math.round(((yearlyFromMonthly - yearlyPrice) / yearlyFromMonthly) * 100);
};