import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section with Video Background */}
            <div className="hero-section">
                <video autoPlay muted loop className="hero-video">
                    {/* Replace with your video file */}
                    <source src="/videos/hero-background.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="hero-overlay">
                    <div className="container text-center text-white">
                        <h1 className="display-4 fw-bold mb-3">Your Personal Trip Planner AI</h1>
                        <p className="lead mb-4">Create your smart trip itineraries easily, in seconds!</p>
                        <Link to="/dashboard/my-trips" className="btn btn-light btn-lg rounded-pill px-5">
                            Create Trips Now →
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="features-section py-5">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-md-4 mb-4">
                            <div className="feature-card p-4 h-100">
                                <i className="bi bi-geo-alt display-4 text-primary mb-3"></i>
                                <h4 className="fw-bold">Select Destination</h4>
                                <p className="text-muted">Just select a trip destination, and our AI will craft a plan for you in seconds.</p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="feature-card p-4 h-100">
                                <i className="bi bi-pencil-square display-4 text-primary mb-3"></i>
                                <h4 className="fw-bold">Edit Your Plan</h4>
                                <p className="text-muted">Easily edit and adjust all activities and places with our AI-powered recommendations.</p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="feature-card p-4 h-100">
                                <i className="bi bi-leaf display-4 text-primary mb-3"></i>
                                <h4 className="fw-bold">Travel Smart & Green</h4>
                                <p className="text-muted">Visit the right places, sustainably, with our AI-powered algorithm and travel tips.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="testimonials-section bg-light py-5">
                <div className="container text-center">
                    <div className="card p-5 shadow-sm">
                        <h3 className="mb-4">"Every trip with JourneyBot has been a success. The yearly subscription is an excellent value."</h3>
                        <p className="fw-bold fs-5">- Lana B.</p>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="cta-section bg-primary text-white py-5 text-center">
                <h2 className="mb-3">Discover Hidden Gems And Latest Festivals</h2>
                <p className="lead mb-4">Our AI-powered algorithm makes your trip plan authentic, eco-smart, and unique.</p>
                <Link to="/dashboard/my-trips" className="btn btn-outline-light btn-lg rounded-pill px-5">
                    Start Your Journey
                </Link>
            </div>
        </div>
    );
};

export default Home;