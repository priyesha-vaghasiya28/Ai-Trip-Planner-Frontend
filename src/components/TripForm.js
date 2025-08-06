import React, { useState } from 'react';
import axios from 'axios';

const TripForm = () => {
    const [tripName, setTripName] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!tripName) {
            setError('Trip name is required.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Authentication token not found. Please log in again.');
                return;
            }

            const response = await axios.post(
                'http://localhost:5000/api/trips',
                { tripName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage(`Trip "${response.data.tripName}" created successfully!`);
            setTripName('');
        } catch (err) {
            console.error('Error creating trip:', err.response?.data || err.message);
            setError('Failed to create trip. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm p-4">
                        <h4 className="card-title text-primary mb-4">Create a New Trip</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="tripName" className="form-label">Trip Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="tripName"
                                    value={tripName}
                                    onChange={(e) => setTripName(e.target.value)}
                                    placeholder="e.g., Summer vacation"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Create Trip</button>
                        </form>
                        {message && <div className="alert alert-success mt-3">{message}</div>}
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripForm;