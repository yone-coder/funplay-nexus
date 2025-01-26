import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GameCard from "@/components/GameCard";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  "All Games",
  "Action",
  "Adventure",
  "Strategy",
  "Multiplayer",
  "Casual",
  "Sports",
];

const games = [
  {
    id: 1,
    title: "Morpion",
    image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=500",
    available: true,
    path: "/morpion",
    status: "live" as const,
    date: "Now",
    viewers: 1234,
    tags: ["Strategy", "Multiplayer"],
  },
  {
    id: 2,
    title: "Chess Master",
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=500",
    available: false,
    path: "/chess",
    status: "upcoming" as const,
    date: "March 15, 2024",
    viewers: 856,
    tags: ["Strategy", "Multiplayer"],
  },
  {
    id: 3,
    title: "Poker Night",
    image: "https://images.unsplash.com/photo-1541278107931-e006523892df?w=500",
    available: false,
    path: "/poker",
    status: "upcoming" as const,
    date: "March 20, 2024",
    viewers: 2891,
    tags: ["Casual", "Card Games"],
  },
  {
    id: 4,
    title: "Domino Masters",
    image: "https://images.unsplash.com/photo-1566694271453-390536dd1f0d?w=500",
    available: false,
    path: "/domino",
    status: "upcoming" as const,
    date: "April 1, 2024",
    viewers: 567,
    tags: ["Casual", "Strategy"],
  },
  {
    id: 5,
    title: "Backgammon Pro",
    image: "https://images.unsplash.com/photo-1595759713235-f4681a33e496?w=500",
    available: false,
    path: "/backgammon",
    status: "upcoming" as const,
    date: "April 5, 2024",
    viewers: 1023,
    tags: ["Strategy", "Board Games"],
  },
];

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Games");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  const filteredGames = games
    .filter((game) => {
      const matchesCategory =
        selectedCategory === "All Games" ||
        game.tags.includes(selectedCategory);
      const matchesSearch = game.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "popular") return b.viewers - a.viewers;
      if (sortBy === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
      return a.title.localeCompare(b.title);
    });

  return (
    <div className="pb-20 px-4">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mt-6 mb-8">
        <h1 className="text-3xl font-bold mb-6">Explore Games</h1>
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search games..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="alphabetical">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto pb-4 mb-6 gap-2 hide-scrollbar">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No games found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;