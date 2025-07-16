
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { 
  MapPin, 
  Search, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Map,
  Phone,
  User,
  CreditCard
} from 'lucide-react';

interface VerificationResult {
  id: string;
  inputAddress: string;
  verifiedAddress: string;
  confidenceScore: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  verificationTime: number;
  status: 'verified' | 'partial' | 'failed';
  matchDetails: {
    streetMatch: number;
    cityMatch: number;
    postalMatch: number;
  };
}

const SingleLookupPage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'address' | 'name' | 'phone' | 'id'>('address');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [showEscalation, setShowEscalation] = useState(false);

  const handleVerification = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResult: VerificationResult = {
        id: `lookup_${Date.now()}`,
        inputAddress: searchQuery,
        verifiedAddress: searchQuery.includes('Lagos') 
          ? `${searchQuery}, Lagos State, Nigeria` 
          : `${searchQuery}, Victoria Island, Lagos State, Nigeria`,
        confidenceScore: Math.floor(Math.random() * 30) + 70,
        coordinates: {
          lat: 6.4281 + (Math.random() - 0.5) * 0.1,
          lng: 3.4219 + (Math.random() - 0.5) * 0.1
        },
        verificationTime: Math.floor(Math.random() * 3) + 1,
        status: Math.random() > 0.2 ? 'verified' : 'partial',
        matchDetails: {
          streetMatch: Math.floor(Math.random() * 30) + 70,
          cityMatch: Math.floor(Math.random() * 20) + 80,
          postalMatch: Math.floor(Math.random() * 40) + 60
        }
      };
      
      setResult(mockResult);
      setIsLoading(false);
    }, 2000);
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'partial': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      default: return <AlertTriangle className="h-5 w-5 text-red-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Single Address Lookup</h2>
        <p className="text-gray-600">Verify individual addresses, names, phone numbers, or IDs</p>
      </div>

      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Address Verification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Type Selector */}
          <div className="flex gap-2 mb-4">
            {[
              { type: 'address', label: 'Address', icon: MapPin },
              { type: 'name', label: 'Name', icon: User },
              { type: 'phone', label: 'Phone', icon: Phone },
              { type: 'id', label: 'ID', icon: CreditCard }
            ].map(({ type, label, icon: Icon }) => (
              <Button
                key={type}
                variant={searchType === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSearchType(type as any)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Button>
            ))}
          </div>

          {/* Search Input */}
          <div className="flex gap-3">
            <Input
              placeholder={`Enter ${searchType} to verify...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleVerification()}
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={handleVerification}
              disabled={!searchQuery.trim() || isLoading}
              className="px-6"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Verifying...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Verify
                </>
              )}
            </Button>
          </div>

          {/* Loading Progress */}
          {isLoading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Processing verification...</span>
                <span>Please wait</span>
              </div>
              <Progress value={66} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Verification Result */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                {getStatusIcon(result.status)}
                Verification Result
              </span>
              <Badge className={getConfidenceColor(result.confidenceScore)}>
                {result.confidenceScore}% Match
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Address Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Input Address</h4>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{result.inputAddress}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Verified Address</h4>
                <p className="text-gray-900 bg-green-50 p-3 rounded-lg border border-green-200">
                  {result.verifiedAddress}
                </p>
              </div>
            </div>

            {/* Match Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{result.matchDetails.streetMatch}%</div>
                <div className="text-sm text-gray-600">Street Match</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{result.matchDetails.cityMatch}%</div>
                <div className="text-sm text-gray-600">City Match</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{result.matchDetails.postalMatch}%</div>
                <div className="text-sm text-gray-600">Postal Match</div>
              </div>
            </div>

            {/* Verification Details */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Verified in {result.verificationTime} seconds
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {result.coordinates.lat.toFixed(4)}, {result.coordinates.lng.toFixed(4)}
                </span>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <Map className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Interactive map will be displayed here</p>
              <p className="text-sm text-gray-400">Showing verified location on map</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button className="flex-1">
                <MapPin className="h-4 w-4 mr-2" />
                View on Map
              </Button>
              
              {user?.role === 'organization' && (
                <Button 
                  variant="outline"
                  onClick={() => setShowEscalation(true)}
                  className="flex-1"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Escalate Lookup
                </Button>
              )}
              
              <Button variant="outline" className="flex-1">
                Export Result
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SingleLookupPage;
