// components/FrontPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkedAlt } from "react-icons/fa";

const FrontPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <FaMapMarkedAlt
        size={100}
        style={{ cursor: "pointer", color: "#007bff" }}
        onClick={() => navigate("/dashboard/my-trips")}  // Note updated path here
      />
      <h2>Plan Your Trip</h2>
    </div>
  );
};

export default FrontPage;
