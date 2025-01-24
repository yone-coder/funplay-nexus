import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TournamentCardProps {
  name: string;
  entryFee: number;
  prize: string;
  players: { current: number; max: number };
}

const TournamentCard = ({ name, entryFee, prize, players }: TournamentCardProps) => {
  const { toast } = useToast();

  const handleJoin = () => {
    toast({
      title: "Tournament Joined!",
      description: `You have successfully joined ${name}`,
    });
  };

  return (
    <Card className="p-4 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg">{name}</h3>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Users className="w-4 h-4 mr-1" />
            <span>{players.current}/{players.max} players</span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center text-gaming-400">
            <Trophy className="w-4 h-4 mr-1" />
            <span>{prize}</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Entry: ${entryFee}
          </div>
        </div>
      </div>
      <Button onClick={handleJoin} className="w-full bg-gaming-400 hover:bg-gaming-500">
        Join Tournament
      </Button>
    </Card>
  );
};

export default TournamentCard;