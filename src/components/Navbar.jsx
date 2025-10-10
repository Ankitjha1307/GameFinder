import Logo from "./Logo";
import {useRoutes} from "../utils/routes"
import SearchBar from "./SearchBar";

function Navbar({searchInput, setSearchInput, setSearchTerm}) {

  const { logout } = useRoutes();

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <SearchBar setSearchTerm={setSearchTerm} searchInput={searchInput} setSearchInput={setSearchInput} />
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Logo />
      </div>
      <div className="flex items-center ml-auto">
        <button className="btn btn-warning mr-2 text-white hover:bg-white hover:text-yellow-500">Profile</button>
        <button className="btn btn-secondary hover:bg-white hover:text-pink-500" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
