import { Link } from "react-router-dom";
import ThemeToggle from "./Toggle";

const Navbar = () => {
  return (
    <nav className="bg-white/10 dark:bg-gray-900/90 backdrop-blur-md fixed w-full z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            <Link to="/" className="hover:text-purple-200 transition-colors duration-200">
              TaskFlow
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-white hover:text-purple-200 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/login"
              className="text-white hover:text-purple-200 transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white hover:text-purple-200 transition-colors duration-200"
            >
              Register
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

