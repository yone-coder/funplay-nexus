import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Wallet as WalletIcon, 
  Shield, 
  Bell, 
  Home, 
  CreditCard, 
  Activity, 
  Settings as SettingsIcon, 
  HelpCircle,
  Trophy,
  Heart,
  User
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewBalanceCard } from "@/components/wallet/NewBalanceCard";
import { NewQuickActions } from "@/components/wallet/NewQuickActions";
import { TokensList } from "@/components/wallet/TokensList";
import { TransactionsList } from "@/components/wallet/TransactionsList";
import { TrophiesList } from "@/components/wallet/TrophiesList";
import { SecuritySettings } from "@/components/wallet/SecuritySettings";
import { PhoneTopUp } from "@/components/wallet/PhoneTopUp";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Wallet = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please login to access your wallet",
        });
        navigate("/");
        return;
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate, toast]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="pb-20 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mt-6 mb-8">
        <div className="flex items-center gap-3">
          <WalletIcon className="h-8 w-8 text-gaming-400" />
          <h1 className="text-3xl font-bold">Wallet</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full hover:bg-gray-700/20">
            <Shield className="h-6 w-6" />
          </button>
          <button className="relative p-2 rounded-full hover:bg-gray-700/20">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gaming-500">
            <Home className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="accounts" className="data-[state=active]:bg-gaming-500">
            <CreditCard className="h-4 w-4 mr-2" />
            Accounts
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-gaming-500">
            <Activity className="h-4 w-4 mr-2" />
            Activity
          </TabsTrigger>
          <TabsTrigger value="rewards" className="data-[state=active]:bg-gaming-500">
            <Trophy className="h-4 w-4 mr-2" />
            Rewards
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="data-[state=active]:bg-gaming-500">
            <User className="h-4 w-4 mr-2" />
            Leaderboard
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-gaming-500">
            <SettingsIcon className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="help" className="data-[state=active]:bg-gaming-500">
            <HelpCircle className="h-4 w-4 mr-2" />
            Help
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6">
            <NewBalanceCard />
            <NewQuickActions />
            <TokensList />
            <TransactionsList />
            <TrophiesList />
          </div>
        </TabsContent>

        <TabsContent value="accounts">
          <PhoneTopUp />
        </TabsContent>

        <TabsContent value="activity">
          <TransactionsList />
        </TabsContent>

        <TabsContent value="rewards">
          <div className="text-center p-8">
            <Trophy className="h-12 w-12 mx-auto mb-4 text-gaming-400" />
            <h3 className="text-xl font-bold mb-2">Your Rewards</h3>
            <p className="text-gray-400">Track your achievements and rewards</p>
          </div>
        </TabsContent>

        <TabsContent value="leaderboard">
          <div className="text-center p-8">
            <User className="h-12 w-12 mx-auto mb-4 text-gaming-400" />
            <h3 className="text-xl font-bold mb-2">Leaderboard</h3>
            <p className="text-gray-400">See where you rank among other players</p>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="help">
          <div className="text-center p-8">
            <HelpCircle className="h-12 w-12 mx-auto mb-4 text-gaming-400" />
            <h3 className="text-xl font-bold mb-2">Need Help?</h3>
            <p className="text-gray-400">Contact our support team for assistance</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Wallet;