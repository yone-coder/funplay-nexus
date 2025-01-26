import { Card } from "@/components/ui/card";

export const HistoryList = () => {
  return (
    <div className="grid gap-4">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Gaming History</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-green-500/20 rounded-lg">
            <p className="text-2xl font-bold text-green-400">24</p>
            <p className="text-sm text-gray-400">Games Won</p>
          </div>
          <div className="text-center p-4 bg-red-500/20 rounded-lg">
            <p className="text-2xl font-bold text-red-400">12</p>
            <p className="text-sm text-gray-400">Games Lost</p>
          </div>
        </div>
      </Card>
    </div>
  );
};