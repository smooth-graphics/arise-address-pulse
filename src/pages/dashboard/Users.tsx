import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Users = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600">Manage system users and their permissions</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>View and manage all system users</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">User management interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;