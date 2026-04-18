import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-[#1C211D] border-t border-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="text-center md:text-left">
          <h1 className="text-lg font-semibold text-yellow-500">
            GameFinder 🎮
          </h1>
          <p className="text-sm text-gray-400">
            Discover free-to-play games across platforms
          </p>
        </div>
        <div className="flex gap-6 text-sm">
          
            <Link to="/home" className="hover:text-yellow-500 transition">
                Home
            </Link>
            <Link to="/home" className="hover:text-yellow-500 transition">
                Games
            </Link>
            <a 
                href="https://www.freetogame.com/api-doc" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-yellow-500 transition"
            >
                API
            </a>
        </div>
        <div className="text-sm text-gray-400 text-center md:text-right">
          <p className="text-yellow-500">
            © {new Date().getFullYear()} GameFinder
          </p>
          <p className="text-xs text-pink-500">
            Built with React + Vite
          </p>
        </div>

      </div>
    </footer>
  );
};