import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useNotifications } from '@/hooks/api/useNotifications';
import { useUsageLimit } from '@/hooks/api/useUsageLimit';
import { mockUsageLimitService } from '@/services/mock/mockUsageLimitService';
import { UsageAlertBanner } from '@/components/notifications/UsageAlertBanner';
import {
  Bell,
  Search,
  Eye,
  ChevronDown,
  ArrowUpRight,
  Settings as SettingsIcon,
  MoreVertical,
  Users,
  Upload,
  Building,
  Key,
  FileText,
  BarChart3,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  value: string;
  subtitle?: string;
  showEye?: boolean;
  showDropdown?: boolean;
  dropdownText?: string;
}

function DashboardCard({
  title,
  value,
  subtitle,
  showEye,
  showDropdown,
  dropdownText,
}: DashboardCardProps) {
  return (
    <div className="flex-1 p-4 border-2 border-dashed border-gray-200 rounded-2xl bg-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {title}
          </span>
          {showEye && <Eye className="w-5 h-5 text-gray-600" strokeWidth={1} />}
        </div>
        {showDropdown && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>{dropdownText}</span>
            <ChevronDown className="w-5 h-5" strokeWidth={1} />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-medium text-black">{value}</span>
          {subtitle && (
            <span className="text-sm font-medium text-gray-600">
              {subtitle}
            </span>
          )}
        </div>
        <button className="p-1 hover:bg-gray-50 rounded transition-colors">
          <ArrowUpRight
            className="w-6 h-6 text-orange-primary"
            strokeWidth={1.5}
          />
        </button>
      </div>
    </div>
  );
}

interface NotificationItemProps {
  title: string;
  subtitle: string;
  time: string;
  isUnread?: boolean;
}

function NotificationItem({
  title,
  subtitle,
  time,
  isUnread,
}: NotificationItemProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 p-3 border-t border-b border-gray-200",
        isUnread ? "bg-white" : "bg-gray-50",
      )}
    >
      <div className="w-12 h-12 bg-gray-300 rounded-lg flex-shrink-0"></div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-1 mb-1">
          <span
            className={cn(
              "text-sm font-medium",
              isUnread ? "text-black" : "text-gray-600",
            )}
          >
            {title}
          </span>
          {isUnread && (
            <div className="w-2 h-2 bg-orange-primary rounded-full mt-1 flex-shrink-0"></div>
          )}
        </div>
        <p className="text-xs text-gray-600 mb-0">{subtitle}</p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-xs font-medium text-gray-500">{time}</span>
        <MoreVertical className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'verified':
      case 'completed':
      case 'active':
        return 'border-green-500 bg-green-100 text-green-700';
      case 'pending':
        return 'border-yellow-500 bg-yellow-100 text-yellow-700';
      case 'rejected':
      case 'failed':
      case 'inactive':
        return 'border-red-500 bg-red-100 text-red-700';
      case 'needs_more_info':
        return 'border-blue-500 bg-blue-100 text-blue-700';
      default:
        return 'border-gray-500 bg-gray-100 text-gray-700';
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border-0.5 ${getStatusColor(status)}`}>
      {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
    </span>
  );
}

const OrganizationDashboard = () => {
  const { user } = useAuth();
  const { data: notifications, isLoading: notificationsLoading } = useNotifications({ limit: 6 });
  const { data: usageLimit } = useUsageLimit(user?.id || '');
  const [selectedFilter, setSelectedFilter] = useState("verified");

  const isAdmin = user?.role === 'organization-admin';
  const usagePercentage = usageLimit ? mockUsageLimitService.calculateUsagePercentage(usageLimit) : 0;

  // Mock recent verifications data
  const recentVerifications = [
    {
      id: '1',
      name: 'John Doe',
      address: 'Victoria Island, Lagos',
      status: 'verified',
      matchScore: 98,
      date: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      address: 'Abuja Central, FCT',
      status: 'pending',
      matchScore: null,
      date: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: '3',
      name: 'David Okafor',
      address: 'Ikeja GRA, Lagos',
      status: 'verified',
      matchScore: 95,
      date: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: '4',
      name: 'Grace Adebayo',
      address: 'Port Harcourt, Rivers',
      status: 'needs_more_info',
      matchScore: null,
      date: new Date(Date.now() - 259200000).toISOString(),
    },
    {
      id: '5',
      name: 'Michael Chen',
      address: 'Lekki Phase 1, Lagos',
      status: 'verified',
      matchScore: 92,
      date: new Date(Date.now() - 345600000).toISOString(),
    },
  ];

  return (
    <div className="flex-1 bg-white lg:rounded-tl-xl min-h-screen lg:min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4.5 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-700 tracking-tight">
          {isAdmin ? 'Organization Overview' : 'Team Dashboard'}
        </h1>

        <div className="flex items-center gap-4">
          {/* Admin Actions */}
          {isAdmin && (
            <div className="flex items-center gap-2">
              <Link to="/dashboard/team">
                <button className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  <Users className="w-4 h-4" />
                  Manage Team
                </button>
              </Link>
              <Link to="/dashboard/bulk-upload">
                <button className="flex items-center gap-1.5 px-3 py-1 bg-orange-primary text-white text-sm font-medium rounded-lg hover:bg-orange-primary/90 transition-colors">
                  <Upload className="w-4 h-4" />
                  Bulk Upload
                </button>
              </Link>
            </div>
          )}

          {/* Verify Button */}
          <Link to="/dashboard/search">
            <button className="flex items-center gap-1.5 px-3 py-1 bg-orange-primary text-white text-sm font-medium rounded-lg shadow-lg shadow-orange-primary/25 hover:bg-orange-primary/90 transition-colors">
              Verify
              <Search className="w-4 h-4" strokeWidth={1.2} />
            </button>
          </Link>

          {/* Notifications */}
          <Link to="/dashboard/notifications">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
              <Bell className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
            </div>
          </Link>
        </div>
      </div>

      <div className="flex gap-4 p-4 h-[calc(100vh-6rem)]">
        {/* Main Content */}
        <div className="flex-1">
          {/* Usage Alert for Organization Members */}
          {!isAdmin && (
            <div className="mb-4">
              <UsageAlertBanner />
            </div>
          )}

          {/* Dashboard Cards */}
          <div className="flex gap-4 mb-8">
            {isAdmin ? (
              <>
                <DashboardCard
                  title="Total Staff"
                  value="1,247"
                  subtitle="members"
                  showEye={true}
                />
                <DashboardCard
                  title="API Requests"
                  value="23,451"
                  showDropdown={true}
                  dropdownText="This Month"
                />
                <DashboardCard
                  title="System Uptime"
                  value="99.9%"
                  showEye={true}
                />
              </>
            ) : usageLimit ? (
              <>
                <DashboardCard
                  title="Units Remaining"
                  value={usageLimit.remainingUnits.toString()}
                  subtitle={`of ${usageLimit.allocatedUnits}`}
                  showEye={false}
                />
                <DashboardCard
                  title="Units Used"
                  value={`${usagePercentage}%`}
                  subtitle={`${usageLimit.usedUnits} used`}
                  showEye={false}
                />
                <DashboardCard
                  title="Reset Date"
                  value={usageLimit.resetDate ? new Date(usageLimit.resetDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A'}
                  showEye={false}
                />
              </>
            ) : (
              <>
                <DashboardCard
                  title="Verifications"
                  value="45"
                  showDropdown={true}
                  dropdownText="This Month"
                />
                <DashboardCard
                  title="Team Size"
                  value="12"
                  subtitle="members"
                  showEye={true}
                />
                <DashboardCard
                  title="Success Rate"
                  value="94.2%"
                  showEye={true}
                />
              </>
            )}
          </div>

          {/* Recent Verifications Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-black">
                {isAdmin ? 'Recent Team Verifications' : 'My Recent Verifications'}
              </h2>

              <div className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded-lg bg-white">
                <span className="text-xs font-medium text-gray-600">
                  Verified
                </span>
                <ChevronDown
                  className="w-5 h-5 text-gray-400"
                  strokeWidth={1.2}
                />
              </div>
            </div>

            {/* Table */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600">
                      Name
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 w-44">
                      Address
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 w-35">
                      Status
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 w-32">
                      Result
                    </th>
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-gray-600 w-32">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {recentVerifications.map((record) => (
                    <tr
                      key={record.id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="px-3 py-2.5 pt-4 text-sm text-black h-11">
                        {record.name}
                      </td>
                      <td className="px-3 py-2.5 pt-4 text-sm text-black h-11">
                        <div
                          className="truncate max-w-[160px]"
                          title={record.address}
                        >
                          {record.address}
                        </div>
                      </td>
                      <td className="px-3 py-2.5 pt-4 h-11">
                        <StatusBadge status={record.status} />
                      </td>
                      <td className="px-3 py-2.5 pt-4 text-sm text-black h-11">
                        {record.matchScore ? `${record.matchScore}% Match` : 'Pending'}
                      </td>
                      <td className="px-3 py-2.5 pt-4 text-sm text-black h-11">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* See History Button */}
            <div className="flex justify-center">
              <Link
                to="/dashboard/history"
                className="inline-flex items-center px-3 py-2 border border-orange-primary text-orange-primary bg-white rounded-lg shadow-lg shadow-orange-primary/25 hover:bg-orange-primary/5 transition-colors text-sm font-medium"
              >
                See history
              </Link>
            </div>

            {/* Quick Actions Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-black mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {isAdmin && (
                  <Link to="/dashboard/team">
                    <button className="w-full flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      <Users className="w-4 h-4" />
                      Team Management
                    </button>
                  </Link>
                )}
                <Link to="/dashboard/bulk-upload">
                  <button className="w-full flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <Upload className="w-4 h-4" />
                    {isAdmin ? 'Bulk Upload' : 'Upload Documents'}
                  </button>
                </Link>
                <Link to="/dashboard/settings">
                  <button className="w-full flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <Building className="w-4 h-4" />
                    Organization Profile
                  </button>
                </Link>
                {isAdmin && (
                  <Link to="/dashboard/api">
                    <button className="w-full flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      <Key className="w-4 h-4" />
                      API Management
                    </button>
                  </Link>
                )}
                <Link to="/dashboard/documents">
                  <button className="w-full flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <FileText className="w-4 h-4" />
                    {isAdmin ? 'Document Templates' : 'My Documents'}
                  </button>
                </Link>
                <Link to="/dashboard/activity">
                  <button className="w-full flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <BarChart3 className="w-4 h-4" />
                    Analytics
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Panel */}
        <div className="w-[374px] bg-gray-200 rounded-2xl border border-gray-200 overflow-hidden flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-700">
                All Notifications
              </span>
              <ChevronDown className="w-5 h-5 text-gray-600" strokeWidth={1} />
            </div>
            <SettingsIcon className="w-6 h-6 text-gray-500" strokeWidth={1.5} />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
            <div className="flex items-center gap-2">
              <button className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded">
                All
              </button>
              <button className="px-2 py-1 text-gray-700 text-xs font-medium rounded hover:bg-gray-100">
                Unread (2)
              </button>
            </div>
            <button className="text-xs font-medium text-gray-700 hover:text-gray-900">
              Mark all as read
            </button>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {notificationsLoading ? (
              <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : (
              (notifications?.notifications || []).map((notification) => (
                <NotificationItem
                  key={notification.id}
                  title={notification.title}
                  subtitle={notification.message}
                  time={new Date(notification.createdAt).toLocaleTimeString()}
                  isUnread={!notification.isRead}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
