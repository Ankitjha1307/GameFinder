import React from "react";

export default function SearchBar({ searchInput, setSearchInput, searchTerm, setSearchTerm }) {
  const handleSearch = () => {
    setSearchTerm(searchInput); 
  };

  const handleClear = () => {
    setSearchInput("");   
    setSearchTerm("");    
  };

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      handleSearch();
    }
  }
  
  return (
    <div className="flex w-full items-center gap-2 md:w-auto md:justify-end">
      <input
        type="text"
        placeholder="Search for games..."
        className="w-full min-w-0 flex-1 rounded border border-yellow-500 bg-black p-2 text-yellow-500 md:w-64 md:flex-none"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSearch}
        className="shrink-0 rounded bg-pink-500 p-2 text-white hover:bg-white hover:text-pink-500"
      >
        Search
      </button>
      {searchInput || searchTerm ? (
        <button
          onClick={handleClear}
          className="btn btn-warning shrink-0 text-white hover:bg-white hover:text-yellow-500"
        >
          Clear
        </button>
      ) : null}
    </div>
  );
}
