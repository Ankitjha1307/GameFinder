import React from "react";

export default function SearchBar({ searchTerm, setSearchTerm }){

    return(
        <div className="flex p-4">
            <input type="text" 
            placeholder="Search for games..." 
            className="p-2 border border-gray-300 bg-black rounded text-yellow-500 " 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="ml-2 p-2 bg-yellow-500 text-white rounded">Search</button>
        </div>
    )
}