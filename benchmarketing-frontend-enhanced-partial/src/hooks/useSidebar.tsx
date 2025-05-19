
import { createContext, useContext, useState, ReactNode } from 'react';

type SidebarSection = 
  | 'dashboard' 
  | 'benchmarks'
  | 'recommendations'
  | 'opportunities'
  | 'trends'
  | 'media-mix'
  | 'my-data'
  | 'reports'
  | 'saved-views'
  | 'alerts'
  | 'experiments'
  | 'team-access'
  | 'settings'
  | 'toolbox';

interface SidebarContextType {
  activeSection: SidebarSection;
  setActiveSection: (section: SidebarSection) => void;
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState<SidebarSection>('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <SidebarContext.Provider 
      value={{ 
        activeSection, 
        setActiveSection, 
        isCollapsed, 
        toggleSidebar 
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
