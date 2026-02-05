import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />
      {/* Newsletter Section */}
      {/* <section className="bg-success py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h3 className="text-white fw-bold mb-2">
                <i className="bi bi-envelope-paper me-2"></i>
                Subscribe to Our Newsletter
              </h3>
              <p className="text-white opacity-75 mb-0">
                Get the latest updates on new products and exclusive offers
              </p>
            </div>
            <div className="col-lg-6">
              <form className="d-flex gap-2">
                <input 
                  type="email" 
                  className="form-control form-control-lg rounded-pill border-0" 
                  placeholder="Enter your email address"
                />
                <button type="submit" className="btn btn-dark btn-lg rounded-pill px-4 fw-bold">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section> */}

      {/* Main Footer */}
      <footer className="bg-dark text-white pt-5">
        <div className="container">
          <div className="row g-4">
            {/* Brand Column */}
            <div className="col-md-6 col-lg-3">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-2" 
                     style={{ width: "40px", height: "40px" }}>
                  <i className="bi bi-leaf fs-5"></i>
                </div>
                <div>
                  <span className="fw-bold text-success fs-4">Vege</span>
                  <span className="fw-bold text-white fs-4">foods</span>
                </div>
              </div>
              <p className="text-white opacity-75 mb-4">
                We deliver fresh organic vegetables and fruits directly to your doorstep. Quality and freshness guaranteed.
              </p>
              <div className="d-flex gap-3">
                <a href="#" className="btn btn-outline-light btn-sm rounded-circle" style={{ width: "38px", height: "38px" }}>
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="btn btn-outline-light btn-sm rounded-circle" style={{ width: "38px", height: "38px" }}>
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="btn btn-outline-light btn-sm rounded-circle" style={{ width: "38px", height: "38px" }}>
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="btn btn-outline-light btn-sm rounded-circle" style={{ width: "38px", height: "38px" }}>
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>

            {/* Menu Column */}
            <div className="col-md-6 col-lg-3">
              <h5 className="fw-bold mb-4 position-relative">
                Menu
                <span className="position-absolute bottom-0 start-0 bg-success" style={{ width: "40px", height: "3px", transform: "translateY(8px)" }}></span>
              </h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/" className="text-white text-decoration-none opacity-75 hover-opacity-100 d-flex align-items-center">
                    <i className="bi bi-chevron-right text-success me-2 small"></i>Home
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/shop" className="text-white text-decoration-none opacity-75 hover-opacity-100 d-flex align-items-center">
                    <i className="bi bi-chevron-right text-success me-2 small"></i>Shop
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className="text-white text-decoration-none opacity-75 hover-opacity-100 d-flex align-items-center">
                    <i className="bi bi-chevron-right text-success me-2 small"></i>About
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/contact" className="text-white text-decoration-none opacity-75 hover-opacity-100 d-flex align-items-center">
                    <i className="bi bi-chevron-right text-success me-2 small"></i>Contact
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/blog" className="text-white text-decoration-none opacity-75 hover-opacity-100 d-flex align-items-center">
                    <i className="bi bi-chevron-right text-success me-2 small"></i>Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Help Column */}
            <div className="col-md-6 col-lg-3">
              <h5 className="fw-bold mb-4 position-relative">
                Help
                <span className="position-absolute bottom-0 start-0 bg-success" style={{ width: "40px", height: "3px", transform: "translateY(8px)" }}></span>
              </h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/shipping" className="text-white text-decoration-none opacity-75 hover-opacity-100 d-flex align-items-center">
                    <i className="bi bi-chevron-right text-success me-2 small"></i>Shipping Info
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/returns" className="text-white text-decoration-none opacity-75 hover-opacity-100 d-flex align-items-center">
                    <i className="bi bi-chevron-right text-success me-2 small"></i>Returns
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/privacy" className="text-white text-decoration-none opacity-75 hover-opacity-100 d-flex align-items-center">
                    <i className="bi bi-chevron-right text-success me-2 small"></i>Privacy Policy
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/terms" className="text-white text-decoration-none opacity-75 hover-opacity-100 d-flex align-items-center">
                    <i className="bi bi-chevron-right text-success me-2 small"></i>Terms & Conditions
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/faq" className="text-white text-decoration-none opacity-75 hover-opacity-100 d-flex align-items-center">
                    <i className="bi bi-chevron-right text-success me-2 small"></i>FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="col-md-6 col-lg-3">
              <h5 className="fw-bold mb-4 position-relative">
                Contact Us
                <span className="position-absolute bottom-0 start-0 bg-success" style={{ width: "40px", height: "3px", transform: "translateY(8px)" }}></span>
              </h5>
              <ul className="list-unstyled">
                <li className="mb-3 d-flex">
                  <div className="bg-success bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: "40px", height: "40px" }}>
                    <i className="bi bi-geo-alt-fill text-success"></i>
                  </div>
                  <div>
                    <span className="text-white opacity-75">123 Street, California<br />USA 90210</span>
                  </div>
                </li>
                <li className="mb-3 d-flex">
                  <div className="bg-success bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: "40px", height: "40px" }}>
                    <i className="bi bi-telephone-fill text-success"></i>
                  </div>
                  <div>
                    <a href="tel:+23923929210" className="text-white text-decoration-none opacity-75">+2 392 3929 210</a>
                  </div>
                </li>
                <li className="mb-3 d-flex">
                  <div className="bg-success bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: "40px", height: "40px" }}>
                    <i className="bi bi-envelope-fill text-success"></i>
                  </div>
                  <div>
                    <a href="mailto:info@vegefoods.com" className="text-white text-decoration-none opacity-75">info@vegefoods.com</a>
                  </div>
                </li>
                <li className="d-flex">
                  <div className="bg-success bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: "40px", height: "40px" }}>
                    <i className="bi bi-clock-fill text-success"></i>
                  </div>
                  <div>
                    <span className="text-white opacity-75">Mon - Sat: 9:00 - 18:00</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <hr className="border-secondary my-5 opacity-25" />

          {/* Bottom Footer */}
          <div className="row align-items-center pb-4">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <span className="text-white opacity-75">
                © {new Date().getFullYear()} <span className="text-success fw-bold">Vegefoods</span>. All Rights Reserved.
              </span>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <span className="text-white opacity-75">
                Made with <i className="bi bi-heart-fill text-danger mx-1"></i> by 
                <a href="https://akilm7.github.io/akilm.com/" target="_blank" rel="noopener noreferrer" className="text-success text-decoration-none fw-bold ms-1 hover-text-white">
                  Akil M
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style>{`
        .hover-opacity-100:hover {
          opacity: 1 !important;
          color: #198754 !important;
          transition: all 0.3s ease;
        }
        .hover-text-white:hover {
          color: white !important;
          transition: all 0.3s ease;
        }
        footer a {
          transition: all 0.3s ease;
        }
        footer a:hover {
          padding-left: 5px;
        }
      `}</style>
    </>
  );
};

export default Footer;