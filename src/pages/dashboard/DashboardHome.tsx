import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import OrganizationDashboard from './OrganizationDashboard';
import GovernmentDashboard from './GovernmentDashboard';
import { useState } from "react";
import { Link } from "react-router-dom";
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
  return (
    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border-0.5 border-green-500 bg-green-100 text-green-700">
      {status}
    </span>
  );
}

interface SearchRecord {
  id: string;
  name: string;
  address: string;
  status: "completed";
  result: "verified";
  date: string;
}

const recentSearches: SearchRecord[] = [
  {
    id: "1",
    name: "Joseph Oluwamuyiwa",
    address: "No. 7, Coker Street, Ibadan, Oyo State",
    status: "completed",
    result: "verified",
    date: "12:24 p.m.",
  },
  {
    id: "2",
    name: "Joseph Oluwamuyiwa",
    address: "No. 7, Coker Street, Ibadan, Oyo State",
    status: "completed",
    result: "verified",
    date: "12:24 p.m.",
  },
  {
    id: "3",
    name: "Joseph Oluwamuyiwa",
    address: "No. 7, Coker Street, Ibadan, Oyo State",
    status: "completed",
    result: "verified",
    date: "24 Jul 2025",
  },
  {
    id: "4",
    name: "Joseph Oluwamuyiwa",
    address: "No. 7, Coker Street, Ibadan, Oyo State",
    status: "completed",
    result: "verified",
    date: "24 Jul 2025",
  },
  {
    id: "5",
    name: "Joseph Oluwamuyiwa",
    address: "No. 7, Coker Street, Ibadan, Oyo State",
    status: "completed",
    result: "verified",
    date: "24 Jul 2025",
  },
];

const notifications = [
  {
    id: "1",
    title: "Title",
    subtitle: "Subtitle",
    time: "6:24 p.m.",
    isUnread: true,
  },
  {
    id: "2",
    title: "Title",
    subtitle: "Subtitle",
    time: "6:24 p.m.",
    isUnread: true,
  },
  {
    id: "3",
    title: "Title",
    subtitle: "Subtitle",
    time: "6:24 p.m.",
    isUnread: false,
  },
  {
    id: "4",
    title: "Title",
    subtitle: "Subtitle",
    time: "6:24 p.m.",
    isUnread: false,
  },
  {
    id: "5",
    title: "Title",
    subtitle: "Subtitle",
    time: "6:24 p.m.",
    isUnread: false,
  },
  {
    id: "6",
    title: "Title",
    subtitle: "Subtitle",
    time: "6:24 p.m.",
    isUnread: false,
  },
];

function Overview() {
  const [selectedFilter, setSelectedFilter] = useState("verified");

  return (
    <div className="flex-1 bg-white lg:rounded-tl-xl min-h-screen lg:min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4.5 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-700 tracking-tight">
          Overview
        </h1>

        <div className="flex items-center gap-4">
          {/* Verify Button */}
          <button className="flex items-center gap-1.5 px-3 py-1 bg-orange-primary text-white text-sm font-medium rounded-lg shadow-lg shadow-orange-primary/25 hover:bg-orange-primary/90 transition-colors">
            Verify
            <Search className="w-4 h-4" strokeWidth={1.2} />
          </button>

          {/* Notifications */}
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <Bell className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      <div className="flex gap-4 p-4">
        {/* Main Content */}
        <div className="flex-1">
          {/* Dashboard Cards */}
          <div className="flex gap-4 mb-8">
            <DashboardCard
              title="Wallet Balance"
              value="437"
              subtitle="credits"
              showEye={true}
            />
            <DashboardCard
              title="Verifications"
              value="65"
              showDropdown={true}
              dropdownText="This Month"
            />
            <DashboardCard
              title="System Uptime"
              value="437"
              subtitle="credits"
              showEye={true}
            />
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
                  {recentSearches.map((record) => (
                    <tr
                      key={record.id}
                      className="hover:bg-gray-50 transition-colors"
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
                        <StatusBadge status="Completed" />
                      </td>
                      <td className="px-3 py-2.5 pt-4 text-sm text-black h-11">
                        Verified
                      </td>
                      <td className="px-3 py-2.5 pt-4 text-sm text-black h-11">
                        {record.date}
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
                className="inline-flex items-center px-3 py-2 border border-genital-orange text-genital-orange bg-white rounded-lg shadow-lg shadow-genital-orange/25 hover:bg-genital-orange/5 transition-colors text-sm font-medium"
              >
                See history
              </Link>
            </div>
          </div>
        </div>

        {/* Notifications Panel */}
        <div className="w-[374px] bg-gray-200 rounded-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-3 bg-white border-b border-gray-200">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-700">
                All Notifications
              </span>
              <ChevronDown className="w-5 h-5 text-gray-600" strokeWidth={1} />
            </div>
            <SettingsIcon className="w-6 h-6 text-gray-500" strokeWidth={1.5} />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-gray-200">
            <div className="flex items-center gap-2">
              <button className="px-1.5 py-0.5 bg-gray-200 text-gray-700 text-xs font-medium rounded">
                All
              </button>
              <button className="px-1.5 py-0.5 text-gray-700 text-xs font-medium rounded hover:bg-gray-100">
                Unread (2)
              </button>
            </div>
            <button className="text-xs font-medium text-gray-700 hover:text-gray-900">
              Mark all as read
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                title={notification.title}
                subtitle={notification.subtitle}
                time={notification.time}
                isUnread={notification.isUnread}
              />
            ))}
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
