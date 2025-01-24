import { Home, Search, Tv, Wallet } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Explore", path: "/explore" },
    { icon: Tv, label: "Live", path: "/live" },
    { icon: Wallet, label: "Wallet", path: "/wallet" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-primary border-t border-gaming-600 backdrop-blur-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center p-3 ${
              location.pathname === path 
                ? "text-accent" 
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs mt-1">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;