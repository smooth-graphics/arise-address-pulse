export interface PricingPlan {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  billingPeriod: 'monthly' | 'yearly' | 'one-time';
  features: PlanFeature[];
  limits: PlanLimits;
  isActive: boolean;
  isCustom: boolean;
  targetAudience: 'individual' | 'business' | 'government' | 'enterprise';
  createdAt: string;
  updatedAt: string;
}

export interface PlanFeature {
  id: string;
  name: string;
  description: string;
  included: boolean;
  limit?: number;
}

export interface PlanLimits {
  verificationsPerMonth: number;
  bulkUploads: boolean;
  apiAccess: boolean;
  apiCallsPerDay?: number;
  teamMembers?: number;
  customReports: boolean;
  prioritySupport: boolean;
}

export interface CreatePlanRequest {
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  billingPeriod: 'monthly' | 'yearly' | 'one-time';
  features: Omit<PlanFeature, 'id'>[];
  limits: PlanLimits;
  targetAudience: 'individual' | 'business' | 'government' | 'enterprise';
}

export interface UpdatePlanRequest {
  name?: string;
  description?: string;
  price?: number;
  features?: Omit<PlanFeature, 'id'>[];
  limits?: PlanLimits;
  isActive?: boolean;
}

export interface PricingAnalytics {
  totalSubscriptions: number;
  totalRevenue: number;
  averageRevenuePerUser: number;
  planDistribution: {
    planId: string;
    planName: string;
    subscriberCount: number;
    revenue: number;
  }[];
  revenueByMonth: {
    month: string;
    revenue: number;
  }[];
}
