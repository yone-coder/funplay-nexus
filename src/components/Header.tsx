import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Bell, Scan, Search, User, UserPlus } from "lucide-react";

const Header = () => {
  // Temporary state for demo purposes - replace with actual auth logic
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleAuth = () => setIsAuthenticated(!isAuthenticated);

  if (isAuthenticated) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-gaming-600 bg-primary px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
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
    <header className="sticky top-0 z-50 w-full border-b border-gaming-600 bg-primary px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">FunPlay</div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={toggleAuth}
          >
            <User className="h-5 w-5" />
            Sign In
          </Button>
          <Button className="flex items-center gap-2" onClick={toggleAuth}>
            <UserPlus className="h-5 w-5" />
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;