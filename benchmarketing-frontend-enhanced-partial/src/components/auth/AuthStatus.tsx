
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useUserProfile } from "@/hooks/useUserProfile";
import { LogIn, User } from "lucide-react";

export default function AuthStatus() {
  const { user, signOut } = useUserProfile();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  
  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    } else {
      setEmail(null);
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut?.();
    navigate('/');
  };
  
  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Link to="/login">
          <Button variant="outline" className="font-medium">
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button className="bg-lilac hover:bg-lilac-700 text-white font-medium">
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-lilac/20 flex items-center justify-center">
            <User size={14} className="text-lilac" />
          </div>
          <span className="max-w-[150px] truncate hidden sm:inline">
            {email || 'Account'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => navigate('/dashboard')}>
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/settings')}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
