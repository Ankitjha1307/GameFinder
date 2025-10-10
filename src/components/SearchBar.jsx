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
    <div className="flex ml-auto mr-20">
      <input
        type="text"
        placeholder="Search for games..."
        className="p-2 border border-yellow-500 bg-black rounded text-yellow-500"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="ml-2 p-2 bg-pink-500 text-white rounded hover:bg-white hover:text-pink-500"
      >
        Search
      </button>
      {searchInput || searchTerm ? (
        <button
          onClick={handleClear}
          className="btn btn-warning ml-2 mr-2 text-white hover:bg-white hover:text-yellow-500"
        >
          Clear
        </button>
      ) : null}
    </div>
  );
}
