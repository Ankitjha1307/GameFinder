import Logo from "./Logo";
import {Link} from "react-router-dom";


function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <Logo />
      <div>
        <button className="btn btn-warning mr-2">Profile</button>
        <button className="btn btn-secondary hover:bg-white hover:text-pink-500">Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
