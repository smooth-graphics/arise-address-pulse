export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number | null; // null for "Contact Sales" plans
  yearlyPrice: number | null;  // null for "Contact Sales" plans
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