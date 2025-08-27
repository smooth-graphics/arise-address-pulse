import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const BulkUpload = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bulk Upload</h1>
        <p className="text-gray-600">Upload multiple documents for verification</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Bulk Document Upload</CardTitle>
          <CardDescription>Upload and process multiple documents at once</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Bulk upload interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkUpload;