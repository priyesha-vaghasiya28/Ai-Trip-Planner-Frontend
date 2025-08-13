// src/components/DestinationMap.js
import React, { useRef, useState } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 21.1702, // Surat default center
  lng: 72.8311,
};

const DestinationMap = ({ onDestinationSelected }) => {
  const autocompleteRef = useRef(null);
  const [mapRef, setMapRef] = useState(null);
  const [position, setPosition] = useState(center);

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setPosition(location);
        onDestinationSelected(location);
        mapRef.panTo(location);
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey="pk.eyJ1IjoicHJpeWVzaGEiLCJhIjoiY21lMHhkeWthMDdqcTJqcXprYzEwZzJleSJ9.CqcsyvT4eJVv9Heo6rvCmA" libraries={['places']}>
      <div style={{ marginBottom: '10px' }}>
        <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Search for a location"
            style={{
              width: '100%',
              height: '40px',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </Autocomplete>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={12}
        onLoad={(map) => setMapRef(map)}
      >
        <Marker position={position} />
      </GoogleMap>
    </LoadScript>
  );
};

export default DestinationMap;
