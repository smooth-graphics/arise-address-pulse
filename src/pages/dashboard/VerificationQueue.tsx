import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const VerificationQueue = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Verification Queue</h1>
        <p className="text-gray-600">Monitor and manage pending verifications</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Pending Verifications</CardTitle>
          <CardDescription>Review and process verification requests</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Verification queue interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationQueue;