import React, { useState, useEffect } from "react";
import GameCard from "../components/GameCard";

export default function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("/api/games")
      .then(res => res.json())
      .then((res) => setGames(res.slice(0, 1))) // take 10 for display
      .catch(err => console.error("Error fetching games:", err));
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
