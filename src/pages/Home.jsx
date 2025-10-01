import React, { useState, useEffect, useRef } from "react";
import GameCard from "../components/GameCard";

import Navbar from "../components/Navbar";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  const [games, setGames] = useState([]);
  const scrollRefs = useRef({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Filter states
  const [filters, setFilters] = useState({
    genres: [],
    platforms: [],
    publishers: [],
    developers: []
  });

  // Filter handler functions

  // Toggle genre filter
  const handleGenreSelect = (genre) => {
    setFilters(prev => ({
      ...prev,
      genres: prev.genres.includes(genre) 
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  // Toggle platform filter
  const handlePlatformSelect = (platform) => {
    setFilters(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
      ? prev.platforms.filter(p => p !== platform)
      : [...prev.platforms, platform]
    }))
  }

  // Toggle publisher filter
  const handlePublisherSelect = (publisher) => {
    setFilters(prev => ({
      ...prev, 
      publishers: prev.publishers.includes(publisher)
      ? prev.publishers.filter(p => p!== publisher)
      : [...prev.publishers, publisher]
    }))
  }

  // Toggle developer filter 
  const handleDeveloperSelect = (developer) => {
    setFilters(prev => ({
      ...prev,
      developers: prev.developers.includes(developer) 
        ? prev.developers.filter(d => d !== developer)
        : [...prev.developers, developer]
    }));
  };


  // Clear all filters
  const clearFilters = () => {
    setFilters({
      genres: [],
      platforms: [],
      publishers: [],
      developers: []
    });
  };
  
  useEffect(() => {
    fetch("/api/games")
      .then(res => res.json())
      .then((res) => setGames(res))
      .catch(err => console.error("Error fetchin  g games:", err))
      .finally(() => setLoading(false));
  }, []);

  const genres = [...new Set(games.map(game => game.genre))].filter(Boolean);
  const platforms = [...new Set(games.map(game => game.platform))].filter(Boolean);
  const publishers = [...new Set(games.map(game => game.publisher))].filter(Boolean);
  const developers = [...new Set(games.map(game => game.developer))].filter(Boolean);

  const gamesByGenre = games.reduce((acc, game) => {
    if(!acc[game.genre]) acc[game.genre]= [];
    acc[game.genre].push(game);
    return acc;
  }, {});

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
      <Navbar searchInput={searchInput} setSearchInput={setSearchInput} setSearchTerm={setSearchTerm} />
      {searchTerm? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => <GameCard key={game.id} game={game} />)
        ) : (
          <p className="text-center text-red-500 col-span-full">
            No games found.
          </p>
        )}
      </div>
      ) : (
        <div>
          <h2 className="text-pink-500 font-bold text-center text-4xl m-4">Games by Genres</h2>
          {Object.keys(gamesByGenre).map((genre) => (
              <div key={genre} className="relative">
                <h3 className="text-yellow-500 text-2xl ml-4">
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
           )}
    </div> 
  );
}