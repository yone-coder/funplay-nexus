import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type { User } from "@supabase/supabase-js";
import { Bell, Scan, Search, UserPlus, LogOut, Settings, Sun, Moon } from "lucide-react";
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
import { Progress } from "./ui/progress";

const Header = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [progress, setProgress] = useState(65); // Example XP progress

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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  if (user) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-gaming-600 bg-primary px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.user_metadata.avatar_url ?? "https://github.com/shadcn.png"} />
                    <AvatarFallback>
                      {user.email?.substring(0, 2).toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block">
                    <p className="font-medium">{user.user_metadata.full_name || "User"}</p>
                    <div className="flex gap-2">
                      <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">Verified</span>
                      <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded-full">Elite</span>
                    </div>
                    <Progress value={progress} className="w-32 h-1 mt-1" />
                  </div>
                </div>
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
          </div>

          <div className="flex flex-1 items-center gap-2 rounded-full bg-gaming-600 px-4 py-1.5 mx-4">
            <Search className="h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search games, tournaments..."
              className="border-0 bg-transparent p-0 focus-visible:ring-0"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-700/20 transition-colors"
            >
              {isDarkMode ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
            <Scan className="h-6 w-6 cursor-pointer text-gray-400 hover:text-white" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="relative cursor-pointer">
                  <Bell className="h-6 w-6 text-gray-400 hover:text-white" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-sm text-gray-500">
                    No new notifications
                  </div>
                ) : (
                  // ... notifications list would go here
                  <div className="p-4 text-center text-sm text-gray-500">
                    No new notifications
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
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