import React, { useState, useEffect, useRef } from "react";
import GameCard from "../components/GameCard";
import SearchBar from "../components/SearchBar";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  const [games, setGames] = useState([]);
  const scrollRefs = useRef({});
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

  const scroll = (genre, direction) => {
  const container = scrollRefs.current[genre];
  if (container) {
    const { clientWidth } = container;
    const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
};
  if (loading) return <div>Loading...</div>;


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
          <div key={genre} className="relative">
            <h3 className="text-yellow-500 text-2xl underline ml-4">
              {`Top Games in ${genre}`}
            </h3>
            <button
              onClick={() => scroll(genre, "left")}
              className="btn btn-secondary hover:bg-white hover:text-pink-500 hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full z-10"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div
              ref={(el) => (scrollRefs.current[genre] = el)}
              className="flex gap-4 overflow-x-auto no-scrollbar p-5"
            >
              {gamesByGenre[genre].map((game) => (
                <div key={game.id} className="w-1/4 flex-shrink-0">
                  <GameCard game={game} />
                </div>
              ))}
            </div>
            <button
              onClick={() => scroll(genre, "right")}
              className="btn btn-secondary hover:bg-white hover:text-pink-500 hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full z-10"
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
      ))}
      </div>
    </div>
  );
}
