
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { User, Session } from '@supabase/supabase-js';

// Enable test mode with this flag
const TEST_MODE = true;

interface UserContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  testMode: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: { name?: string }) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [testMode] = useState(TEST_MODE);
  const navigate = useNavigate();

  useEffect(() => {
    if (testMode) {
      // Create a mock user for test mode
      const mockUser = {
        id: 'test-user-123',
        email: 'test@example.com',
        user_metadata: {
          name: 'Test User',
        },
      } as User;
      
      setUser(mockUser);
      setLoading(false);
      return;
    }
    
    // Regular authentication flow for non-test mode
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_OUT') {
          navigate('/login');
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate, testMode]);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            name
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Account created",
        description: "Please check your email for verification link",
      });
      
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const signOut = async () => {
    if (testMode) {
      // In test mode, just navigate to login without actually signing out
      navigate('/login');
      return;
    }
    
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateProfile = async (data: { name?: string }) => {
    if (testMode) {
      // In test mode, just update the mock user
      if (user) {
        setUser({
          ...user,
          user_metadata: {
            ...user.user_metadata,
            ...data
          }
        });
      }
      
      toast({
        title: "Test mode",
        description: "Profile updated in test mode",
      });
      return;
    }
    
    try {
      const { error } = await supabase.auth.updateUser({ 
        data
      });
      
      if (error) throw error;
      
      // Update local user state with new data
      if (user) {
        setUser({
          ...user,
          user_metadata: {
            ...user.user_metadata,
            ...data
          }
        });
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      session, 
      loading, 
      testMode,
      signIn, 
      signUp, 
      signOut,
      updateProfile 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};
