
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Gauge, 
  Clock, 
  Zap, 
  Database,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react';

interface MetricData {
  timestamp: string;
  responseTime: number;
  throughput: number;
  errorRate: number;
  cpuUsage: number;
  memoryUsage: number;
}

const PerformanceMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState({
    responseTime: 0,
    throughput: 0,
    errorRate: 0,
    cpuUsage: 0,
    memoryUsage: 0,
    uptime: '99.9%'
  });

  useEffect(() => {
    const generateMetrics = () => {
      const now = new Date();
      const newMetric: MetricData = {
        timestamp: now.toLocaleTimeString(),
        responseTime: 150 + Math.random() * 100,
        throughput: 800 + Math.random() * 400,
        errorRate: Math.random() * 2,
        cpuUsage: 30 + Math.random() * 40,
        memoryUsage: 60 + Math.random() * 20
      };

      setMetrics(prev => [...prev.slice(-9), newMetric]);
      setCurrentMetrics({
        responseTime: Math.round(newMetric.responseTime),
        throughput: Math.round(newMetric.throughput),
        errorRate: Number(newMetric.errorRate.toFixed(2)),
        cpuUsage: Math.round(newMetric.cpuUsage),
        memoryUsage: Math.round(newMetric.memoryUsage),
        uptime: '99.9%'
      });
    };

    // Initial load
    generateMetrics();

    // Update every 3 seconds
    const interval = setInterval(generateMetrics, 3000);
    return () => clearInterval(interval);
  }, []);

  const getPerformanceStatus = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.warning) return 'warning';
    return 'critical';
  };

  const statusColors = {
    good: 'text-green-600 bg-green-100',
    warning: 'text-yellow-600 bg-yellow-100',
    critical: 'text-red-600 bg-red-100'
  };

  return (
    <div className="space-y-6">
      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMetrics.responseTime}ms</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 text-green-600" />
              <span className="text-green-600">-12% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Throughput</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMetrics.throughput}/min</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+8% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMetrics.errorRate}%</div>
            <Badge className={statusColors[getPerformanceStatus(currentMetrics.errorRate, { good: 1, warning: 3 })]}>
              {getPerformanceStatus(currentMetrics.errorRate, { good: 1, warning: 3 }).toUpperCase()}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMetrics.uptime}</div>
            <div className="text-xs text-green-600 font-medium">Excellent</div>
          </CardContent>
        </Card>
      </div>

      {/* System Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>CPU Usage</span>
                <span>{currentMetrics.cpuUsage}%</span>
              </div>
              <Progress value={currentMetrics.cpuUsage} className="w-full" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Memory Usage</span>
                <span>{currentMetrics.memoryUsage}%</span>
              </div>
              <Progress value={currentMetrics.memoryUsage} className="w-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="responseTime" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="Response Time (ms)"
                />
                <Line 
                  type="monotone" 
                  dataKey="throughput" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  name="Throughput (req/min)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
