import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import MyTrips from './components/MyTrips';
import Features from './components/Features';
import About from './components/About';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import TripPlanner from './components/TripPlanner';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

        {/* Protected Routes - All dashboard routes require authentication */}
        <Route
          path="/dashboard/*"
          element={
            isAuthenticated ? (
              <Layout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
                <Routes>
                  <Route path="my-trips" element={<MyTrips />} />
                  <Route path="features" element={<Features />} />
                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="chatbot" element={<Chatbot />} />
                  <Route path="trip-planner" element={<TripPlanner />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;