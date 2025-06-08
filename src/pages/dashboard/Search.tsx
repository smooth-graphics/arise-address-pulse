
import React from 'react';
import SearchInterface from '@/components/search/SearchInterface';

const Search = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Address Search</h2>
        <p className="text-gray-600">Search and verify addresses with fuzzy matching capabilities</p>
      </div>
      <SearchInterface />
    </div>
  );
};

export default Search;
