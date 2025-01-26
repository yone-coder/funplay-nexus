import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { name: 'Jan', amount: 4000 },
  { name: 'Feb', amount: 3000 },
  { name: 'Mar', amount: 5000 },
  { name: 'Apr', amount: 2780 },
  { name: 'May', amount: 1890 },
  { name: 'Jun', amount: 2390 },
];

export const TrophiesList = () => {
  return (
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
  );
};