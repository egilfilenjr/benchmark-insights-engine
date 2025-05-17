
import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from '@/hooks/useSidebar';
import { useUserProfile } from '@/hooks/useUserProfile';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  BarChart, 
  Lightbulb, 
  TrendingUp, 
  PieChart, 
  Database, 
  FileText, 
  Bookmark, 
  Bell, 
  FlaskConical, 
  Users, 
  Settings, 
  Wrench,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

type SidebarItem = {
  title: string;
  path: string;
  icon: React.ElementType;
  planRequired?: 'free' | 'pro' | 'pro_plus' | 'agency';
  subItems?: { title: string; path: string }[];
};

const sidebarItems: SidebarItem[] = [
  { 
    title: 'Dashboard', 
    path: '/dashboard', 
    icon: LayoutDashboard,
    subItems: [
      { title: 'Overview', path: '/dashboard' },
      { title: 'Google Ads', path: '/dashboard/google' },
      { title: 'Meta Ads', path: '/dashboard/meta' },
      { title: 'LinkedIn Ads', path: '/dashboard/linkedin' },
      { title: 'TikTok Ads', path: '/dashboard/tiktok' },
    ]
  },
  { title: 'Benchmarks', path: '/benchmarks', icon: BarChart },
  { title: 'Recommendations', path: '/recommendations', icon: Lightbulb, planRequired: 'pro_plus' },
  { title: 'Opportunities', path: '/opportunities', icon: Lightbulb },
  { title: 'Trends', path: '/trends', icon: TrendingUp },
  { title: 'Media Mix', path: '/media-mix', icon: PieChart },
  { title: 'My Data', path: '/my-data', icon: Database },
  { title: 'Reports', path: '/reports', icon: FileText, planRequired: 'pro_plus' },
  { title: 'Saved Views', path: '/saved-views', icon: Bookmark },
  { title: 'Alerts', path: '/alerts', icon: Bell, planRequired: 'pro_plus' },
  { title: 'Experiments', path: '/experiments', icon: FlaskConical },
  { title: 'Team Access', path: '/team-access', icon: Users },
  { title: 'Settings', path: '/settings', icon: Settings },
  { title: 'Toolbox', path: '/toolbox', icon: Wrench },
];

const AppSidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { user, signOut } = useUserProfile();
  const location = useLocation();
  
  // Mock team plan for test purposes
  const userPlan = 'agency'; // Possible values: 'free', 'pro', 'pro_plus', 'agency'
  
  const isItemAccessible = (item: SidebarItem) => {
    if (!item.planRequired) return true;
    
    const planHierarchy = {
      'free': 0,
      'pro': 1,
      'pro_plus': 2,
      'agency': 3
    };
    
    return planHierarchy[userPlan as keyof typeof planHierarchy] >= 
           planHierarchy[item.planRequired as keyof typeof planHierarchy];
  };
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div 
      className={cn(
        "flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="font-semibold text-lg">Benchmarketing</div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className={cn("ml-auto", isCollapsed && "mx-auto")}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <TooltipProvider delayDuration={300}>
          <nav className="px-2 space-y-1">
            {sidebarItems.map((item) => 
              isItemAccessible(item) && (
                <div key={item.path} className="my-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center py-2 px-3 rounded-md transition-colors",
                          isActive(item.path) 
                            ? "bg-primary text-white" 
                            : "text-gray-700 hover:bg-gray-100",
                          isCollapsed && "justify-center"
                        )}
                      >
                        <item.icon size={20} className={cn(isCollapsed ? "mx-auto" : "mr-3")} />
                        {!isCollapsed && <span>{item.title}</span>}
                      </Link>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right">
                        <p>{item.title}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                  
                  {!isCollapsed && item.subItems && isActive(item.path) && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.subItems.map(subItem => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={cn(
                            "block py-1 px-3 rounded-md text-sm transition-colors",
                            location.pathname === subItem.path
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-gray-600 hover:bg-gray-100"
                          )}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
          </nav>
        </TooltipProvider>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          {!isCollapsed && (
            <div className="mr-3 flex-1 truncate">
              <div className="font-medium text-sm">{user?.user_metadata?.name || 'User'}</div>
              <div className="text-xs text-gray-500 truncate">{user?.email}</div>
            </div>
          )}
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={signOut}>
                  <LogOut size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Log out</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/settings">
                    <User size={18} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;
