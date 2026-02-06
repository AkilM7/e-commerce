import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const lastUpdated = "January 1, 2024";

  const sections = [
    {
      id: "collection",
      title: "Information We Collect",
      icon: "bi-folder",
      content: [
        "Personal identification information (Name, email address, phone number, etc.)",
        "Billing and shipping address information",
        "Payment information (processed securely through our payment partners)",
        "Order history and preferences",
        "Device and browser information",
        "Cookies and usage data"
      ]
    },
    {
      id: "usage",
      title: "How We Use Your Information",
      icon: "bi-gear",
      content: [
        "Process and fulfill your orders",
        "Communicate with you about your orders and account",
        "Send promotional emails and newsletters (with your consent)",
        "Improve our website and services",
        "Prevent fraud and ensure security",
        "Comply with legal obligations"
      ]
    },
    {
      id: "sharing",
      title: "Information Sharing",
      icon: "bi-share",
      content: [
        "We do not sell your personal information to third parties",
        "We share information with trusted service providers (payment processors, shipping partners)",
        "We may disclose information when required by law",
        "We may share anonymized data for analytics purposes"
      ]
    },
    {
      id: "security",
      title: "Data Security",
      icon: "bi-shield-lock",
      content: [
        "We use industry-standard encryption (SSL/TLS)",
        "Regular security audits and assessments",
        "Restricted access to personal information",
        "Secure data storage with backup systems"
      ]
    },
    {
      id: "rights",
      title: "Your Rights",
      icon: "bi-person-check",
      content: [
        "Access your personal information",
        "Request correction of inaccurate data",
        "Request deletion of your data",
        "Opt-out of marketing communications",
        "Data portability",
        "Lodge a complaint with supervisory authorities"
      ]
    }
  ];

  return (
    <div>
      {/* Page Header */}
      <section className="bg-success bg-opacity-10 py-4 mb-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="fw-bold mb-0">Privacy Policy</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-decoration-none text-muted">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/help" className="text-decoration-none text-muted">Help</Link>
                  </li>
                  <li className="breadcrumb-item active text-success" aria-current="page">Privacy Policy</li>
                </ol>
              </nav>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <span className="text-muted">Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="card border-0 shadow-sm rounded-4 mb-5">
                <div className="card-body p-5 text-center">
                  <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: "100px", height: "100px" }}>
                    <i className="bi bi-shield-check text-success display-4"></i>
                  </div>
                  <h2 className="fw-bold mb-3">Your Privacy Matters</h2>
                  <p className="lead text-muted mb-0">
                    At Vegefoods, we are committed to protecting your personal information and being transparent about how we use it. This Privacy Policy explains our practices regarding data collection, use, and protection.
                  </p>
                </div>
              </div>

              {/* Quick Links */}
              <div className="row g-3 mb-5">
                {sections.map((section) => (
                  <div key={section.id} className="col-6 col-md-4 col-lg-3">
                    <a 
                      href={`#${section.id}`} 
                      className="card border-0 shadow-sm rounded-4 text-center p-3 text-decoration-none h-100 hover-bg-success hover-text-white"
                    >
                      <i className={`bi ${section.icon} text-success fs-2 mb-2`}></i>
                      <small className="fw-medium text-dark">{section.title}</small>
                    </a>
                  </div>
                ))}
              </div>

              {/* Policy Sections */}
              <div className="d-flex flex-column gap-4">
                {sections.map((section) => (
                  <div key={section.id} id={section.id} className="card border-0 shadow-sm rounded-4">
                    <div className="card-body p-4 p-md-5">
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "50px", height: "50px" }}>
                          <i className={`bi ${section.icon} text-success fs-4`}></i>
                        </div>
                        <h3 className="fw-bold mb-0">{section.title}</h3>
                      </div>
                      <ul className="list-unstyled mb-0">
                        {section.content.map((item, idx) => (
                          <li key={idx} className="mb-3 d-flex align-items-start">
                            <i className="bi bi-check-circle-fill text-success me-3 mt-1 flex-shrink-0"></i>
                            <span className="text-muted">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Section */}
              <div className="card border-0 shadow-sm rounded-4 mt-4 bg-success text-white">
                <div className="card-body p-4 p-md-5 text-center">
                  <h4 className="fw-bold mb-3">Questions About Our Privacy Policy?</h4>
                  <p className="opacity-75 mb-4">If you have any questions or concerns about how we handle your data, please don't hesitate to contact us.</p>
                  <Link to="/contact" className="btn btn-light rounded-pill px-4 fw-bold text-success">
                    <i className="bi bi-envelope me-2"></i>
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .hover-bg-success:hover {
          background-color: #198754 !important;
        }
        .hover-bg-success:hover i,
        .hover-bg-success:hover small {
          color: white !important;
        }
        .hover-bg-success {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;