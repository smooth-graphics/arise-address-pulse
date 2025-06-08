
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Users, 
  Building, 
  MapPin, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  Activity,
  FileText,
  Database,
  Globe,
  Lock,
  Eye,
  Download,
  Settings,
  BarChart3
} from 'lucide-react';

const GovernmentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Government Dashboard</h2>
          <p className="text-gray-600">National Address Verification System - Administrative Control</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-gradient-to-r from-bold-red to-vibrant-orange text-white">
            <Shield className="mr-2 h-4 w-4" />
            Security Center
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
        </div>
      </div>

      {/* National Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-bold-red">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Citizens</CardTitle>
            <Users className="h-4 w-4 text-bold-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1M</div>
            <p className="text-xs text-muted-foreground">+0.8% population growth</p>
            <Progress value={92} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-vibrant-orange">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Addresses</CardTitle>
            <MapPin className="h-4 w-4 text-vibrant-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.9M</div>
            <p className="text-xs text-muted-foreground">90.5% verification rate</p>
            <Progress value={91} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-bright-yellow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organizations</CardTitle>
            <Building className="h-4 w-4 text-dark-charcoal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,678</div>
            <p className="text-xs text-muted-foreground">Registered entities</p>
            <Progress value={88} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-dark-charcoal">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">Uptime this month</p>
            <Progress value={100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Administrative Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-bold-red flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Administrative Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start bg-gradient-to-r from-bold-red to-vibrant-orange text-white">
              <Database className="mr-2 h-4 w-4" />
              National Database
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Citizen Management
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Building className="mr-2 h-4 w-4" />
              Organization Registry
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Lock className="mr-2 h-4 w-4" />
              Security Policies
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Globe className="mr-2 h-4 w-4" />
              API Governance
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              National Analytics
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Real-time System Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Lagos State - Bulk Verification Complete</p>
                  <p className="text-xs text-gray-500">12,450 addresses processed • 98.2% success rate</p>
                </div>
                <span className="text-xs text-gray-500">5 min ago</span>
              </div>
              
              <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Activity className="h-5 w-5 text-blue-600 mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium">New Organization Registration</p>
                  <p className="text-xs text-gray-500">First Bank Nigeria - Awaiting verification</p>
                </div>
                <span className="text-xs text-gray-500">12 min ago</span>
              </div>
              
              <div className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Security Alert</p>
                  <p className="text-xs text-gray-500">Unusual API activity detected from IP: 192.168.1.1</p>
                </div>
                <span className="text-xs text-gray-500">30 min ago</span>
              </div>
              
              <div className="flex items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                <Globe className="h-5 w-5 text-purple-600 mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium">System Update Deployed</p>
                  <p className="text-xs text-gray-500">Enhanced AI verification algorithms</p>
                </div>
                <span className="text-xs text-gray-500">1 hour ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Government Features & Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-vibrant-orange">Government Authorities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">National Database Access</span>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">Full Data Visibility</span>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">Policy Management</span>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">Audit Trail Access</span>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-dark-charcoal">Security & Compliance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Data Protection Level</span>
              <span className="font-semibold text-bold-red">Maximum</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Encryption Status</span>
              <span className="font-semibold text-green-600">AES-256</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Compliance</span>
              <span className="font-semibold text-green-600">NDPR Compliant</span>
            </div>
            <Button className="w-full mt-4" variant="outline">
              <Lock className="mr-2 h-4 w-4" />
              Security Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-bright-yellow">National Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">States Covered</span>
              <span className="font-semibold">36/36</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">LGAs Mapped</span>
              <span className="font-semibold">774/774</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Daily Verifications</span>
              <span className="font-semibold">15,234</span>
            </div>
            <Button className="w-full mt-4" variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              View Full Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GovernmentDashboard;
