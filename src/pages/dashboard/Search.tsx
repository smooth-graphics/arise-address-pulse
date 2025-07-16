
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SingleLookupPage from '@/components/verification/SingleLookupPage';
import BulkUploadPage from '@/components/verification/BulkUploadPage';
import { Search as SearchIcon, Upload } from 'lucide-react';

const Search = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Address Verification</h2>
        <p className="text-gray-600">Search and verify addresses with AI-powered fuzzy matching</p>
      </div>
      
      <Tabs defaultValue="single" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="single" className="flex items-center gap-2">
            <SearchIcon className="h-4 w-4" />
            Single Lookup
          </TabsTrigger>
          <TabsTrigger value="bulk" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Bulk Upload
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="single">
          <SingleLookupPage />
        </TabsContent>
        
        <TabsContent value="bulk">
          <BulkUploadPage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Search;
