// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";
import LandingPage from "./components/pages/LandingPage";

const App = () => {
    return (
        <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
};

export default App;
