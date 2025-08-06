import React, { useState } from 'react';
import TripForm from './TripForm';
import TripList from './TripList';
import TripPlanner from './TripPlanner';
import TripExperiences from './TripExperiences';
import './MyTrips.css';

const MyTrips = () => {
  const [showTripForm, setShowTripForm] = useState(false);
  const [showTripPlanner, setShowTripPlanner] = useState(false);
  const [showExperiences, setShowExperiences] = useState(false);

  const handleCreateTripClick = () => {
    setShowTripForm(true);
    setShowTripPlanner(false);
    setShowExperiences(false);
  };

  const handlePlanTripClick = () => {
    setShowTripForm(false);
    setShowTripPlanner(true);
    setShowExperiences(false);
  };

  const handleExperiencesClick = () => {
    setShowTripForm(false);
    setShowTripPlanner(false);
    setShowExperiences(true);
  };

  const handleBackClick = () => {
    setShowTripForm(false);
    setShowTripPlanner(false);
    setShowExperiences(false);
  };

  if (showTripForm || showTripPlanner || showExperiences) {
    return (
      <div className="container my-5">
        <button
          onClick={handleBackClick}
          className="btn btn-link text-decoration-none mb-3"
        >
          ← Back to My Trips
        </button>
        {showTripForm && <TripForm />}
        {showTripPlanner && <TripPlanner />}
        {showExperiences && <TripExperiences />}
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold mb-0">My Trips</h2>
        <button
          className="btn btn-success rounded-pill px-4"
          onClick={handleCreateTripClick}
        >
          <i className="bi bi-plus-lg me-2"></i>Create New Trip
        </button>
      </div>

      <p className="lead text-muted mb-5">
        Here you can view and manage your saved trips.
      </p>

      <section className="mb-5">
        <TripList />
      </section>

      <hr className="my-5" />

      <section className="row g-4">
        <div className="col-md-6">
          <div className="card h-100 shadow-sm p-4 text-center">
            <i className="bi bi-robot display-4 text-primary mb-3"></i>
            <h4 className="card-title">Generate with AI</h4>
            <p className="card-text text-muted">Let our AI chatbot create a personalized itinerary for you.</p>
            <button
              className="btn btn-primary rounded-pill mt-auto"
              onClick={handlePlanTripClick}
            >
              Generate AI Plan
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 shadow-sm p-4 text-center">
            <i className="bi bi-camera display-4 text-success mb-3"></i>
            <h4 className="card-title">Share Experiences</h4>
            <p className="card-text text-muted">Document your journey with photos, videos, and daily logs.</p>
            <button
              className="btn btn-outline-success rounded-pill mt-auto"
              onClick={handleExperiencesClick}
            >
              Share My Experience
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyTrips;