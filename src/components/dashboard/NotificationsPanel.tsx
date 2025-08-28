import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Check } from 'lucide-react';

const NotificationsPanel = () => {
  const notifications = [
    {
      id: 1,
      title: 'Verification completed',
      message: 'Your address verification for Victoria Island has been completed.',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      title: 'Document uploaded',
      message: 'New utility bill document has been processed successfully.',
      time: '5 hours ago',
      read: false,
    },
    {
      id: 3,
      title: 'System update',
      message: 'New features have been added to improve verification accuracy.',
      time: '1 day ago',
      read: true,
    },
    {
      id: 4,
      title: 'Payment received',
      message: 'Your wallet has been credited with ₦5,000.',
      time: '2 days ago',
      read: true,
    },
  ];

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">All Notifications</CardTitle>
          <Bell className="h-5 w-5 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border transition-colors ${
                notification.read ? 'bg-gray-50 border-gray-100' : 'bg-blue-50 border-blue-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  notification.read ? 'bg-gray-300' : 'bg-genital-orange'
                }`} />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    {notification.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400">
                    {notification.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          className="w-full text-sm text-gray-600 hover:text-gray-900 justify-start"
        >
          <Check className="h-4 w-4 mr-2" />
          Mark all as read
        </Button>
      </CardContent>
    </Card>
  );
};

export default NotificationsPanel;