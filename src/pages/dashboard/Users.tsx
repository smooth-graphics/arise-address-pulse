import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SearchTable } from "@/components/common/SearchTable";
import { useUsers, useUserStats, useUpdateUserStatus } from "@/hooks/api/useUserManagement";
import { UserManagementFilters } from "@/types/userManagement";
import { Search, Filter, Users as UsersIcon, UserCheck, UserX, Clock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Users = () => {
  const [filters, setFilters] = useState<UserManagementFilters>({ page: 1, limit: 10 });
  const { data, isLoading } = useUsers(filters);
  const { data: stats } = useUserStats();
  const updateStatus = useUpdateUserStatus();

  const columns = [
    { 
      key: 'fullName', 
      label: 'Name',
      render: (user: any) => (
        <div>
          <p className="font-medium">{user.fullName}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      )
    },
    { 
      key: 'role', 
      label: 'Role',
      render: (user: any) => (
        <Badge variant="outline">{user.role.replace(/-/g, ' ')}</Badge>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (user: any) => (
        <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
          {user.status}
        </Badge>
      )
    },
    { 
      key: 'totalVerifications', 
      label: 'Verifications',
      render: (user: any) => user.totalVerifications || 0
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (user: any) => (
        <Button
          size="sm"
          variant={user.status === 'active' ? 'destructive' : 'default'}
          onClick={() => updateStatus.mutate({ 
            userId: user.id, 
            status: user.status === 'active' ? 'suspended' : 'active' 
          })}
        >
          {user.status === 'active' ? 'Suspend' : 'Activate'}
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-muted-foreground">Manage system users and their permissions</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalUsers || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activeUsers || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspended</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.suspendedUsers || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.pendingUsers || 0}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Search and manage user accounts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={filters.search || ''}
                onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                className="pl-8"
              />
            </div>
            <Select value={filters.role || 'all'} onValueChange={(value) => setFilters({ ...filters, role: value === 'all' ? undefined : value, page: 1 })}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="organization-admin">Org Admin</SelectItem>
                <SelectItem value="organization-member">Org Member</SelectItem>
                <SelectItem value="government-admin">Gov Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <SearchTable
            data={data?.users || []}
            columns={columns}
            isLoading={isLoading}
            totalItems={data?.total || 0}
            currentPage={filters.page || 1}
            itemsPerPage={filters.limit || 10}
            onPageChange={(page) => setFilters({ ...filters, page })}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;