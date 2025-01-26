import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Video, Users, Play } from "lucide-react";

interface GameCardProps {
  title: string;
  image: string;
  available: boolean;
  path: string;
  status?: "live" | "upcoming" | "ended";
  date?: string;
  viewers?: number;
  tags?: string[];
}

const GameCard = ({ 
  title, 
  image, 
  available, 
  path,
  status = "upcoming",
  date = "Coming Soon",
  viewers = 0,
  tags = []
}: GameCardProps) => {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-video">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {!available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="secondary" className="text-sm">
              Coming Soon
            </Badge>
          </div>
        )}
        {status === "live" && (
          <Badge 
            variant="destructive" 
            className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1"
          >
            <Video className="w-3 h-3" />
            LIVE
          </Badge>
        )}
      </div>
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{status === "live" ? "Live Now" : date}</span>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            {viewers.toLocaleString()}
          </div>
        </div>

        <Link to={available ? path : "#"}>
          <Button 
            className="w-full gap-2" 
            disabled={!available}
          >
            <Play className="w-4 h-4" />
            {available ? "Play Now" : "Coming Soon"}
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default GameCard;