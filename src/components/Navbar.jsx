import Logo from "./Logo";
import {useRoutes} from "../utils/routes"
import SearchBar from "./SearchBar";

function Navbar({searchTerm, setSearchTerm}) {

  const { logout } = useRoutes();

  return (
    <div className="flex justify-between items-center p-4 text-white">
      <Logo />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            
      <div>
        <button className="btn btn-warning mr-2">Profile</button>
        <button className="btn btn-secondary hover:bg-white hover:text-pink-500" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
