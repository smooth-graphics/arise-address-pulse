
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, User, MapPin, Calendar } from 'lucide-react';
import Fuse from 'fuse.js';

interface SearchResult {
  id: string;
  name: string;
  age: number;
  country: string;
  matchScore: number;
  verificationStatus: 'verified' | 'pending' | 'failed';
}

const mockData: SearchResult[] = [
  { id: '1', name: 'John Doe', age: 28, country: 'Nigeria', matchScore: 95, verificationStatus: 'verified' },
  { id: '2', name: 'Sarah Johnson', age: 34, country: 'Ghana', matchScore: 87, verificationStatus: 'pending' },
  { id: '3', name: 'Michael Brown', age: 42, country: 'Kenya', matchScore: 92, verificationStatus: 'verified' },
  { id: '4', name: 'Emily Davis', age: 29, country: 'South Africa', matchScore: 78, verificationStatus: 'failed' },
  { id: '5', name: 'David Wilson', age: 36, country: 'Nigeria', matchScore: 89, verificationStatus: 'verified' },
  { id: '6', name: 'Lisa Anderson', age: 31, country: 'Ethiopia', matchScore: 85, verificationStatus: 'pending' },
];

const SearchInterface = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const fuse = new Fuse(mockData, {
    keys: ['name', 'country'],
    threshold: 0.4,
    includeScore: true,
  });

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API delay
    const searchTimer = setTimeout(() => {
      const results = fuse.search(searchQuery);
      const formattedResults = results.map(result => ({
        ...result.item,
        fuzzyScore: result.score ? Math.round((1 - result.score) * 100) : 100
      }));
      setSearchResults(formattedResults);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(searchTimer);
  }, [searchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Address Verification Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {isSearching && (
        <Card>
          <CardContent className="py-6">
            <div className="text-center text-gray-500">Searching...</div>
          </CardContent>
        </Card>
      )}

      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results ({searchResults.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.map((result) => (
                <div key={result.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{result.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Age: {result.age}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {result.country}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(result.verificationStatus)}>
                        {result.verificationStatus}
                      </Badge>
                      <div className="text-sm text-gray-500">
                        Match: {result.matchScore}%
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600">
                      <strong>Additional information:</strong> [REDACTED] - Only name, age, and country are displayed for privacy protection
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {searchQuery && !isSearching && searchResults.length === 0 && (
        <Card>
          <CardContent className="py-6">
            <div className="text-center text-gray-500">
              No results found for "{searchQuery}"
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchInterface;
