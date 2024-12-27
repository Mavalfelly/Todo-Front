import { Link, useNavigate } from "react-router-dom";
import { signout } from "../services/userService";

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
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Link
              to="/dashboard"
              className="px-4 py-2 text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-all duration-200"
            >
              Dashboard
            </Link>
            <button
              className="px-4 py-2 text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-all duration-200"
              onClick={handleRedirectWithCreateForm}
            >
              New List
            </button>
          </div>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-200"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar2;
