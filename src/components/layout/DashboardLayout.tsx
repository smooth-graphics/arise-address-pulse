
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/Sidebar';
import { Menu } from 'lucide-react';

const DashboardLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Map dashboard routes to sidebar routes
  const mapPathForSidebar = (path: string) => {
    switch (path) {
      case '/dashboard':
        return '/';
      case '/dashboard/search':
        return '/verify';
      case '/dashboard/documents':
        return '/documents';
      case '/dashboard/history':
        return '/history';
      case '/dashboard/settings':
        return '/settings';
      case '/dashboard/billing':
        return '/upgrade';
      default:
        return path.replace('/dashboard', '');
    }
  };

  const currentPath = mapPathForSidebar(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 flex max-w-full overflow-x-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-[237px] z-50">
            <Sidebar currentPath={currentPath} onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0 lg:w-[237px] h-screen">
        <Sidebar currentPath={currentPath} />
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile menu button - only show on mobile */}
        <div className="lg:hidden bg-white border-b border-gray-100">
          <div className="px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 bg-white min-h-0">
          <div className="h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
