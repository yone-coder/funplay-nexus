import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const TokensList = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('balances')
        .select('total_balance')
        .eq('user_id', user.id)
        .single();

      setBalance(data?.total_balance || 0);
      setLoading(false);
    };

    fetchBalance();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!balance) {
    return (
      <Card className="p-6 text-center">
        <p className="text-gray-400">No balance available</p>
      </Card>
    );
  }

  const tokens = [
    { name: 'HTG', amount: balance.toFixed(2), icon: 'G' },
  ];

  return (
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
  );
};