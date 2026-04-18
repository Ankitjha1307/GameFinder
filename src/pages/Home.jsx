import React, { useState, useEffect, useRef } from "react";
import GameCard from "../components/GameCard";
import Filter from "../components/Filter";
import Navbar from "../components/Navbar";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  const [games, setGames] = useState([]);
  const scrollRefs = useRef({});
  const [scrollPositions, setScrollPositions] = useState({});
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
  fetch('/api/games')
    .then(res => res.json())
    .then((res) => setGames(res))
    .catch(err => console.error("Error fetching games:", err))
    .finally(() => setLoading(false));
}, []);

  const handleScroll = (genre) => {
    const container = scrollRefs.current[genre];
    if (container) {
      setScrollPositions(prev => ({
        ...prev,
        [genre]: {
          left: container.scrollLeft,
          maxScroll: container.scrollWidth - container.clientWidth
        }
      }));
    }
  };

  // Get unique values for filter options
  const genres = [...new Set(games.map(game => game.genre))].filter(Boolean);
  const platforms = [...new Set(games.map(game => game.platform))].filter(Boolean);
  const publishers = [...new Set(games.map(game => game.publisher))].filter(Boolean);
  const developers = [...new Set(games.map(game => game.developer))].filter(Boolean);

  const gamesByGenre = games.reduce((acc, game) => {
    if(!acc[game.genre]) acc[game.genre]= [];
    acc[game.genre].push(game);
    return acc;
  }, {});

  const filteredGames = games.filter(game => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = !term.trim() || 
      game.title?.toLowerCase().includes(term) || 
      game.genre?.toLowerCase().includes(term) || 
      game.platform?.toLowerCase().includes(term) || 
      game.publisher?.toLowerCase().includes(term) || 
      game.developer?.toLowerCase().includes(term) || 
      game.releaseDate?.toLowerCase().includes(term);

    const matchesGenre = filters.genres.length === 0 || filters.genres.includes(game.genre);
    const matchesPlatform = filters.platforms.length === 0 || filters.platforms.includes(game.platform);
    const matchesPublisher = filters.publishers.length === 0 || filters.publishers.includes(game.publisher);
    const matchesDeveloper = filters.developers.length === 0 || filters.developers.includes(game.developer);

    return matchesSearch && matchesGenre && matchesPlatform && matchesPublisher && matchesDeveloper;
  });
/* if(genres.length>4){
  
} */
  const scroll = (genre, direction) => {
  const container = scrollRefs.current[genre];
  if (container) {
    const { clientWidth } = container;
    const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
};

const shouldShowLeftArrow = (genre) => {
    const position = scrollPositions[genre];
    return position && position.left > 0;
  };

  const shouldShowRightArrow = (genre) => {
    const position = scrollPositions[genre];
    return position && position.left < position.maxScroll;
  };

  const shouldShowArrows = (genre) => {
    const gamesInGenre = gamesByGenre[genre] || [];
    return gamesInGenre.length > 4;
  };


  if (loading) return;


  return (
    <div>
      <div className="sticky top-0 z-50 flex flex-col gap-3 bg-[#1C211D] p-4 md:flex-row md:items-center">
        <div className="flex flex-wrap items-center gap-2">
          <Filter 
            genres={genres}
            platforms={platforms}
            publishers={publishers}
            developers={developers}
            filters={filters}
            onGenreSelect={handleGenreSelect}
            onPlatformSelect={handlePlatformSelect}
            onPublisherSelect={handlePublisherSelect}
            onDeveloperSelect={handleDeveloperSelect}
            onClearFilters={clearFilters}
          />
      
          {Object.values(filters).filter(arr => arr.length > 0).length > 0 && (
            <div className="text-yellow-500 text-sm">
              Active filters: {Object.values(filters).flat().length}
            </div>
          )}
        </div>

        <div className="w-full md:flex-1"> {/* flex-1 makes it take available space */}
          <Navbar searchInput={searchInput} setSearchInput={setSearchInput} setSearchTerm={setSearchTerm} />
        </div>
      </div>

      {searchTerm || Object.values(filters).filter(arr => arr.length > 0).length > 0 ? (
        <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 lg:grid-cols-4">
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
              {shouldShowArrows(genre) && shouldShowLeftArrow(genre) && (
              <button
                onClick={() => scroll(genre, "left")}
                className="btn btn-secondary hover:bg-white hover:text-pink-500 hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full z-10"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              )}
              <div
                ref={(el) => (scrollRefs.current[genre] = el)}
                onScroll={() => handleScroll(genre)}
                className="flex gap-4 overflow-x-auto p-5"
              >
                {gamesByGenre[genre].map((game) => (
                  <div
                    key={game.id}
                    className="w-full flex-shrink-0 md:w-1/2 lg:w-1/4"
                  >
                    <GameCard game={game} />
                  </div>
                ))}
              </div>
              {shouldShowArrows(genre) && shouldShowRightArrow(genre) && (
              <button
                onClick={() => scroll(genre, "right")}
                className="btn btn-secondary hover:bg-white hover:text-pink-500 hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full z-10"
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div> 
  );
}