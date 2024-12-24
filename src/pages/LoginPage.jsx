import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { signin } from "../services/userService";
import Navbar from "../components/NavBar";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await signin(formData);
            console.log("Login response:", res);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <Navbar/>
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
                    <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="w-full px-4 py-2 mt-1 border rounded focus:outline-none"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="w-full px-4 py-2 mt-1 border rounded focus:outline-none"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
