import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TripList.css';

const TripList = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/trips', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTrips(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch trips. Please log in.');
                setLoading(false);
            }
        };
        fetchTrips();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this trip?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:5000/api/trips/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTrips(trips.filter(trip => trip._id !== id));
            } catch (err) {
                setError('Failed to delete trip. Please try again.');
            }
        }
    };

    if (loading) return <p>Loading trips...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    if (trips.length === 0) {
        return <p className="text-center text-muted">You have no saved trips yet.</p>;
    }

    return (
        <div className="trip-list-container row g-4">
            {trips.map(trip => (
                <div key={trip._id} className="col-md-6 col-lg-4">
                    <div className="trip-card card h-100 shadow-sm">
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title fw-bold text-primary">{trip.tripName}</h5>
                            <p className="card-text text-muted mb-3">
                                {trip.experiences.length > 0
                                    ? `Last updated on ${new Date(trip.experiences[trip.experiences.length - 1].createdAt).toLocaleDateString()}`
                                    : 'No experiences yet.'}
                            </p>
                            <div className="mt-auto d-flex justify-content-end">
                                <button
                                    onClick={() => handleDelete(trip._id)}
                                    className="btn btn-outline-danger btn-sm rounded-pill"
                                >
                                    <i className="bi bi-trash"></i> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TripList;