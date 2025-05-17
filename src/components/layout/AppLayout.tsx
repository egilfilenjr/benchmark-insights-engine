import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  BarChart3,
  Briefcase,
  ChevronRight,
  LineChart,
  PieChart,
  Settings,
  Bell,
  Database,
  FileText,
  Bookmark,
  TrendingUp,
  Lightbulb,
  FlaskConical,
  Users,
  Wrench,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from './Header';
import { useUserProfile } from '@/hooks/useUserProfile';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();
  const { user } = useUserProfile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar onNavigation={handleNavigation} />
        <div className="flex w-full flex-col">
          <header className="sticky top-0 z-40 flex h-16 items-center border-b bg-background px-4 md:px-6">
            <div className="hidden md:block">
              <SidebarTrigger />
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="md:hidden" 
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Toggle menu</span>
                  <BarChart3 className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Notifications</span>
                </Button>
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>
                    {user?.user_metadata?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}

interface AppSidebarProps {
  onNavigation: (path: string) => void;
}

function AppSidebar({ onNavigation }: AppSidebarProps) {
  const dashboardItems = [
    { title: 'Overview', icon: BarChart3, path: '/dashboard' },
    { title: 'Google Ads', icon: ChevronRight, path: '/dashboard/google' },
    { title: 'Meta Ads', icon: ChevronRight, path: '/dashboard/meta' },
    { title: 'LinkedIn Ads', icon: ChevronRight, path: '/dashboard/linkedin' },
    { title: 'TikTok Ads', icon: ChevronRight, path: '/dashboard/tiktok' },
  ];

  const mainItems = [
    { title: 'Benchmarks', icon: BarChart3, path: '/benchmarks' },
    { title: 'Recommendations', icon: Lightbulb, path: '/recommendations' },
    { title: 'Opportunities', icon: TrendingUp, path: '/opportunities' },
    { title: 'Trends', icon: LineChart, path: '/trends' },
    { title: 'Media Mix', icon: PieChart, path: '/media-mix' },
    { title: 'My Data', icon: Database, path: '/my-data' },
    { title: 'Reports', icon: FileText, path: '/reports' },
    { title: 'Saved Views', icon: Bookmark, path: '/saved-views' },
    { title: 'Alerts', icon: Bell, path: '/alerts' },
    { title: 'Experiments', icon: FlaskConical, path: '/experiments' },
    { title: 'Team Access', icon: Users, path: '/team-access' },
    { title: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b py-4">
        <div className="flex items-center gap-2 px-3">
          <Briefcase className="h-6 w-6 text-primary" />
          <div className="font-semibold text-xl">Benchmarketing</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    onClick={() => onNavigation(item.path)}
                    tooltip={item.title}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    onClick={() => onNavigation(item.path)}
                    tooltip={item.title}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <SidebarMenuButton onClick={() => onNavigation('/toolbox')} tooltip="Toolbox">
          <Wrench className="mr-2 h-4 w-4" />
          <span>Toolbox</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
