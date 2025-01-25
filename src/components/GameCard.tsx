import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Video, Users } from "lucide-react";

interface GameCardProps {
  title: string;
  image: string;
  available: boolean;
  path: string;
  status?: "live" | "upcoming" | "ended";
  date?: string;
  viewers?: number;
}

const GameCard = ({ 
  title, 
  image, 
  available, 
  path,
  status = "upcoming",
  date = "Coming Soon",
  viewers = 0
}: GameCardProps) => {
  return (
    <Link to={available ? path : "#"} className="block w-80 mr-6 relative">
      <Card className="overflow-hidden group">
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
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{status === "live" ? "Live Now" : date}</span>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {viewers.toLocaleString()}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default GameCard;