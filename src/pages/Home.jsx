import React, { useState, useEffect } from "react";
import GameCard from "../components/GameCard";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/games")
      .then(res => res.json())
      .then((res) => setGames(res.slice(0, 100))) // take 10 for display
      .catch(err => console.error("Error fetching games:", err));
  }, []);

  const filteredGames = games.filter(game =>{
    const term = searchTerm.toLowerCase();
    return game.title?.toLowerCase().includes(term) || game.genre?.toLowerCase().includes(term) || 
    game.platform?.toLowerCase().includes(term) || game.publisher?.toLowerCase().includes(term) || 
    game.developer?.toLowerCase().includes(term) || game.releaseDate?.toLowerCase().includes(term);
  });

  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5">
      {filteredGames.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
    </div>
  );
}
