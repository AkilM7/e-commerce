import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    sameAsShipping: false,
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: ""
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  const subtotal = 12.45;
  const shipping = 5.99;
  const total = subtotal + shipping;

  if (orderPlaced) {
    return (
      <div>
        <section className="bg-success bg-opacity-10 py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6 text-center">
                <div className="bg-white rounded-4 shadow-lg p-5">
                  <div className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: "100px", height: "100px" }}>
                    <i className="bi bi-check-lg text-white display-1"></i>
                  </div>
                  <h2 className="fw-bold mb-3">Order Placed Successfully!</h2>
                  <p className="text-muted mb-4">Thank you for your purchase. Your order #12345 has been confirmed and will be delivered soon.</p>
                  <div className="alert alert-success bg-success bg-opacity-10 border-0 mb-4">
                    <i className="bi bi-envelope-check me-2"></i>
                    A confirmation email has been sent to your email address.
                  </div>
                  <div className="d-flex gap-3 justify-content-center">
                    <Link to="/shop" className="btn btn-success rounded-pill px-4">
                      Continue Shopping
                    </Link>
                    <Link to="/" className="btn btn-outline-secondary rounded-pill px-4">
                      Back to Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <section className="bg-success bg-opacity-10 py-4 mb-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="fw-bold mb-0">Checkout</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-decoration-none text-muted">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/cart" className="text-decoration-none text-muted">Cart</Link>
                  </li>
                  <li className="breadcrumb-item active text-success" aria-current="page">Checkout</li>
                </ol>
              </nav>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <div className="d-flex align-items-center justify-content-md-end gap-2">
                <div className={`rounded-circle d-flex align-items-center justify-content-center ${step >= 1 ? 'bg-success text-white' : 'bg-secondary text-white'}`} style={{ width: "30px", height: "30px" }}>
                  <i className="bi bi-geo-alt-fill small"></i>
                </div>
                <div className="bg-secondary" style={{ width: "30px", height: "2px" }}></div>
                <div className={`rounded-circle d-flex align-items-center justify-content-center ${step >= 2 ? 'bg-success text-white' : 'bg-secondary text-white'}`} style={{ width: "30px", height: "30px" }}>
                  <i className="bi bi-credit-card-fill small"></i>
                </div>
                <div className="bg-secondary" style={{ width: "30px", height: "2px" }}></div>
                <div className={`rounded-circle d-flex align-items-center justify-content-center ${step >= 3 ? 'bg-success text-white' : 'bg-secondary text-white'}`} style={{ width: "30px", height: "30px" }}>
                  <i className="bi bi-check-lg small"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="py-5">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              {/* Left Side - Forms */}
              <div className="col-lg-8">
                {/* Contact Information */}
                <div className="card border-0 shadow-sm rounded-4 mb-4">
                  <div className="card-header bg-white border-0 p-4">
                    <h5 className="fw-bold mb-0">
                      <span className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center me-2" style={{ width: "30px", height: "30px" }}>1</span>
                      Contact Information
                    </h5>
                  </div>
                  <div className="card-body p-4 pt-0">
                    <div className="mb-3">
                      <label className="form-label fw-medium">Email Address</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <i className="bi bi-envelope text-success"></i>
                        </span>
                        <input
                          type="email"
                          name="email"
                          className="form-control border-start-0 bg-light"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="newsletter" />
                      <label className="form-check-label text-muted" htmlFor="newsletter">
                        Email me with news and offers
                      </label>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="card border-0 shadow-sm rounded-4 mb-4">
                  <div className="card-header bg-white border-0 p-4">
                    <h5 className="fw-bold mb-0">
                      <span className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center me-2" style={{ width: "30px", height: "30px" }}>2</span>
                      Shipping Address
                    </h5>
                  </div>
                  <div className="card-body p-4 pt-0">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-medium">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          className="form-control bg-light"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-medium">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          className="form-control bg-light"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-medium">Address</label>
                        <input
                          type="text"
                          name="address"
                          className="form-control bg-light"
                          placeholder="123 Street Name"
                          value={formData.address}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label fw-medium">City</label>
                        <input
                          type="text"
                          name="city"
                          className="form-control bg-light"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label fw-medium">State</label>
                        <input
                          type="text"
                          name="state"
                          className="form-control bg-light"
                          placeholder="State"
                          value={formData.state}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label fw-medium">ZIP Code</label>
                        <input
                          type="text"
                          name="zip"
                          className="form-control bg-light"
                          placeholder="12345"
                          value={formData.zip}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-medium">Phone</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0">
                            <i className="bi bi-telephone text-success"></i>
                          </span>
                          <input
                            type="tel"
                            name="phone"
                            className="form-control border-start-0 bg-light"
                            placeholder="+1 234 567 890"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="card border-0 shadow-sm rounded-4 mb-4">
                  <div className="card-header bg-white border-0 p-4">
                    <h5 className="fw-bold mb-0">
                      <span className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center me-2" style={{ width: "30px", height: "30px" }}>3</span>
                      Payment Method
                    </h5>
                  </div>
                  <div className="card-body p-4 pt-0">
                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <div className={`card border-2 cursor-pointer ${formData.paymentMethod === 'card' ? 'border-success' : ''}`} onClick={() => setFormData({...formData, paymentMethod: 'card'})}>
                          <div className="card-body text-center">
                            <i className="bi bi-credit-card fs-1 text-success mb-2"></i>
                            <h6 className="mb-0">Credit Card</h6>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className={`card border-2 cursor-pointer ${formData.paymentMethod === 'paypal' ? 'border-success' : ''}`} onClick={() => setFormData({...formData, paymentMethod: 'paypal'})}>
                          <div className="card-body text-center">
                            <i className="bi bi-paypal fs-1 text-primary mb-2"></i>
                            <h6 className="mb-0">PayPal</h6>
                          </div>
                        </div>
                      </div>
                    </div>

                    {formData.paymentMethod === 'card' && (
                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label fw-medium">Card Number</label>
                          <div className="input-group">
                            <span className="input-group-text bg-light border-end-0">
                              <i className="bi bi-credit-card text-success"></i>
                            </span>
                            <input
                              type="text"
                              name="cardNumber"
                              className="form-control border-start-0 bg-light"
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <label className="form-label fw-medium">Cardholder Name</label>
                          <input
                            type="text"
                            name="cardName"
                            className="form-control bg-light"
                            placeholder="John Doe"
                            value={formData.cardName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-medium">Expiry Date</label>
                          <input
                            type="text"
                            name="expiry"
                            className="form-control bg-light"
                            placeholder="MM/YY"
                            value={formData.expiry}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-medium">CVV</label>
                          <input
                            type="text"
                            name="cvv"
                            className="form-control bg-light"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="d-flex gap-3">
                  <Link to="/cart" className="btn btn-outline-secondary rounded-pill px-4">
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Cart
                  </Link>
                  <button type="submit" className="btn btn-success btn-lg rounded-pill flex-fill">
                    <i className="bi bi-lock-fill me-2"></i>
                    Complete Order - ${total.toFixed(2)}
                  </button>
                </div>
              </div>

              {/* Right Side - Order Summary */}
              <div className="col-lg-4">
                <div className="card border-0 shadow-lg rounded-4 sticky-top" style={{ top: "20px" }}>
                  <div className="card-header bg-success text-white p-4 border-0">
                    <h5 className="fw-bold mb-0">
                      <i className="bi bi-cart-check me-2"></i>
                      Order Summary
                    </h5>
                  </div>
                  <div className="card-body p-4">
                    {/* Mini Cart Items */}
                    <div className="mb-4">
                      <div className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
                        <img 
                          src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=100&h=100&fit=crop" 
                          alt="Product" 
                          className="rounded-3"
                          style={{ width: "60px", height: "60px", objectFit: "cover" }}
                        />
                        <div className="flex-grow-1">
                          <h6 className="mb-0 fw-bold">Fresh Organic Tomatoes</h6>
                          <small className="text-muted">1kg × 2</small>
                        </div>
                        <span className="fw-bold">$5.98</span>
                      </div>
                      <div className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
                        <img 
                          src="https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=100&h=100&fit=crop" 
                          alt="Product" 
                          className="rounded-3"
                          style={{ width: "60px", height: "60px", objectFit: "cover" }}
                        />
                        <div className="flex-grow-1">
                          <h6 className="mb-0 fw-bold">Organic Carrots</h6>
                          <small className="text-muted">500g × 1</small>
                        </div>
                        <span className="fw-bold">$1.99</span>
                      </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Subtotal</span>
                      <span className="fw-bold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Shipping</span>
                      <span className="fw-bold">${shipping.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Tax</span>
                      <span className="fw-bold">Calculated at next step</span>
                    </div>

                    <hr className="my-3" />

                    <div className="d-flex justify-content-between mb-4">
                      <span className="fs-5 fw-bold">Total</span>
                      <span className="fs-3 fw-bold text-success">${total.toFixed(2)}</span>
                    </div>

                    {/* Trust Badges */}
                    <div className="bg-success bg-opacity-10 rounded-3 p-3 text-center">
                      <i className="bi bi-shield-lock text-success fs-2 mb-2 d-block"></i>
                      <small className="text-success fw-bold d-block">Secure Checkout</small>
                      <small className="text-muted">Your payment information is encrypted</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Custom Styles */}
      <style>{`
        .form-control:focus {
          box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
          border-color: #198754;
        }
        .cursor-pointer {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .cursor-pointer:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default Checkout;