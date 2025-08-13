    import React from 'react';
    import { Link, useNavigate } from 'react-router-dom';

    const Header = ({ isAuthenticated, setIsAuthenticated }) => {
      const navigate = useNavigate();

      const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
      };

      return (
        <header className="navbar navbar-expand-lg navbar-light py-3" style={{ backgroundColor: '#E0F7FA' }}>
          <div className="container">
            <Link to="/" className="navbar-brand d-flex align-items-center fw-bold text-primary fs-4">
              <img src="/images/logo.jpg" alt="JourneyBot Logo" height="70" className="me-4" />
              JourneyBot
            </Link>
            {isAuthenticated && (
              <div className="collapse navbar-collapse justify-content-end">
                <ul className="navbar-nav gap-2">
                  <li className="nav-item">
                      <Link to="/dashboard" className="nav-link text-secondary">
                        <i className="bi bi-speedometer2 me-1"></i>Dashboard
                      </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/dashboard/my-trips" className="nav-link text-secondary">
                      <i className="bi bi-compass me-1"></i>My Trips
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard/features" className="nav-link text-secondary">
                      <i className="bi bi-app-indicator me-1"></i>Features
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard/trip-planner" className="nav-link text-secondary">
                      <i className="bi bi-map me-1"></i>TripPlanner
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard/contact" className="nav-link text-secondary">
                      <i className="bi bi-envelope me-1"></i>Contact Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard/chatbot" className="nav-link text-secondary">
                      <i className="bi bi-robot me-1"></i>Chatbot
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard/trip-experiences" className="nav-link text-secondary">
                      <i className="bi bi-journal-text me-1"></i>My Experience
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button onClick={handleLogout} className="btn btn-outline-primary">
                      <i className="bi bi-box-arrow-right me-1"></i>Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
      );
    };

    export default Header;
