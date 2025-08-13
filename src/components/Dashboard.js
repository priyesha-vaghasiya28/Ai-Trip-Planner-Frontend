import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      {/* Hero Section */}
      <div
        className="hero-section text-center text-white d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: "url('/images/image 2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "50vh",
        }}
      >
        <div className="hero-content p-4 rounded bg-dark bg-opacity-50">
          <h1 className="display-4 fw-bold">Welcome to Your Dashboard</h1>
          <p className="lead">Your personal travel hub — plan, explore, and share your journey with ease.</p>
          <Button variant="warning" size="lg" className="mt-3">
            Start Planning
          </Button>
        </div>
      </div>

      <Container className="py-5">
        {/* Experience Section */}
        <Row className="mb-5 text-center">
          <Col>
            <h2 className="fw-bold text-primary">Experience the Journey 🗺️</h2>
            <p className="text-muted">Dive into stunning destinations, explore travel tips, and spark your wanderlust.</p>
          </Col>
        </Row>

        {/* Image Gallery with improved cards */}
        <Row className="mb-5 g-4">
          <Col md={4}>
            <Card className="shadow-lg h-100">
              <Card.Img variant="top" src="/images/image 3.jpg" className="card-img-top" />
              <Card.Body>
                <Card.Title className="fw-bold">Mountain Escape ⛰️</Card.Title>
                <Card.Text>Find peace and adventure in the serene mountains.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-lg h-100">
              <Card.Img variant="top" src="/images/image 5.jpg" className="card-img-top" />
              <Card.Body>
                <Card.Title className="fw-bold">City Adventures 🏙️</Card.Title>
                <Card.Text>Discover vibrant city life, culture, and hidden gems.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-lg h-100">
              <Card.Img variant="top" src="/images/image 6.jpg" className="card-img-top" />
              <Card.Body>
                <Card.Title className="fw-bold">Beach Paradise 🏖️</Card.Title>
                <Card.Text>Relax on sunny shores and immerse yourself in clear waters.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Offline Video Section */}
        <Row className="text-center my-5">
          <Col>
            <h2 className="fw-bold mb-4 text-primary">✨ Travel Inspiration for Your Next Adventure ✨</h2>
            <p className="lead text-muted" style={{ maxWidth: "700px", margin: "0 auto" }}>
              Explore breathtaking destinations, unique cultures, and unforgettable experiences. Let this visual journey spark your wanderlust!
            </p>

            <div
              className="video-container"
              style={{
                position: "relative",
                marginTop: "30px",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                maxWidth: "800px",
                margin: "30px auto",
              }}
            >
              <video
                width="100%"
                height="auto"
                controls
                poster="/images/image 7.jpg"
                style={{ borderRadius: "20px" }}
              >
                <source src="/videos/video5.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div
                className="video-overlay"
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  width: "100%",
                  padding: "20px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                  color: "white",
                  textAlign: "left",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                }}
              >
                🌏 Discover hidden gems across the globe
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}