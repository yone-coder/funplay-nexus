
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Send, 
  Download, 
  ArrowLeftRight,
  Scan,
  QrCode
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const quickActions = [
  { icon: <ArrowUpRight className="h-6 w-6" />, label: 'Deposit', color: 'bg-green-500/20 text-green-400' },
  { icon: <ArrowDownRight className="h-6 w-6" />, label: 'Withdraw', color: 'bg-red-500/20 text-red-400' },
  { icon: <Send className="h-6 w-6" />, label: 'Send', color: 'bg-blue-500/20 text-blue-400' },
  { icon: <Download className="h-6 w-6" />, label: 'Receive', color: 'bg-purple-500/20 text-purple-400' },
  { icon: <ArrowLeftRight className="h-6 w-6" />, label: 'Swap', color: 'bg-yellow-500/20 text-yellow-400' },
  { icon: <Scan className="h-6 w-6" />, label: 'Scan', color: 'bg-indigo-500/20 text-indigo-400' },
  { icon: <QrCode className="h-6 w-6" />, label: 'QR Code', color: 'bg-pink-500/20 text-pink-400' },
];

export const NewQuickActions = () => {
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

      if (type === 'DEPOSIT') {
        // Handle MonCash deposit
        const { data, error } = await supabase.functions.invoke('moncash-payment', {
          body: { amount: parseFloat(amount) }
        });

        if (error) throw error;

        // Store the transaction record
        const { error: transactionError } = await supabase
          .from('payment_gateway_transactions')
          .insert({
            user_id: user.id,
            amount: parseFloat(amount),
            gateway_type: 'MONCASH',
            currency: 'HTG',
            status: 'pending',
            metadata: { orderId: data.orderId }
          });

        if (transactionError) throw transactionError;

        // Redirect to MonCash payment page
        window.location.href = data.redirectUrl;
        return;
      }

      const { error } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type,
          amount: parseFloat(amount),
          currency: 'HTG',
          status: 'pending',
          description: `${type} transaction`,
        });

      if (error) throw error;

      toast({
        title: "Transaction Initiated",
        description: `Your ${type.toLowerCase()} of ${amount} HTG has been initiated`,
      });
    } catch (error) {
      console.error('Transaction error:', error);
      toast({
        title: "Error",
        description: "Failed to process transaction",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
      {quickActions.map((action, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <button className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-800/50 transition-colors">
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
                className="w-full"
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
