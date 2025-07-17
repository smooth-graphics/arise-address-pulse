
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SystemHealthCheck from '@/components/testing/SystemHealthCheck';
import PerformanceMetrics from '@/components/testing/PerformanceMetrics';
import UserJourneyTester from '@/components/testing/UserJourneyTester';
import { 
  TestTube, 
  Activity, 
  Users, 
  Shield,
  AlertTriangle,
  CheckCircle,
  Settings,
  Download
} from 'lucide-react';

const SystemTesting: React.FC = () => {
  const [testSummary] = useState({
    totalTests: 45,
    passedTests: 42,
    failedTests: 2,
    pendingTests: 1,
    coverage: 94.2,
    lastRun: '2 minutes ago'
  });

  const generateReport = () => {
    console.log('Generating comprehensive test report...');
    // In a real app, this would generate and download a PDF report
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <TestTube className="h-6 w-6" />
            System Testing & Monitoring
          </h2>
          <p className="text-gray-600">Comprehensive testing suite and system monitoring</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={generateReport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Configure Tests
          </Button>
        </div>
      </div>

      {/* Test Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
            <TestTube className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testSummary.totalTests}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Passed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{testSummary.passedTests}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{testSummary.failedTests}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Activity className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{testSummary.pendingTests}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coverage</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{testSummary.coverage}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Run</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">{testSummary.lastRun}</div>
          </CardContent>
        </Card>
      </div>

      {/* Test Tabs */}
      <Tabs defaultValue="health" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="health" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Health Check
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="journeys" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            User Journeys
          </TabsTrigger>
        </TabsList>

        <TabsContent value="health" className="space-y-4">
          <SystemHealthCheck />
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <PerformanceMetrics />
        </TabsContent>

        <TabsContent value="journeys" className="space-y-4">
          <UserJourneyTester />
        </TabsContent>
      </Tabs>

      {/* Test Status Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <h4 className="font-medium">API Integration Tests</h4>
                  <p className="text-sm text-gray-600">All endpoints responding correctly</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">PASSED</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <h4 className="font-medium">Authentication Flow</h4>
                  <p className="text-sm text-gray-600">Login, signup, and password reset working</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">PASSED</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <h4 className="font-medium">Payment Processing</h4>
                  <p className="text-sm text-gray-600">Some timeout issues detected</p>
                </div>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">WARNING</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Delivery delays in production environment</p>
                </div>
              </div>
              <Badge className="bg-red-100 text-red-800">FAILED</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemTesting;
