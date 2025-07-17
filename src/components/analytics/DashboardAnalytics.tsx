
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, TrendingDown, Activity, Users, MapPin, CheckCircle } from 'lucide-react';

const mockVerificationData = [
  { month: 'Jan', verifications: 120, success: 95 },
  { month: 'Feb', verifications: 150, success: 120 },
  { month: 'Mar', verifications: 180, success: 155 },
  { month: 'Apr', verifications: 220, success: 190 },
  { month: 'May', verifications: 280, success: 245 },
  { month: 'Jun', verifications: 320, success: 290 },
];

const mockRegionData = [
  { name: 'Lagos', value: 35, color: '#ef4444' },
  { name: 'Abuja', value: 25, color: '#f97316' },
  { name: 'Kano', value: 20, color: '#eab308' },
  { name: 'Rivers', value: 12, color: '#22c55e' },
  { name: 'Others', value: 8, color: '#6b7280' },
];

interface AnalyticsProps {
  userRole: string;
}

const DashboardAnalytics: React.FC<AnalyticsProps> = ({ userRole }) => {
  const getMetrics = () => {
    if (userRole === 'admin') {
      return [
        { title: 'Total Users', value: '12,543', change: '+12%', icon: Users, trend: 'up' },
        { title: 'Verifications Today', value: '1,234', change: '+8%', icon: CheckCircle, trend: 'up' },
        { title: 'Success Rate', value: '94.2%', change: '+2.1%', icon: TrendingUp, trend: 'up' },
        { title: 'API Calls', value: '45,678', change: '-3%', icon: Activity, trend: 'down' },
      ];
    } else if (userRole === 'organization') {
      return [
        { title: 'Monthly Verifications', value: '1,234', change: '+15%', icon: MapPin, trend: 'up' },
        { title: 'Success Rate', value: '92.5%', change: '+1.8%', icon: CheckCircle, trend: 'up' },
        { title: 'API Usage', value: '8,765', change: '+22%', icon: Activity, trend: 'up' },
        { title: 'Cost Savings', value: '₦45,670', change: '+18%', icon: TrendingUp, trend: 'up' },
      ];
    } else {
      return [
        { title: 'Addresses Verified', value: '12', change: '+3', icon: MapPin, trend: 'up' },
        { title: 'Success Rate', value: '100%', change: '0%', icon: CheckCircle, trend: 'neutral' },
        { title: 'Documents Uploaded', value: '8', change: '+2', icon: Activity, trend: 'up' },
        { title: 'Profile Completeness', value: '95%', change: '+5%', icon: TrendingUp, trend: 'up' },
      ];
    }
  };

  const metrics = getMetrics();

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <div className="flex items-center mt-1">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : metric.trend === 'down' ? (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    ) : null}
                    <span className={`text-sm ${
                      metric.trend === 'up' ? 'text-green-600' : 
                      metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-gray-100 rounded-full">
                  <metric.icon className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Verification Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockVerificationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="verifications" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Total Verifications"
                />
                <Line 
                  type="monotone" 
                  dataKey="success" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  name="Successful"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Regional Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Regional Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockRegionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockRegionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockVerificationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="verifications" fill="#ef4444" name="Total Verifications" />
              <Bar dataKey="success" fill="#22c55e" name="Successful" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardAnalytics;
