
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import SearchTable from '@/components/common/SearchTable';
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
  Download,
  UserPlus,
  Settings,
  Shield,
  Eye
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  verifications: number;
}

const OrganizationDashboard = () => {
  const { user } = useAuth();
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState('');

  const isAdmin = user?.role === 'organization-admin';
  
  // Mock team data
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Admin Okafor',
      email: 'david@techcorp.com',
      role: 'Member',
      status: 'active',
      lastLogin: '2 hours ago',
      verifications: 45
    },
    {
      id: '2',
      name: 'Grace Adebayo',
      email: 'grace@techcorp.com',
      role: 'Member',
      status: 'active',
      lastLogin: '1 day ago',
      verifications: 32
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'michael@techcorp.com',
      role: 'Member',
      status: 'pending',
      lastLogin: 'Never',
      verifications: 0
    }
  ];

  const tableColumns = [
    {
      key: 'name' as keyof TeamMember,
      label: 'Name',
      sortable: true,
      filterable: true
    },
    {
      key: 'email' as keyof TeamMember,
      label: 'Email',
      sortable: true,
      filterable: true
    },
    {
      key: 'role' as keyof TeamMember,
      label: 'Role',
      sortable: true,
      render: (value: string) => (
        <Badge variant={value === 'Admin' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'status' as keyof TeamMember,
      label: 'Status',
      sortable: true,
      render: (value: string) => (
        <Badge 
          variant={
            value === 'active' ? 'default' : 
            value === 'pending' ? 'secondary' : 
            'destructive'
          }
        >
          {value}
        </Badge>
      )
    },
    {
      key: 'verifications' as keyof TeamMember,
      label: 'Verifications',
      sortable: true
    },
    {
      key: 'lastLogin' as keyof TeamMember,
      label: 'Last Login',
      sortable: true
    }
  ];

  const handleAddMember = () => {
    if (newMemberEmail.trim()) {
      console.log('Adding new member:', newMemberEmail);
      // TODO: Implement API call to add member
      setNewMemberEmail('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isAdmin ? 'Organization Admin Dashboard' : 'Organization Dashboard'}
          </h2>
          <p className="text-gray-600">
            {user?.organizationName} - {isAdmin ? 'Comprehensive Management & Analytics' : 'Team Verification Dashboard'}
          </p>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <Button 
              onClick={() => setShowUserManagement(!showUserManagement)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            >
              <Users className="mr-2 h-4 w-4" />
              Manage Team
            </Button>
          )}
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

      {/* User Management Section - Only for Admins */}
      {isAdmin && showUserManagement && (
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Shield className="h-5 w-5" />
              Team Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter email address to invite team member"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleAddMember} className="bg-blue-600 text-white">
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Member
              </Button>
            </div>
            
            <SearchTable
              data={teamMembers}
              columns={tableColumns}
              searchPlaceholder="Search team members..."
              onRowClick={(member) => console.log('View member:', member)}
              className="mt-4"
            />
          </CardContent>
        </Card>
      )}

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-bold-red">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isAdmin ? 'Total Staff' : 'Team Members'}
            </CardTitle>
            <Users className="h-4 w-4 text-bold-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isAdmin ? '1,247' : '12'}
            </div>
            <p className="text-xs text-muted-foreground">
              {isAdmin ? '+12% from last month' : '3 active this week'}
            </p>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-vibrant-orange">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Staff</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isAdmin ? '1,156' : '89'}
            </div>
            <p className="text-xs text-muted-foreground">
              {isAdmin ? '92.7% success rate' : '94.2% success rate'}
            </p>
            <Progress value={93} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-bright-yellow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isAdmin ? 'API Requests' : 'My Verifications'}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-vibrant-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isAdmin ? '23,451' : '45'}
            </div>
            <p className="text-xs text-muted-foreground">
              {isAdmin ? 'This month' : 'This quarter'}
            </p>
            <Progress value={78} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-dark-charcoal">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isAdmin ? '91' : '3'}
            </div>
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
            {isAdmin && (
              <Button 
                className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                onClick={() => setShowUserManagement(!showUserManagement)}
              >
                <Users className="mr-2 h-4 w-4" />
                Manage Team Members
              </Button>
            )}
            <Button className="w-full justify-start bg-gradient-to-r from-bold-red to-vibrant-orange text-white" variant="default">
              <Upload className="mr-2 h-4 w-4" />
              {isAdmin ? 'Bulk Staff Upload' : 'Upload Documents'}
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Building className="mr-2 h-4 w-4" />
              {isAdmin ? 'Update Organization Profile' : 'View Organization'}
            </Button>
            {isAdmin && (
              <Button className="w-full justify-start" variant="outline">
                <Key className="mr-2 h-4 w-4" />
                API Management
              </Button>
            )}
            <Button className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              {isAdmin ? 'Document Templates' : 'My Documents'}
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
                  <p className="text-sm font-medium">
                    {isAdmin ? 'John Doe - Lagos Office' : 'Your address verification'}
                  </p>
                  <p className="text-xs text-gray-500">
                    Address: Victoria Island, Lagos • Match Score: 98%
                  </p>
                </div>
                <span className="text-xs text-gray-500">2 min ago</span>
              </div>
              
              <div className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <Clock className="h-5 w-5 text-yellow-600 mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {isAdmin ? 'Sarah Johnson - Abuja Branch' : 'Document review pending'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {isAdmin ? 'Document review pending' : 'Utility bill under review'}
                  </p>
                </div>
                <span className="text-xs text-gray-500">15 min ago</span>
              </div>
              
              {isAdmin && (
                <>
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
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-vibrant-orange">
              {isAdmin ? 'Admin Features' : 'Available Features'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">
                {isAdmin ? 'Bulk Verification System' : 'Document Upload'}
              </span>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            {isAdmin && (
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">API Access & Management</span>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            )}
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">
                {isAdmin ? 'Advanced Analytics' : 'Basic Analytics'}
              </span>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            {isAdmin && (
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">Team Management</span>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-dark-charcoal">
              {isAdmin ? 'Billing & Usage' : 'Usage Summary'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Current Plan</span>
              <span className="font-semibold text-bold-red">
                {isAdmin ? 'Enterprise' : 'Team'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">
                {isAdmin ? 'API Calls Used' : 'Verifications Used'}
              </span>
              <span className="font-semibold">
                {isAdmin ? '23,451 / 50,000' : '45 / 500'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Next Billing</span>
              <span className="font-semibold">Feb 15, 2024</span>
            </div>
            {isAdmin && (
              <Button className="w-full mt-4" variant="outline">
                <CreditCard className="mr-2 h-4 w-4" />
                Manage Billing
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
