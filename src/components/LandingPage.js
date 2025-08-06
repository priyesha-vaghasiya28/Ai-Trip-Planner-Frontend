import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <div className="jumbotron text-center bg-light py-5 rounded-3 mb-5">
        <h1 className="display-4 fw-bold text-primary">Your Next Adventure, Planned by AI</h1>
        <p className="lead text-secondary">
          Effortlessly create personalized travel itineraries with our AI-powered trip planner.
        </p>
        <hr className="my-4" />
        <p className="text-muted">Sign up today and start planning your perfect journey.</p>
        <p className="lead">
          <Link to="/register" className="btn btn-primary btn-lg">Get Started</Link>
        </p>
      </div>

      <section className="text-center my-5">
        <h2 className="text-primary-custom fw-bold mb-4">Why Choose Us?</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm h-100 border-0 p-4">
              <h3 className="h5 text-primary-custom fw-bold">Personalized Itineraries</h3>
              <p className="text-secondary">AI creates plans tailored to your interests and budget.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm h-100 border-0 p-4">
              <h3 className="h5 text-primary-custom fw-bold">Effortless Planning</h3>
              <p className="text-secondary">Save hours of research and get your trip ready in minutes.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm h-100 border-0 p-4">
              <h3 className="h5 text-primary-custom fw-bold">Always Accessible</h3>
              <p className="text-secondary">Access your plans on any device, anywhere in the world.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="my-5">
        <div className="card shadow-sm p-5 border-0 text-center">
          <h2 className="text-primary-custom fw-bold mb-3">Ready to Plan Your Trip?</h2>
          <p className="lead text-secondary">Join thousands of travelers who trust our AI to make their journeys unforgettable.</p>
          <Link to="/register" className="btn btn-primary-custom btn-lg w-auto mx-auto mt-3">Start Planning</Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;