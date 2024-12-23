/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import Navbar from "../NavBar";

const LandingPage = () => {
  return (
    <>
        <Navbar/>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            Welcome to Matt's TODO app
            </h2>
            <p className="text-lg text-gray-600 max-w-lg mb-6">
            Discover a better way to manage your tasks and objectives.                                    Sign up
            today and start organizing your life!
            </p>
            <div className="flex space-x-4">
            <Link
                to="/register"
                className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg shadow hover:bg-blue-700"
            >
                Get Started
            </Link>
            <Link
                to="/login"
                className="bg-gray-100 text-gray-800 px-6 py-3 rounded-md text-lg shadow hover:bg-gray-200"
            >
                Sign In
            </Link>
            </div>
        </main>
        <footer className="w-full bg-gray-100 py-4 text-center text-gray-500">
            &copy; {new Date().getFullYear()} Matt's Todos. All rights reserved. Made with React, Django, Tailwind, and Caffine.
        </footer>
        </div>
    </>
  );
};

export default LandingPage;
