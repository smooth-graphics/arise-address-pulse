
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Zap,
  Database,
  Shield,
  Globe,
  Smartphone,
  Monitor,
  RefreshCw,
  Download
} from 'lucide-react';

interface SystemStatus {
  component: string;
  status: 'operational' | 'degraded' | 'outage';
  uptime: string;
  responseTime: number;
  lastCheck: string;
}

const SystemIntegrationDashboard: React.FC = () => {
  const [systemStatuses, setSystemStatuses] = useState<SystemStatus[]>([
    {
      component: 'Web Application',
      status: 'operational',
      uptime: '99.99%',
      responseTime: 120,
      lastCheck: '1 minute ago'
    },
    {
      component: 'API Gateway',
      status: 'operational',
      uptime: '99.95%',
      responseTime: 85,
      lastCheck: '30 seconds ago'
    },
    {
      component: 'Database',
      status: 'operational',
      uptime: '99.98%',
      responseTime: 45,
      lastCheck: '1 minute ago'
    },
    {
      component: 'Authentication Service',
      status: 'degraded',
      uptime: '99.85%',
      responseTime: 250,
      lastCheck: '2 minutes ago'
    },
    {
      component: 'Verification Engine',
      status: 'operational',
      uptime: '99.92%',
      responseTime: 180,
      lastCheck: '45 seconds ago'
    },
    {
      component: 'Notification Service',
      status: 'operational',
      uptime: '99.88%',
      responseTime: 95,
      lastCheck: '1 minute ago'
    }
  ]);

  const [integrationMetrics, setIntegrationMetrics] = useState({
    totalEndpoints: 24,
    activeConnections: 1247,
    requestsPerSecond: 156,
    averageResponseTime: 125,
    errorRate: 0.02,
    dataProcessed: '45.6 GB'
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshStatus = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate status updates
    setSystemStatuses(prev => prev.map(status => ({
      ...status,
      responseTime: status.responseTime + Math.floor(Math.random() * 20) - 10,
      lastCheck: 'Just now'
    })));
    
    setIsRefreshing(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'degraded':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'outage':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Activity className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      operational: 'bg-green-100 text-green-800',
      degraded: 'bg-yellow-100 text-yellow-800',
      outage: 'bg-red-100 text-red-800'
    };

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  const getComponentIcon = (component: string) => {
    switch (component.toLowerCase()) {
      case 'web application':
        return <Globe className="h-5 w-5" />;
      case 'api gateway':
        return <Zap className="h-5 w-5" />;
      case 'database':
        return <Database className="h-5 w-5" />;
      case 'authentication service':
        return <Shield className="h-5 w-5" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };

  const overallHealth = systemStatuses.every(s => s.status === 'operational') 
    ? 'All Systems Operational' 
    : systemStatuses.some(s => s.status === 'outage')
    ? 'System Outage Detected'
    : 'Degraded Performance';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Monitor className="h-6 w-6" />
            System Integration Dashboard
          </h2>
          <p className="text-gray-600">Real-time system status and integration monitoring</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={refreshStatus}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Status
          </Button>
        </div>
      </div>

      {/* Overall Status */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getStatusIcon('operational')}
            {overallHealth}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Active Services</p>
              <p className="font-semibold">{systemStatuses.filter(s => s.status === 'operational').length}/{systemStatuses.length}</p>
            </div>
            <div>
              <p className="text-gray-600">Avg Response Time</p>
              <p className="font-semibold">{integrationMetrics.averageResponseTime}ms</p>
            </div>
            <div>
              <p className="text-gray-600">Error Rate</p>
              <p className="font-semibold">{integrationMetrics.errorRate}%</p>
            </div>
            <div>
              <p className="text-gray-600">Requests/sec</p>
              <p className="font-semibold">{integrationMetrics.requestsPerSecond}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="services" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="services">System Services</TabsTrigger>
          <TabsTrigger value="integrations">API Integrations</TabsTrigger>
          <TabsTrigger value="monitoring">Real-time Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <div className="grid gap-4">
            {systemStatuses.map((status) => (
              <Card key={status.component}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getComponentIcon(status.component)}
                      <div>
                        <h3 className="font-medium">{status.component}</h3>
                        <p className="text-sm text-gray-600">
                          Uptime: {status.uptime} • Response: {status.responseTime}ms
                        </p>
                        <p className="text-xs text-gray-400">Last checked: {status.lastCheck}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(status.status)}
                      {getStatusBadge(status.status)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Endpoints</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{integrationMetrics.totalEndpoints}</div>
                <p className="text-xs text-muted-foreground">Across all services</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{integrationMetrics.activeConnections.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Current connections</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Processed</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{integrationMetrics.dataProcessed}</div>
                <p className="text-xs text-muted-foreground">Today</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{integrationMetrics.errorRate}%</div>
                <p className="text-xs text-muted-foreground">Last 24 hours</p>
              </CardContent>
            </Card>
          </div>

          {/* API Endpoints Status */}
          <Card>
            <CardHeader>
              <CardTitle>API Endpoint Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { endpoint: '/api/auth/login', status: 'operational', latency: '45ms' },
                  { endpoint: '/api/verification/submit', status: 'operational', latency: '120ms' },
                  { endpoint: '/api/documents/upload', status: 'degraded', latency: '285ms' },
                  { endpoint: '/api/notifications/send', status: 'operational', latency: '65ms' },
                  { endpoint: '/api/analytics/metrics', status: 'operational', latency: '78ms' }
                ].map((api) => (
                  <div key={api.endpoint} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {api.endpoint}
                      </div>
                      <span className="text-sm text-gray-600">{api.latency}</span>
                    </div>
                    {getStatusBadge(api.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Load</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>CPU Usage</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="w-full" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Memory Usage</span>
                    <span>68%</span>
                  </div>
                  <Progress value={68} className="w-full" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Network I/O</span>
                    <span>32%</span>
                  </div>
                  <Progress value={32} className="w-full" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium">High Response Time</p>
                      <p className="text-sm text-gray-600">Authentication service showing elevated latency</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">All Systems Recovered</p>
                      <p className="text-sm text-gray-600">Previous database connection issues resolved</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemIntegrationDashboard;
