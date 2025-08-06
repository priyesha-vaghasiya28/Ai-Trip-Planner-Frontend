import React from 'react';

const Features = () => {
  return (
    <div>
      <div className="p-5 text-center bg-light rounded-3 mb-5">
        <h1 className="display-5 fw-bold text-primary">Explore Our Powerful Features</h1>
        <p className="lead text-secondary">Discover how our AI can revolutionize your travel planning.</p>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm h-100 border-0">
            <img src="/images/features 1.jpg" className="card-img-top" alt="AI Planning" />
            <div className="card-body">
              <h5 className="card-title text-primary fw-bold">AI-Powered Itineraries</h5>
              <p className="card-text text-secondary">
                Our cutting-edge AI creates personalized itineraries in seconds, taking into account your preferences, budget, and travel style.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm h-100 border-0">
            <img src="/images/image 2.webp" className="card-img-top" alt="Real-time Updates" />
            <div className="card-body">
              <h5 className="card-title text-primary fw-bold">Real-time Updates</h5>
              <p className="card-text text-secondary">
                Get real-time updates on flights, weather, and local events to ensure your trip goes smoothly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;