import GameCard from "@/components/GameCard";
import Header from "@/components/Header";

const games = [
  {
    title: "Morpion",
    image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=500",
    available: true,
    path: "/morpion",
  },
  {
    title: "Chess",
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=500",
    available: false,
    path: "/chess",
  },
  {
    title: "Poker",
    image: "https://images.unsplash.com/photo-1541278107931-e006523892df?w=500",
    available: false,
    path: "/poker",
  },
  {
    title: "Domino",
    image: "https://images.unsplash.com/photo-1566694271453-390536dd1f0d?w=500",
    available: false,
    path: "/domino",
  },
  {
    title: "Backgammon",
    image: "https://images.unsplash.com/photo-1595759713235-f4681a33e496?w=500",
    available: false,
    path: "/backgammon",
  },
];

const categories = [
  { name: "Featured Games", games: games.slice(0, 3) },
  { name: "Strategy Games", games: [games[0], games[1], games[4]] },
  { name: "Card Games", games: [games[2]] },
  { name: "Board Games", games: games.slice(3) },
  { name: "Popular Games", games },
];

const Explore = () => {
  return (
    <div>
      <Header />
      <div className="pb-20 px-4">
        <h1 className="text-3xl font-bold mt-6 mb-8">Explore Games</h1>
        
        {categories.map((category) => (
          <section key={category.name} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
            <div className="flex overflow-x-auto pb-4 -mx-4 px-4 gap-4">
              {category.games.map((game) => (
                <GameCard key={game.title} {...game} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Explore;