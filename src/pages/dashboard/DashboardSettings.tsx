import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { UserAvatar } from "@/components/ui/user-avatar";
import { useAuth } from "@/contexts/AuthContext";

const DashboardSettings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("account");
  const [formData, setFormData] = useState({
    firstName: user?.firstName || 'Joseph',
    lastName: user?.lastName || 'Oladepo',
    email: user?.email || 'jolada55@gmail.com',
  });

  const handleSave = () => {
    console.log('Saving settings:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
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
          <Card>
            <CardHeader>
              <CardTitle>Plan & Billings</CardTitle>
              <CardDescription>Manage your subscription and billing information</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Billing settings coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardSettings;