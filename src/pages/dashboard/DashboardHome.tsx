
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import OrganizationDashboard from './OrganizationDashboard';
import GovernmentDashboard from './GovernmentDashboard';
import { useWalletBalance, useUsageStats } from '@/hooks/api/useWallet';
import { useNotifications } from '@/hooks/api/useNotifications';
import { useVerificationHistory } from '@/hooks/api/useVerification';
import { useUsageLimit } from '@/hooks/api/useUsageLimit';
import { mockUsageLimitService } from '@/services/mock/mockUsageLimitService';
import { useState } from "react";
import { UsageAlertBanner } from '@/components/notifications/UsageAlertBanner';
import { Link } from "react-router-dom";
import WalletBalance from '@/components/billing/WalletBalance';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Bell,
  Search,
  Eye,
  ChevronDown,
  ArrowUpRight,
  Settings as SettingsIcon,
  MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
            className="w-6 h-6 text-genital-orange"
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
            <div className="w-2 h-2 bg-genital-orange rounded-full mt-1 flex-shrink-0"></div>
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
        return 'border-green-500 bg-green-100 text-green-700';
      case 'pending':
        return 'border-yellow-500 bg-yellow-100 text-yellow-700';
      case 'rejected':
      case 'failed':
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


function Overview() {
  const { user } = useAuth();
  const { data: walletBalance, isLoading: walletLoading } = useWalletBalance();
  const { data: usageStats, isLoading: usageLoading } = useUsageStats();
  const { data: notifications, isLoading: notificationsLoading } = useNotifications({ limit: 6 });
  const { data: recentSearches, isLoading: searchesLoading } = useVerificationHistory({ limit: 5 });
  const { data: usageLimit } = useUsageLimit(user?.id || '');
  
  const [selectedFilter, setSelectedFilter] = useState("verified");
  const usagePercentage = usageLimit ? mockUsageLimitService.calculateUsagePercentage(usageLimit) : 0;

  return (
    <div className="flex-1 bg-white lg:rounded-tl-xl min-h-screen lg:min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4.5 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-700 tracking-tight">
          Overview
        </h1>

        <div className="flex items-center gap-4">
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
          {user?.role === 'organization-member' && (
            <div className="mb-4">
              <UsageAlertBanner />
            </div>
          )}

          {/* Dashboard Cards */}
          <div className="flex gap-4 mb-8">
            {user?.role === 'organization-member' && usageLimit ? (
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
                  title="Wallet Balance"
                  value={walletLoading ? "..." : `${walletBalance?.balance || 0}`}
                  subtitle="credits"
                  showEye={true}
                />
                <DashboardCard
                  title="Verifications"
                  value={usageLoading ? "..." : `${usageStats?.usedThisMonth || 0}`}
                  showDropdown={true}
                  dropdownText="This Month"
                />
                <DashboardCard
                  title="System Uptime"
                  value="99.9%"
                  showEye={true}
                />
              </>
            )}
          </div>

          {/* Recent Searches Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-black">
                Recent Searches
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
              {searchesLoading ? (
                <div className="p-6">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ) : (
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
                    {(recentSearches?.verifications || []).slice(0, 5).map((record) => (
                      <tr
                        key={record.id}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <td className="px-3 py-2.5 pt-4 text-sm text-black h-11">
                          {record.address.split(',')[0] || 'N/A'}
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
                          {new Date(record.submittedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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
}

const DashboardHome = () => {
  const { user } = useAuth();

  // Render specific dashboard based on user role
  if (user?.role === 'admin') {
    return <GovernmentDashboard />;
  }
  
  if (user?.role === 'organization-admin' || user?.role === 'organization-member' || user?.role === 'organization') {
    return <OrganizationDashboard />;
  }

  return <Overview />;
};

export default DashboardHome;
