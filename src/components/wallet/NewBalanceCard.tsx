import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, QrCode, Eye, EyeOff } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

const mockChartData = [
  { name: 'Mon', amount: 4000 },
  { name: 'Tue', amount: 3000 },
  { name: 'Wed', amount: 5000 },
  { name: 'Thu', amount: 2780 },
  { name: 'Fri', amount: 1890 },
  { name: 'Sat', amount: 2390 },
  { name: 'Sun', amount: 3490 },
];

export const NewBalanceCard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState("HTG");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState<number | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const walletId = "4562-1122-4595-7852";

  useEffect(() => {
    const fetchBalance = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('balances')
        .select('total_balance, monthly_income, monthly_spending')
        .eq('user_id', user.id)
        .single();

      setBalance(data?.total_balance || 0);
      setLoading(false);
    };

    fetchBalance();
  }, []);

  const handleCopyWalletId = async () => {
    await navigator.clipboard.writeText(walletId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatBalance = (amount: number | null) => {
    if (amount === null) return "0.00";
    switch (selectedCurrency) {
      case "HTG":
        return `HTG ${amount.toFixed(2)}`;
      case "USD":
        return `$${(amount / 125).toFixed(2)}`;
      case "BTC":
        return `₿${(amount / 5000000).toFixed(8)}`;
      default:
        return `HTG ${amount.toFixed(2)}`;
    }
  };

  return (
    <motion.div
      className="perspective-1000"
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="relative p-6 bg-gradient-to-br from-gaming-600 via-gaming-500 to-gaming-400 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/10 to-transparent" />
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-1">
              <p className="text-sm text-gray-200">Total Balance</p>
              <div className="flex items-center gap-2">
                <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                  <SelectTrigger className="w-24 h-8 bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HTG">HTG</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="BTC">BTC</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBalance(!showBalance)}
                  className="hover:bg-white/10"
                >
                  {showBalance ? (
                    <Eye className="h-4 w-4 text-gray-200" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-gray-200" />
                  )}
                </Button>
              </div>
              <h2 className={cn(
                "text-3xl font-bold text-white transition-opacity duration-300",
                !showBalance && "opacity-0"
              )}>
                {formatBalance(balance)}
              </h2>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                Verified
              </Badge>
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
                Elite
              </Badge>
            </div>
          </div>

          <div className="h-32 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between border-t border-white/20 pt-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/10"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <QrCode className="h-5 w-5 text-gray-200" />
              </Button>
              <div className="font-mono text-gray-200">
                {walletId.split("-").map((group, i) => (
                  <span key={i} className="mr-2">{group}</span>
                ))}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/10"
              onClick={handleCopyWalletId}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-200" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};