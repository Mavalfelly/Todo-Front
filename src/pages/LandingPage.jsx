import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900">
        <main className="flex-1 flex items-center justify-center text-center px-4 py-20">
          <div className="animate-fade-in-down">
            <h2 className="text-6xl font-extrabold text-white mb-6 animate-title">
              Welcome to TaskFlow
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mb-12 mx-auto leading-relaxed">
              Transform your productivity with our elegant task management solution.
              Start organizing your life with style and purpose today!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/register"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-purple-600 dark:hover:bg-gray-800 dark:hover:text-purple-400 transform hover:scale-105 transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        </main>
        <footer className="w-full bg-white/10 dark:bg-gray-900/10 backdrop-blur-md py-6 text-center text-white/80">
          &copy; {new Date().getFullYear()} TaskFlow. All rights reserved. Made with ❤️ and Caffeine.
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
