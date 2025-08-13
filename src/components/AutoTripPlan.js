import React from 'react';

export default function AutoTripPlan({ location }) {
  if (!location) return null;

  return (
    <div className="card shadow-sm p-4 mb-5">
      <h4>Generated Trip Plan</h4>
      <p><strong>Destination:</strong> Latitude {location.lat.toFixed(2)}, Longitude {location.lng.toFixed(2)}</p>
      <ul className="mb-0">
        <li>🏨 Day 1: Check-in at nearby hotel</li>
        <li>📍 Day 2: Visit local attractions</li>
        <li>🌄 Day 3: Nature tour & scenic drives</li>
        <li>🍴 Day 4: Explore local cuisine & culture</li>
      </ul>
    </div>
  );
}
