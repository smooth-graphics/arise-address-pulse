import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Billing = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing & Usage</h1>
        <p className="text-gray-600">Manage billing information and view usage statistics</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>View invoices, usage metrics, and payment methods</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Billing management interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;