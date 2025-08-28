import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search as SearchIcon, MapPin, User, Mail } from 'lucide-react';

const Search = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
      // Handle search results here
    }, 2000);
  };

  return (
    <div className="min-h-full flex items-center justify-center px-8 py-16">
      <div className="w-full max-w-lg">
        {/* Search Form */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Search by name, email or address
              </h1>
              <p className="text-gray-600">
                Enter the information you want to verify
              </p>
            </div>

            <form onSubmit={handleSearch} className="space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-genital-orange focus:ring-genital-orange"
                  />
                </div>
              </div>

              {/* Address Input */}
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium text-gray-700">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="address"
                    type="text"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-genital-orange focus:ring-genital-orange"
                  />
                </div>
              </div>

              {/* Search Button */}
              <Button
                type="submit"
                disabled={isSearching || (!name && !address)}
                className="w-full h-12 bg-genital-orange hover:bg-genital-orange-dark text-white font-medium text-base"
              >
                {isSearching ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Searching...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <SearchIcon className="h-4 w-4 mr-2" />
                    Search
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Powered by AI-enhanced verification technology
          </p>
        </div>
      </div>
    </div>
  );
};

export default Search;