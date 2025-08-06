import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TripExperiences.css';

const moods = ['😊', '😎', '😍', '😌', '🥳', '🤯', '😭', '😴'];

const TripExperiences = () => {
  const API_URL = 'http://localhost:5000/api/trips';

  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [newTripName, setNewTripName] = useState('');
  const [newExperience, setNewExperience] = useState({
    day: '',
    content: '',
    location: '', // Added the new location field
    mood: '',
    photos: [],
    videos: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTrips(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch trips.');
      setLoading(false);
    }
  };

  const handleCreateTrip = async (e) => {
    e.preventDefault();
    if (!newTripName) return;

    try {
      await axios.post(API_URL, { tripName: newTripName });
      setNewTripName('');
      fetchTrips();
    } catch (err) {
      setError('Failed to create trip.');
    }
  };

  const handleAddExperience = async (e) => {
    e.preventDefault();
    if (!newExperience.day || !newExperience.content || !selectedTrip) return;

    const formData = new FormData();
    formData.append('day', newExperience.day);
    formData.append('content', newExperience.content);
    formData.append('location', newExperience.location); // Added the new location field
    formData.append('mood', newExperience.mood);
    newExperience.photos.forEach(photo => formData.append('photos', photo));
    newExperience.videos.forEach(video => formData.append('videos', video));

    try {
      await axios.post(`${API_URL}/${selectedTrip._id}/experiences`, formData);
      fetchTrips(); 
      const updatedTripResponse = await axios.get(`${API_URL}/${selectedTrip._id}`);
      setSelectedTrip(updatedTripResponse.data);
      setNewExperience({ day: '', content: '', location: '', mood: '', photos: [], videos: [] });
    } catch (err) {
      setError('Failed to add experience.');
    }
  };
  
  const handleDeleteExperience = async (experienceId) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
        try {
            await axios.delete(`${API_URL}/${selectedTrip._id}/experiences/${experienceId}`);
            fetchTrips();
            const updatedTripResponse = await axios.get(`${API_URL}/${selectedTrip._id}`);
            setSelectedTrip(updatedTripResponse.data);
        } catch (err) {
            setError('Failed to delete experience.');
        }
    }
  };

  if (loading) return <p className="text-center">Loading trips...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-primary">Your Trip Experiences</h2>

      {/* Trip List and Creation */}
      <div className="trip-selector-container mb-4 p-4 card shadow-sm">
        <h3 className="mb-3">Select or Create a Trip</h3>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {trips.map(trip => (
            <button
              key={trip._id}
              className={`btn ${selectedTrip && selectedTrip._id === trip._id ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setSelectedTrip(trip)}
            >
              {trip.tripName}
            </button>
          ))}
        </div>
        <form onSubmit={handleCreateTrip} className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            value={newTripName}
            onChange={(e) => setNewTripName(e.target.value)}
            placeholder="e.g., Kerala in 3 days"
          />
          <button type="submit" className="btn btn-success">Create Trip</button>
        </form>
      </div>

      {selectedTrip && (
        <>
          <div className="p-4 card shadow-sm mb-4">
            <h3 className="card-title text-center text-primary">
              Trip to {selectedTrip.tripName}
            </h3>
          </div>

          {/* Form to add a new experience to the selected trip */}
          <div className="card mb-4 shadow-sm p-4">
            <h4 className="mb-3">Add Experience for This Trip</h4>
            <form onSubmit={handleAddExperience}>
              <div className="mb-3">
                <label htmlFor="day" className="form-label">Day</label>
                <input
                  type="text"
                  className="form-control"
                  name="day"
                  value={newExperience.day}
                  onChange={(e) => setNewExperience({ ...newExperience, day: e.target.value })}
                  placeholder="e.g., Day 1: Kochi"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="content" className="form-label">Content</label>
                <textarea
                  className="form-control"
                  name="content"
                  rows="3"
                  value={newExperience.content}
                  onChange={(e) => setNewExperience({ ...newExperience, content: e.target.value })}
                  placeholder="What did you do today?"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="location" className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={newExperience.location}
                  onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
                  placeholder="e.g., Munnar"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Your Mood</label>
                <div className="mood-selector d-flex gap-2">
                  {moods.map(mood => (
                    <span 
                      key={mood}
                      className={`mood-emoji ${newExperience.mood === mood ? 'selected' : ''}`}
                      onClick={() => setNewExperience({ ...newExperience, mood })}
                    >
                      {mood}
                    </span>
                  ))}
                </div>
              </div>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="photos" className="form-label">Upload Photos</label>
                  <input
                    type="file"
                    className="form-control"
                    name="photos"
                    accept="image/*"
                    multiple
                    onChange={(e) => setNewExperience({ ...newExperience, photos: [...e.target.files] })}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="videos" className="form-label">Upload Videos</label>
                  <input
                    type="file"
                    className="form-control"
                    name="videos"
                    accept="video/*"
                    multiple
                    onChange={(e) => setNewExperience({ ...newExperience, videos: [...e.target.files] })}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-4">
                Add Day Experience
              </button>
            </form>
          </div>

          {/* Display experiences for the selected trip */}
          <h3 className="text-center mb-4 text-secondary">Timeline</h3>
          {selectedTrip.experiences.length === 0 ? (
            <p className="text-center text-muted">No experiences added to this trip yet.</p>
          ) : (
            <div className="timeline-container">
                {selectedTrip.experiences.map((exp, index) => (
                    <div key={exp._id} className="timeline-item">
                        <div className="timeline-content card shadow-sm">
                            <div className="card-body">
                                <h4 className="d-flex align-items-center mb-3">
                                    <span className="text-primary me-2">{exp.day}</span>
                                    {exp.mood && <span className="timeline-mood">{exp.mood}</span>}
                                </h4>
                                {exp.location && <p className="text-muted"><i className="bi bi-geo-alt-fill me-1"></i>{exp.location}</p>}
                                <p className="card-text">{exp.content}</p>
                                {/* Display photos and videos */}
                                {exp.photos.length > 0 && (
                                    <div className="media-grid">
                                        {exp.photos.map((photo, i) => (
                                            <img 
                                              key={i} 
                                              src={`http://localhost:5000${photo}`} 
                                              alt={`Trip experience from ${exp.day} of ${selectedTrip.tripName}`} 
                                              className="img-thumbnail" 
                                            />
                                        ))}
                                    </div>
                                )}
                                {exp.videos.length > 0 && (
                                    <div className="media-grid">
                                        {exp.videos.map((video, i) => (
                                            <video key={i} src={`http://localhost:5000${video}`} controls className="img-thumbnail" />
                                        ))}
                                    </div>
                                )}
                                <div className="d-flex justify-content-end mt-3">
                                    <button 
                                        className="btn btn-sm btn-outline-danger" 
                                        onClick={() => handleDeleteExperience(exp._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TripExperiences;