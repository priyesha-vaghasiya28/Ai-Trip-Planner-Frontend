import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import MyTrips from "./components/MyTrips";
import Features from "./components/Features";
import Contact from "./components/Contact";
import Chatbot from "./components/Chatbot";
import TripPlanner from "./components/TripPlanner";
import TripExperiences from "./components/TripExperiences";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Redirect root to login or dashboard */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />

        {/* Auth Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard/*"
          element={
            isAuthenticated ? (
              <Layout
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          {/* Default page inside dashboard */}
          <Route index element={<Dashboard />} />
          <Route path="my-trips" element={<MyTrips />} />
          <Route path="features" element={<Features />} />
          <Route path="contact" element={<Contact />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="trip-planner" element={<TripPlanner />} />
          <Route path="trip-experiences" element={<TripExperiences />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
