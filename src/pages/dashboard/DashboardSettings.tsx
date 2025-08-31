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
import {  Bell, UserRoundSearch, Rocket, CreditCard } from 'lucide-react';
import { cn } from "@/lib/utils";

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "account", label: "Account" },
  { id: "billing", label: "Plan & Billings" },
  { id: "notifications", label: "Notifications" },
];

function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className="inline-flex p-0.5 bg-gray-100 rounded-xl">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-3 py-1 text-sm font-medium rounded-lg transition-all duration-200",
            activeTab === tab.id
              ? "bg-white text-text-70 shadow-sm"
              : "text-text-50 hover:text-text-70",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  type?: string;
}

function InputField({
  label,
  value,
  onChange,
  disabled = false,
  type = "text",
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-text-70">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn(
          "h-10 px-3 rounded-lg border text-base font-normal",
          disabled
            ? "border-none bg-transparent text-text-50"
            : "border-input bg-white text-foreground focus:outline-none focus:ring-1 focus:ring-orange-primary",
        )}
      />
    </div>
  );
}

// Toggle Switch Component
interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

function Toggle({ checked, onChange, disabled = false }: ToggleProps) {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={cn(
        "flex h-6 w-12 items-center rounded-full p-0.5 transition-colors duration-200",
        checked ? "bg-orange-primary" : "bg-gray-200",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <div
        className={cn(
          "h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200",
          checked ? "translate-x-6" : "translate-x-0"
        )}
      />
    </button>
  );
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState("notifications");
  const [formData, setFormData] = useState({
    firstName: "Joseph",
    lastName: "Oladepo",
    email: "jolada55@gmail.com",
  });

  // Notifications state
  const [notifications, setNotifications] = useState({
    // Email Notifications
    walletAlerts: true,
    subscriptionUpdates: true,
    newsUpdates: false,
    // Push Notifications
    verificationResults: true,
    documentUpdates: true,
  });

  const updateNotification = (key: keyof typeof notifications, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex-1 bg-white lg:rounded-tl-xl min-h-screen lg:min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4.5 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-text-70 tracking-tight">
          Settings
        </h1>

        <div className="flex items-center gap-4">
          {/* Verify Button */}
          <button className="flex items-center gap-1.5 px-3 py-1 bg-orange-primary text-white text-sm font-medium rounded-lg shadow-lg shadow-orange-primary/25 hover:bg-orange-primary/90 transition-colors">
            Verify
            <UserRoundSearch className="w-4 h-4" strokeWidth={1.2} />
          </button>

          {/* Notifications */}
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <Bell className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 max-w-4xl">
        {/* Tabs */}
        <div className="mb-6">
          <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Account Content */}
        {activeTab === "account" && (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-medium text-foreground mb-5">
                Account
              </h2>
              <div className="w-full h-px bg-gray-200 mb-6" />
            </div>

            <div className="space-y-6">
              {/* Profile Picture Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-24 h-24 bg-gray-400 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl font-normal text-text-50">JO</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-medium text-text-70">
                    Profile Picture
                  </h3>
                  <p className="text-xs text-text-50">
                    PNG or JPEG under 10MB.
                  </p>
                  <button className="mt-2 px-3 py-2 border border-muted-foreground rounded-lg text-sm text-text-70 hover:bg-gray-50 transition-colors">
                    Upload new picture
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                <InputField
                  label="First Name"
                  value={formData.firstName}
                  onChange={(value) => updateField("firstName", value)}
                />

                <InputField
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(value) => updateField("lastName", value)}
                />

                {/* Email Row */}
                <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                  <div className="flex-1 w-full">
                    <InputField
                      label="Email"
                      value={formData.email}
                      onChange={(value) => updateField("email", value)}
                      disabled={true}
                    />
                  </div>
                  <button className="h-9 px-4 bg-orange-secondary text-white text-sm font-semibold rounded-lg shadow-lg shadow-orange-primary/25 hover:bg-orange-secondary/90 transition-colors w-full sm:w-auto">
                    Verify Email
                  </button>
                </div>

                {/* Password Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-text-70 mb-1">
                      Password
                    </h3>
                    <p className="text-sm text-text-50">
                      Update your password.
                    </p>
                  </div>
                  <button className="h-9 px-4 border border-muted-foreground text-sm font-medium text-text-70 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Plan & Billings Content */}
        {activeTab === "billing" && (
          <div className="space-y-4">
            {/* Header with Upgrade Plan button */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-foreground">Plan & Billings</h2>
              <button className="flex items-center gap-1.5 h-9 px-3 border border-orange-primary text-orange-primary bg-white rounded-lg shadow-lg shadow-orange-primary/25 hover:bg-orange-primary/5 transition-colors text-sm font-medium">
                Upgrade Plan
                <Rocket className="w-4 h-4" strokeWidth={1.2} />
              </button>
            </div>

            <div className="w-full h-px bg-gray-200" />

            {/* Basic Plan Section */}
            <div className="p-3 border border-gray-200 rounded-2xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-base text-text-70">Basic Plan</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-base text-text-70">Subscription end date:</span>
                  <div className="px-1.5 py-0.5 bg-orange-primary/10 text-orange-primary text-sm font-medium rounded">
                    26 Sep 2025
                  </div>
                </div>
              </div>

              {/* Usage Indicator */}
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                    {/* Background circle */}
                    <circle
                      cx="32"
                      cy="32"
                      r="28.8"
                      stroke="#E8E8E8"
                      strokeWidth="6.4"
                      fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="32"
                      cy="32"
                      r="28.8"
                      stroke="#F89111"
                      strokeWidth="6.4"
                      fill="none"
                      strokeDasharray={`${(37/50) * 180.95} 180.95`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-medium text-foreground leading-7">37 searches left</div>
                  <div className="text-sm text-text-70">13/50 searches used.</div>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-gray-200" />

            {/* Payment Information */}
            <div className="space-y-4">
              <h3 className="text-base font-medium text-text-70">Payment Information</h3>

              <div className="p-3 border border-gray-200 rounded-2xl space-y-3">
                {/* Payment Method */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span className="text-sm font-medium text-text-70">Payment Method</span>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-muted-foreground" strokeWidth={1.2} />
                    <span className="text-sm text-text-50">MasterCard (**** **** **** 5988)</span>
                  </div>
                </div>

                <div className="w-full h-px bg-gray-200" />

                {/* Billing Email */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span className="text-sm font-medium text-text-70">Billing email</span>
                  <span className="text-sm text-text-50">josephola@gmail.com</span>
                </div>

                <div className="w-full h-px bg-gray-200" />

                {/* Billing Address */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <span className="text-sm font-medium text-text-70">Billing Address</span>
                  <span className="text-sm text-text-50 text-right sm:text-left max-w-64">24, Allen Avenue, Ikeja, Lagos 101233, Lagos.</span>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-gray-200" />

            {/* Billing History */}
            <div className="space-y-4 pb-6">
              <h3 className="text-base font-medium text-text-70">Billing History</h3>

              <div className="border border-gray-200 rounded-2xl overflow-hidden">
                {/* Table Header */}
                <div className="hidden sm:flex bg-gray-100 px-3 py-2 items-center">
                  <div className="flex-1 text-xs font-medium text-gray-600 px-3">Invoice</div>
                  <div className="w-64 text-xs font-medium text-gray-600 px-3">Date Initiated</div>
                  <div className="w-36 text-xs font-medium text-gray-600 px-3">Status</div>
                </div>

                {/* Table Rows */}
                <div className="bg-white">
                  {/* Row 1 */}
                  <div className="px-3 py-3 border-b border-gray-100">
                    <div className="hidden sm:flex items-center">
                      <div className="flex-1 text-sm text-foreground px-3">Basic Plan</div>
                      <div className="w-64 text-sm text-foreground px-3">26 Aug 2025 - 09:41 AM</div>
                      <div className="w-36 px-3">
                        <span className="inline-flex px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full border border-green-200">
                          Paid
                        </span>
                      </div>
                    </div>
                    {/* Mobile layout */}
                    <div className="sm:hidden space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-foreground">Basic Plan</span>
                        <span className="inline-flex px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full border border-green-200">
                          Paid
                        </span>
                      </div>
                      <div className="text-sm text-text-50">26 Aug 2025 - 09:41 AM</div>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="px-3 py-3">
                    <div className="hidden sm:flex items-center">
                      <div className="flex-1 text-sm text-foreground px-3">Basic Plan</div>
                      <div className="w-64 text-sm text-foreground px-3">26 Jul 2025 - 10:12 AM</div>
                      <div className="w-36 px-3">
                        <span className="inline-flex px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full border border-green-200">
                          Paid
                        </span>
                      </div>
                    </div>
                    {/* Mobile layout */}
                    <div className="sm:hidden space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-foreground">Basic Plan</span>
                        <span className="inline-flex px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full border border-green-200">
                          Paid
                        </span>
                      </div>
                      <div className="text-sm text-text-50">26 Jul 2025 - 10:12 AM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Content */}
        {activeTab === "notifications" && (
          <div className="space-y-4">
            {/* Header */}
            <div>
              <h2 className="text-lg font-medium text-foreground">Notifications</h2>
            </div>

            <div className="w-full h-px bg-gray-200" />

            {/* Email Notifications Section */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 py-6">
              {/* Left column - Section title and description */}
              <div className="lg:col-span-2 space-y-1">
                <h3 className="text-base font-medium text-text-70">Email Notifications</h3>
                <p className="text-sm text-text-50">Get emails to find out what's going on when you're not online.</p>
              </div>

              {/* Right column - Toggle options */}
              <div className="lg:col-span-3 space-y-6">
                {/* Wallet Alerts */}
                <div className="flex items-start gap-4">
                  <Toggle
                    checked={notifications.walletAlerts}
                    onChange={(checked) => updateNotification('walletAlerts', checked)}
                  />
                  <div className="flex-1 space-y-0.5">
                    <h4 className="text-base font-medium text-text-70">Wallet Alerts</h4>
                    <p className="text-sm text-text-50">Stay updated on your wallet balance and payment activities.</p>
                  </div>
                </div>

                {/* Subscription & Billing Updates */}
                <div className="flex items-start gap-4">
                  <Toggle
                    checked={notifications.subscriptionUpdates}
                    onChange={(checked) => updateNotification('subscriptionUpdates', checked)}
                  />
                  <div className="flex-1 space-y-0.5">
                    <h4 className="text-base font-medium text-text-70">Subscription & Billing Updates</h4>
                    <p className="text-sm text-text-50">Get reminders about your subscription status and upcoming charges.</p>
                  </div>
                </div>

                {/* News and updates */}
                <div className="flex items-start gap-4">
                  <Toggle
                    checked={notifications.newsUpdates}
                    onChange={(checked) => updateNotification('newsUpdates', checked)}
                  />
                  <div className="flex-1 space-y-0.5">
                    <h4 className="text-base font-medium text-text-70">News and updates</h4>
                    <p className="text-sm text-text-50">News about products and features updates.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-gray-200" />

            {/* Push Notifications Section */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 py-6">
              {/* Left column - Section title and description */}
              <div className="lg:col-span-2 space-y-1">
                <h3 className="text-base font-medium text-text-70">Push Notifications</h3>
                <p className="text-sm text-text-50">Get notifications in-app to find out what's going on when you're online.</p>
              </div>

              {/* Right column - Toggle options */}
              <div className="lg:col-span-3 space-y-6">
                {/* Verification Results */}
                <div className="flex items-start gap-4">
                  <Toggle
                    checked={notifications.verificationResults}
                    onChange={(checked) => updateNotification('verificationResults', checked)}
                  />
                  <div className="flex-1 space-y-0.5">
                    <h4 className="text-base font-medium text-text-70">Verification Results</h4>
                    <p className="text-sm text-text-50">Get notified about your the status of your verifications.</p>
                  </div>
                </div>

                {/* Document Status Updates */}
                <div className="flex items-start gap-4">
                  <Toggle
                    checked={notifications.documentUpdates}
                    onChange={(checked) => updateNotification('documentUpdates', checked)}
                  />
                  <div className="flex-1 space-y-0.5">
                    <h4 className="text-base font-medium text-text-70">Document Status Updates</h4>
                    <p className="text-sm text-text-50">Know when your uploaded documents are approved or need changes.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-gray-200" />

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={() => {
                  // Reset to default values
                  setNotifications({
                    walletAlerts: true,
                    subscriptionUpdates: true,
                    newsUpdates: false,
                    verificationResults: true,
                    documentUpdates: true,
                  });
                }}
                className="h-9 px-4 border border-muted-foreground text-sm font-medium text-text-70 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Discard Changes
              </button>
              <button
                onClick={() => {
                  // Here you would typically save to backend
                  console.log('Saving notifications:', notifications);
                }}
                className="h-9 px-4 bg-orange-primary text-white text-sm font-semibold rounded-lg shadow-lg shadow-orange-primary/25 hover:bg-orange-primary/90 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}