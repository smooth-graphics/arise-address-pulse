import {
  PricingPlan,
  CreatePlanRequest,
  UpdatePlanRequest,
  PricingAnalytics
} from '@/types/pricingManagement';

class MockPricingManagementService {
  private delay = (ms: number = 600) => new Promise(resolve => setTimeout(resolve, ms));

  private mockPlans: PricingPlan[] = [
    {
      id: 'plan-individual',
      name: 'Individual Plan',
      slug: 'individual',
      description: 'Perfect for personal use and small-scale verifications',
      price: 5000,
      currency: 'NGN',
      billingPeriod: 'monthly',
      features: [
        { id: 'f1', name: 'Address Verifications', description: 'Up to 50 verifications/month', included: true, limit: 50 },
        { id: 'f2', name: 'Basic Support', description: 'Email support', included: true },
        { id: 'f3', name: 'Bulk Upload', description: 'Upload multiple records', included: false },
        { id: 'f4', name: 'API Access', description: 'Programmatic access', included: false }
      ],
      limits: {
        verificationsPerMonth: 50,
        bulkUploads: false,
        apiAccess: false,
        customReports: false,
        prioritySupport: false
      },
      isActive: true,
      isCustom: false,
      targetAudience: 'individual',
      createdAt: '2023-10-01T00:00:00Z',
      updatedAt: '2024-02-15T00:00:00Z'
    },
    {
      id: 'plan-business',
      name: 'Business Plan',
      slug: 'business',
      description: 'Ideal for businesses with regular verification needs',
      price: 25000,
      currency: 'NGN',
      billingPeriod: 'monthly',
      features: [
        { id: 'f1', name: 'Address Verifications', description: 'Up to 500 verifications/month', included: true, limit: 500 },
        { id: 'f2', name: 'Priority Support', description: 'Phone and email support', included: true },
        { id: 'f3', name: 'Bulk Upload', description: 'Upload multiple records', included: true },
        { id: 'f4', name: 'API Access', description: 'Full API integration', included: true, limit: 10000 },
        { id: 'f5', name: 'Team Members', description: 'Up to 10 team members', included: true, limit: 10 }
      ],
      limits: {
        verificationsPerMonth: 500,
        bulkUploads: true,
        apiAccess: true,
        apiCallsPerDay: 10000,
        teamMembers: 10,
        customReports: true,
        prioritySupport: true
      },
      isActive: true,
      isCustom: false,
      targetAudience: 'business',
      createdAt: '2023-10-01T00:00:00Z',
      updatedAt: '2024-02-15T00:00:00Z'
    },
    {
      id: 'plan-government',
      name: 'Government Plan',
      slug: 'government',
      description: 'Comprehensive solution for government agencies',
      price: 100000,
      currency: 'NGN',
      billingPeriod: 'monthly',
      features: [
        { id: 'f1', name: 'Unlimited Verifications', description: 'No monthly limits', included: true },
        { id: 'f2', name: 'Dedicated Support', description: '24/7 support with SLA', included: true },
        { id: 'f3', name: 'Bulk Upload', description: 'Upload multiple records', included: true },
        { id: 'f4', name: 'API Access', description: 'Unlimited API calls', included: true },
        { id: 'f5', name: 'Team Members', description: 'Unlimited team members', included: true },
        { id: 'f6', name: 'Custom Reports', description: 'Advanced analytics', included: true }
      ],
      limits: {
        verificationsPerMonth: -1, // unlimited
        bulkUploads: true,
        apiAccess: true,
        customReports: true,
        prioritySupport: true
      },
      isActive: true,
      isCustom: false,
      targetAudience: 'government',
      createdAt: '2023-10-01T00:00:00Z',
      updatedAt: '2024-02-15T00:00:00Z'
    }
  ];

  async getPlans(): Promise<PricingPlan[]> {
    await this.delay();
    return this.mockPlans;
  }

  async getPlan(planId: string): Promise<PricingPlan> {
    await this.delay();

    const plan = this.mockPlans.find(p => p.id === planId);
    if (!plan) {
      throw new Error('Plan not found');
    }

    return plan;
  }

  async createPlan(request: CreatePlanRequest): Promise<PricingPlan> {
    await this.delay(800);

    const newPlan: PricingPlan = {
      id: `plan-${Date.now()}`,
      ...request,
      features: request.features.map((f, i) => ({ ...f, id: `f${i + 1}` })),
      isActive: true,
      isCustom: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.mockPlans.push(newPlan);
    return newPlan;
  }

  async updatePlan(planId: string, request: UpdatePlanRequest): Promise<PricingPlan> {
    await this.delay();

    const plan = this.mockPlans.find(p => p.id === planId);
    if (!plan) {
      throw new Error('Plan not found');
    }

    if (request.name) plan.name = request.name;
    if (request.description) plan.description = request.description;
    if (request.price !== undefined) plan.price = request.price;
    if (request.features) {
      plan.features = request.features.map((f, i) => ({ ...f, id: `f${i + 1}` }));
    }
    if (request.limits) plan.limits = request.limits;
    if (request.isActive !== undefined) plan.isActive = request.isActive;

    plan.updatedAt = new Date().toISOString();

    return plan;
  }

  async deletePlan(planId: string): Promise<void> {
    await this.delay();

    const index = this.mockPlans.findIndex(p => p.id === planId);
    if (index === -1) {
      throw new Error('Plan not found');
    }

    this.mockPlans.splice(index, 1);
  }

  async getPricingAnalytics(): Promise<PricingAnalytics> {
    await this.delay();

    return {
      totalSubscriptions: 1234,
      totalRevenue: 45678900,
      averageRevenuePerUser: 37000,
      planDistribution: [
        {
          planId: 'plan-individual',
          planName: 'Individual Plan',
          subscriberCount: 856,
          revenue: 4280000
        },
        {
          planId: 'plan-business',
          planName: 'Business Plan',
          subscriberCount: 312,
          revenue: 7800000
        },
        {
          planId: 'plan-government',
          planName: 'Government Plan',
          subscriberCount: 66,
          revenue: 6600000
        }
      ],
      revenueByMonth: [
        { month: '2024-01', revenue: 12345000 },
        { month: '2024-02', revenue: 15678000 },
        { month: '2024-03', revenue: 17655900 }
      ]
    };
  }
}

export const mockPricingManagementService = new MockPricingManagementService();
