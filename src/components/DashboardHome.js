import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkedAlt } from "react-icons/fa";

const DashboardHome = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: 100,
        padding: 20,
        maxWidth: 400,
        margin: "auto",
        border: "1px solid #e0e0e0",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <FaMapMarkedAlt size={100} color="#007bff" />
      <h2 style={{ margin: "20px 0", color: "#333" }}>Plan Your Trip</h2>
      <button
        onClick={() => navigate("/dashboard/my-trips")}
        style={{
          padding: "12px 24px",
          fontSize: 16,
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: 8,
          transition: "background-color 0.3s ease",
        }}
      >
        Search Destination
      </button>
    </div>
  );
};

export default DashboardHome;