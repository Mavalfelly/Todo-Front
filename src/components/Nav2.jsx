import { Link } from "react-router-dom";

const NavBar2 = () => {
    return (
        <nav className="bg-gray-800 p-4 text-white flex justify-between">
            <div>
                <button className="mr-4 bg-blue-500 px-4 py-2 rounded">
                    <Link to="/dashboard">Main Dashboard</Link>
                </button>
                <button className="mr-4 bg-green-500 px-4 py-2 rounded">
                    <Link to="/create-master-list">Create Master List</Link>
                </button>
            </div>
            <button className="bg-red-500 px-4 py-2 rounded">
                <Link to="/signout">Sign Out</Link>
            </button>
        </nav>
    );
};

export default NavBar2;