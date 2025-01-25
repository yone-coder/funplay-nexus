import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type { User } from "@supabase/supabase-js";
import { Bell, Scan, Search, UserPlus, LogOut, Settings } from "lucide-react";
import { AuthModals } from "./auth/AuthModals";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "./ui/use-toast";

const Header = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  useEffect(() => {
    // Initialize session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: "Signed out successfully",
      });
      setUser(null);
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message || "Please try again later",
      });
    }
  };

  if (user) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-gaming-600 bg-primary px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src={user.user_metadata.avatar_url ?? "https://github.com/shadcn.png"} />
                <AvatarFallback>
                  {user.email?.substring(0, 2).toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.user_metadata.full_name || "User"}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                <UserPlus className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex flex-1 items-center gap-2 rounded-full bg-gaming-600 px-4 py-1.5">
            <Search className="h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search games, tournaments..."
              className="border-0 bg-transparent p-0 focus-visible:ring-0"
            />
          </div>

          <div className="flex items-center gap-4">
            <Scan className="h-6 w-6 cursor-pointer text-gray-400 hover:text-white" />
            <Bell className="h-6 w-6 cursor-pointer text-gray-400 hover:text-white" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gaming-600 bg-primary px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">FunPlay</div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => setIsLoginOpen(true)}
            >
              <UserPlus className="h-5 w-5" />
              Sign In
            </Button>
            <Button 
              className="flex items-center gap-2"
              onClick={() => setIsSignUpOpen(true)}
            >
              <UserPlus className="h-5 w-5" />
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      <AuthModals
        isLoginOpen={isLoginOpen}
        isSignUpOpen={isSignUpOpen}
        onLoginClose={() => setIsLoginOpen(false)}
        onSignUpClose={() => setIsSignUpOpen(false)}
      />
    </>
  );
};

export default Header;