import { Link, useNavigate } from "react-router-dom";
import { signout } from "../services/userService";
import ThemeToggle from "./Toggle";

const NavBar2 = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signout();
    navigate("/");
  };

  const handleRedirectWithCreateForm = () => {
    navigate("/dashboard?create=true");
  };

  return (
    <nav className="bg-white/10 dark:bg-gray-900/90 backdrop-blur-md w-full z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <Link
              to="/dashboard"
              className="text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-200 transition-colors duration-200"
            >
              Dashboard
            </Link>
            <button
              className="text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-200 transition-colors duration-200"
              onClick={handleRedirectWithCreateForm}
            >
              New List
            </button>
          </div>
          <div className="flex items-center space-x-6">
            <button
              className="text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-200 transition-colors duration-200"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar2;