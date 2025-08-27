import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardPricing = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pricing Management</h1>
        <p className="text-gray-600">Configure pricing plans and billing settings</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Pricing Plans</CardTitle>
          <CardDescription>Manage subscription plans and pricing</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Pricing management interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPricing;