import { Bell } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coins, ArrowUpRight, Trophy, History } from "lucide-react";
import { BalanceCard } from "@/components/wallet/BalanceCard";
import { QuickActions } from "@/components/wallet/QuickActions";
import { TokensList } from "@/components/wallet/TokensList";
import { TransactionsList } from "@/components/wallet/TransactionsList";
import { TrophiesList } from "@/components/wallet/TrophiesList";
import { HistoryList } from "@/components/wallet/HistoryList";

const Wallet = () => {
  return (
    <div className="pb-20 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mt-6 mb-8">
        <h1 className="text-3xl font-bold">Wallet</h1>
        <button className="relative p-2 rounded-full hover:bg-gray-700/20">
          <Bell className="h-6 w-6" />
          <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
        </button>
      </div>

      <BalanceCard />
      <QuickActions />

      <Tabs defaultValue="tokens" className="w-full">
        <TabsList className="w-full justify-start mb-6 bg-transparent">
          <TabsTrigger value="tokens" className="data-[state=active]:bg-gaming-500">
            <Coins className="h-4 w-4 mr-2" />
            Tokens
          </TabsTrigger>
          <TabsTrigger value="transactions" className="data-[state=active]:bg-gaming-500">
            <ArrowUpRight className="h-4 w-4 mr-2" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="trophies" className="data-[state=active]:bg-gaming-500">
            <Trophy className="h-4 w-4 mr-2" />
            Trophies
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-gaming-500">
            <History className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tokens">
          <TokensList />
        </TabsContent>

        <TabsContent value="transactions">
          <TransactionsList />
        </TabsContent>

        <TabsContent value="trophies">
          <TrophiesList />
        </TabsContent>

        <TabsContent value="history">
          <HistoryList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Wallet;