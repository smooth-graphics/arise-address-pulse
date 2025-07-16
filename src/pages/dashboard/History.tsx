
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SearchTable from '@/components/common/SearchTable';
import EscalationModal from '@/components/verification/EscalationModal';
import { useAuth } from '@/contexts/AuthContext';
import { 
  MapPin, 
  Calendar, 
  Download, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter
} from 'lucide-react';

interface HistoryRecord {
  id: string;
  date: string;
  query: string;
  address: string;
  status: 'verified' | 'pending' | 'failed';
  matchScore: number;
  type: string;
  escalated: boolean;
  verificationTime: number;
}

const mockHistory: HistoryRecord[] = [
  {
    id: '1',
    date: '2024-01-15',
    query: 'Victoria Island Lagos',
    address: '123 Victoria Island, Lagos, Nigeria',
    status: 'verified',
    matchScore: 98,
    type: 'Residential',
    escalated: false,
    verificationTime: 2.3
  },
  {
    id: '2',
    date: '2024-01-10',
    query: 'Ikoyi Street',
    address: '45 Ikoyi Street, Lagos, Nigeria',
    status: 'verified',
    matchScore: 87,
    type: 'Business',
    escalated: true,
    verificationTime: 1.8
  },
  {
    id: '3',
    date: '2024-01-05',
    query: 'Surulere Avenue',
    address: '67 Surulere Avenue, Lagos, Nigeria',
    status: 'pending',
    matchScore: 0,
    type: 'Residential',
    escalated: false,
    verificationTime: 0
  },
  {
    id: '4',
    date: '2023-12-28',
    query: 'Mainland Road',
    address: '89 Mainland Road, Lagos, Nigeria',
    status: 'failed',
    matchScore: 45,
    type: 'Business',
    escalated: true,
    verificationTime: 3.1
  },
  // Add more mock data for better testing
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 5}`,
    date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    query: `Sample Query ${i + 5}`,
    address: `${Math.floor(Math.random() * 999) + 1} Sample Street ${i + 5}, Lagos, Nigeria`,
    status: ['verified', 'pending', 'failed'][Math.floor(Math.random() * 3)] as 'verified' | 'pending' | 'failed',
    matchScore: Math.floor(Math.random() * 100),
    type: ['Residential', 'Business', 'Commercial'][Math.floor(Math.random() * 3)],
    escalated: Math.random() > 0.7,
    verificationTime: Math.random() * 5
  }))
];

const History = () => {
  const { user } = useAuth();
  const [selectedRecord, setSelectedRecord] = useState<HistoryRecord | null>(null);
  const [showEscalation, setShowEscalation] = useState(false);

  const getStatusBadge = (status: string) => {
    const variants = {
      verified: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };
    return <Badge className={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 font-semibold';
    if (score >= 70) return 'text-yellow-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  const columns = [
    {
      key: 'date' as keyof HistoryRecord,
      label: 'Date',
      sortable: true,
      filterable: true,
      render: (value: string) => new Date(value).toLocaleDateString(),
      width: '32'
    },
    {
      key: 'query' as keyof HistoryRecord,
      label: 'Original Query',
      sortable: true,
      filterable: true,
      render: (value: string, item: HistoryRecord) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <div className="min-w-0">
            <p className="font-medium truncate">{value}</p>
            <p className="text-xs text-gray-500 truncate">{item.address}</p>
          </div>
        </div>
      )
    },
    {
      key: 'type' as keyof HistoryRecord,
      label: 'Type',
      sortable: true,
      filterable: true,
      width: '24'
    },
    {
      key: 'status' as keyof HistoryRecord,
      label: 'Status',
      sortable: true,
      filterable: true,
      render: (value: string) => getStatusBadge(value),
      width: '24'
    },
    {
      key: 'matchScore' as keyof HistoryRecord,
      label: 'Match Score',
      sortable: true,
      render: (value: number, item: HistoryRecord) => (
        <span className={getMatchScoreColor(value)}>
          {item.status === 'pending' ? '-' : `${value}%`}
        </span>
      ),
      width: '24'
    },
    {
      key: 'escalated' as keyof HistoryRecord,
      label: 'Escalated',
      sortable: true,
      render: (value: boolean) => (
        value ? (
          <AlertTriangle className="h-4 w-4 text-orange-600" />
        ) : (
          <span className="text-gray-400">-</span>
        )
      ),
      width: '20'
    }
  ];

  const handleExport = (format: 'csv' | 'pdf') => {
    console.log(`Exporting history as ${format.toUpperCase()}`);
    // Implementation would generate and download file
  };

  const handleRowClick = (record: HistoryRecord) => {
    setSelectedRecord(record);
    if (user?.role === 'organization' && record.status !== 'pending') {
      // Could open detailed view or escalation modal
      console.log('Opening detailed view for:', record);
    }
  };

  const handleEscalation = () => {
    if (selectedRecord) {
      setShowEscalation(true);
    }
  };

  const getStatistics = () => {
    const total = mockHistory.length;
    const verified = mockHistory.filter(r => r.status === 'verified').length;
    const pending = mockHistory.filter(r => r.status === 'pending').length;
    const failed = mockHistory.filter(r => r.status === 'failed').length;
    const escalated = mockHistory.filter(r => r.escalated).length;
    
    return { total, verified, pending, failed, escalated };
  };

  const stats = getStatistics();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Verification History</h2>
          <p className="text-gray-600">View your past address verification requests and results</p>
        </div>
        <Button onClick={() => handleExport('csv')} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export All
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Total Lookups
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.verified}</div>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Verified
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Failed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">{stats.escalated}</div>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <Filter className="h-3 w-3" />
              Escalated
            </p>
          </CardContent>
        </Card>
      </div>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Verification History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SearchTable
            data={mockHistory}
            columns={columns}
            searchPlaceholder="Search by address, query, or type..."
            onExport={handleExport}
            onRowClick={handleRowClick}
            pageSize={15}
          />
          
          {selectedRecord && user?.role === 'organization' && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-blue-900">Selected: {selectedRecord.query}</p>
                  <p className="text-sm text-blue-700">
                    Status: {selectedRecord.status} | Score: {selectedRecord.matchScore}%
                  </p>
                </div>
                {selectedRecord.status !== 'pending' && !selectedRecord.escalated && (
                  <Button onClick={handleEscalation} size="sm" variant="outline">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Escalate
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Escalation Modal */}
      {selectedRecord && (
        <EscalationModal
          isOpen={showEscalation}
          onClose={() => setShowEscalation(false)}
          lookupData={{
            id: selectedRecord.id,
            originalQuery: selectedRecord.query,
            verifiedAddress: selectedRecord.address,
            confidenceScore: selectedRecord.matchScore,
            status: selectedRecord.status
          }}
        />
      )}
    </div>
  );
};

export default History;
