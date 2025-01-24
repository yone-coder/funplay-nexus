import { Card } from "@/components/ui/card";
import { Wallet as WalletIcon } from "lucide-react";

const Wallet = () => {
  return (
    <div className="pb-20 px-4">
      <h1 className="text-3xl font-bold mt-6 mb-8">Wallet</h1>
      
      <Card className="p-8 text-center">
        <WalletIcon className="w-12 h-12 mx-auto mb-4 text-gaming-400" />
        <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
        <p className="text-gray-500">
          Wallet features will be available in the next update!
        </p>
      </Card>
    </div>
  );
};

export default Wallet;