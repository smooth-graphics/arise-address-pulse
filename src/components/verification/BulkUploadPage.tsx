
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import SearchTable from '@/components/common/SearchTable';
import { 
  Upload, 
  Download, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  X,
  RefreshCw
} from 'lucide-react';

interface BulkUploadItem {
  id: string;
  address: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: string;
  confidence?: number;
  timestamp: string;
  error?: string;
}

const BulkUploadPage: React.FC = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedData, setUploadedData] = useState<BulkUploadItem[]>([]);
  const { toast } = useToast();

  const sampleData: BulkUploadItem[] = [
    {
      id: '1',
      address: '15 Admiralty Way, Lekki Phase 1, Lagos',
      status: 'completed',
      result: 'Verified',
      confidence: 98,
      timestamp: '2024-01-15T10:30:00Z',
    },
    {
      id: '2',
      address: '23 Gana Street, Maitama, Abuja',
      status: 'processing',
      timestamp: '2024-01-15T10:32:00Z',
    },
    {
      id: '3',
      address: '45 Awolowo Road, Ikoyi, Lagos',
      status: 'failed',
      error: 'Address format invalid',
      timestamp: '2024-01-15T10:35:00Z',
    },
    {
      id: '4',
      address: '12 Herbert Macaulay Street, Central Area, Abuja',
      status: 'pending',
      timestamp: '2024-01-15T10:40:00Z',
    },
  ];

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a CSV or Excel file.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadedData(sampleData);
          toast({
            title: "Upload Complete",
            description: `Successfully uploaded ${sampleData.length} addresses for verification.`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, [toast]);

  const handleExport = (format: 'csv' | 'pdf') => {
    console.log(`Exporting as ${format}`);
    toast({
      title: "Export Started",
      description: `Your ${format.toUpperCase()} file will be ready shortly.`,
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: 'secondary' as const, icon: Clock, color: 'text-gray-600' },
      processing: { variant: 'default' as const, icon: RefreshCw, color: 'text-blue-600' },
      completed: { variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' },
      failed: { variant: 'destructive' as const, icon: AlertCircle, color: 'text-red-600' },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className={`h-3 w-3 ${config.color}`} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const columns = [
    {
      key: 'address' as const,
      label: 'Address',
      sortable: true,
      filterable: true,
      width: '40%',
    },
    {
      key: 'status' as const,
      label: 'Status',
      sortable: true,
      filterable: true,
      render: (value: string) => getStatusBadge(value),
    },
    {
      key: 'result' as const,
      label: 'Result',
      render: (value: string, item: BulkUploadItem) => {
        if (item.status === 'completed' && value) {
          return (
            <div className="flex items-center gap-2">
              <span>{value}</span>
              {item.confidence && (
                <Badge variant="outline" className="text-xs">
                  {item.confidence}%
                </Badge>
              )}
            </div>
          );
        }
        if (item.status === 'failed' && item.error) {
          return <span className="text-red-600 text-sm">{item.error}</span>;
        }
        return <span className="text-gray-400">-</span>;
      },
    },
    {
      key: 'timestamp' as const,
      label: 'Timestamp',
      render: (value: string) => new Date(value).toLocaleString(),
    },
  ];

  const stats = {
    total: uploadedData.length,
    completed: uploadedData.filter(item => item.status === 'completed').length,
    failed: uploadedData.filter(item => item.status === 'failed').length,
    pending: uploadedData.filter(item => item.status === 'pending' || item.status === 'processing').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Bulk Address Verification</h2>
        <p className="text-gray-600">Upload CSV or Excel files to verify multiple addresses at once</p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Addresses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium">Drop your file here or click to browse</p>
              <p className="text-sm text-gray-500">Supports CSV and Excel files up to 10MB</p>
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Button asChild className="mt-4">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <FileText className="h-4 w-4 mr-2" />
                  Choose File
                </label>
              </Button>
            </div>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}

          <div className="flex gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <Button variant="link" className="p-0 h-auto text-sm">
                Download Sample Template
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <Button variant="link" className="p-0 h-auto text-sm">
                View Upload Guidelines
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {uploadedData.length > 0 && (
        <>
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-sm text-gray-600">Total</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
                <div className="text-sm text-gray-600">Failed</div>
              </CardContent>
            </Card>
          </div>

          {/* Results Table */}
          <Card>
            <CardHeader>
              <CardTitle>Verification Results</CardTitle>
            </CardHeader>
            <CardContent>
              <SearchTable
                data={uploadedData}
                columns={columns}
                searchPlaceholder="Search addresses..."
                onExport={handleExport}
                pageSize={10}
              />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default BulkUploadPage;
