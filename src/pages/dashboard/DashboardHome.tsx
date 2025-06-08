
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
  AlertCircle,
  Sparkles,
  ArrowUpRight,
  BarChart3,
  Shield
} from 'lucide-react';

const DashboardHome = () => {
  const { user } = useAuth();

  // Render specific dashboard based on user role
  if (user?.role === 'government' as any) {
    return <GovernmentDashboard />;
  }
  
  if (user?.role === 'organization' as any) {
    return <OrganizationDashboard />;
  }

  // Individual user dashboard with 2025 modern card design
  return (
    <div className="space-y-8 p-6">
      {/* Header with gradient background */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-bold-red via-vibrant-orange to-bright-yellow p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex justify-between items-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Welcome back, {user?.firstName}!</h2>
            <p className="text-white/90 text-lg">Your personal address verification hub</p>
            <div className="flex items-center gap-2 mt-4">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-medium">AI-Powered Verification</span>
            </div>
          </div>
          <Button className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 transition-all duration-300">
            <MapPin className="mr-2 h-4 w-4" />
            New Verification
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Modern Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-bold-red/5 to-vibrant-orange/5"></div>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700">Total Verifications</CardTitle>
            <div className="p-2 bg-gradient-to-br from-bold-red to-vibrant-orange rounded-xl">
              <MapPin className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-gray-900 mb-1">3</div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600 font-medium">+33%</span>
              <span className="text-gray-500">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5"></div>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700">Verified</CardTitle>
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-gray-900 mb-1">2</div>
            <div className="flex items-center gap-1 text-sm">
              <Shield className="h-3 w-3 text-green-600" />
              <span className="text-green-600 font-medium">67%</span>
              <span className="text-gray-500">success rate</span>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-bright-yellow/5 to-amber-500/5"></div>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700">Pending</CardTitle>
            <div className="p-2 bg-gradient-to-br from-bright-yellow to-amber-500 rounded-xl">
              <Clock className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-gray-900 mb-1">1</div>
            <div className="flex items-center gap-1 text-sm">
              <AlertCircle className="h-3 w-3 text-amber-600" />
              <span className="text-amber-600 font-medium">Under review</span>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-dark-charcoal/5 to-gray-700/5"></div>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700">Documents</CardTitle>
            <div className="p-2 bg-gradient-to-br from-dark-charcoal to-gray-700 rounded-xl">
              <FileText className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-gray-900 mb-1">5</div>
            <div className="flex items-center gap-1 text-sm">
              <CheckCircle className="h-3 w-3 text-green-600" />
              <span className="text-green-600 font-medium">All approved</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border-0 shadow-xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-bold-red to-vibrant-orange"></div>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
              <div className="p-2 bg-gradient-to-br from-bold-red to-vibrant-orange rounded-xl">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start bg-gradient-to-r from-bold-red to-vibrant-orange text-white hover:shadow-lg transition-all duration-300 h-12 text-base font-semibold">
              <MapPin className="mr-3 h-5 w-5" />
              Start New Verification
              <ArrowUpRight className="ml-auto h-4 w-4" />
            </Button>
            <Button className="w-full justify-start bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border border-gray-200 hover:shadow-md hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 transition-all duration-300 h-12 text-base font-semibold">
              <FileText className="mr-3 h-5 w-5" />
              Upload Documents
              <ArrowUpRight className="ml-auto h-4 w-4" />
            </Button>
            <Button className="w-full justify-start bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200 hover:shadow-md hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 transition-all duration-300 h-12 text-base font-semibold">
              <BarChart3 className="mr-3 h-5 w-5" />
              View Analytics
              <ArrowUpRight className="ml-auto h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border-0 shadow-xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-vibrant-orange to-bright-yellow"></div>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
              <div className="p-2 bg-gradient-to-br from-vibrant-orange to-bright-yellow rounded-xl">
                <Clock className="h-5 w-5 text-white" />
              </div>
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md transition-all duration-300">
                <div className="p-2 bg-green-500 rounded-lg mr-4">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Address verified</p>
                  <p className="text-xs text-gray-600 mt-1">Victoria Island, Lagos</p>
                </div>
                <span className="text-xs text-gray-500 font-medium">2 days ago</span>
              </div>
              <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
                <div className="p-2 bg-blue-500 rounded-lg mr-4">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Document uploaded</p>
                  <p className="text-xs text-gray-600 mt-1">Utility bill processed by AI</p>
                </div>
                <span className="text-xs text-gray-500 font-medium">1 week ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
