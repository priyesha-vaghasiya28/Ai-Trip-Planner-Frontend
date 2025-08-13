import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
// eslint-disable-next-line
import { FaCar, FaTrain, FaBus, FaPlane, FaMapMarkerAlt, FaClock, FaDirections, FaInfoCircle, FaMap, FaSearchLocation, FaMapPin } from 'react-icons/fa';
import './MyTrips.css';

const MyTrips = () => {
  const mapRef = useRef(null);
  const sourceGeocoderRef = useRef(null);
  const destinationGeocoderRef = useRef(null);
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [destinationCountry, setDestinationCountry] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [directions, setDirections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTransport, setSelectedTransport] = useState("car");

  const MAPBOX_TOKEN = "pk.eyJ1IjoicHJpeWVzaGEiLCJhIjoiY21lMHhkeWthMDdqcTJqcXprYzEwZzJleSJ9.CqcsyvT4eJVv9Heo6rvCmA";

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    if (mapRef.current && mapRef.current.getMap) {
      return; 
    }

    const initMap = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [78.9629, 20.5937],
      zoom: 4,
    });

    initMap.addControl(new mapboxgl.NavigationControl(), "top-right");

    const sourceGeocoder = new MapboxGeocoder({
      accessToken: MAPBOX_TOKEN,
      placeholder: "Enter starting point",
      mapboxgl: mapboxgl,
      marker: false,
      countries: 'in,us,gb,de,fr,ca,au',
    });

    const destinationGeocoder = new MapboxGeocoder({
      accessToken: MAPBOX_TOKEN,
      placeholder: "Enter destination",
      mapboxgl: mapboxgl,
      marker: false,
      countries: 'in,us,gb,de,fr,ca,au',
    });

    if (sourceGeocoderRef.current && destinationGeocoderRef.current) {
      sourceGeocoderRef.current.innerHTML = '';
      sourceGeocoderRef.current.appendChild(sourceGeocoder.onAdd(initMap));
      destinationGeocoderRef.current.innerHTML = '';
      destinationGeocoderRef.current.appendChild(destinationGeocoder.onAdd(initMap));
    }

    sourceGeocoder.on("result", (e) => {
      setSource(e.result.geometry.coordinates);
      setError(null);
    });

    destinationGeocoder.on("result", (e) => {
      setDestination(e.result.geometry.coordinates);
      const countryContext = e.result.context ? e.result.context.find(c => c.id.startsWith('country')) : null;
      setDestinationCountry(countryContext ? countryContext.short_code.toUpperCase() : null);
      setError(null);
    });

    mapRef.current = initMap;

    return () => {
        if (initMap) {
            initMap.remove();
        }
    };
  }, [mapRef, sourceGeocoderRef, destinationGeocoderRef]);

  useEffect(() => {
    if (source && destination && mapRef.current && selectedTransport === "car") {
      if (destinationCountry === "IN") {
        getRoute(source, destination, mapRef.current);
      } else {
        setError("Car routing is only available for domestic trips in India.");
        if (mapRef.current.getLayer("route")) {
          mapRef.current.removeLayer("route");
          mapRef.current.removeSource("route");
        }
        setDirections([]);
        setDistance(null);
        setDuration(null);
      }
    }
  }, [source, destination, destinationCountry, selectedTransport, mapRef]);
  
  useEffect(() => {
    if (destination && mapRef.current && selectedTransport === 'car') {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          const newLocation = [longitude, latitude];
          getRoute(newLocation, destination, mapRef.current);
        },
        (err) => {
          console.error("Error getting live location:", err);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [destination, selectedTransport, mapRef]);

  const getRoute = async (startCoords, endCoords, map) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}?geometries=geojson&steps=true&access_token=${MAPBOX_TOKEN}`
      );
      const data = await response.json();
      
      if (!data.routes || data.routes.length === 0) {
        throw new Error("No routes found for the selected locations.");
      }
      
      const route = data.routes[0].geometry;
      const distanceMeters = data.routes[0].distance;
      const durationSeconds = data.routes[0].duration;

      setDistance((distanceMeters / 1000).toFixed(2));
      setDuration((durationSeconds / 60).toFixed(0));

      const routeSteps = data.routes[0].legs[0].steps;
      setDirections(routeSteps.map((step) => step.maneuver.instruction));

      if (map.getSource("route")) {
        map.getSource("route").setData({
          type: "Feature",
          properties: {},
          geometry: route,
        });
      } else {
        map.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: route,
          },
        });
        map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#007bff",
            "line-width": 5,
            "line-opacity": 0.75,
          },
        });
      }
      
      const bounds = new mapboxgl.LngLatBounds();
      route.coordinates.forEach((coord) => {
        bounds.extend(coord);
      });
      map.fitBounds(bounds, { padding: 50 });

    } catch (err) {
      console.error("Error fetching route:", err);
      setError(err.message);
      setDistance(null);
      setDuration(null);
      setDirections([]);
    } finally {
      setLoading(false);
    }
  };

  const isDomestic = destinationCountry === 'IN';

  const TransportButton = ({ icon, label, transportType }) => (
    <button
      onClick={() => setSelectedTransport(transportType)}
      className={`transport-button ${selectedTransport === transportType ? 'active' : ''}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="trips-container">
      <div className="sidebar">
        <h2 className="section-title"><FaMap /> Plan Your Trip</h2>
        <div className="search-inputs">
          <div ref={sourceGeocoderRef} id="source" className="geocoder-input-wrapper"></div>
          <div ref={destinationGeocoderRef} id="destination" className="geocoder-input-wrapper"></div>
        </div>

        {destination && (
          <>
            <h4 className="section-title" style={{ marginTop: '2rem' }}>Select Transport Mode</h4>
            <div className="transport-options">
              {isDomestic ? (
                <>
                  <TransportButton icon={<FaCar />} label="Car" transportType="car" />
                  <TransportButton icon={<FaTrain />} label="Train" transportType="train" />
                  <TransportButton icon={<FaBus />} label="Bus" transportType="bus" />
                  <TransportButton icon={<FaPlane />} label="Flight" transportType="flight" />
                </>
              ) : (
                <TransportButton icon={<FaPlane />} label="Flight" transportType="flight" />
              )}
            </div>
          </>
        )}

        {loading && <div className="loading-spinner"><p>Loading...</p></div>}
        {error && <div className="error-message"><FaInfoCircle />{error}</div>}

        {isDomestic && selectedTransport === "car" && distance && duration && (
          <div className="info-card">
            <h4><FaCar /> Trip Details (Car)</h4>
            <div className="info-item">
              <FaMapMarkerAlt />
              <strong>Distance:</strong> <span>{distance} km</span>
            </div>
            <div className="info-item">
              <FaClock />
              <strong>Est. Time:</strong> <span>{duration} minutes</span>
            </div>
          </div>
        )}

        {isDomestic && selectedTransport === "train" && (
          <div className="info-card">
            <h4><FaTrain /> Train Details</h4>
            <p>Train directions and schedules would be shown here. (Integration with a train API required)</p>
          </div>
        )}

        {isDomestic && selectedTransport === "bus" && (
          <div className="info-card">
            <h4><FaBus /> Bus Details</h4>
            <p>Bus routes and schedules would be shown here. (Integration with a bus API required)</p>
          </div>
        )}

        {((isDomestic && selectedTransport === "flight") || !isDomestic) && (
          <div className="info-card">
            <h4><FaPlane /> Flight Details</h4>
            <p className="info-item">Click the link below to search for flights:</p>
            <a
              href="https://www.google.com/flights"
              target="_blank"
              rel="noopener noreferrer"
              className="flight-link"
            >
              Search Flights
            </a>
          </div>
        )}

        {isDomestic && selectedTransport === "car" && directions.length > 0 && (
          <div className="info-card directions-list">
            <h4><FaDirections /> Directions</h4>
            <ol>
              {directions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
      <div id="map" ref={mapRef} className="map-container"></div>
    </div>
  );
};

export default MyTrips;