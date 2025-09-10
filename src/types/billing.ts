export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  notIncluded?: string[];
  popular?: boolean;
  buttonText?: string;
  buttonVariant?: 'default' | 'outline' | 'secondary';
}

export interface PlanSet {
  individual: PricingPlan[];
  business: PricingPlan[];
}

export type BillingPeriod = 'monthly' | 'yearly';
export type UserType = 'individual' | 'business';