import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Activity = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Activity Log</h1>
        <p className="text-gray-600">Monitor user activity and system events</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>View all user actions and system events</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Activity log interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Activity;