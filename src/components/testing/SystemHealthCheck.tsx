
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock,
  Wifi,
  Database,
  Shield,
  Zap,
  RefreshCw
} from 'lucide-react';

interface HealthCheckItem {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'error' | 'checking';
  description: string;
  lastChecked?: string;
  responseTime?: number;
}

const SystemHealthCheck: React.FC = () => {
  const [healthChecks, setHealthChecks] = useState<HealthCheckItem[]>([
    {
      id: 'api',
      name: 'API Connection',
      status: 'checking',
      description: 'Checking backend API connectivity',
    },
    {
      id: 'database',
      name: 'Database',
      status: 'checking',
      description: 'Verifying database connection and performance',
    },
    {
      id: 'auth',
      name: 'Authentication Service',
      status: 'checking',
      description: 'Testing user authentication and authorization',
    },
    {
      id: 'verification',
      name: 'Verification Engine',
      status: 'checking',
      description: 'AI verification service status',
    },
    {
      id: 'notifications',
      name: 'Notification System',
      status: 'checking',
      description: 'Real-time notification delivery',
    }
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const runHealthCheck = async () => {
    setIsRunning(true);
    setProgress(0);

    for (let i = 0; i < healthChecks.length; i++) {
      const check = healthChecks[i];
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const statuses: HealthCheckItem['status'][] = ['healthy', 'healthy', 'healthy', 'warning', 'error'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      setHealthChecks(prev => prev.map(item => 
        item.id === check.id 
          ? {
              ...item,
              status: randomStatus,
              lastChecked: new Date().toLocaleTimeString(),
              responseTime: Math.floor(Math.random() * 500) + 50
            }
          : item
      ));
      
      setProgress(((i + 1) / healthChecks.length) * 100);
    }
    
    setIsRunning(false);
  };

  useEffect(() => {
    runHealthCheck();
  }, []);

  const getStatusIcon = (status: HealthCheckItem['status']) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'checking':
        return <Clock className="h-5 w-5 text-blue-600 animate-spin" />;
    }
  };

  const getStatusBadge = (status: HealthCheckItem['status']) => {
    const variants = {
      healthy: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      checking: 'bg-blue-100 text-blue-800'
    };

    return (
      <Badge className={variants[status]}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'api':
        return <Wifi className="h-5 w-5" />;
      case 'database':
        return <Database className="h-5 w-5" />;
      case 'auth':
        return <Shield className="h-5 w-5" />;
      case 'verification':
        return <Zap className="h-5 w-5" />;
      default:
        return <CheckCircle className="h-5 w-5" />;
    }
  };

  const overallStatus = healthChecks.every(check => check.status === 'healthy') 
    ? 'healthy' 
    : healthChecks.some(check => check.status === 'error')
    ? 'error'
    : 'warning';

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {getStatusIcon(isRunning ? 'checking' : overallStatus)}
            System Health Check
            {getStatusBadge(isRunning ? 'checking' : overallStatus)}
          </CardTitle>
          <Button 
            onClick={runHealthCheck} 
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRunning ? 'animate-spin' : ''}`} />
            Run Check
          </Button>
        </div>
        {isRunning && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Running health checks...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {healthChecks.map((check) => (
            <div 
              key={check.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {getServiceIcon(check.id)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{check.name}</h3>
                    {getStatusIcon(check.status)}
                  </div>
                  <p className="text-sm text-gray-600">{check.description}</p>
                  {check.lastChecked && (
                    <p className="text-xs text-gray-400">
                      Last checked: {check.lastChecked}
                      {check.responseTime && ` (${check.responseTime}ms)`}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(check.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemHealthCheck;
