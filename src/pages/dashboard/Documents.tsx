
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  Trash2, 
  Search,
  Calendar,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: 'approved' | 'pending' | 'rejected';
  size: string;
  category: 'identity' | 'address' | 'utility' | 'other';
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'National_ID_Card.pdf',
    type: 'PDF',
    uploadDate: '2024-01-15',
    status: 'approved',
    size: '2.4 MB',
    category: 'identity'
  },
  {
    id: '2',
    name: 'Utility_Bill_December.pdf',
    type: 'PDF',
    uploadDate: '2024-01-10',
    status: 'approved',
    size: '1.8 MB',
    category: 'utility'
  },
  {
    id: '3',
    name: 'Bank_Statement.pdf',
    type: 'PDF',
    uploadDate: '2024-01-08',
    status: 'pending',
    size: '3.2 MB',
    category: 'address'
  },
  {
    id: '4',
    name: 'Drivers_License.jpg',
    type: 'Image',
    uploadDate: '2024-01-05',
    status: 'rejected',
    size: '1.1 MB',
    category: 'identity'
  },
];

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState(mockDocuments);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterDocuments(query, selectedCategory);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterDocuments(searchQuery, category);
  };

  const filterDocuments = (query: string, category: string) => {
    let filtered = mockDocuments;

    if (category !== 'all') {
      filtered = filtered.filter(doc => doc.category === category);
    }

    if (query.trim() !== '') {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(query.toLowerCase()) ||
        doc.type.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredDocuments(filtered);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'identity': return 'bg-blue-100 text-blue-800';
      case 'address': return 'bg-purple-100 text-purple-800';
      case 'utility': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
          <p className="text-gray-600">Manage your uploaded verification documents</p>
        </div>
        <Button className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={selectedCategory === 'identity' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryFilter('identity')}
                >
                  Identity
                </Button>
                <Button
                  variant={selectedCategory === 'address' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryFilter('address')}
                >
                  Address
                </Button>
                <Button
                  variant={selectedCategory === 'utility' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryFilter('utility')}
                >
                  Utility
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map((document) => (
                <Card key={document.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-8 w-8 text-gray-400" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate">{document.name}</h3>
                          <p className="text-xs text-gray-500">{document.size} • {document.type}</p>
                        </div>
                      </div>
                      {getStatusIcon(document.status)}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className={getStatusColor(document.status)}>
                        {document.status}
                      </Badge>
                      <Badge className={getCategoryColor(document.category)}>
                        {document.category}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(document.uploadDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredDocuments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No documents found{searchQuery && ` for "${searchQuery}"`}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">4</div>
            <p className="text-sm text-gray-600">Total Documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">2</div>
            <p className="text-sm text-gray-600">Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <p className="text-sm text-gray-600">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">1</div>
            <p className="text-sm text-gray-600">Rejected</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Documents;
