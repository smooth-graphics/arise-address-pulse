import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import SearchTable from "@/components/common/SearchTable";
import { useActivities, useExportActivities } from "@/hooks/api/useActivityLog";
import { ActivityLogFilters, ActivityLogRecord } from "@/types/activityLog";
import { Search, Download, Activity as ActivityIcon, Shield, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

const Activity = () => {
  const [filters, setFilters] = useState<ActivityLogFilters>({ page: 1, limit: 10 });
  const { data, isLoading } = useActivities(filters);
  const exportMutation = useExportActivities();

  const getActionBadgeVariant = (action: string) => {
    if (action.includes('login') || action.includes('logout')) return 'default';
    if (action.includes('delete') || action.includes('suspend')) return 'destructive';
    if (action.includes('create') || action.includes('approve')) return 'default';
    return 'outline';
  };

  const columns: Array<{
    key: keyof ActivityLogRecord;
    label: string;
    render?: (value: any, activity: ActivityLogRecord) => React.ReactNode;
  }> = [
    { 
      key: 'user', 
      label: 'User',
      render: (value: any, activity: ActivityLogRecord) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.avatar} />
            <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{activity.user.name}</p>
            <p className="text-xs text-muted-foreground">{activity.user.role}</p>
          </div>
        </div>
      )
    },
    { 
      key: 'action', 
      label: 'Action',
      render: (value: any, activity: ActivityLogRecord) => (
        <Badge variant={getActionBadgeVariant(activity.action)}>
          {activity.action.replace(/_/g, ' ')}
        </Badge>
      )
    },
    { 
      key: 'entity', 
      label: 'Entity',
      render: (value: any, activity: ActivityLogRecord) => (
        <div>
          <p className="font-medium text-sm">{activity.entity.type}</p>
          <p className="text-xs text-muted-foreground truncate max-w-[200px]">
            {activity.entity.id}
          </p>
        </div>
      )
    },
    { 
      key: 'timestamp', 
      label: 'Time',
      render: (value: any, activity: ActivityLogRecord) => (
        <div>
          <p className="text-sm">{new Date(activity.timestamp).toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
          </p>
        </div>
      )
    },
    {
      key: 'ipAddress',
      label: 'IP Address',
      render: (value: any, activity: ActivityLogRecord) => (
        <span className="text-sm font-mono">{activity.ipAddress}</span>
      )
    }
  ];

  const handleExport = (format: 'csv' | 'pdf') => {
    exportMutation.mutate({ filters, format });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Activity Log</h1>
          <p className="text-muted-foreground">Monitor all system activities and user actions</p>
        </div>
        <Button onClick={() => handleExport('csv')} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
            <ActivityIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.total || 0}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Events</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.activities?.filter(a => a.isSecurityEvent).length || 0}
            </div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.activeUsers || 0}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity History</CardTitle>
          <CardDescription>Complete audit trail of system activities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search activities..."
                value={filters.search || ''}
                onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                className="pl-8"
              />
            </div>
            <Select 
              value={filters.actionType || 'all'} 
              onValueChange={(value) => setFilters({ ...filters, actionType: value === 'all' ? undefined : value, page: 1 })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Action type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="verification">Verification</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="settings">Settings</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <SearchTable
            data={data?.activities || []}
            columns={columns}
            pageSize={10}
            onExport={handleExport}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Activity;