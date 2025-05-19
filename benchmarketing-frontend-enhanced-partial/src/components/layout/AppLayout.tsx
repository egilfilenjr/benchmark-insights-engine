
import { ReactNode } from 'react';
import AppSidebar from './AppSidebar';
import { SidebarProvider } from '@/hooks/useSidebar';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50">
        <AppSidebar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
