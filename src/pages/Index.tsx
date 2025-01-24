import { Card } from "@/components/ui/card";
import { Trophy, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="pb-20 px-4">
      <h1 className="text-3xl font-bold mt-6 mb-8">Welcome Back!</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Featured Tournament</h2>
        <Card className="p-4 bg-gradient-to-br from-gaming-500 to-gaming-600 text-white">
          <h3 className="text-lg font-bold mb-2">Weekend Morpion Championship</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              <span>$100 Prize Pool</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              <span>32 Players</span>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {["Alice won Morpion Tournament", "Bob joined Card Game", "Charlie earned 50 points"].map((activity, index) => (
            <Card key={index} className="p-3">
              <p className="text-sm">{activity}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;