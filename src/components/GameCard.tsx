import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface GameCardProps {
  title: string;
  image: string;
  available: boolean;
  path: string;
}

const GameCard = ({ title, image, available, path }: GameCardProps) => {
  return (
    <Link to={available ? path : "#"} className="block w-48 mr-4 relative">
      <Card className="overflow-hidden">
        <div className="relative aspect-[4/3]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          {!available && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Badge variant="secondary" className="text-sm">
                Coming Soon
              </Badge>
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
      </Card>
    </Link>
  );
};

export default GameCard;