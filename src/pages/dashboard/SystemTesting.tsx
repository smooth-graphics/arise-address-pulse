import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TestTube, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Play,
  RefreshCw
} from "lucide-react";

const SystemTesting = () => {
  const handleRunTest = (testType: string) => {
    console.log(`Running ${testType} test...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">System Testing</h2>
          <p className="text-gray-600">Monitor and test system performance and reliability</p>
        </div>
        <Button className="bg-gradient-to-r from-bold-red to-vibrant-orange text-white">
          <RefreshCw className="mr-2 h-4 w-4" />
          Run All Tests
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5 text-blue-600" />
              API Performance Test
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Run</span>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Status</span>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">Passed</span>
                </div>
              </div>
              <Button 
                onClick={() => handleRunTest('API Performance')}
                variant="outline" 
                className="w-full"
              >
                <Play className="mr-2 h-4 w-4" />
                Run Test
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              Load Testing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Run</span>
                <span className="text-xs text-gray-500">1 day ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Status</span>
                <div className="flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-600">Warning</span>
                </div>
              </div>
              <Button 
                onClick={() => handleRunTest('Load Testing')}
                variant="outline" 
                className="w-full"
              >
                <Play className="mr-2 h-4 w-4" />
                Run Test
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Security Scan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Run</span>
                <span className="text-xs text-gray-500">30 minutes ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Status</span>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">Passed</span>
                </div>
              </div>
              <Button 
                onClick={() => handleRunTest('Security Scan')}
                variant="outline" 
                className="w-full"
              >
                <Play className="mr-2 h-4 w-4" />
                Run Test
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemTesting;