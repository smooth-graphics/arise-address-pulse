
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SearchTable from '@/components/common/SearchTable';
import PlanUpgradeModal from '@/components/billing/PlanUpgradeModal';
import RedactedDataDisplay from '@/components/common/RedactedDataDisplay';
import { getRedactionConfig, redactAddress, redactTimestamp, redactConfidenceScore } from '@/utils/redactionUtils';
import { 
  History as HistoryIcon, 
  Download, 
  Filter,
  Eye,
  Lock,
  Zap,
  AlertCircle
} from 'lucide-react';

const History = () => {
  const { user } = useAuth();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedUpgradeFeature, setSelectedUpgradeFeature] = useState<string>('');

  // Mock user plan - in real app, this would come from user context or API
  const currentPlan = 'basic' as const; // Change to 'pro' or 'enterprise' to test
  const redactionConfig = getRedactionConfig(currentPlan);

  // Mock history data
  const mockHistoryData = [
    {
      id: 1,
      date: '2024-01-15T10:30:00Z',
      query: 'John Doe, Victoria Island Lagos',
      address: '15 Ahmadu Bello Way, Victoria Island, Lagos',
      status: 'Verified',
      confidence: 95,
      matchType: 'Exact Match',
      coordinates: { lat: 6.4281, lng: 3.4219 },
      cost: 50,
      escalated: false,
      processingTime: '2.3s'
    },
    {
      id: 2,
      date: '2024-01-12T14:20:00Z',
      query: 'Jane Smith, Ikoyi Lagos',
      address: '28 Bourdillon Road, Ikoyi, Lagos',
      status: 'Verified',
      confidence: 87,
      matchType: 'Fuzzy Match',
      coordinates: { lat: 6.4581, lng: 3.4406 },
      cost: 50,
      escalated: false,
      processingTime: '3.1s'
    },
    {
      id: 3,
      date: '2024-01-10T09:15:00Z',
      query: 'Mike Johnson, Surulere Lagos',
      address: 'Unknown',
      status: 'Failed',
      confidence: 20,
      matchType: 'No Match',
      coordinates: { lat: 0, lng: 0 },
      cost: 25,
      escalated: true,
      processingTime: '1.8s'
    },
    // Add more mock data for basic users to see limitation
    ...Array.from({ length: 10 }, (_, i) => ({
      id: i + 4,
      date: `2024-01-0${9 - i}T${10 + i}:00:00Z`,
      query: `User ${i + 4}, Area ${i + 4}`,
      address: `${i + 20} Sample Street, Lagos`,
      status: i % 3 === 0 ? 'Failed' : 'Verified',
      confidence: 60 + (i * 5),
      matchType: 'Fuzzy Match',
      coordinates: { lat: 6.4 + (i * 0.01), lng: 3.4 + (i * 0.01) },
      cost: 50,
      escalated: i % 4 === 0,
      processingTime: `${2 + (i * 0.2)}s`
    }))
  ];

  // Apply redaction based on plan
  const processedHistoryData = redactionConfig.historyLimit 
    ? mockHistoryData.slice(0, redactionConfig.historyLimit)
    : mockHistoryData;

  const handleUpgradeClick = (feature: string) => {
    setSelectedUpgradeFeature(feature);
    setShowUpgradeModal(true);
  };

  const columns = [
    {
      key: 'date' as const,
      label: 'Date',
      sortable: true,
      filterable: true,
      render: (value: string) => (
        redactionConfig.showFullTimestamp 
          ? new Date(value).toLocaleString()
          : redactTimestamp(value, redactionConfig)
      ),
      width: 'w-32'
    },
    {
      key: 'query' as const,
      label: 'Search Query',
      sortable: true,
      filterable: true,
      width: 'w-48'
    },
    {
      key: 'address' as const,
      label: 'Verified Address',
      sortable: false,
      filterable: true,
      render: (value: string, item: any) => {
        if (item.status === 'Failed') return 'Not Found';
        
        return redactionConfig.showFullAddress ? value : (
          <RedactedDataDisplay
            data={redactAddress(value, redactionConfig)}
            field="fullAddress"
            config={redactionConfig}
            userPlan={currentPlan}
            onUpgradeClick={() => handleUpgradeClick('Full Address Details')}
          />
        );
      },
      width: 'w-64'
    },
    {
      key: 'status' as const,
      label: 'Status',
      sortable: true,
      filterable: true,
      render: (value: string, item: any) => (
        <Badge 
          variant={value === 'Verified' ? 'default' : 'destructive'}
          className={
            value === 'Verified' 
              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
              : 'bg-red-100 text-red-800 hover:bg-red-200'
          }
        >
          {value}
          {item.escalated && <span className="ml-1">⚠️</span>}
        </Badge>
      ),
      width: 'w-24'
    },
    {
      key: 'confidence' as const,
      label: 'Confidence',
      sortable: true,
      render: (value: number) => {
        const displayValue = redactConfidenceScore(value, redactionConfig);
        
        if (typeof displayValue === 'string' && !redactionConfig.showConfidenceScore) {
          return (
            <RedactedDataDisplay
              data={displayValue}
              field="detailedMetrics"
              config={redactionConfig}
              userPlan={currentPlan}
              onUpgradeClick={() => handleUpgradeClick('Detailed Confidence Scores')}
            />
          );
        }
        
        return (
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">{displayValue}%</div>
            <div className="w-16 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  value >= 80 ? 'bg-green-500' : 
                  value >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        );
      },
      width: 'w-32'
    },
    {
      key: 'cost' as const,
      label: 'Cost',
      sortable: true,
      render: (value: number) => `₦${value}`,
      width: 'w-20'
    }
  ];

  const handleExport = (format: 'csv' | 'pdf') => {
    if (!redactionConfig.allowBulkExport) {
      handleUpgradeClick('Export Functionality');
      return;
    }
    
    console.log(`Exporting history as ${format}`);
    // Implement actual export logic here
  };

  const handleRowClick = (item: any) => {
    console.log('View details for:', item);
    // Implement detail view
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <HistoryIcon className="h-6 w-6 text-bold-red" />
            Verification History
          </h2>
          <p className="text-gray-600">
            View and manage your address verification history
            {redactionConfig.historyLimit && (
              <span className="ml-2 text-yellow-600">
                (Limited to {redactionConfig.historyLimit} recent records)
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleExport('csv')}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
            {!redactionConfig.allowBulkExport && <Lock className="h-3 w-3 text-yellow-600" />}
          </Button>
          <Button
            variant="outline"
            onClick={() => handleExport('pdf')}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export PDF
            {!redactionConfig.allowBulkExport && <Lock className="h-3 w-3 text-yellow-600" />}
          </Button>
        </div>
      </div>

      {/* Plan Limitation Warning */}
      {currentPlan === 'basic' && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <div>
                  <h3 className="font-semibold text-yellow-800">Limited History Access</h3>
                  <p className="text-sm text-yellow-700">
                    Your Basic plan shows only the last {redactionConfig.historyLimit} records with limited details.
                    Upgrade to access your complete history and detailed information.
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setShowUpgradeModal(true)}
                className="bg-gradient-to-r from-vibrant-orange to-bright-yellow text-white"
              >
                <Zap className="h-4 w-4 mr-2" />
                Upgrade Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Search History</span>
            <Badge variant="outline" className="capitalize">
              {currentPlan} Plan
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SearchTable
            data={processedHistoryData}
            columns={columns}
            searchPlaceholder="Search history..."
            onExport={handleExport}
            onRowClick={handleRowClick}
            pageSize={10}
          />
        </CardContent>
      </Card>

      {/* Plan Upgrade Modal */}
      <PlanUpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        currentPlan={currentPlan}
        lockedFeature={selectedUpgradeFeature}
        onUpgrade={(plan) => {
          console.log('Upgrading to:', plan);
          setShowUpgradeModal(false);
        }}
      />
    </div>
  );
};

export default History;
