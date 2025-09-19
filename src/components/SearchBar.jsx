import React from "react";

export default function SearchBar({ searchInput, setSearchInput, searchTerm, setSearchTerm }) {
  const handleSearch = () => {
    setSearchTerm(searchInput); 
  };

  const handleClear = () => {
    setSearchInput("");   
    setSearchTerm("");    
  };

  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Search for games..."
        className="p-2 border border-pink-500 bg-black rounded text-yellow-500"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="ml-2 p-2 bg-yellow-500 text-white rounded"
      >
        Search
      </button>
      {searchInput || searchTerm ? (
        <button
          onClick={handleClear}
          className="ml-2 p-2 bg-pink-500 text-white rounded"
        >
          Clear
        </button>
      ) : null}
    </div>
  );
}
