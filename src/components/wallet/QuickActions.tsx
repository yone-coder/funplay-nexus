import { Upload, Download, RefreshCw, Send, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const quickActions = [
  { icon: <Upload className="h-6 w-6" />, label: 'Deposit', color: 'bg-green-500/20 text-green-400' },
  { icon: <Download className="h-6 w-6" />, label: 'Withdraw', color: 'bg-red-500/20 text-red-400' },
  { icon: <RefreshCw className="h-6 w-6" />, label: 'Swap', color: 'bg-blue-500/20 text-blue-400' },
  { icon: <Send className="h-6 w-6" />, label: 'Send', color: 'bg-purple-500/20 text-purple-400' },
  { icon: <Phone className="h-6 w-6" />, label: 'Top-Up', color: 'bg-yellow-500/20 text-yellow-400' },
];

export const QuickActions = () => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const { toast } = useToast();

  const handleTransaction = async (type: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "Please login to perform this action",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type,
          amount: parseFloat(amount),
          currency: 'USD',
          status: 'pending',
          description: `${type} transaction`,
        });

      if (error) throw error;

      toast({
        title: "Transaction Initiated",
        description: `Your ${type.toLowerCase()} of ${amount} USD has been initiated`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process transaction",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mb-6">
      {quickActions.map((action, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <button
              className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-700/20 transition-colors"
            >
              <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center mb-2`}>
                {action.icon}
              </div>
              <span className="text-sm">{action.label}</span>
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{action.label}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              <div>
                <label className="block text-sm font-medium mb-2">Amount</label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              {action.label === 'Send' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Recipient</label>
                  <Input
                    type="text"
                    placeholder="Enter recipient username or email"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                </div>
              )}
              <Button 
                className="w-full bg-gaming-500 hover:bg-gaming-600"
                onClick={() => handleTransaction(action.label.toUpperCase())}
              >
                Confirm {action.label}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};