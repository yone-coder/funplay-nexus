import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export const TransactionsList = () => {
  return (
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
  );
};