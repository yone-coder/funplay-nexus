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
    <nav className="fixed bottom-0 left-0 right-0 bg-gaming-500 text-white px-4 py-2">
      <div className="flex justify-around items-center">
        {navItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center p-2 ${
              location.pathname === path ? "text-gaming-200" : "text-gray-400"
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