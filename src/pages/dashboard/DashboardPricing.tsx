import { PricingManagementDashboard } from '@/components/pricing/PricingManagementDashboard';

const DashboardPricing = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pricing Management</h1>
        <p className="text-gray-600">Configure pricing plans and billing settings</p>
      </div>
      
      <PricingManagementDashboard />
    </div>
  );
};

export default DashboardPricing;