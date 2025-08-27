import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        <p className="text-gray-600">Configure system-wide settings and preferences</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>Manage system settings and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Settings interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSettings;