import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/register";
import Dashboard from "./pages/auth/Dashboard";
import UserInput from "./pages/auth/UserInput";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  // Function to update authentication status
  const updateAuth = () => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  };

  return (
    <Router>
      <Routes>
        {/* Always show Login page first */}
        <Route path="/" element={<Login updateAuth={updateAuth} />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login updateAuth={updateAuth} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userinput" element={<UserInput />} />

        {/* Protected Dashboard Route */}
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard updateAuth={updateAuth} /> : <Navigate to="/login" />} />

        {/* 404 Not Found Page */}
        <Route path="*" element={<h1 className="text-center text-white mt-10">404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
