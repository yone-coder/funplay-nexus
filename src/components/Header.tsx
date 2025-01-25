import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Bell, Scan, Search, UserPlus } from "lucide-react";
import { AuthModals } from "./auth/AuthModals";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (user) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-gaming-600 bg-primary px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src={user.user_metadata.avatar_url ?? "https://github.com/shadcn.png"} />
            <AvatarFallback>
              {user.email?.substring(0, 2).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>

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