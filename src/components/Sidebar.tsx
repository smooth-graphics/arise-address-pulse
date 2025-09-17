
import { cn } from "@/lib/utils";
import {
  UserRoundSearch,
  House,
  File,
  History,
  Settings as SettingsIcon,
  Rocket,
  LogOut,
  MapPin,
  X,
  Shield,
  Users,
  Wallet,
  CircleHelp,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import PlanUpgradeModal from "@/components/billing/PlanUpgradeModal";

interface SidebarProps {
  currentPath?: string;
  onClose?: () => void;
}

const getMainNavItems = (userRole: string) => {
  if (userRole === 'organization-admin') {
    return [
      { icon: House, label: "Overview", path: "/" },
      { icon: UserRoundSearch, label: "Verify", path: "/verify" },
      { icon: Shield, label: "Escalation Center", path: "/escalation" },
      { icon: Users, label: "Team Management", path: "/team" },
      { icon: History, label: "History", path: "/history" },
    ];
  }
  if (userRole === 'organization-member') {
    return [
      { icon: UserRoundSearch, label: "Verify", path: "/verify" },
      { icon: House, label: "Overview", path: "/" },
      { icon: Shield, label: "Escalation Center", path: "/escalation" },
      { icon: History, label: "History", path: "/history" },
    ];
  }
  return [
    { icon: UserRoundSearch, label: "Verify", path: "/verify" },
    { icon: House, label: "Overview", path: "/" },
    { icon: File, label: "My Documents", path: "/documents" },
    { icon: History, label: "History", path: "/history" },
  ];
};

const getAccountNavItems = (userRole: string) => {
  if (userRole === 'organization-admin') {
    return [
      { icon: SettingsIcon, label: "Settings", path: "/settings" },
      { icon: Wallet, label: "Wallet & Billing", path: "/billing" },
      { icon: CircleHelp, label: "Help & Support", path: "/help-support" },
      { icon: LogOut, label: "Logout", path: "/logout", isAction: true },
    ];
  }
  if (userRole === 'organization-member') {
    return [
      { icon: SettingsIcon, label: "Settings", path: "/settings" },
      { icon: CircleHelp, label: "Help & Support", path: "/help-support" },
      { icon: LogOut, label: "Logout", path: "/logout", isAction: true },
    ];
  }
  return [
    { icon: SettingsIcon, label: "Settings", path: "/settings" },
    { icon: Rocket, label: "Upgrade Plan", path: "/upgrade", isAction: true },
    { icon: LogOut, label: "Logout", path: "/logout", isAction: true },
  ];
};

export default function Sidebar({
  currentPath = "/settings",
  onClose,
}: SidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  
  const userRole = user?.role || 'individual';
  const mainNavItems = getMainNavItems(userRole);
  const accountNavItems = getAccountNavItems(userRole);

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const handleUpgrade = () => {
    setUpgradeModalOpen(true);
  };

  const handleUpgradeComplete = (planName: string) => {
    console.log('Upgrading to:', planName);
    setUpgradeModalOpen(false);
    // Handle the upgrade logic here
  };

  const NavItem = ({
    icon: Icon,
    label,
    path,
    isActive = false,
    onClick,
    isAction = false,
  }: {
    icon: any;
    label: string;
    path: string;
    isActive?: boolean;
    onClick?: () => void;
    isAction?: boolean;
  }) => {
    const mappedPath = path === '/' ? '/dashboard' : 
                      path === '/verify' ? '/dashboard/search' :
                      path === '/documents' ? '/dashboard/documents' :
                      path === '/history' ? '/dashboard/history' :
                      path === '/settings' ? '/dashboard/settings' :
                      path === '/upgrade' ? '/dashboard/billing' :
                      path === '/escalation' ? '/dashboard/escalation' :
                      path === '/team' ? '/dashboard/team' :
                      path === '/billing' ? '/dashboard/billing' :
                      path === '/help-support' ? '/dashboard/help-support' :
                      path;

    if (isAction || path === '/logout') {
      const actionHandler = path === '/upgrade' ? handleUpgrade : (onClick || handleLogout);
      
      return (
        <button
          onClick={actionHandler}
          className={cn(
            "flex h-10 pl-2 pr-4 items-center gap-2 rounded-r-lg transition-colors cursor-pointer relative w-full text-left",
            "bg-sidebar text-muted-foreground hover:bg-white/50",
          )}
        >
          <div className="w-1.5 h-8 rounded-r-lg absolute left-0 bg-sidebar" />
          <Icon className="w-5 h-5 ml-2" strokeWidth={1.2} />
          <span className="text-sm font-medium flex-1">{label}</span>
        </button>
      );
    }

    return (
      <Link
        to={mappedPath}
        onClick={onClick}
        className={cn(
          "flex h-10 pl-2 pr-4 items-center gap-2 rounded-r-lg transition-colors cursor-pointer relative",
          isActive
            ? "bg-white text-orange-primary"
            : "bg-sidebar text-muted-foreground hover:bg-white/50",
        )}
        aria-current={isActive ? "page" : undefined}
      >
        <div
          className={cn(
            "w-1.5 h-8 rounded-r-lg absolute left-0",
            isActive ? "bg-orange-primary" : "bg-sidebar",
          )}
        />
        <Icon className="w-5 h-5 ml-2" strokeWidth={1.2} />
        <span className="text-sm font-medium flex-1">{label}</span>
      </Link>
    );
  };

  const isPathActive = (current: string | undefined, target: string) => {
    if (!current) return false;
    if (current === target) return true;
    // Consider sub-routes active (e.g., /history/123)
    return current.startsWith(target + "/");
  };

  // Special styling for organization members
  if (userRole === 'organization-member') {
    return (
      <div className="w-60 h-screen bg-genital-gray-50 flex flex-col justify-between pr-4 sticky top-0 overflow-hidden">
        {/* Close button for mobile */}
        {onClose && (
          <div className="lg:hidden absolute top-4 right-4 z-20">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Logo Section */}
        <div className="pt-6 pl-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-genital-red-orange to-genital-orange-light rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-8">GenIEtal</h1>
              <p className="text-xs text-genital-orange-light font-medium">Verification</p>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 flex flex-col justify-between mt-6">
          {/* Main Navigation */}
          <div className="space-y-3">
            <div className="pl-4">
              <span className="text-xs font-normal text-genital-gray-500 tracking-wider">MAIN</span>
            </div>
            <div className="space-y-0">
              {mainNavItems.map((item) => {
                const mappedPath = item.path === '/' ? '/dashboard' : 
                                  item.path === '/verify' ? '/dashboard/search' :
                                  item.path === '/escalation' ? '/dashboard/escalation' :
                                  item.path === '/history' ? '/dashboard/history' :
                                  item.path;
                const isActive = isPathActive(currentPath, item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={mappedPath}
                    onClick={onClose}
                    className={`flex h-10 items-center gap-2 px-4 py-2 rounded-r-md transition-colors ${
                      isActive
                        ? "bg-white text-genital-orange font-medium"
                        : "bg-genital-gray-50 text-genital-gray-500 hover:bg-white hover:text-genital-gray-700"
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 ${isActive ? "text-genital-orange" : "text-genital-gray-400"}`}
                      strokeWidth={1.2}
                    />
                    <span className="text-sm">{item.label}</span>
                    {isActive && (
                      <div className="w-1.5 h-8 bg-genital-orange rounded-l-full ml-auto -mr-4"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Account Navigation */}
          <div className="space-y-3">
            <div className="pl-4">
              <span className="text-xs font-normal text-genital-gray-500 tracking-wider">ACCOUNT</span>
            </div>
            <div className="space-y-0">
              {accountNavItems.map((item) => {
                const mappedPath = item.path === '/settings' ? '/dashboard/settings' :
                                  item.path === '/help-support' ? '/dashboard/help-support' :
                                  item.path;
                const isActive = isPathActive(currentPath, item.path);

                if (item.isAction || item.path === '/logout') {
                  const actionHandler = item.path === '/logout' ? handleLogout : undefined;
                  
                  return (
                    <button
                      key={item.path}
                      onClick={actionHandler}
                      className={`flex h-10 items-center gap-2 px-4 py-2 rounded-r-md transition-colors w-full text-left ${
                        isActive
                          ? "bg-white text-genital-orange font-medium"
                          : "bg-genital-gray-50 text-genital-gray-500 hover:bg-white hover:text-genital-gray-700"
                      }`}
                    >
                      <item.icon
                        className={`w-5 h-5 ${isActive ? "text-genital-orange" : "text-genital-gray-400"}`}
                        strokeWidth={1.2}
                      />
                      <span className="text-sm">{item.label}</span>
                      {isActive && (
                        <div className="w-1.5 h-8 bg-genital-orange rounded-l-full ml-auto -mr-4"></div>
                      )}
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.path}
                    to={mappedPath}
                    onClick={onClose}
                    className={`flex h-10 items-center gap-2 px-4 py-2 rounded-r-md transition-colors ${
                      isActive
                        ? "bg-white text-genital-orange font-medium"
                        : "bg-genital-gray-50 text-genital-gray-500 hover:bg-white hover:text-genital-gray-700"
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 ${isActive ? "text-genital-orange" : "text-genital-gray-400"}`}
                      strokeWidth={1.2}
                    />
                    <span className="text-sm">{item.label}</span>
                    {isActive && (
                      <div className="w-1.5 h-8 bg-genital-orange rounded-l-full ml-auto -mr-4"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-3 pl-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-medium">
            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
          </div>
          <div className="flex-1">
            <p className="text-base font-normal text-black leading-6">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs font-normal text-genital-gray-500 leading-4.5">Member</p>
          </div>
        </div>

        {/* Upgrade Plan Modal */}
        <PlanUpgradeModal
          isOpen={upgradeModalOpen}
          onClose={() => setUpgradeModalOpen(false)}
          currentPlan="basic"
          lockedFeature=""
          onUpgrade={handleUpgradeComplete}
        />
      </div>
    );
  }

  return (
    <div className="w-[237px] h-screen bg-sidebar border-r flex flex-col relative overflow-hidden">
      {/* Close button for mobile */}
      {onClose && (
        <div className="lg:hidden absolute top-4 right-4 z-20">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Logo Section */}
      <div className="p-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-destructive to-orange-tertiary flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground leading-8">
              GenIEtal
            </h1>
            <p className="text-xs text-orange-tertiary font-medium">
              Verification
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-2">
        <div className="space-y-1">
          {/* Main Section */}
          <div>
            <h3 className="px-4 mb-2 text-xs font-normal text-text-50 tracking-wide uppercase">
              Main
            </h3>
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <NavItem
                  key={item.path}
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  isActive={isPathActive(currentPath, item.path)}
                />
              ))}
            </div>
          </div>

          {/* Account Section */}
          <div className="pt-2">
            <h3 className="px-4 mb-2 text-xs font-normal text-text-50 tracking-wide uppercase">
              Account
            </h3>
            <div className="space-y-1">
              {accountNavItems.map((item) => (
                <NavItem
                  key={item.path}
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  isActive={isPathActive(currentPath, item.path)}
                  isAction={item.isAction}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-medium">
            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-normal text-foreground truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-text-50 capitalize">{user?.role || 'Individual'}</p>
          </div>
        </div>
      </div>

      {/* Upgrade Plan Modal */}
      <PlanUpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        currentPlan="basic"
        lockedFeature=""
        onUpgrade={handleUpgradeComplete}
      />
    </div>
  );
}
