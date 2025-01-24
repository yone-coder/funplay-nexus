import GameCard from "@/components/GameCard";

const games = [
  {
    title: "Morpion",
    image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=500",
    available: true,
    path: "/morpion",
  },
  {
    title: "Cards",
    image: "https://images.unsplash.com/photo-1541278107931-e006523892df?w=500",
    available: false,
    path: "/cards",
  },
  {
    title: "Domino",
    image: "https://images.unsplash.com/photo-1566694271453-390536dd1f0d?w=500",
    available: false,
    path: "/domino",
  },
];

const categories = [
  { name: "Popular Games", games },
  { name: "Strategy Games", games: games.slice(0, 2) },
  { name: "Board Games", games: games.slice(1) },
];

const Explore = () => {
  return (
    <div className="pb-20 px-4">
      <h1 className="text-3xl font-bold mt-6 mb-8">Explore Games</h1>
      
      {categories.map((category) => (
        <section key={category.name} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
          <div className="flex overflow-x-auto pb-4 -mx-4 px-4">
            {category.games.map((game) => (
              <GameCard key={game.title} {...game} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Explore;