import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { UserAvatar } from "@/components/ui/user-avatar";
import { useAuth } from "@/contexts/AuthContext";
import { CreditCard } from 'lucide-react';

const DashboardSettings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("account");
  const [formData, setFormData] = useState({
    firstName: user?.firstName || 'Joseph',
    lastName: user?.lastName || 'Oladepo',
    email: user?.email || 'jolada55@gmail.com',
  });

  // Notification preferences state
  const [notifications, setNotifications] = useState({
    walletAlerts: true,
    subscriptionBilling: true,
    newsUpdates: false,
    verificationResults: false,
    documentStatus: true,
  });

  const handleSave = () => {
    console.log('Saving settings:', formData);
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Mock billing data
  const searchesUsed = 13;
  const searchesTotal = 50;
  const searchesLeft = searchesTotal - searchesUsed;
  const usagePercentage = (searchesUsed / searchesTotal) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="account" className="text-sm">Account</TabsTrigger>
          <TabsTrigger value="billing" className="text-sm">Plan & Billings</TabsTrigger>
          <TabsTrigger value="notifications" className="text-sm">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture Section */}
              <div className="flex items-start gap-4">
                <UserAvatar 
                  firstName={formData.firstName}
                  lastName={formData.lastName}
                  email={formData.email}
                  size="lg"
                  className="w-20 h-20 text-xl"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">Profile Picture</h3>
                  <p className="text-sm text-gray-500 mb-3">PNG or JPEG under 10MB.</p>
                  <Button variant="outline" size="sm">
                    Upload new picture
                  </Button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="flex-1"
                      disabled
                    />
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      Verify Email
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-500">Update your password.</p>
                    <Button variant="outline" size="sm">
                      Update Password
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <p className="text-xl font-semibold">Plan & Billings</p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Upgrade Plan ⚡
            </Button>
          </div>

          {/* Current Plan Section */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex justify-between items-center w-full">
                  <h3 className="text-lg font-medium text-gray-900">Basic Plan</h3>
                  <p className="text-sm text-gray-500">Subscription end date: 26 Sep 2025</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#f3f4f6"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="2"
                        strokeDasharray={`${usagePercentage}, 100`}
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{searchesLeft} searches left</h4>
                    <p className="text-sm text-gray-500">{searchesUsed}/{searchesTotal} searches used.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information Section */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-sm text-gray-600">Payment Method</span>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-900">MasterCard (**** **** **** 5988)</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-sm text-gray-600">Billing email</span>
                <span className="text-sm text-gray-500">josephola@gmail.com</span>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <span className="text-sm text-gray-600">Billing Address</span>
                <span className="text-sm text-gray-500">24, Allen Avenue, Ikeja, Lagos 101233, Lagos.</span>
              </div>
            </CardContent>
          </Card>

          {/* Billing History Section */}
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Invoice</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Date Initiated</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-4 text-sm text-gray-900">Basic Plan</td>
                      <td className="py-4 text-sm text-gray-500">26 Aug 2025 - 09:41 AM</td>
                      <td className="py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Paid
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 text-sm text-gray-900">Basic Plan</td>
                      <td className="py-4 text-sm text-gray-500">26 Jul 2025 - 10:12 AM</td>
                      <td className="py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Paid
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <h2 className="text-xl font-semibold">Notifications</h2>
          
          {/* Email Notifications Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-1">Email Notifications</h3>
              <p className="text-sm text-gray-500 mb-4">Get emails to find out what's going on when you're not online.</p>
              
              <div className="space-y-4">
                <div className="flex items-start justify-between py-3">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">Wallet Alerts</h4>
                    <p className="text-sm text-gray-500">Stay updated on your wallet balance and payment activities.</p>
                  </div>
                  <Switch 
                    checked={notifications.walletAlerts}
                    onCheckedChange={() => handleNotificationToggle('walletAlerts')}
                  />
                </div>
                
                <div className="flex items-start justify-between py-3">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">Subscription & Billing Updates</h4>
                    <p className="text-sm text-gray-500">Get reminders about your subscription status and upcoming charges.</p>
                  </div>
                  <Switch 
                    checked={notifications.subscriptionBilling}
                    onCheckedChange={() => handleNotificationToggle('subscriptionBilling')}
                  />
                </div>
                
                <div className="flex items-start justify-between py-3">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">News and updates</h4>
                    <p className="text-sm text-gray-500">News about products and features updates.</p>
                  </div>
                  <Switch 
                    checked={notifications.newsUpdates}
                    onCheckedChange={() => handleNotificationToggle('newsUpdates')}
                  />
                </div>
              </div>
            </div>

            {/* Push Notifications Section */}
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-1">Push Notifications</h3>
              <p className="text-sm text-gray-500 mb-4">Get notifications in-app to find out what's going on when you're online.</p>
              
              <div className="space-y-4">
                <div className="flex items-start justify-between py-3">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">Verification Results</h4>
                    <p className="text-sm text-gray-500">Get notified about your the status of your verifications.</p>
                  </div>
                  <Switch 
                    checked={notifications.verificationResults}
                    onCheckedChange={() => handleNotificationToggle('verificationResults')}
                  />
                </div>
                
                <div className="flex items-start justify-between py-3">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">Document Status Updates</h4>
                    <p className="text-sm text-gray-500">Know when your uploaded documents are approved or need changes.</p>
                  </div>
                  <Switch 
                    checked={notifications.documentStatus}
                    onCheckedChange={() => handleNotificationToggle('documentStatus')}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardSettings;
