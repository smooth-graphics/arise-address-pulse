import React from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAuth } from '@/contexts/AuthContext';
import NotificationsPanel from '@/components/dashboard/NotificationsPanel';
import { UserAvatar } from '@/components/ui/user-avatar';
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
  LogOut,
  Search
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
    // GenIEtal simplified navigation structure
    const mainItems = [
      { name: 'Verify', href: '/dashboard/search', icon: Search, group: 'main' },
      { name: 'Overview', href: '/dashboard', icon: Home, group: 'main' },
      { name: 'My Documents', href: '/dashboard/documents', icon: FileText, group: 'main' },
      { name: 'History', href: '/dashboard/history', icon: History, group: 'main' },
    ];

    const accountItems = [
      { name: 'Settings', href: '/dashboard/settings', icon: Settings, group: 'account' },
      { name: 'Upgrade Plan', href: '/dashboard/billing', icon: CreditCard, group: 'account' },
      { name: 'Logout', href: '#', icon: LogOut, group: 'account', onClick: handleLogout },
    ];

    return [...mainItems, ...accountItems];
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
        <div className="fixed top-0 left-0 flex h-screen w-64 flex-col">
          <SidebarContent navigationItems={navigationItems} user={user} onLogout={handleLogout} />
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        {/* Header with title and actions */}
        <div className="bg-white border-b border-gray-100">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden mr-4 p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {location.pathname === '/dashboard/search' ? 'Search' : 
                   location.pathname === '/dashboard' ? 'Overview' : 
                   location.pathname === '/dashboard/documents' ? 'My Documents' : 
                   location.pathname === '/dashboard/history' ? 'History' : 
                   'Dashboard'}
                </h1>
              </div>
              
              {/* Header actions - only show on Overview page */}
              {location.pathname === '/dashboard' && (
                <div className="flex items-center gap-4">
                  <Button className="bg-genital-orange hover:bg-genital-orange-dark text-white">
                    <MapPin className="h-4 w-4 mr-2" />
                    Verify
                  </Button>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                        <Bell className="w-4 h-4 text-gray-600" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-96 p-0" align="end">
                      <NotificationsPanel />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-white">
          <div className="h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};



const SidebarContent = ({ navigationItems, user, onLogout }: any) => {
  const location = useLocation();

  const mainItems = navigationItems.filter((item: any) => item.group === 'main' || !item.group);
  const accountItems = navigationItems.filter((item: any) => item.group === 'account');

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-100">
      {/* Logo */}
      <div className="px-8 py-8">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-genital-orange rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="ml-3">
            <div className="text-lg font-bold text-gray-900">GenIEtal</div>
            <div className="text-xs text-gray-500">Verification</div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-6">
        <div className="space-y-1">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">MAIN</div>
          {mainItems.map((item: any) => {
            const isActive = location.pathname === item.href || 
              (item.href === '/dashboard' && location.pathname === '/dashboard');
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-genital-orange text-white'
                    : 'text-gray-700 hover:bg-genital-orange-light hover:text-genital-orange'
                }`}
              >
                <item.icon
                  className={`mr-3 h-4 w-4 ${
                    isActive ? 'text-white' : 'text-gray-500 group-hover:text-genital-orange'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="mt-8 space-y-1">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">ACCOUNT</div>
          {accountItems.map((item: any) => {
            const isActive = location.pathname === item.href;
            if (item.onClick) {
              return (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-genital-orange-light hover:text-genital-orange w-full text-left"
                >
                  <item.icon className="mr-3 h-4 w-4 text-gray-500 group-hover:text-genital-orange" />
                  {item.name}
                </button>
              );
            }
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-genital-orange text-white'
                    : 'text-gray-700 hover:bg-genital-orange-light hover:text-genital-orange'
                }`}
              >
                <item.icon
                  className={`mr-3 h-4 w-4 ${
                    isActive ? 'text-white' : 'text-gray-500 group-hover:text-genital-orange'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Profile Section */}
      <div className="px-6 py-6 border-t border-gray-100">
        <div className="flex items-center">
          <UserAvatar 
            firstName={user?.firstName}
            lastName={user?.lastName}
            email={user?.email}
            size="md"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
