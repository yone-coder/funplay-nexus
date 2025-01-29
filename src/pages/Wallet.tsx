import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Home, 
  CreditCard, 
  Activity, 
  Settings as SettingsIcon, 
  HelpCircle,
  Trophy,
  User
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
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
    <div className="max-w-5xl mx-auto">
      <Tabs defaultValue="overview" className="w-full">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm pb-4">
          <ScrollArea className="w-full">
            <TabsList className="inline-flex w-max space-x-2 border-b border-border/40 bg-transparent p-0">
              <TabsTrigger 
                value="overview" 
                className="rounded-none border-b-2 border-transparent px-4 py-2 hover:text-accent data-[state=active]:border-gaming-400 data-[state=active]:text-gaming-400 data-[state=active]:bg-transparent"
              >
                <Home className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="accounts" 
                className="rounded-none border-b-2 border-transparent px-4 py-2 hover:text-accent data-[state=active]:border-gaming-400 data-[state=active]:text-gaming-400 data-[state=active]:bg-transparent"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Accounts
              </TabsTrigger>
              <TabsTrigger 
                value="activity" 
                className="rounded-none border-b-2 border-transparent px-4 py-2 hover:text-accent data-[state=active]:border-gaming-400 data-[state=active]:text-gaming-400 data-[state=active]:bg-transparent"
              >
                <Activity className="h-4 w-4 mr-2" />
                Activity
              </TabsTrigger>
              <TabsTrigger 
                value="rewards" 
                className="rounded-none border-b-2 border-transparent px-4 py-2 hover:text-accent data-[state=active]:border-gaming-400 data-[state=active]:text-gaming-400 data-[state=active]:bg-transparent"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Rewards
              </TabsTrigger>
              <TabsTrigger 
                value="leaderboard" 
                className="rounded-none border-b-2 border-transparent px-4 py-2 hover:text-accent data-[state=active]:border-gaming-400 data-[state=active]:text-gaming-400 data-[state=active]:bg-transparent"
              >
                <User className="h-4 w-4 mr-2" />
                Leaderboard
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="rounded-none border-b-2 border-transparent px-4 py-2 hover:text-accent data-[state=active]:border-gaming-400 data-[state=active]:text-gaming-400 data-[state=active]:bg-transparent"
              >
                <SettingsIcon className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
              <TabsTrigger 
                value="help" 
                className="rounded-none border-b-2 border-transparent px-4 py-2 hover:text-accent data-[state=active]:border-gaming-400 data-[state=active]:text-gaming-400 data-[state=active]:bg-transparent"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Help
              </TabsTrigger>
            </TabsList>
          </ScrollArea>
        </div>

        <div className="px-4 mt-6">
          <TabsContent value="overview" className="m-0 space-y-6">
            <div className="max-w-3xl mx-auto">
              <NewBalanceCard />
            </div>
            <NewQuickActions />
            <TokensList />
            <TransactionsList />
            <TrophiesList />
          </TabsContent>

          <TabsContent value="accounts" className="m-0">
            <PhoneTopUp />
          </TabsContent>

          <TabsContent value="activity" className="m-0">
            <TransactionsList />
          </TabsContent>

          <TabsContent value="rewards" className="m-0">
            <div className="text-center p-8">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-gaming-400 opacity-75" />
              <h3 className="text-xl font-semibold mb-2">Your Rewards</h3>
              <p className="text-muted-foreground">Track your achievements and rewards</p>
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="m-0">
            <div className="text-center p-8">
              <User className="h-12 w-12 mx-auto mb-4 text-gaming-400 opacity-75" />
              <h3 className="text-xl font-semibold mb-2">Leaderboard</h3>
              <p className="text-muted-foreground">See where you rank among other players</p>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="m-0">
            <SecuritySettings />
          </TabsContent>

          <TabsContent value="help" className="m-0">
            <div className="text-center p-8">
              <HelpCircle className="h-12 w-12 mx-auto mb-4 text-gaming-400 opacity-75" />
              <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
              <p className="text-muted-foreground">Contact our support team for assistance</p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Wallet;