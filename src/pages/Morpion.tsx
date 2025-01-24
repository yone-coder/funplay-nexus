import { Link } from "react-router-dom";
import TournamentCard from "@/components/TournamentCard";

const tournaments = [
  {
    id: "1",
    name: "National Championship",
    entryFee: 50,
    prize: "$10,000",
    players: { current: 16, max: 32 },
  },
  {
    id: "2",
    name: "Regional Qualifier",
    entryFee: 25,
    prize: "$5,000",
    players: { current: 8, max: 16 },
  },
  {
    id: "3",
    name: "Rookie League",
    entryFee: 0,
    prize: "$1,000",
    players: { current: 4, max: 8 },
  },
  {
    id: "4",
    name: "Pro Circuit",
    entryFee: 100,
    prize: "$25,000",
    players: { current: 2, max: 64 },
  },
];

const Morpion = () => {
  return (
    <div className="pb-20 px-4">
      <h1 className="text-3xl font-bold mt-6 mb-8">Morpion Tournaments</h1>
      
      <div className="space-y-4">
        {tournaments.map((tournament) => (
          <Link key={tournament.id} to={`/tournament/${tournament.id}`}>
            <TournamentCard {...tournament} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Morpion;