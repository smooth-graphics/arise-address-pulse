
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Building, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  Upload,
  Key,
  Activity,
  CreditCard,
  FileText,
  MapPin,
  Clock,
  BarChart3,
  Download
} from 'lucide-react';

const OrganizationDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Organization Dashboard</h2>
          <p className="text-gray-600">{user?.organizationName} - Comprehensive Verification Management</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-gradient-to-r from-bold-red to-vibrant-orange text-white">
            <Upload className="mr-2 h-4 w-4" />
            Bulk Upload
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-bold-red">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-bold-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-vibrant-orange">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Staff</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,156</div>
            <p className="text-xs text-muted-foreground">92.7% success rate</p>
            <Progress value={93} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-bright-yellow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Requests</CardTitle>
            <TrendingUp className="h-4 w-4 text-vibrant-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23,451</div>
            <p className="text-xs text-muted-foreground">This month</p>
            <Progress value={78} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-dark-charcoal">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
            <Progress value={15} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-bold-red">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start bg-gradient-to-r from-bold-red to-vibrant-orange text-white" variant="default">
              <Users className="mr-2 h-4 w-4" />
              Bulk Staff Upload
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Building className="mr-2 h-4 w-4" />
              Update Organization Profile
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Key className="mr-2 h-4 w-4" />
              API Management
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Document Templates
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics Dashboard
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Verifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium">John Doe - Lagos Office</p>
                  <p className="text-xs text-gray-500">Address: Victoria Island, Lagos • Match Score: 98%</p>
                </div>
                <span className="text-xs text-gray-500">2 min ago</span>
              </div>
              
              <div className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <Clock className="h-5 w-5 text-yellow-600 mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Sarah Johnson - Abuja Branch</p>
                  <p className="text-xs text-gray-500">Document review pending</p>
                </div>
                <span className="text-xs text-gray-500">15 min ago</span>
              </div>
              
              <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Activity className="h-5 w-5 text-blue-600 mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Bulk Upload Completed</p>
                  <p className="text-xs text-gray-500">124 staff records processed</p>
                </div>
                <span className="text-xs text-gray-500">1 hour ago</span>
              </div>
              
              <div className="flex items-center p-3 bg-red-50 rounded-lg border border-red-200">
                <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium">API Rate Limit Warning</p>
                  <p className="text-xs text-gray-500">Approaching monthly quota</p>
                </div>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-vibrant-orange">Organization Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">Bulk Verification System</span>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">API Access & Management</span>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">Advanced Analytics</span>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">Custom Document Templates</span>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-dark-charcoal">Billing & Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Current Plan</span>
              <span className="font-semibold text-bold-red">Enterprise</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">API Calls Used</span>
              <span className="font-semibold">23,451 / 50,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Next Billing</span>
              <span className="font-semibold">Feb 15, 2024</span>
            </div>
            <Button className="w-full mt-4" variant="outline">
              <CreditCard className="mr-2 h-4 w-4" />
              Manage Billing
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
