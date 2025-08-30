import React from "react";

export default function GameCard({ game }) {
    return(
        <div>
            <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                src={game.thumbnail}
                alt={game.title} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                {game.title}
                <div className="badge badge-secondary">{game.genre}</div>
                    </h2>
                    <p>{game.short_description}</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">{game.platform}</div>
                        <div className="badge badge-outline">{game.release_date}</div>
                        <div className="badge badge-outline">{game.publisher}</div>
                        <div className="badge badge-outline">{game.developer}</div>
                        <div className="badge badge-outline">{game.game_url}</div>
                    </div>
                </div>
            </div>
        </div>
        )
}