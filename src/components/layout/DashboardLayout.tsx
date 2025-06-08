import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  MapPin, 
  Shield, 
  Home, 
  User, 
  FileText, 
  History, 
  Bell, 
  Building, 
  Upload, 
  Settings, 
  Key, 
  Activity,
  Users,
  List,
  CreditCard,
  Menu,
  LogOut
} from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const getNavigationItems = () => {
    if (user?.role === 'admin') {
      return [
        { name: 'Overview', href: '/dashboard', icon: Home },
        { name: 'Users', href: '/dashboard/users', icon: Users },
        { name: 'Verification Queue', href: '/dashboard/queue', icon: List },
        { name: 'Documents', href: '/dashboard/documents', icon: FileText },
        { name: 'API Monitor', href: '/dashboard/api-monitor', icon: Activity },
        { name: 'Pricing', href: '/dashboard/pricing', icon: CreditCard },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
      ];
    }
    
    if (user?.role === 'organization') {
      return [
        { name: 'Overview', href: '/dashboard', icon: Home },
        { name: 'Profile', href: '/dashboard/profile', icon: Building },
        { name: 'Bulk Upload', href: '/dashboard/bulk-upload', icon: Upload },
        { name: 'Verifications', href: '/dashboard/verifications', icon: FileText },
        { name: 'Documents', href: '/dashboard/documents', icon: FileText },
        { name: 'API Access', href: '/dashboard/api', icon: Key },
        { name: 'Activity', href: '/dashboard/activity', icon: Activity },
        { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
      ];
    }
    
    // Individual user
    return [
      { name: 'Overview', href: '/dashboard', icon: Home },
      { name: 'Profile', href: '/dashboard/profile', icon: User },
      { name: 'Verify Address', href: '/dashboard/verify', icon: MapPin },
      { name: 'Documents', href: '/dashboard/documents', icon: FileText },
      { name: 'History', href: '/dashboard/history', icon: History },
      { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
    ];
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Close sidebar</span>
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <SidebarContent navigationItems={navigationItems} user={user} onLogout={handleLogout} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <SidebarContent navigationItems={navigationItems} user={user} onLogout={handleLogout} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <h1 className="ml-4 lg:ml-0 text-lg font-semibold text-gray-900">
                  {user?.role === 'admin' ? 'Admin Dashboard' : 
                   user?.role === 'organization' ? 'Organization Dashboard' : 
                   'Dashboard'}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  {user?.firstName} {user?.lastName}
                </span>
                <Button
                  onClick={() => navigate('/dashboard/notifications')}
                  variant="ghost"
                  size="icon"
                >
                  <Bell className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const SidebarContent = ({ navigationItems, user, onLogout }: any) => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-bold-red to-vibrant-orange rounded-lg flex items-center justify-center">
            <div className="flex">
              <MapPin className="w-4 h-4 text-white" />
              <Shield className="w-4 h-4 text-white -ml-1" />
            </div>
          </div>
          <span className="ml-2 text-lg font-bold text-gray-900">Arise</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navigationItems.map((item: any) => {
          const isActive = location.pathname === item.href;
          return (
            <a
              key={item.name}
              href={item.href}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-bold-red text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 ${
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                }`}
              />
              {item.name}
            </a>
          );
        })}
      </nav>

      {/* User info and logout */}
      <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
          <Button
            onClick={onLogout}
            variant="ghost"
            size="icon"
            className="ml-2"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
