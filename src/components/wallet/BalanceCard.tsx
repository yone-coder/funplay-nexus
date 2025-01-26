import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, Copy, Check } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const BalanceCard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState("HTG");
  const [copied, setCopied] = useState(false);
  const walletCode = "4562 1122 4595 7852";

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(walletCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-6 mb-6 bg-gradient-to-br from-gaming-600 via-gaming-500 to-gaming-400 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/10 to-transparent"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-1">
            <p className="text-sm text-gray-200">Total Balance</p>
            <div className="flex items-center gap-2">
              <Select
                value={selectedCurrency}
                onValueChange={setSelectedCurrency}
              >
                <SelectTrigger className="w-24 h-8 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HTG">HTG</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="BTC">BTC</SelectItem>
                </SelectContent>
              </Select>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                {showBalance ? (
                  <Eye className="h-4 w-4 text-gray-200" />
                ) : (
                  <EyeOff className="h-4 w-4 text-gray-200" />
                )}
              </button>
            </div>
            <h2 className={cn(
              "text-3xl font-bold transition-opacity duration-200",
              !showBalance && "opacity-0"
            )}>
              {selectedCurrency === "HTG" ? "HTG 156,789.00" : 
               selectedCurrency === "USD" ? "$1,234.56" :
               selectedCurrency === "EUR" ? "€890.12" :
               "₿0.0234"}
            </h2>
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Verified</span>
            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">2FA Enabled</span>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <p className="text-sm text-gray-200 mb-1">Available</p>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-green-400"></div>
            </div>
            <p className="text-sm mt-1 text-gray-200">HTG 120,000.00</p>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-200 mb-1">Locked</p>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-1/4 bg-yellow-400"></div>
            </div>
            <p className="text-sm mt-1 text-gray-200">HTG 36,789.00</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/20 pt-4">
          <div className="font-mono text-gray-200">
            {walletCode.split(" ").map((group, i) => (
              <span key={i} className="mr-2">{group}</span>
            ))}
          </div>
          <button
            onClick={handleCopyCode}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <Copy className="h-4 w-4 text-gray-200" />
            )}
          </button>
        </div>
      </div>
    </Card>
  );
};