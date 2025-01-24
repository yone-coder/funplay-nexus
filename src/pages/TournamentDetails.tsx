import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, Users, ScrollText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TournamentDetails = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const handleJoin = () => {
    toast({
      title: "Tournament Joined!",
      description: "You have successfully joined the tournament",
    });
  };

  return (
    <div className="pb-20 px-4">
      <div className="relative h-48 -mx-4 mb-6">
        <img
          src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800"
          alt="Tournament Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">National Morpion Championship</h1>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center">
            <Trophy className="w-4 h-4 mr-1" />
            <span>$10,000 Prize Pool</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>32 Players</span>
          </div>
        </div>
      </div>

      <Button onClick={handleJoin} className="w-full mb-8">
        Join Tournament
      </Button>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
          <TabsTrigger value="participants" className="flex-1">Participants</TabsTrigger>
          <TabsTrigger value="rules" className="flex-1">Rules</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Tournament Format</h3>
            <p className="text-sm text-gray-400">
              Single elimination bracket with best-of-3 matches in early rounds and best-of-5 finals.
            </p>
          </Card>
        </TabsContent>
        <TabsContent value="participants">
          <Card className="p-4">
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gaming-600" />
                  <span>Player {i + 1}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="rules">
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">General Rules</h3>
                <ul className="list-disc list-inside text-sm text-gray-400 space-y-2">
                  <li>Standard Morpion rules apply</li>
                  <li>2 minutes per move maximum</li>
                  <li>No undos or takebacks allowed</li>
                  <li>Matches are monitored by tournament admins</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TournamentDetails;