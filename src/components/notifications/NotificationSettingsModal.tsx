import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationSettingsModal({ isOpen, onClose }: NotificationSettingsModalProps) {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailEnabled: true,
    pushEnabled: true,
    frequency: 'immediate',
    notificationTypes: {
      verifications: true,
      billing: true,
      system: true,
      security: false,
    },
  });

  const handleSave = () => {
    toast({
      title: 'Settings Saved',
      description: 'Your notification preferences have been updated.',
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Notification Settings</DialogTitle>
          <DialogDescription>
            Manage how you receive notifications
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Notification Channels */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Notification Channels</h3>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="flex flex-col gap-1">
                <span>Email Notifications</span>
                <span className="text-xs text-muted-foreground font-normal">
                  Receive notifications via email
                </span>
              </Label>
              <Switch
                id="email-notifications"
                checked={settings.emailEnabled}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, emailEnabled: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications" className="flex flex-col gap-1">
                <span>Push Notifications</span>
                <span className="text-xs text-muted-foreground font-normal">
                  Receive browser push notifications
                </span>
              </Label>
              <Switch
                id="push-notifications"
                checked={settings.pushEnabled}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, pushEnabled: checked })
                }
              />
            </div>
          </div>

          {/* Frequency */}
          <div className="space-y-2">
            <Label htmlFor="frequency">Notification Frequency</Label>
            <Select
              value={settings.frequency}
              onValueChange={(value) =>
                setSettings({ ...settings, frequency: value })
              }
            >
              <SelectTrigger id="frequency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="hourly">Hourly Digest</SelectItem>
                <SelectItem value="daily">Daily Digest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notification Types */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Notification Types</h3>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="verifications"
                checked={settings.notificationTypes.verifications}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notificationTypes: {
                      ...settings.notificationTypes,
                      verifications: checked as boolean,
                    },
                  })
                }
              />
              <Label htmlFor="verifications" className="font-normal">
                Verification Updates
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="billing"
                checked={settings.notificationTypes.billing}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notificationTypes: {
                      ...settings.notificationTypes,
                      billing: checked as boolean,
                    },
                  })
                }
              />
              <Label htmlFor="billing" className="font-normal">
                Billing & Payment
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="system"
                checked={settings.notificationTypes.system}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notificationTypes: {
                      ...settings.notificationTypes,
                      system: checked as boolean,
                    },
                  })
                }
              />
              <Label htmlFor="system" className="font-normal">
                System Updates
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="security"
                checked={settings.notificationTypes.security}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notificationTypes: {
                      ...settings.notificationTypes,
                      security: checked as boolean,
                    },
                  })
                }
              />
              <Label htmlFor="security" className="font-normal">
                Security Alerts
              </Label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
