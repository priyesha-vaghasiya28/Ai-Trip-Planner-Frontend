import React from 'react';

const Footer = () => {
  return (
    <footer className="py-4 mt-5 text-white" style={{ backgroundColor: '#0D47A1' }}>
      <div className="container text-center">
        <p>&copy; 2025 JourneyBot. All rights reserved.</p>
        <div className="d-flex justify-content-center gap-3">
          <a href="/about" className="text-white">About Us</a>
          <a href="/contact" className="text-white">Contact Us</a>
          <a href="/privacy" className="text-white">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;