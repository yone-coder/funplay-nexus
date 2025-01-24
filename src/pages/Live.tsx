import { Card } from "@/components/ui/card";
import { Tv } from "lucide-react";

const Live = () => {
  return (
    <div className="pb-20 px-4">
      <h1 className="text-3xl font-bold mt-6 mb-8">Live</h1>
      
      <Card className="p-8 text-center">
        <Tv className="w-12 h-12 mx-auto mb-4 text-gaming-400" />
        <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
        <p className="text-gray-500">
          Live tournaments and streams will be available soon!
        </p>
      </Card>
    </div>
  );
};

export default Live;