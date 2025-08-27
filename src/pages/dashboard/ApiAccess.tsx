import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ApiAccess = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">API Access</h1>
        <p className="text-gray-600">Manage API keys and access credentials</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>Generate and manage API keys for your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">API access management coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiAccess;