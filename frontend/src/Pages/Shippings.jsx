import React from "react";
import { Link } from "react-router-dom";

const ShippingInfo = () => {
  const shippingMethods = [
    {
      icon: "bi-truck",
      title: "Standard Delivery",
      time: "3-5 Business Days",
      price: "$5.99",
      freeThreshold: "Free on orders over $50",
      description: "Our most popular option. Reliable delivery to your doorstep within 3-5 business days."
    },
    {
      icon: "bi-lightning-charge",
      title: "Express Delivery",
      time: "1-2 Business Days",
      price: "$12.99",
      freeThreshold: null,
      description: "Need it faster? Get your fresh produce delivered in 1-2 business days."
    },
    {
      icon: "bi-shop",
      title: "Store Pickup",
      time: "Same Day",
      price: "FREE",
      freeThreshold: "Always free",
      description: "Order online and pick up from our nearest store location within hours."
    }
  ];

  const deliveryAreas = [
    { city: "California", time: "2-3 days", available: true },
    { city: "New York", time: "3-4 days", available: true },
    { city: "Texas", time: "3-5 days", available: true },
    { city: "Florida", time: "4-5 days", available: true },
    { city: "Illinois", time: "3-4 days", available: true },
    { city: "Other States", time: "5-7 days", available: true }
  ];

  return (
    <div>
      {/* Page Header */}
      <section className="bg-success bg-opacity-10 py-4 mb-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="fw-bold mb-0">Shipping Information</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-decoration-none text-muted">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/help" className="text-decoration-none text-muted">Help</Link>
                  </li>
                  <li className="breadcrumb-item active text-success" aria-current="page">Shipping Info</li>
                </ol>
              </nav>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <span className="text-muted">Fast & reliable delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <span className="badge bg-success bg-opacity-10 text-success mb-3 px-3 py-2">Delivery You Can Trust</span>
              <h2 className="fw-bold display-5 mb-4">Fresh Products, <span className="text-success">Delivered Fast</span></h2>
              <p className="lead text-muted mb-4">
                We understand that freshness matters. That's why we've partnered with the best logistics providers to ensure your organic produce arrives at your doorstep in perfect condition.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <div className="d-flex align-items-center">
                  <i className="bi bi-check-circle-fill text-success fs-4 me-2"></i>
                  <span className="fw-medium">Temperature Controlled</span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-check-circle-fill text-success fs-4 me-2"></i>
                  <span className="fw-medium">Real-time Tracking</span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-check-circle-fill text-success fs-4 me-2"></i>
                  <span className="fw-medium">Eco-friendly Packaging</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="position-relative">
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop" 
                  alt="Delivery" 
                  className="img-fluid rounded-4 shadow-lg"
                />
                <div className="position-absolute bottom-0 start-0 m-4 bg-white rounded-3 p-3 shadow-lg">
                  <div className="d-flex align-items-center">
                    <div className="bg-success rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "50px", height: "50px" }}>
                      <i className="bi bi-truck text-white fs-4"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0">Free Shipping</h6>
                      <small className="text-muted">On orders over $50</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Methods */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-success fw-bold text-uppercase ls-2">Shipping Options</span>
            <h2 className="fw-bold mt-2">Choose Your Delivery Method</h2>
            <p className="text-muted">Flexible options to suit your needs</p>
          </div>

          <div className="row g-4">
            {shippingMethods.map((method, idx) => (
              <div key={idx} className="col-md-4">
                <div className="card border-0 shadow-sm rounded-4 h-100 p-4 text-center">
                  <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "80px", height: "80px" }}>
                    <i className={`bi ${method.icon} text-success fs-1`}></i>
                  </div>
                  <h5 className="fw-bold mb-2">{method.title}</h5>
                  <div className="mb-3">
                    <span className="badge bg-dark mb-2">{method.time}</span>
                    <h4 className="text-success fw-bold mb-1">{method.price}</h4>
                    {method.freeThreshold && <small className="text-muted">{method.freeThreshold}</small>}
                  </div>
                  <p className="text-muted mb-0">{method.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Areas */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <h3 className="fw-bold mb-4">Delivery Areas & Times</h3>
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-borderless mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th className="ps-4">Location</th>
                          <th>Delivery Time</th>
                          <th className="text-end pe-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {deliveryAreas.map((area, idx) => (
                          <tr key={idx} className="border-bottom">
                            <td className="ps-4 fw-medium">{area.city}</td>
                            <td className="text-muted">{area.time}</td>
                            <td className="text-end pe-4">
                              <span className={`badge ${area.available ? 'bg-success' : 'bg-secondary'} bg-opacity-10 ${area.available ? 'text-success' : 'text-secondary'}`}>
                                {area.available ? 'Available' : 'Coming Soon'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h3 className="fw-bold mb-4">How It Works</h3>
              <div className="d-flex flex-column gap-4">
                <div className="d-flex">
                  <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: "50px", height: "50px" }}>
                    <span className="fw-bold fs-5">1</span>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Place Your Order</h6>
                    <p className="text-muted mb-0">Select your fresh organic products and proceed to checkout.</p>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: "50px", height: "50px" }}>
                    <span className="fw-bold fs-5">2</span>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">We Pack with Care</h6>
                    <p className="text-muted mb-0">Your items are carefully packed in temperature-controlled boxes.</p>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: "50px", height: "50px" }}>
                    <span className="fw-bold fs-5">3</span>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Fast Delivery</h6>
                    <p className="text-muted mb-0">Track your order in real-time until it reaches your doorstep.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-success text-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Ready to Order?</h2>
          <p className="lead opacity-75 mb-4">Get fresh organic produce delivered to your doorstep today!</p>
          <Link to="/shop" className="btn btn-light btn-lg rounded-pill px-5 fw-bold text-success">
            Shop Now <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>
      </section>

      <style>{`
        .ls-2 {
          letter-spacing: 2px;
        }
      `}</style>
    </div>
  );
};

export default ShippingInfo;