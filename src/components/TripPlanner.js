import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';
import './TripPlanner.css';

const defaultCenter = [22.3072, 72.1852]; // Gujarat, India

const customIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const TripPlanner = () => {
    const [destination, setDestination] = useState('');
    const [days, setDays] = useState(1);
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [plan, setPlan] = useState(null);
    const [mapMarkers, setMapMarkers] = useState([]);
    const [country, setCountry] = useState(null); // New state to store the country
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setPlan(null);
        setMapMarkers([]);
        setCountry(null); // Reset country info
        setLoading(true);

        if (!destination || days < 1) {
            setError('Please enter a valid destination and number of days.');
            setLoading(false);
            return;
        }

        try {
            const geoResponse = await axios.get(
                `https://nominatim.openstreetmap.org/search?q=${destination}&format=json&limit=1`
            );

            if (geoResponse.data && geoResponse.data.length > 0) {
                const { lat, lon, country } = geoResponse.data[0];
                setMapCenter([parseFloat(lat), parseFloat(lon)]);
                setCountry(country); // Set the country name
            } else {
                setError('Main location not found. Please try a different name.');
                setLoading(false);
                return;
            }
            
            // --- MOCK AI RESPONSE (FOR DEMO) ---
            const mockPlan = {
                day1: {
                    activities: ["Visit the Eiffel Tower", "Go for a walk along the Seine River"],
                    food: ["Croissant and coffee at a local bakery"],
                    locations: [
                        { name: "Eiffel Tower", lat: 48.8584, lon: 2.2945 },
                        { name: "Seine River", lat: 48.8566, lon: 2.3522 }
                    ]
                },
                day2: {
                    activities: ["Explore the Louvre Museum", "Walk through the Tuileries Garden"],
                    food: ["French onion soup at a bistro"],
                    locations: [
                        { name: "Louvre Museum", lat: 48.8606, lon: 2.3376 },
                        { name: "Tuileries Garden", lat: 48.8637, lon: 2.3277 }
                    ]
                }
            };
            
            setPlan(mockPlan);

            const newMarkers = [];
            for (const day in mockPlan) {
                mockPlan[day].locations.forEach(loc => {
                    newMarkers.push({
                        name: loc.name,
                        lat: loc.lat,
                        lon: loc.lon
                    });
                });
            }
            setMapMarkers(newMarkers);
            setLoading(false);

        } catch (err) {
            console.error(err);
            setError('Failed to generate plan. Please try again later.');
            setLoading(false);
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4 text-primary">AI Trip Planner</h2>
            <p className="lead text-center text-muted mb-5">
                Let our AI generate a perfect itinerary for you.
            </p>

            <div className="row g-4">
                <div className="col-md-6">
                    <div className="card h-100 shadow-sm p-4">
                        <h4 className="card-title mb-4">Trip Details</h4>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-3">
                                <label htmlFor="destination" className="form-label">Destination</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="destination"
                                    placeholder="e.g., Paris, France"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="days" className="form-label">Number of Days</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="days"
                                    defaultValue="1"
                                    min="1"
                                    value={days}
                                    onChange={(e) => setDays(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="travelers" className="form-label">Number of Travelers</label>
                                <input type="number" className="form-control" id="travelers" defaultValue="1" />
                            </div>
                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                            <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                                {loading ? 'Generating...' : 'Generate Trip'}
                            </button>
                        </form>
                        {country && (
                            <div className="mt-4">
                                <p className="fw-bold">Country: <span className="text-primary">{country}</span></p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card h-100 shadow-sm p-4">
                        <h4 className="card-title mb-4">Real-time Map</h4>
                        <div className="map-placeholder">
                            <MapContainer
                                center={mapCenter}
                                zoom={10}
                                scrollWheelZoom={false}
                                style={{ width: '100%', height: '100%' }}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {mapMarkers.map((marker, index) => (
                                    <Marker key={index} position={[marker.lat, marker.lon]} icon={customIcon} />
                                ))}
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </div>

            {plan && (
                <div className="mt-5">
                    <h3 className="text-center mb-4 text-success">Your AI-Generated Plan</h3>
                    <div className="row g-4">
                        {Object.keys(plan).map(day => (
                            <div className="col-md-6" key={day}>
                                <div className="card h-100 shadow-sm p-4">
                                    <h5 className="card-title text-primary">{day.charAt(0).toUpperCase() + day.slice(1)}</h5>
                                    <h6 className="mt-3">Activities:</h6>
                                    <ul>
                                        {plan[day].activities.map((activity, index) => (
                                            <li key={index}>{activity}</li>
                                        ))}
                                    </ul>
                                    <h6 className="mt-3">Food Suggestions:</h6>
                                    <ul>
                                        {plan[day].food.map((food, index) => (
                                            <li key={index}>{food}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TripPlanner;