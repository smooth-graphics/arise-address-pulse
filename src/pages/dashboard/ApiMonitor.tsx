import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ApiMonitor = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">API Monitor</h1>
        <p className="text-gray-600">Monitor API usage and performance metrics</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>API Analytics</CardTitle>
          <CardDescription>Track API calls, response times, and errors</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">API monitoring dashboard coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiMonitor;