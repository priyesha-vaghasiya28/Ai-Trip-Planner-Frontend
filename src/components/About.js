import React from 'react';

const About = () => {
  return (
    <div>
      <div className="p-5 text-center bg-light rounded-3 mb-5">
        <h1 className="display-5 fw-bold text-primary">About EasyTrip.ai</h1>
        <p className="lead text-secondary">Our story and our mission to simplify travel.</p>
      </div>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm h-100 border-0">
            <img src="/images/image 3.jpg" className="card-img-top" alt="About Us" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm h-100 p-4 border-0">
            <h5 className="card-title text-primary fw-bold">Our Vision</h5>
            <p className="card-text text-secondary">
              EasyTrip.ai was founded on the belief that travel planning should be simple, smart, and accessible to everyone. Our mission is to provide an AI-powered platform that helps you explore the world with confidence and ease. We aim to make travel planning less of a chore and more of an adventure.
            </p>
            <h5 className="card-title text-primary fw-bold mt-4">Our Values</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item border-0">Innovation and Technology</li>
              <li className="list-group-item border-0">Customer-Centric Design</li>
              <li className="list-group-item border-0">Sustainability and Responsibility</li>
              <li className="list-group-item border-0">Simplicity and User Experience</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;