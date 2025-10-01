import React from "react";

export default function GameCard({ game }) {
    
        function slice(genre){
            if(genre.length >= 10){
                return genre.slice(0,6) + "..."
            }
            return genre
        }
    const genre=slice(game.genre)
    return(
        <div className="card w-full bg-[#1C211D]  hover:bg-[#2F323A] transition duration-200 h-full min-h-[500px]">
            <div className="card shadow-sm">
            <figure className="px-2 py-2">
                <img
                className="h-full w-full object-cover"
                src={game.thumbnail}
                alt={game.title}/>
            </figure>
            <div className="card-body px-4 py-2">
                <h2 className="card-title">
                {game.title}
                <div className="badge badge-secondary">{genre}</div>
                    </h2>
                    <p className="py-2">{game.short_description}</p>
                    <div className="card-actions py-2 justify-center w-full">
                        <div className="badge"><b className="text-pink-500">Available on:</b>{game.platform}</div>
                        <div className="badge"><b className="text-pink-500">Released on:</b>{game.release_date}</div>
                        <div className="badge"><b className="text-pink-500 ">Publisher:</b><p className="text-sm truncate">{game.publisher}</p></div>
                        <div className="badge"><b className="text-pink-500">Developer: </b>{game.developer}</div>
                    </div>
                    <button className="btn btn-active btn-warning text-white block mx-auto my-auto hover:bg-[#2F323A] hover:text-[#FFBF00]" onClick={() => window.open(game.game_url, "_blank")}>Play Now!</button>
                </div>
            </div>
        </div>
        )
}