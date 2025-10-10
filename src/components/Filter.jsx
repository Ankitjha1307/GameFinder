import React from "react";

function Filter({ 
  genres = [],
  platforms = [], 
  publishers = [], 
  developers = [], 
  filters = { genres: [], platforms: [], publishers: [], developers: [] }, 
  onGenreSelect = () => {},
  onPlatformSelect = () => {},
  onPublisherSelect = () => {},
  onDeveloperSelect = () => {},
  onClearFilters = () => {}
}) {

  // Safe check functions
  const isGenreActive = (genre) => filters.genres.includes(genre);
  const isPlatformActive = (platform) => filters.platforms.includes(platform);
  const isPublisherActive = (publisher) => filters.publishers.includes(publisher);
  const isDeveloperActive = (developer) => filters.developers.includes(developer);

  // Stop propagation to prevent drawer from closing
  const handleButtonClick = (callback, value) => (e) => {
    e.stopPropagation(); // This prevents the drawer from closing
    callback(value);
  };

  return (
    <div className="drawer ml-4 w-24">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="btn btn-warning text-white hover:bg-white hover:text-yellow-500 drawer-button">
          Filters
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu bg-base-200 text-base-content min-h-full p-4 w-80" onClick={(e) => e.stopPropagation()}>
          
          {/* Genres Section */}
          <div className="mb-6">
            <h3 className="text-yellow-500 font-bold mb-3">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {genres && genres.length > 0 ? (
                genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={handleButtonClick(onGenreSelect, genre)}
                    className={`btn btn-sm border-yellow-500 ${
                      isGenreActive(genre) 
                        ? "btn btn-secondary hover:bg-white hover:text-pink-500 border-pink-500" 
                        : "btn-outline text-yellow-500 hover:bg-yellow-500 hover:text-black border-yellow-500"
                    }`}
                  >
                    {genre}
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No genres available</p>
              )}
            </div>
          </div>

          {/* Platforms Section */}
          <div className="mb-6">
            <h3 className="text-yellow-500 font-bold mb-3">Available on</h3>
            <div className="flex flex-wrap gap-2">
              {platforms && platforms.length > 0 ? (
                platforms.map((platform) => (
                  <button
                    key={platform}
                    onClick={handleButtonClick(onPlatformSelect, platform)}
                    className={`btn btn-sm border-yellow-500 ${
                      isPlatformActive(platform) 
                        ? "btn btn-secondary hover:bg-white hover:text-pink-500 border-pink-500" 
                        : "btn-outline text-yellow-500 hover:bg-yellow-500 hover:text-black border-yellow-500"
                    }`}
                  >
                    {platform}
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No platforms available</p>
              )}
            </div>
          </div>

          {/* Publishers Section */}
          <div className="mb-6">
            <h3 className="text-yellow-500 font-bold mb-3">Publisher</h3>
            <div className="flex flex-wrap gap-2">
              {publishers && publishers.length > 0 ? (
                publishers.map((publisher) => (
                  <button
                    key={publisher}
                    onClick={handleButtonClick(onPublisherSelect, publisher)}
                    className={`btn btn-sm border-yellow-500 ${
                      isPublisherActive(publisher) 
                        ? "btn btn-secondary hover:bg-white hover:text-pink-500 border-pink-500" 
                        : "btn-outline text-yellow-500 hover:bg-yellow-500 hover:text-black border-yellow-500"
                    }`}
                  >
                    {publisher}
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No publishers available</p>
              )}
            </div>
          </div>

          {/* Developers Section */}
          <div className="mb-6">
            <h3 className="text-yellow-500 font-bold mb-3">Developer</h3>
            <div className="flex flex-wrap gap-2">
              {developers && developers.length > 0 ? (
                developers.map((developer) => (
                  <button
                    key={developer}
                    onClick={handleButtonClick(onDeveloperSelect, developer)}
                    className={`btn btn-sm border-yellow-500 ${
                      isDeveloperActive(developer) 
                        ? "btn btn-secondary hover:bg-white hover:text-pink-500 border-pink-500" 
                        : "btn-outline text-yellow-500 hover:bg-yellow-500 hover:text-black border-yellow-500"
                    }`}
                  >
                    {developer}
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No developers available</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-6 sticky bottom-1 bg-[#1C211D] z-50 ">
            <button 
              onClick={handleButtonClick(onClearFilters)}
              className="btn btn-secondary hover:bg-white hover:text-pink-500"
              disabled={Object.values(filters).every(arr => !arr || arr.length === 0)}
            >
              Clear Filters
            </button>
            <label htmlFor="my-drawer" className="btn btn-secondary hover:bg-white hover:text-pink-500">
              Apply
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;