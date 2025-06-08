
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { MapPin, Calendar, Search, Download, Eye } from 'lucide-react';

interface HistoryRecord {
  id: string;
  address: string;
  verificationDate: string;
  status: 'verified' | 'pending' | 'failed';
  matchScore: number;
  type: string;
}

const mockHistory: HistoryRecord[] = [
  {
    id: '1',
    address: '123 Victoria Island, Lagos, Nigeria',
    verificationDate: '2024-01-15',
    status: 'verified',
    matchScore: 98,
    type: 'Residential'
  },
  {
    id: '2',
    address: '45 Ikoyi Street, Lagos, Nigeria',
    verificationDate: '2024-01-10',
    status: 'verified',
    matchScore: 87,
    type: 'Business'
  },
  {
    id: '3',
    address: '67 Surulere Avenue, Lagos, Nigeria',
    verificationDate: '2024-01-05',
    status: 'pending',
    matchScore: 0,
    type: 'Residential'
  },
  {
    id: '4',
    address: '89 Mainland Road, Lagos, Nigeria',
    verificationDate: '2023-12-28',
    status: 'failed',
    matchScore: 45,
    type: 'Business'
  },
];

const History = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHistory, setFilteredHistory] = useState(mockHistory);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredHistory(mockHistory);
    } else {
      const filtered = mockHistory.filter(record =>
        record.address.toLowerCase().includes(query.toLowerCase()) ||
        record.type.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredHistory(filtered);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Verification History</h2>
        <p className="text-gray-600">View your past address verification requests and results</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Verifications
            </span>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by address or type..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Address</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Match Score</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{record.address}</span>
                    </div>
                  </TableCell>
                  <TableCell>{record.type}</TableCell>
                  <TableCell>{new Date(record.verificationDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-semibold ${getMatchScoreColor(record.matchScore)}`}>
                      {record.status === 'pending' ? '-' : `${record.matchScore}%`}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredHistory.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No verification records found{searchQuery && ` for "${searchQuery}"`}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">4</div>
            <p className="text-sm text-gray-600">Total Verifications</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">2</div>
            <p className="text-sm text-gray-600">Successful</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <p className="text-sm text-gray-600">Pending</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default History;
