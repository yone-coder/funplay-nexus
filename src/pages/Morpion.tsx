import TournamentCard from "@/components/TournamentCard";

const tournaments = [
  {
    name: "Weekend Championship",
    entryFee: 5,
    prize: "$100",
    players: { current: 8, max: 32 },
  },
  {
    name: "Beginners League",
    entryFee: 0,
    prize: "$10",
    players: { current: 4, max: 16 },
  },
  {
    name: "Pro Circuit",
    entryFee: 20,
    prize: "$500",
    players: { current: 2, max: 8 },
  },
];

const Morpion = () => {
  return (
    <div className="pb-20 px-4">
      <h1 className="text-3xl font-bold mt-6 mb-8">Morpion Tournaments</h1>
      
      <div className="space-y-4">
        {tournaments.map((tournament) => (
          <TournamentCard key={tournament.name} {...tournament} />
        ))}
      </div>
    </div>
  );
};

export default Morpion;