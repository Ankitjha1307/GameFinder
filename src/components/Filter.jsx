import React from "react";
import genres from "../pages/Home.jsx";

function Filter({ 
  genres, 
  platforms, 
  publishers, 
  developers, 
  filters, 
  onGenreSelect, 
  onPlatformSelect, 
  onPublisherSelect, 
  onDeveloperSelect, 
  onClearFilters 
}) {

  return (
    <div className="drawer ml-4 w-24">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="btn btn-warning text-white hover:bg-white hover:text-yellow-500 drawer-button">Filters</label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu bg-base-200 text-base-content min-h-full p-4 w-80">
          {/* Genres Section */}
          <div className="mb-6">
            <h3 className="text-yellow-500 font-bold mb-3">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleGenreSelect(genre)}
                  className="btn btn-outline btn-secondary btn-sm text-yellow-500 hover:bg-yellow-500 hover:text-black border-yellow-500"
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* <li>
            <select defaultValue="Available on" className="select select-secondary mb-5 text-yellow-500">
              <option disabled className="bg-black text-yellow-500">Available on</option>
              <option className="bg-black text-yellow-500">PC</option>
              <option className="bg-black text-yellow-500">PS5</option>
              <option className="bg-black text-yellow-500">Xbox</option>
            </select>
          </li>

          <li>
            <select defaultValue="Publisher" className="select select-secondary mb-5 text-yellow-500">
              <option disabled className="bg-black text-yellow-500">Publisher</option>
              <option className="bg-black text-yellow-500">EA</option>
              <option className="bg-black text-yellow-500">Ubisoft</option>
              <option className="bg-black text-yellow-500">Nintendo</option>
            </select>
          </li>

          <li>
            <select defaultValue="Developer" className="select select-secondary mb-5 text-yellow-500">
              <option disabled className="bg-black text-yellow-500">Developer</option>
              <option className="bg-black text-yellow-500">FromSoftware</option>
              <option className="bg-black text-yellow-500">CD Projekt</option>
              <option className="bg-black text-yellow-500">Rockstar</option>
            </select>
          </li> */}
        </div>
      </div>
    </div>
  );
}

export default Filter;

