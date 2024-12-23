import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">
                    <Link to="/" className="hover:text-gray-200">
                        My App
                    </Link>
                </div>
                <div className="flex space-x-4">
                    <Link to="/" className="hover:text-gray-200">
                        Home
                    </Link>
                    <Link to="/login" className="hover:text-gray-200">
                        Login
                    </Link>
                    <Link to="/register" className="hover:text-gray-200">
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
