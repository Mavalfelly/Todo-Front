// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar2 from "./components/Nav2";
import Dashboard from "./pages/dashboard";
import MasterListInfo from "./pages/MasterInfo";
const App = () => {
    return (
        <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/*"
                    element={
                        <ProtectedRoute>
                            <div>
                                {/* Render Nav at all times */}
                                <NavBar2 />
                                {/* Conditional Routes */}
                                <Routes>
                                    <Route path="dashboard" element={<Dashboard/>} />
                                    <Route path="masterlist/:id" element={<MasterListInfo />} />
                                </Routes>
                            </div>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
