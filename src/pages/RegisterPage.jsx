import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/userService";
import Navbar from "../components/NavBar";

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        try {
            const res = await register(formData);
            setSuccessMessage("Registration successful! Redirecting to login...");
            console.log("Registration response:", res);

        
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>  
            <Navbar/>
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
                    <h1 className="text-xl font-bold mb-4 text-center">Register</h1>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {successMessage && (
                        <p className="text-green-500 text-center">{successMessage}</p>
                    )}
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
                            <label htmlFor="email" className="block text-sm font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="w-full px-4 py-2 mt-1 border rounded focus:outline-none"
                                value={formData.email}
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
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegistrationPage;
