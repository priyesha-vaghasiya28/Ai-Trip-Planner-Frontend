import React from 'react';

const Contact = () => {
  return (
    <div>
      <div className="p-5 text-center bg-light rounded-3 mb-5">
        <h1 className="display-5 fw-bold text-primary">Contact Us</h1>
        <p className="lead text-secondary">We'd love to hear from you!</p>
      </div>
      <div className="card shadow-lg p-5">
        <div className="row g-4">
          <div className="col-md-6">
            <h5 className="text-primary-custom fw-bold">Get in Touch</h5>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" required />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea className="form-control" id="message" rows="4" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary-custom">Send Message</button>
            </form>
          </div>
          <div className="col-md-6">
            <h5 className="text-primary-custom fw-bold">Our Office</h5>
            <p className="text-secondary">
              123 AI Avenue, <br />
              Innovation City, 12345 <br />
              EasyTrip.ai Headquarters
            </p>
            <h5 className="text-primary-custom fw-bold mt-4">Follow Us</h5>
            <ul className="list-unstyled d-flex gap-3">
              {/* FIXED: Replaced '#' with valid placeholder links */}
              <li><a href="https://www.facebook.com/easytrip.ai" className="text-primary-custom">Facebook</a></li>
              <li><a href="https://www.twitter.com/easytrip.ai" className="text-primary-custom">Twitter</a></li>
              <li><a href="https://www.linkedin.com/company/easytrip.ai" className="text-primary-custom">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;