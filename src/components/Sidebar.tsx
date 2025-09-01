
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
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  currentPath?: string;
  onClose?: () => void;
}

const mainNavItems = [
  { icon: UserRoundSearch, label: "Verify", path: "/verify" },
  { icon: House, label: "Overview", path: "/" },
  { icon: File, label: "My Documents", path: "/documents" },
  { icon: History, label: "History", path: "/history" },
];

const accountNavItems = [
  { icon: SettingsIcon, label: "Settings", path: "/settings" },
  { icon: Rocket, label: "Upgrade Plan", path: "/upgrade" },
  { icon: LogOut, label: "Logout", path: "/logout", isAction: true },
];

export default function Sidebar({
  currentPath = "/settings",
  onClose,
}: SidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
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
                      path;

    if (isAction || path === '/logout') {
      return (
        <button
          onClick={onClick || handleLogout}
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

  return (
    <div className="w-[237px] h-screen bg-sidebar border-r flex flex-col fixed left-0 top-0 z-10">
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
        <div className="space-y-3">
          {/* Main Section */}
          <div>
            <h3 className="px-4 mb-3 text-xs font-normal text-text-50 tracking-wide uppercase">
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
          <div className="pt-16">
            <h3 className="px-4 mb-3 text-xs font-normal text-text-50 tracking-wide uppercase">
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
    </div>
  );
}
