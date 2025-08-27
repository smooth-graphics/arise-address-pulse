import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Verifications = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Verifications</h1>
        <p className="text-gray-600">View and manage all verification requests</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Verification History</CardTitle>
          <CardDescription>Track all verification requests and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Verifications interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Verifications;