
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Search, User, MapPin, Calendar, Camera, Upload, Mail, Phone, AlertTriangle, CheckCircle2, Sparkles, Eye, EyeOff } from 'lucide-react';
import Fuse from 'fuse.js';
import { useToast } from '@/hooks/use-toast';

interface SearchResult {
  id: string;
  name: string;
  age: number;
  country: string;
  email?: string;
  phone?: string;
  address?: string;
  matchScore: number;
  verificationStatus: 'verified' | 'pending' | 'failed';
  aiFlags?: string[];
  lastVerified?: string;
  authority: 'low' | 'medium' | 'high';
}

const mockData: SearchResult[] = [
  { 
    id: '1', 
    name: 'John Doe', 
    age: 28, 
    country: 'Nigeria',
    email: 'john.doe@email.com',
    phone: '+234-801-234-5678',
    address: '15 Victoria Island, Lagos',
    matchScore: 95, 
    verificationStatus: 'verified',
    lastVerified: '2024-01-15',
    authority: 'high'
  },
  { 
    id: '2', 
    name: 'Sarah Johnson', 
    age: 34, 
    country: 'Ghana',
    email: 'sarah.j@email.com',
    phone: '+233-20-123-4567',
    address: '42 Accra Central, Accra',
    matchScore: 87, 
    verificationStatus: 'pending',
    aiFlags: ['Address verification pending'],
    authority: 'medium'
  },
  { 
    id: '3', 
    name: 'Michael Brown', 
    age: 42, 
    country: 'Kenya',
    email: 'mike.brown@email.com',
    phone: '+254-700-123456',
    address: '78 Nairobi CBD, Nairobi',
    matchScore: 92, 
    verificationStatus: 'verified',
    lastVerified: '2024-01-12',
    authority: 'high'
  },
];

const SearchInterface = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'text' | 'image'>('text');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [showRedacted, setShowRedacted] = useState<{[key: string]: boolean}>({});
  const [aiValidation, setAiValidation] = useState<{status: string, confidence: number} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const fuse = new Fuse(mockData, {
    keys: ['name', 'country', 'email', 'phone', 'address'],
    threshold: 0.4,
    includeScore: true,
  });

  useEffect(() => {
    if (searchQuery.trim() === '' && !uploadedImage) {
      setSearchResults([]);
      setAiValidation(null);
      return;
    }

    setIsSearching(true);
    
    const searchTimer = setTimeout(() => {
      if (uploadedImage) {
        // Simulate AI image processing
        setAiValidation({
          status: 'Image processed: Building identified as residential complex',
          confidence: 92
        });
        // Mock address validation results
        const imageResults = mockData.filter(item => 
          item.address?.toLowerCase().includes('lagos') || 
          item.address?.toLowerCase().includes('victoria')
        );
        setSearchResults(imageResults.map(result => ({
          ...result,
          fuzzyScore: 95
        })));
      } else {
        const results = fuse.search(searchQuery);
        const formattedResults = results.map(result => ({
          ...result.item,
          fuzzyScore: result.score ? Math.round((1 - result.score) * 100) : 100
        }));
        setSearchResults(formattedResults);
      }
      setIsSearching(false);
    }, 800);

    return () => clearTimeout(searchTimer);
  }, [searchQuery, uploadedImage]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      setSearchQuery('');
      toast({
        title: "Image uploaded",
        description: "AI is processing the building image for address validation...",
      });
    }
  };

  const toggleRedacted = (resultId: string) => {
    setShowRedacted(prev => ({
      ...prev,
      [resultId]: !prev[resultId]
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAuthorityBadge = (authority: string) => {
    const colors = {
      high: 'bg-purple-100 text-purple-800 border-purple-200',
      medium: 'bg-blue-100 text-blue-800 border-blue-200',
      low: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[authority as keyof typeof colors] || colors.low;
  };

  const redactData = (data: string, show: boolean) => {
    if (show) return data;
    return '•'.repeat(data.length);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Search Header with updated colors */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-bold-red via-vibrant-orange to-bright-yellow border-0 shadow-xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-3 text-2xl text-white font-bold">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
              <Search className="h-6 w-6 text-white" />
            </div>
            Advanced Address Verification
            <Sparkles className="h-5 w-5 text-white" />
          </CardTitle>
          <p className="text-white/90 text-lg">
            Search by name, email, phone, address, or upload building photos for AI-powered validation
          </p>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-4">
            {/* Search Type Toggle */}
            <div className="flex gap-2">
              <Button
                variant={searchType === 'text' ? 'default' : 'outline'}
                onClick={() => {
                  setSearchType('text');
                  setUploadedImage(null);
                }}
                className={`flex items-center gap-2 ${searchType === 'text' 
                  ? 'bg-white text-bold-red hover:bg-white/90' 
                  : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                }`}
              >
                <Search className="h-4 w-4" />
                Text Search
              </Button>
              <Button
                variant={searchType === 'image' ? 'default' : 'outline'}
                onClick={() => {
                  setSearchType('image');
                  setSearchQuery('');
                }}
                className={`flex items-center gap-2 ${searchType === 'image' 
                  ? 'bg-white text-bold-red hover:bg-white/90' 
                  : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                }`}
              >
                <Camera className="h-4 w-4" />
                Image Search
              </Button>
            </div>

            {searchType === 'text' ? (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, phone, or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg bg-white/90 backdrop-blur-sm border-white/30 focus:border-white focus:bg-white"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div 
                  className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center cursor-pointer hover:border-white/50 transition-colors bg-white/10 backdrop-blur-sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mx-auto h-12 w-12 text-white mb-4" />
                  <p className="text-lg font-medium text-white">
                    Upload Building Photo
                  </p>
                  <p className="text-sm text-white/80 mt-2">
                    AI will analyze the image and validate against geolocation data
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                
                {uploadedImage && (
                  <div className="flex items-center gap-3 p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                    <Camera className="h-5 w-5 text-white" />
                    <span className="text-sm font-medium text-white">{uploadedImage.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUploadedImage(null)}
                      className="text-white hover:bg-white/20"
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* AI Validation Status */}
      {aiValidation && (
        <Card className="border-0 bg-gradient-to-r from-blue-50 to-cyan-50 shadow-lg">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-blue-900">{aiValidation.status}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-blue-700">Confidence:</span>
                  <Progress value={aiValidation.confidence} className="w-24 h-2" />
                  <span className="text-sm font-medium text-blue-700">{aiValidation.confidence}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isSearching && (
        <Card className="border-0 shadow-lg">
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-bold-red border-t-transparent"></div>
                <span className="text-gray-600">
                  {uploadedImage ? 'AI processing image...' : 'Searching...'}
                </span>
              </div>
              {uploadedImage && (
                <Progress value={75} className="w-64 mx-auto" />
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-gray-900">Search Results ({searchResults.length})</span>
              <Badge className="bg-gradient-to-r from-bold-red to-vibrant-orange text-white border-0">
                Fuzzy matching enabled
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {searchResults.map((result) => (
                <div key={result.id} className="relative overflow-hidden border-0 rounded-2xl p-6 bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-bold-red to-vibrant-orange"></div>
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-bold-red to-vibrant-orange rounded-xl flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900">{result.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
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
                    <div className="flex items-center space-x-3">
                      <Badge className={`${getAuthorityBadge(result.authority)} border-0 font-semibold`}>
                        {result.authority.toUpperCase()} AUTH
                      </Badge>
                      <Badge className={`${getStatusColor(result.verificationStatus)} border-0 font-semibold`}>
                        {result.verificationStatus}
                      </Badge>
                      <div className="text-right">
                        <div className="text-sm font-bold text-bold-red">
                          {result.matchScore}% match
                        </div>
                        {result.lastVerified && (
                          <div className="text-xs text-gray-500">
                            Verified {result.lastVerified}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        {result.authority === 'low' ? 
                          redactData(result.email || '', showRedacted[result.id]) : 
                          result.email
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        {result.authority === 'low' ? 
                          redactData(result.phone || '', showRedacted[result.id]) : 
                          result.phone
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        {result.authority === 'low' ? 
                          redactData(result.address || '', showRedacted[result.id]) : 
                          result.address
                        }
                      </span>
                    </div>
                  </div>

                  {/* AI Flags */}
                  {result.aiFlags && result.aiFlags.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        <span className="text-sm font-medium text-amber-800">AI Flags:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.aiFlags.map((flag, index) => (
                          <Badge key={index} className="bg-amber-100 text-amber-800 border-0">
                            {flag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {result.authority === 'low' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleRedacted(result.id)}
                          className="flex items-center gap-2 border-gray-200 hover:bg-gray-50"
                        >
                          {showRedacted[result.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          {showRedacted[result.id] ? 'Hide Details' : 'Show Details'}
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-bold-red text-bold-red hover:bg-bold-red hover:text-white"
                      >
                        View Full Profile
                      </Button>
                    </div>
                    {result.verificationStatus === 'verified' && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-sm font-medium">Verified</span>
                      </div>
                    )}
                  </div>

                  {/* Privacy Notice */}
                  <div className="mt-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-600">
                      <strong>Privacy Protection:</strong> {
                        result.authority === 'high' ? 
                          'Full access granted based on your authority level.' :
                          result.authority === 'medium' ?
                            'Partial data access. Some information may be redacted.' :
                            'Limited access. Most personal information is protected and redacted for privacy.'
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Results */}
      {(searchQuery || uploadedImage) && !isSearching && searchResults.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="py-8">
            <div className="text-center text-gray-500">
              <Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p className="text-lg">No results found</p>
              <p className="text-sm mt-2">
                Try adjusting your search terms or upload a different image
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchInterface;
