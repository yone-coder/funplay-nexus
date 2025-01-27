import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      let query = supabase
        .from('transactions')
        .select('*')
        .or(`user_id.eq.${user.id},recipient_id.eq.${user.id}`);

      if (filter !== "all") {
        query = query.eq('type', filter.toUpperCase());
      }

      const { data } = await query.order('created_at', { ascending: false });
      setTransactions(data || []);
    };

    fetchTransactions();
  }, [filter]);

  const handleExport = () => {
    const csv = transactions.map(t => 
      `${t.created_at},${t.type},${t.amount},${t.currency},${t.status}`
    ).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <div className="flex gap-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter transactions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="deposit">Deposits</SelectItem>
              <SelectItem value="withdraw">Withdrawals</SelectItem>
              <SelectItem value="send">Transfers</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleExport}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {transactions.map((transaction: any) => (
          <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-700">
            <div className="flex items-center gap-3">
              {transaction.type === 'DEPOSIT' ? (
                <ArrowUpRight className="h-5 w-5 text-green-500" />
              ) : (
                <ArrowDownRight className="h-5 w-5 text-red-500" />
              )}
              <div>
                <p className="font-medium">
                  {transaction.type.charAt(0) + transaction.type.slice(1).toLowerCase()}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(transaction.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${
                transaction.type === 'DEPOSIT' ? 'text-green-500' : 'text-red-500'
              }`}>
                {transaction.type === 'DEPOSIT' ? '+' : '-'}{transaction.amount} {transaction.currency}
              </p>
              <p className="text-sm text-gray-400">
                {transaction.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};