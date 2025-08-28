import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import OrganizationDashboard from './OrganizationDashboard';
import GovernmentDashboard from './GovernmentDashboard';
import NotificationsPanel from '@/components/dashboard/NotificationsPanel';
import RecentSearchesTable from '@/components/dashboard/RecentSearchesTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Wallet, 
  CheckCircle, 
  Activity,
  TrendingUp
} from 'lucide-react';

const DashboardHome = () => {
  const { user } = useAuth();

  // Mock data for individual user - in real app, this would come from API
  const mockUserData = {
    walletBalance: 15000,
    totalVerifications: 127,
    systemUptime: 99.9
  };

  // Render specific dashboard based on user role
  if (user?.role === 'admin') {
    return <GovernmentDashboard />;
  }
  
  if (user?.role === 'organization-admin' || user?.role === 'organization-member' || user?.role === 'organization') {
    return <OrganizationDashboard />;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Wallet Balance Card */}
              <Card className="bg-white border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-gray-400" />
                    Wallet Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    ₦{mockUserData.walletBalance.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-green-600 font-medium">+12%</span>
                    <span className="text-gray-500">from last month</span>
                  </div>
                </CardContent>
              </Card>

              {/* Verifications Card */}
              <Card className="bg-white border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-gray-400" />
                    Verifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {mockUserData.totalVerifications}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-green-600 font-medium">+8%</span>
                    <span className="text-gray-500">from last month</span>
                  </div>
                </CardContent>
              </Card>

              {/* System Uptime Card */}
              <Card className="bg-white border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-gray-400" />
                    System Uptime
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {mockUserData.systemUptime}%
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium">Excellent</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Searches Table */}
            <RecentSearchesTable />
          </div>

          {/* Notifications Panel */}
          <div className="col-span-12 lg:col-span-4">
            <NotificationsPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
