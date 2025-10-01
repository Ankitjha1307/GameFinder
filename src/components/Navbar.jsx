import Logo from "./Logo";
import {useRoutes} from "../utils/routes"
import SearchBar from "./SearchBar";
import Filter from "./filter";

function Navbar({searchInput, setSearchInput, setSearchTerm}) {

  const { logout } = useRoutes();

  return (
    <div className="flex items-center p-4 text-white">
      <Filter />
      <SearchBar setSearchTerm={setSearchTerm} searchInput = {searchInput} setSearchInput = {setSearchInput} />
      <Logo /> 
      <div className="flex ml-auto">
        <button className="btn btn-warning mr-2 text-white hover:bg-white hover:text-yellow-500">Profile</button>
        <button className="btn btn-secondary hover:bg-white hover:text-pink-500" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
