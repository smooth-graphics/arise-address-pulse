
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCircle, AlertCircle, Info, Trash2, Settings, Filter } from 'lucide-react';
import NotificationCenter from '@/components/notifications/NotificationCenter';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'verification' | 'system' | 'billing' | 'security';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Address Verification Complete',
    message: 'Your address at Victoria Island, Lagos has been successfully verified with a 98% match score.',
    type: 'success',
    timestamp: '2024-01-15T10:30:00Z',
    read: false,
    priority: 'high',
    category: 'verification'
  },
  {
    id: '2',
    title: 'Document Upload Required',
    message: 'Please upload a utility bill to complete your address verification process.',
    type: 'warning',
    timestamp: '2024-01-14T15:45:00Z',
    read: false,
    priority: 'medium',
    category: 'verification'
  },
  {
    id: '3',
    title: 'Profile Update Successful',
    message: 'Your profile information has been updated successfully.',
    type: 'info',
    timestamp: '2024-01-13T09:15:00Z',
    read: true,
    priority: 'low',
    category: 'system'
  },
  {
    id: '4',
    title: 'Payment Method Updated',
    message: 'Your payment method has been successfully updated.',
    type: 'success',
    timestamp: '2024-01-12T14:20:00Z',
    read: false,
    priority: 'medium',
    category: 'billing'
  },
  {
    id: '5',
    title: 'Security Alert',
    message: 'New login detected from a different device. If this wasn\'t you, please secure your account.',
    type: 'warning',
    timestamp: '2024-01-11T18:30:00Z',
    read: true,
    priority: 'high',
    category: 'security'
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-red-600" />;
      default: return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-l-green-500';
      case 'warning': return 'border-l-yellow-500';
      case 'error': return 'border-l-red-500';
      default: return 'border-l-blue-500';
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return (
      <Badge className={colors[priority as keyof typeof colors]}>
        {priority.toUpperCase()}
      </Badge>
    );
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread' && notification.read) return false;
    if (filter === 'high' && notification.priority !== 'high') return false;
    if (categoryFilter !== 'all' && notification.category !== categoryFilter) return false;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.read).length;

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const categories = ['all', 'verification', 'system', 'billing', 'security'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Notifications
            {unreadCount > 0 && (
              <Badge className="bg-red-100 text-red-800">{unreadCount} new</Badge>
            )}
            {highPriorityCount > 0 && (
              <Badge className="bg-orange-100 text-orange-800">{highPriorityCount} urgent</Badge>
            )}
          </h2>
          <p className="text-gray-600">Stay updated with your verification status and account activities</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowNotificationCenter(true)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button
            variant="outline"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark All Read
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <CardTitle>Recent Notifications</CardTitle>
            <div className="flex flex-wrap gap-2">
              {/* Priority Filters */}
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All ({notifications.length})
              </Button>
              <Button
                variant={filter === 'unread' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('unread')}
              >
                Unread ({unreadCount})
              </Button>
              <Button
                variant={filter === 'high' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('high')}
              >
                Urgent ({highPriorityCount})
              </Button>
            </div>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Filter className="h-4 w-4 text-gray-500 mt-1" />
            {categories.map(category => (
              <Button
                key={category}
                variant={categoryFilter === category ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCategoryFilter(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-l-4 rounded-r-lg ${getNotificationColor(notification.type)} ${
                  notification.read ? 'bg-gray-50' : 'bg-white border shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className={`font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                        {getPriorityBadge(notification.priority)}
                        <Badge variant="outline" className="capitalize text-xs">
                          {notification.category}
                        </Badge>
                      </div>
                      <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {formatTimestamp(notification.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 ml-4">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteNotification(notification.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {filteredNotifications.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                {filter === 'unread' ? 'No unread notifications' : 
                 filter === 'high' ? 'No urgent notifications' :
                 categoryFilter !== 'all' ? `No ${categoryFilter} notifications` :
                 'No notifications found'}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notification Center Modal */}
      {showNotificationCenter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <NotificationCenter onClose={() => setShowNotificationCenter(false)} />
        </div>
      )}
    </div>
  );
};

export default Notifications;
