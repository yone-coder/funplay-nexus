import { Card } from "@/components/ui/card";

const tokens = [
  { name: 'USD', amount: '1,234.56', icon: '$' },
  { name: 'HTG', amount: '156,789.00', icon: 'G' },
  { name: 'BTC', amount: '0.0234', icon: '₿' },
  { name: 'EUR', amount: '890.12', icon: '€' },
  { name: 'PESOS', amount: '45,678.90', icon: '₱' },
];

export const TokensList = () => {
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