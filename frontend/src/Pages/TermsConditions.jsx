import React from "react";
import { Link } from "react-router-dom";

const TermsConditions = () => {
  const lastUpdated = "January 1, 2024";

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: "By accessing and using the Vegefoods website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this website."
    },
    {
      id: "account",
      title: "2. User Account",
      content: "To access certain features of the website, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account."
    },
    {
      id: "products",
      title: "3. Products and Pricing",
      content: "All products are subject to availability. We reserve the right to discontinue any product at any time. Prices for our products are subject to change without notice. We reserve the right to modify or discontinue any product or service without notice at any time."
    },
    {
      id: "orders",
      title: "4. Orders and Payment",
      content: "By placing an order, you agree to provide current, complete, and accurate purchase and account information. We reserve the right to refuse any order you place with us. Payment must be received prior to the acceptance of an order."
    },
    {
      id: "shipping",
      title: "5. Shipping and Delivery",
      content: "We aim to deliver products within the estimated timeframes, but we are not responsible for delays beyond our control. Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier."
    },
    {
      id: "returns",
      title: "6. Returns and Refunds",
      content: "Our return and refund policy is designed to ensure your satisfaction. Please refer to our Returns page for detailed information about eligibility, timeframes, and procedures for returns and refunds."
    },
    {
      id: "liability",
      title: "7. Limitation of Liability",
      content: "Vegefoods shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service. Our total liability shall not exceed the amount you paid for the products in question."
    },
    {
      id: "intellectual",
      title: "8. Intellectual Property",
      content: "All content on this website, including text, graphics, logos, images, and software, is the property of Vegefoods and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission."
    },
    {
      id: "governing",
      title: "9. Governing Law",
      content: "These terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions."
    },
    {
      id: "changes",
      title: "10. Changes to Terms",
      content: "We reserve the right to update, change, or replace any part of these Terms of Service by posting updates to our website. It is your responsibility to check this page periodically for changes."
    }
  ];

  return (
    <div>
      {/* Page Header */}
      <section className="bg-success bg-opacity-10 py-4 mb-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="fw-bold mb-0">Terms & Conditions</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-decoration-none text-muted">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/help" className="text-decoration-none text-muted">Help</Link>
                  </li>
                  <li className="breadcrumb-item active text-success" aria-current="page">Terms & Conditions</li>
                </ol>
              </nav>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <span className="text-muted">Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              {/* Introduction */}
              <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body p-4 p-md-5">
                  <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: "80px", height: "80px" }}>
                    <i className="bi bi-file-text text-success display-5"></i>
                  </div>
                  <h2 className="fw-bold mb-3">Terms of Service</h2>
                  <p className="text-muted lead mb-0">
                    Please read these Terms and Conditions carefully before using our website. By accessing or using Vegefoods, you agree to be bound by these terms.
                  </p>
                </div>
              </div>

              {/* Table of Contents */}
              <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-3">Table of Contents</h5>
                  <div className="row g-2">
                    {sections.map((section) => (
                      <div key={section.id} className="col-md-6">
                        <a href={`#${section.id}`} className="text-decoration-none text-muted hover-text-success d-block py-1">
                          <i className="bi bi-chevron-right me-2 small"></i>
                          {section.title}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Terms Sections */}
              <div className="d-flex flex-column gap-4">
                {sections.map((section) => (
                  <div key={section.id} id={section.id} className="card border-0 shadow-sm rounded-4">
                    <div className="card-body p-4 p-md-5">
                      <h4 className="fw-bold mb-3 text-success">{section.title}</h4>
                      <p className="text-muted mb-0">{section.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Agreement Section */}
              <div className="card border-0 shadow-lg rounded-4 mt-4 bg-dark text-white">
                <div className="card-body p-4 p-md-5 text-center">
                  <i className="bi bi-hand-thumbs-up display-4 mb-3 d-block"></i>
                  <h4 className="fw-bold mb-3">Agreement</h4>
                  <p className="opacity-75 mb-4">
                    By using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                  </p>
                  <div className="d-flex flex-wrap justify-content-center gap-3">
                    <Link to="/contact" className="btn btn-outline-light rounded-pill px-4">
                      <i className="bi bi-question-circle me-2"></i>
                      Have Questions?
                    </Link>
                    <Link to="/privacy" className="btn btn-success rounded-pill px-4">
                      <i className="bi bi-shield-check me-2"></i>
                      Privacy Policy
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .hover-text-success:hover {
          color: #198754 !important;
        }
      `}</style>
    </div>
  );
};

export default TermsConditions;