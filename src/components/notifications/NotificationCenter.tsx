
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Settings, Filter, CheckCircle2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NotificationPreferences {
  verificationUpdates: boolean;
  systemAlerts: boolean;
  marketing: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

interface NotificationCenterProps {
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ onClose }) => {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    verificationUpdates: true,
    systemAlerts: true,
    marketing: false,
    emailNotifications: true,
    pushNotifications: true,
  });
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();

  const handlePreferenceChange = (key: keyof NotificationPreferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast({
      title: "Preferences Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <Card className="w-96 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
            <Badge variant="secondary">3 new</Badge>
          </CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showSettings ? (
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Notification Preferences</h4>
            {Object.entries(preferences).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <label className="text-sm capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </label>
                <Button
                  variant={value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePreferenceChange(key as keyof NotificationPreferences)}
                >
                  {value ? <CheckCircle2 className="h-4 w-4" /> : <X className="h-4 w-4" />}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Button variant="outline" size="sm">
                <Filter className="h-3 w-3 mr-1" />
                All
              </Button>
              <Button variant="ghost" size="sm">Unread</Button>
              <Button variant="ghost" size="sm">Important</Button>
            </div>
            
            {/* Sample notifications */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              <div className="p-3 bg-blue-50 border-l-4 border-l-blue-500 rounded-r text-sm">
                <div className="font-medium">Verification Complete</div>
                <div className="text-gray-600">Your address has been verified successfully.</div>
                <div className="text-xs text-gray-400 mt-1">2 minutes ago</div>
              </div>
              <div className="p-3 bg-yellow-50 border-l-4 border-l-yellow-500 rounded-r text-sm">
                <div className="font-medium">Document Required</div>
                <div className="text-gray-600">Please upload additional documentation.</div>
                <div className="text-xs text-gray-400 mt-1">1 hour ago</div>
              </div>
              <div className="p-3 bg-green-50 border-l-4 border-l-green-500 rounded-r text-sm">
                <div className="font-medium">Profile Updated</div>
                <div className="text-gray-600">Your profile information has been updated.</div>
                <div className="text-xs text-gray-400 mt-1">3 hours ago</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;
