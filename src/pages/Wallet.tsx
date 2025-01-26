import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Wallet as WalletIcon, ArrowUpRight, ArrowDownRight, RefreshCw, Send, Download, Upload, Trophy, History, Coins } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { name: 'Jan', amount: 4000 },
  { name: 'Feb', amount: 3000 },
  { name: 'Mar', amount: 5000 },
  { name: 'Apr', amount: 2780 },
  { name: 'May', amount: 1890 },
  { name: 'Jun', amount: 2390 },
];

const tokens = [
  { name: 'USD', amount: '1,234.56', icon: '$' },
  { name: 'HTG', amount: '156,789.00', icon: 'G' },
  { name: 'BTC', amount: '0.0234', icon: '₿' },
  { name: 'EUR', amount: '890.12', icon: '€' },
  { name: 'PESOS', amount: '45,678.90', icon: '₱' },
];

const quickActions = [
  { icon: <Upload className="h-6 w-6" />, label: 'Deposit' },
  { icon: <Download className="h-6 w-6" />, label: 'Withdraw' },
  { icon: <RefreshCw className="h-6 w-6" />, label: 'Swap' },
  { icon: <Send className="h-6 w-6" />, label: 'Send' },
];

const Wallet = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="pb-20 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mt-6 mb-8">
        <h1 className="text-3xl font-bold">Wallet</h1>
        <button className="relative p-2 rounded-full hover:bg-gray-700/20">
          <Bell className="h-6 w-6" />
          <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
        </button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start mb-6 bg-transparent">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gaming-500">Overview</TabsTrigger>
          <TabsTrigger value="transactions" className="data-[state=active]:bg-gaming-500">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Balance Card */}
          <Card className="p-6 mb-6 bg-gradient-to-r from-gaming-600 to-gaming-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-300">Total Balance</p>
                <h2 className="text-3xl font-bold">HTG 156,789.00</h2>
                <p className="text-sm text-gray-300 mt-1">≈ $1,234.56 USD</p>
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Verified</span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">2FA Enabled</span>
              </div>
            </div>
            
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <p className="text-sm text-gray-300 mb-1">Available</p>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-green-500"></div>
                </div>
                <p className="text-sm mt-1">HTG 120,000.00</p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-300 mb-1">Locked</p>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full w-1/4 bg-yellow-500"></div>
                </div>
                <p className="text-sm mt-1">HTG 36,789.00</p>
              </div>
            </div>

            <div className="text-sm text-gray-300 border-t border-gray-700 pt-4">
              Last transaction: Won HTG 5,000 in Tournament XYZ
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-700/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-gaming-500 flex items-center justify-center mb-2">
                  {action.icon}
                </div>
                <span className="text-sm">{action.label}</span>
              </button>
            ))}
          </div>

          {/* Sub Tabs */}
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
              <div className="grid gap-4">
                {tokens.map((token, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gaming-500 flex items-center justify-center text-xl font-bold">
                          {token.icon}
                        </div>
                        <div>
                          <p className="font-semibold">{token.name}</p>
                          <p className="text-sm text-gray-400">Balance</p>
                        </div>
                      </div>
                      <p className="text-xl font-bold">{token.amount}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="transactions">
              <Card className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Recent Transactions</h3>
                  <button className="text-gaming-400 hover:text-gaming-300 flex items-center gap-1">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700">
                      <div className="flex items-center gap-3">
                        {index % 2 === 0 ? (
                          <ArrowUpRight className="h-5 w-5 text-green-500" />
                        ) : (
                          <ArrowDownRight className="h-5 w-5 text-red-500" />
                        )}
                        <div>
                          <p className="font-medium">
                            {index % 2 === 0 ? "Tournament Win" : "Withdrawal"}
                          </p>
                          <p className="text-sm text-gray-400">
                            {new Date().toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className={`font-semibold ${
                        index % 2 === 0 ? "text-green-500" : "text-red-500"
                      }`}>
                        {index % 2 === 0 ? "+" : "-"}HTG {(1000 * (index + 1)).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="trophies">
              <Card className="p-6">
                <div className="text-center mb-6">
                  <Trophy className="h-12 w-12 mx-auto mb-2 text-yellow-500" />
                  <h3 className="text-xl font-bold mb-1">Total Earnings</h3>
                  <p className="text-3xl font-bold text-gaming-400">HTG 45,678.00</p>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip />
                      <Line type="monotone" dataKey="amount" stroke="#3B82F6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <div className="grid gap-4">
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Gaming History</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-500/20 rounded-lg">
                      <p className="text-2xl font-bold text-green-400">24</p>
                      <p className="text-sm text-gray-400">Games Won</p>
                    </div>
                    <div className="text-center p-4 bg-red-500/20 rounded-lg">
                      <p className="text-2xl font-bold text-red-400">12</p>
                      <p className="text-sm text-gray-400">Games Lost</p>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="transactions">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">All Transactions</h2>
            {/* Transaction filters and detailed list would go here */}
            <p className="text-gray-400">Detailed transaction history coming soon...</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Wallet;