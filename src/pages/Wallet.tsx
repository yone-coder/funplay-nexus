import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
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
    <div className="min-h-screen bg-background">
      <Tabs defaultValue="overview" className="w-full">
        <ScrollArea className="w-full border-b bg-background/80 backdrop-blur-sm">
          <div className="max-w-screen-2xl mx-auto px-4">
            <TabsList className="h-14 w-max space-x-2 bg-transparent">
              <TabsTrigger 
                value="overview" 
                className="px-4 py-2 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="accounts" 
                className="px-4 py-2 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Accounts
              </TabsTrigger>
              <TabsTrigger 
                value="activity" 
                className="px-4 py-2 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                <Activity className="h-4 w-4 mr-2" />
                Activity
              </TabsTrigger>
              <TabsTrigger 
                value="rewards" 
                className="px-4 py-2 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Rewards
              </TabsTrigger>
              <TabsTrigger 
                value="leaderboard" 
                className="px-4 py-2 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                <User className="h-4 w-4 mr-2" />
                Leaderboard
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="px-4 py-2 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                <SettingsIcon className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
              <TabsTrigger 
                value="help" 
                className="px-4 py-2 text-sm font-medium transition-colors hover:text-primary data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Help
              </TabsTrigger>
            </TabsList>
          </div>
        </ScrollArea>

        <div className="max-w-screen-2xl mx-auto px-4 py-6">
          <TabsContent value="overview" className="m-0">
            <div className="max-w-3xl mx-auto space-y-6">
              <NewBalanceCard />
              <NewQuickActions />
              <TokensList />
              <TransactionsList />
              <TrophiesList />
            </div>
          </TabsContent>

          <TabsContent value="accounts" className="m-0">
            <div className="max-w-3xl mx-auto">
              <PhoneTopUp />
            </div>
          </TabsContent>

          <TabsContent value="activity" className="m-0">
            <div className="max-w-3xl mx-auto">
              <TransactionsList />
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="m-0">
            <div className="max-w-3xl mx-auto text-center py-8">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Your Rewards</h3>
              <p className="text-muted-foreground">Track your achievements and rewards</p>
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="m-0">
            <div className="max-w-3xl mx-auto text-center py-8">
              <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Leaderboard</h3>
              <p className="text-muted-foreground">See where you rank among other players</p>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="m-0">
            <div className="max-w-3xl mx-auto">
              <SecuritySettings />
            </div>
          </TabsContent>

          <TabsContent value="help" className="m-0">
            <div className="max-w-3xl mx-auto text-center py-8">
              <HelpCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
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