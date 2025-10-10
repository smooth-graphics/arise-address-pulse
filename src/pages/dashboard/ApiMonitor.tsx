import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SearchTable from "@/components/common/SearchTable";
import { useApiMetrics, useEndpointStats, useApiErrors } from "@/hooks/api/useApiMonitor";
import { ApiError } from "@/types/apiMonitor";
import { Activity, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ApiMonitor = () => {
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const { data: metrics } = useApiMetrics(timeRange);
  const { data: endpoints } = useEndpointStats();
  const { data: errors } = useApiErrors({ timeRange, limit: 50 });

  const columns: Array<{
    key: keyof ApiError;
    label: string;
    render?: (value: any, error: ApiError) => React.ReactNode;
  }> = [
    { 
      key: 'timestamp', 
      label: 'Time',
      render: (value: any, error: ApiError) => (
        <span className="text-sm">{new Date(error.timestamp).toLocaleString()}</span>
      )
    },
    { 
      key: 'endpoint', 
      label: 'Endpoint',
      render: (value: any, error: ApiError) => (
        <span className="font-mono text-sm">{error.method} {error.endpoint}</span>
      )
    },
    { 
      key: 'statusCode', 
      label: 'Status',
      render: (value: any, error: ApiError) => (
        <Badge variant={error.statusCode >= 500 ? 'destructive' : 'default'}>
          {error.statusCode}
        </Badge>
      )
    },
    { 
      key: 'errorMessage', 
      label: 'Error',
      render: (value: any, error: ApiError) => (
        <span className="text-sm truncate max-w-[300px] block">{error.errorMessage}</span>
      )
    },
    { 
      key: 'userId', 
      label: 'User ID',
      render: (value: any, error: ApiError) => (
        <span className="font-mono text-xs">{error.userId?.slice(0, 8) || 'N/A'}</span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">API Monitor</h1>
          <p className="text-muted-foreground">Real-time API performance and error tracking</p>
        </div>
        <Select value={timeRange} onValueChange={(value: '1h' | '24h' | '7d' | '30d') => setTimeRange(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1h">Last Hour</SelectItem>
            <SelectItem value="24h">Last 24 Hours</SelectItem>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.totalRequests.toLocaleString() || 0}</div>
            <p className="text-xs text-muted-foreground">
              {timeRange === '1h' ? 'Last hour' : timeRange === '24h' ? 'Last 24 hours' : `Last ${timeRange}`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.avgResponseTime.toFixed(0) || 0}ms</div>
            <p className="text-xs text-muted-foreground">
              {metrics && metrics.avgResponseTime < 200 ? '✓ Excellent' : 'Monitor closely'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.errorRate.toFixed(2) || 0}%</div>
            <p className="text-xs text-muted-foreground">
              {metrics?.failedRequests || 0} errors
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(100 - (metrics?.errorRate || 0)).toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">
              {metrics && metrics.errorRate < 1 ? '✓ Healthy' : '⚠ Review needed'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request Trends</CardTitle>
          <CardDescription>API request volume over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            <p>Chart data visualization (connect to real API for live data)</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Endpoints</CardTitle>
            <CardDescription>Most frequently accessed endpoints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {endpoints?.map((endpoint, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-sm font-medium">{endpoint.endpoint}</p>
                    <p className="text-xs text-muted-foreground">
                      Avg: {endpoint.avgResponseTime.toFixed(0)}ms
                    </p>
                  </div>
                  <Badge variant="outline">{endpoint.totalCalls.toLocaleString()}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rate Limits</CardTitle>
            <CardDescription>API rate limit status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">API Rate Limit</span>
                  <span className="text-muted-foreground">1000/hr</span>
                </div>
                <p className="text-xs text-muted-foreground">Per API key</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Errors</CardTitle>
          <CardDescription>Latest API errors and failures</CardDescription>
        </CardHeader>
        <CardContent>
          <SearchTable
            data={errors?.errors || []}
            columns={columns}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiMonitor;