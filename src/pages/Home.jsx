import React, { useState, useEffect } from "react";
import GameCard from "../components/GameCard";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  

  useEffect(() => {
    fetch("/api/games")
      .then(res => res.json())
      .then((res) => setGames(res))
      .catch(err => console.error("Error fetching games:", err))
      .finally(() => setLoading(false));
  }, []);

  const gamesByGenre = games.reduce((acc, game) => {
    if(!acc[game.genre]) acc[game.genre]= [];
    acc[game.genre].push(game);
    return acc;
  }, {})

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
      {searchTerm && filteredGames.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>

    <div>
      <h2 className="text-yellow-500 font-bold text-center text-4xl m-4">Games by Genres</h2>
      {Object.keys(gamesByGenre).map((genre) => (
          <div key={genre}>
            <h3 className="text-yellow-500 text-2xl text-decoration-line: underline ml-4">{`Top Games in ${genre}`}</h3>
            <div className="flex gap-4 overflow-x-auto no-scrollbar gap-4 p-5 ">
              {gamesByGenre[genre].map((game) => (
                <div key={game.id} className="w-1/4 flex-shrink-0">
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
