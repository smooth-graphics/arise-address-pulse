import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { History, ArrowUpRight } from 'lucide-react';

const RecentSearchesTable = () => {
  const recentSearches = [
    {
      id: 1,
      name: 'Joseph Oladapo',
      address: 'Victoria Island, Lagos',
      status: 'Completed',
      date: '2024-01-15',
      time: '14:30',
    },
    {
      id: 2,
      name: 'Amina Hassan',
      address: 'Ikeja GRA, Lagos',
      status: 'Completed',
      date: '2024-01-14',
      time: '11:20',
    },
    {
      id: 3,
      name: 'David Chen',
      address: 'Lekki Phase 1, Lagos',
      status: 'Completed',
      date: '2024-01-13',
      time: '09:45',
    },
    {
      id: 4,
      name: 'Sarah Ibrahim',
      address: 'Abuja Municipal, FCT',
      status: 'Completed',
      date: '2024-01-12',
      time: '16:15',
    },
  ];

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <History className="h-5 w-5 text-gray-400" />
            Recent Searches
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className="font-medium text-gray-700">Name</TableHead>
                <TableHead className="font-medium text-gray-700">Address</TableHead>
                <TableHead className="font-medium text-gray-700">Status</TableHead>
                <TableHead className="font-medium text-gray-700">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentSearches.map((search) => (
                <TableRow key={search.id} className="border-gray-100 hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-900">
                    {search.name}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {search.address}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100"
                    >
                      {search.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    <div className="flex flex-col">
                      <span className="text-sm">{search.date}</span>
                      <span className="text-xs text-gray-400">{search.time}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex justify-center">
          <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
            See history
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentSearchesTable;