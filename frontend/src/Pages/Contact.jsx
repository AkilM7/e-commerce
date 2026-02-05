import React, { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Message sent successfully! We'll get back to you soon.");
  };

  const contactInfo = [
    {
      icon: "bi-geo-alt-fill",
      title: "Our Address",
      details: ["123 Street, California", "USA 90210"],
      color: "success"
    },
    {
      icon: "bi-telephone-fill",
      title: "Phone Number",
      details: ["+2 392 3929 210", "+2 392 3929 211"],
      color: "warning"
    },
    {
      icon: "bi-envelope-fill",
      title: "Email Address",
      details: ["info@vegefoods.com", "support@vegefoods.com"],
      color: "info"
    },
    {
      icon: "bi-clock-fill",
      title: "Working Hours",
      details: ["Mon - Sat: 9:00 - 18:00", "Sunday: Closed"],
      color: "danger"
    }
  ];

  return (
    <div>
      {/* Page Header */}
      <section className="bg-success bg-opacity-10 py-4 mb-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="fw-bold mb-0">Contact Us</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-decoration-none text-muted">Home</Link>
                  </li>
                  <li className="breadcrumb-item active text-success" aria-current="page">Contact</li>
                </ol>
              </nav>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <span className="text-muted">Get in touch with us</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {contactInfo.map((info, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm h-100 text-center p-4 contact-info-card">
                  <div className={`bg-${info.color} bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3`} 
                       style={{ width: "70px", height: "70px" }}>
                    <i className={`bi ${info.icon} text-${info.color} fs-2`}></i>
                  </div>
                  <h5 className="fw-bold mb-3">{info.title}</h5>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-muted mb-1">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-5">
            {/* Contact Form */}
            <div className="col-lg-7">
              <div className="card border-0 shadow-lg rounded-4">
                <div className="card-body p-4 p-md-5">
                  <div className="mb-4">
                    <span className="badge bg-success bg-opacity-10 text-success mb-2">Get In Touch</span>
                    <h2 className="fw-bold">Send us a Message</h2>
                    <p className="text-muted">Have questions about our products or delivery? Reach out to us anytime!</p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-medium">Your Name</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0">
                            <i className="bi bi-person text-success"></i>
                          </span>
                          <input
                            type="text"
                            name="name"
                            className="form-control border-start-0 bg-light"
                            placeholder="John Doe"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-medium">Your Email</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0">
                            <i className="bi bi-envelope text-success"></i>
                          </span>
                          <input
                            type="email"
                            name="email"
                            className="form-control border-start-0 bg-light"
                            placeholder="john@example.com"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <label className="form-label fw-medium">Subject</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0">
                            <i className="bi bi-chat-left-text text-success"></i>
                          </span>
                          <input
                            type="text"
                            name="subject"
                            className="form-control border-start-0 bg-light"
                            placeholder="How can we help you?"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <label className="form-label fw-medium">Your Message</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0 align-items-start pt-2">
                            <i className="bi bi-pencil text-success"></i>
                          </span>
                          <textarea
                            name="message"
                            className="form-control border-start-0 bg-light"
                            rows="5"
                            placeholder="Write your message here..."
                            onChange={handleChange}
                            required
                          ></textarea>
                        </div>
                      </div>

                      <div className="col-12">
                        <button type="submit" className="btn btn-success btn-lg w-100 rounded-pill">
                          <i className="bi bi-send-fill me-2"></i>
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Map & Additional Info */}
            <div className="col-lg-5">
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-4">
                <div className="ratio ratio-4x3">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.715220363292!2d-118.245318684787!3d34.05223418060604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c648fa1d4803%3A0xdec27bf11f9fd336!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1635959567400!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                  ></iframe>
                </div>
              </div>

              {/* Quick Support */}
              <div className="card border-0 shadow-sm rounded-4 bg-success text-white">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-3">
                    <i className="bi bi-headset me-2"></i>
                    Need Quick Support?
                  </h5>
                  <p className="opacity-75 mb-4">
                    Our support team is available 24/7 to assist you with any questions or concerns.
                  </p>
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-white bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "45px", height: "45px" }}>
                      <i className="bi bi-telephone-fill fs-5"></i>
                    </div>
                    <div>
                      <small className="opacity-75 d-block">Call us at</small>
                      <span className="fw-bold fs-5">+2 392 3929 210</span>
                    </div>
                  </div>
                  <Link to="tel:+23923929210" className="btn btn-light w-100 rounded-pill fw-bold text-success">
                    Call Now
                  </Link>
                </div>
              </div>

              {/* Social Links */}
              <div className="text-center mt-4">
                <p className="text-muted mb-3">Follow us on social media</p>
                <div className="d-flex justify-content-center gap-3">
                  <a href="#" className="btn btn-outline-success rounded-circle" style={{ width: "45px", height: "45px" }}>
                    <i className="bi bi-facebook fs-5"></i>
                  </a>
                  <a href="#" className="btn btn-outline-success rounded-circle" style={{ width: "45px", height: "45px" }}>
                    <i className="bi bi-twitter fs-5"></i>
                  </a>
                  <a href="#" className="btn btn-outline-success rounded-circle" style={{ width: "45px", height: "45px" }}>
                    <i className="bi bi-instagram fs-5"></i>
                  </a>
                  <a href="#" className="btn btn-outline-success rounded-circle" style={{ width: "45px", height: "45px" }}>
                    <i className="bi bi-linkedin fs-5"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-success fw-bold text-uppercase ls-2">FAQ</span>
            <h2 className="fw-bold mt-2">Frequently Asked Questions</h2>
            <p className="text-muted">Find quick answers to common questions</p>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h6 className="fw-bold mb-3 text-success">
                    <i className="bi bi-question-circle-fill me-2"></i>
                    What are your delivery hours?
                  </h6>
                  <p className="text-muted mb-0 small">
                    We deliver from 8 AM to 8 PM, Monday through Saturday. Same-day delivery available for orders before 2 PM.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h6 className="fw-bold mb-3 text-success">
                    <i className="bi bi-question-circle-fill me-2"></i>
                    How do I track my order?
                  </h6>
                  <p className="text-muted mb-0 small">
                    Once your order is shipped, you'll receive a tracking link via email and SMS to monitor your delivery in real-time.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h6 className="fw-bold mb-3 text-success">
                    <i className="bi bi-question-circle-fill me-2"></i>
                    What is your return policy?
                  </h6>
                  <p className="text-muted mb-0 small">
                    We offer a 100% satisfaction guarantee. If you're not happy with any product, we'll replace it or refund your money.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-muted">
              Can't find what you're looking for? 
              <Link to="/faq" className="text-success fw-bold text-decoration-none ms-1">View all FAQs</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style>{`
        .ls-2 {
          letter-spacing: 2px;
        }
        .contact-info-card {
          transition: all 0.3s ease;
        }
        .contact-info-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
        }
        .form-control:focus {
          box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
          border-color: #198754;
        }
        .input-group-text {
          transition: all 0.3s ease;
        }
        .form-control:focus + .input-group-text,
        .input-group:focus-within .input-group-text {
          background-color: #198754 !important;
          color: white !important;
        }
        .input-group:focus-within .input-group-text i {
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default Contact;