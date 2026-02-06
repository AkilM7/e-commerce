import React, { useState } from "react";
import { Link } from "react-router-dom";

const Returns = () => {
  const [activeStep, setActiveStep] = useState(null);

  const returnSteps = [
    {
      icon: "bi-box-seam",
      title: "Request Return",
      description: "Log into your account and go to 'My Orders'. Select the order you want to return and click 'Request Return'."
    },
    {
      icon: "bi-chat-dots",
      title: "Get Approval",
      description: "Our team will review your request within 24 hours and send you a return confirmation with instructions."
    },
    {
      icon: "bi-truck",
      title: "Ship Item Back",
      description: "Pack the item securely and attach the prepaid return label. Drop it off at any authorized location."
    },
    {
      icon: "bi-cash-stack",
      title: "Get Refunded",
      description: "Once we receive and inspect your return, your refund will be processed within 3-5 business days."
    }
  ];

  const returnReasons = [
    { icon: "bi-emoji-frown", title: "Damaged or Defective", desc: "Item arrived damaged or with quality issues" },
    { icon: "bi-box-arrow-in-left", title: "Wrong Item", desc: "Received different product than ordered" },
    { icon: "bi-calendar-x", title: "Expired Product", desc: "Product arrived past expiration date" },
    { icon: "bi-x-circle", title: "Changed Mind", desc: "Simply changed your mind (unopened items)" }
  ];

  return (
    <div>
      {/* Page Header */}
      <section className="bg-success bg-opacity-10 py-4 mb-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="fw-bold mb-0">Returns & Refunds</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-decoration-none text-muted">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/help" className="text-decoration-none text-muted">Help</Link>
                  </li>
                  <li className="breadcrumb-item active text-success" aria-current="page">Returns</li>
                </ol>
              </nav>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <span className="text-muted">Hassle-free returns</span>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Highlight */}
      <section className="py-5">
        <div className="container">
          <div className="card border-0 shadow-lg rounded-4 bg-success text-white overflow-hidden">
            <div className="card-body p-5 text-center position-relative">
              <div className="position-absolute top-0 end-0 opacity-10">
                <i className="bi bi-arrow-counterclockwise display-1" style={{ fontSize: "200px" }}></i>
              </div>
              <div className="position-relative z-1">
                <div className="bg-white bg-opacity-25 rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: "100px", height: "100px" }}>
                  <i className="bi bi-shield-check display-4"></i>
                </div>
                <h2 className="fw-bold display-5 mb-3">30-Day Money Back Guarantee</h2>
                <p className="lead opacity-75 mb-4">
                  Not satisfied with your purchase? Return it within 30 days for a full refund. No questions asked.
                </p>
                <div className="row justify-content-center g-4">
                  <div className="col-md-4">
                    <i className="bi bi-truck fs-1 mb-2 d-block"></i>
                    <h6 className="fw-bold">Free Returns</h6>
                    <small className="opacity-75">We cover return shipping</small>
                  </div>
                  <div className="col-md-4">
                    <i className="bi bi-clock-history fs-1 mb-2 d-block"></i>
                    <h6 className="fw-bold">Quick Processing</h6>
                    <small className="opacity-75">Refunds in 3-5 days</small>
                  </div>
                  <div className="col-md-4">
                    <i className="bi bi-patch-check fs-1 mb-2 d-block"></i>
                    <h6 className="fw-bold">No Restocking Fee</h6>
                    <small className="opacity-75">100% refund guaranteed</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Return Process */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-success fw-bold text-uppercase ls-2">Easy Returns</span>
            <h2 className="fw-bold mt-2">How to Return an Item</h2>
            <p className="text-muted">Four simple steps to complete your return</p>
          </div>

          <div className="row g-4">
            {returnSteps.map((step, idx) => (
              <div key={idx} className="col-md-6 col-lg-3">
                <div 
                  className={`card border-0 shadow-sm rounded-4 h-100 p-4 text-center cursor-pointer ${activeStep === idx ? 'border-success border-2' : ''}`}
                  onClick={() => setActiveStep(activeStep === idx ? null : idx)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "70px", height: "70px" }}>
                    <i className={`bi ${step.icon} text-success fs-2`}></i>
                  </div>
                  <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "30px", height: "30px" }}>
                    <span className="fw-bold small">{idx + 1}</span>
                  </div>
                  <h5 className="fw-bold mb-2">{step.title}</h5>
                  <p className="text-muted small mb-0">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Return Reasons */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <h3 className="fw-bold mb-4">Acceptable Return Reasons</h3>
              <div className="row g-3">
                {returnReasons.map((reason, idx) => (
                  <div key={idx} className="col-6">
                    <div className="card border-0 shadow-sm rounded-4 h-100 p-3 text-center">
                      <i className={`bi ${reason.icon} text-success fs-2 mb-2`}></i>
                      <h6 className="fw-bold mb-1">{reason.title}</h6>
                      <small className="text-muted">{reason.desc}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              <h3 className="fw-bold mb-4">Return Conditions</h3>
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <ul className="list-unstyled mb-0">
                    <li className="mb-3 d-flex">
                      <i className="bi bi-check-circle-fill text-success me-3 mt-1"></i>
                      <span>Items must be returned within 30 days of delivery</span>
                    </li>
                    <li className="mb-3 d-flex">
                      <i className="bi bi-check-circle-fill text-success me-3 mt-1"></i>
                      <span>Products must be in original packaging (if applicable)</span>
                    </li>
                    <li className="mb-3 d-flex">
                      <i className="bi bi-check-circle-fill text-success me-3 mt-1"></i>
                      <span>Perishable items must be reported within 24 hours</span>
                    </li>
                    <li className="mb-3 d-flex">
                      <i className="bi bi-check-circle-fill text-success me-3 mt-1"></i>
                      <span>Proof of purchase required for all returns</span>
                    </li>
                    <li className="mb-0 d-flex">
                      <i className="bi bi-x-circle-fill text-danger me-3 mt-1"></i>
                      <span>Opened or consumed perishable items cannot be returned</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="alert alert-info mt-4 d-flex align-items-center">
                <i className="bi bi-info-circle-fill fs-4 me-3"></i>
                <div>
                  <h6 className="fw-bold mb-1">Need Help?</h6>
                  <p className="mb-0 small">Contact our support team for assistance with your return.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h3 className="fw-bold mb-3">Ready to Start a Return?</h3>
          <p className="text-muted mb-4">Access your order history and initiate a return request.</p>
          <Link to="/account" className="btn btn-success btn-lg rounded-pill px-5">
            <i className="bi bi-box-arrow-in-right me-2"></i>
            Go to My Orders
          </Link>
        </div>
      </section>

      <style>{`
        .ls-2 {
          letter-spacing: 2px;
        }
        .cursor-pointer {
          transition: all 0.3s ease;
        }
        .cursor-pointer:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  );
};

export default Returns;