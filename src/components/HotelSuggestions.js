import React from 'react';

const HotelSuggestions = ({ hotels }) => {
    if (!hotels || hotels.length === 0) {
        return <p className="text-secondary text-center mt-4">No real-time hotel suggestions available.</p>;
    }

    return (
        <div className="mt-4">
            <h4 className="text-primary">Suggested Hotels</h4>
            <div className="list-group">
                {hotels.map((hotel, index) => (
                    <a href={hotel.link} target="_blank" rel="noopener noreferrer" key={index} className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{hotel.name}</h5>
                            <small>{hotel.price}</small>
                        </div>
                        <p className="mb-1">{hotel.description}</p>
                        <small>{hotel.rating}</small>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default HotelSuggestions;