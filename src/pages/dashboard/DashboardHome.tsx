
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import OrganizationDashboard from './OrganizationDashboard';
import GovernmentDashboard from './GovernmentDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  FileText, 
  CheckCircle, 
  Clock, 
  Users, 
  Building,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const DashboardHome = () => {
  const { user } = useAuth();

  // Render specific dashboard based on user role
  if (user?.role === 'government') {
    return <GovernmentDashboard />;
  }
  
  if (user?.role === 'organization') {
    return <OrganizationDashboard />;
  }

  // Individual user dashboard with enhanced UI
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user?.firstName}!</h2>
          <p className="text-gray-600">Your personal address verification hub</p>
        </div>
        <Button className="bg-gradient-to-r from-bold-red to-vibrant-orange text-white">
          <MapPin className="mr-2 h-4 w-4" />
          New Verification
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-bold-red">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Verifications</CardTitle>
            <MapPin className="h-4 w-4 text-bold-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-vibrant-orange">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">67% success rate</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-bright-yellow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Under review</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-dark-charcoal">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-dark-charcoal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">All approved</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-bold-red">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start bg-gradient-to-r from-bold-red to-vibrant-orange text-white">
              <MapPin className="mr-2 h-4 w-4" />
              Start New Verification
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Upload Documents
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-vibrant-orange">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Address verified</p>
                  <p className="text-xs text-gray-500">Victoria Island, Lagos</p>
                </div>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
              <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <FileText className="h-4 w-4 text-blue-600 mr-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Document uploaded</p>
                  <p className="text-xs text-gray-500">Utility bill</p>
                </div>
                <span className="text-xs text-gray-500">1 week ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
