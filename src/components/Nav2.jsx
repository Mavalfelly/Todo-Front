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
        <nav className="bg-gray-800 p-4 text-white flex justify-between">
            <div>
                <button className="mr-4 bg-blue-500 px-4 py-2 rounded">
                    <Link to="/dashboard">Main Dashboard</Link>
                </button>
                <button
                    className="mr-4 bg-blue-500 px-4 py-2 rounded"
                    onClick={handleRedirectWithCreateForm}
                >
                    Make Todo
                </button>
            </div>
            <button className="bg-red-500 px-4 py-2 rounded"
                onClick={handleSignOut}
            >
                Sign Out
            </button>
        </nav>
    );
};

export default NavBar2;