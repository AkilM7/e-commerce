import React, { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Fresh Organic Tomatoes",
      price: 2.99,
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&h=200&fit=crop",
      quantity: 2,
      weight: "1kg",
      stock: 15
    },
    {
      id: 2,
      name: "Organic Carrots",
      price: 1.99,
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200&h=200&fit=crop",
      quantity: 1,
      weight: "500g",
      stock: 20
    },
    {
      id: 3,
      name: "Fresh Broccoli",
      price: 2.49,
      image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=200&h=200&fit=crop",
      quantity: 3,
      weight: "500g",
      stock: 10
    }
  ]);

  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.min(newQuantity, item.stock) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "save20") {
      setCouponApplied(true);
    } else {
      alert("Invalid coupon code!");
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = couponApplied ? subtotal * 0.2 : 0;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal - discount + shipping;

  const renderStars = () => (
    <>
      <i className="bi bi-star-fill text-warning small"></i>
      <i className="bi bi-star-fill text-warning small"></i>
      <i className="bi bi-star-fill text-warning small"></i>
      <i className="bi bi-star-fill text-warning small"></i>
      <i className="bi bi-star-fill text-warning small"></i>
    </>
  );

  return (
    <div>
      {/* Page Header */}
      <section className="bg-success bg-opacity-10 py-4 mb-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="fw-bold mb-0">Shopping Cart</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-decoration-none text-muted">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/shop" className="text-decoration-none text-muted">Shop</Link>
                  </li>
                  <li className="breadcrumb-item active text-success" aria-current="page">Cart</li>
                </ol>
              </nav>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <span className="text-muted">{cartItems.length} items in your cart</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-5">
        <div className="container">
          {cartItems.length === 0 ? (
            <div className="text-center py-5">
              <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: "120px", height: "120px" }}>
                <i className="bi bi-cart-x text-success display-1"></i>
              </div>
              <h3 className="fw-bold mb-3">Your Cart is Empty</h3>
              <p className="text-muted mb-4">Looks like you haven't added anything to your cart yet.</p>
              <Link to="/shop" className="btn btn-success btn-lg rounded-pill px-5">
                <i className="bi bi-shop me-2"></i>
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="row g-4">
              {/* Cart Items */}
              <div className="col-lg-8">
                <div className="card border-0 shadow-sm rounded-4">
                  <div className="card-body p-4">
                    <div className="table-responsive">
                      <table className="table table-borderless align-middle">
                        <thead className="border-bottom">
                          <tr>
                            <th style={{ width: "40%" }}>Product</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-end">Total</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item) => (
                            <tr key={item.id} className="border-bottom">
                              <td>
                                <div className="d-flex align-items-center gap-3">
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="rounded-3"
                                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                  />
                                  <div>
                                    <h6 className="fw-bold mb-1">{item.name}</h6>
                                    <small className="text-muted">{item.weight}</small>
                                    <div className="mt-1">{renderStars()}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="text-center">
                                <span className="fw-bold text-success">${item.price.toFixed(2)}</span>
                              </td>
                              <td>
                                <div className="input-group input-group-sm" style={{ maxWidth: "120px", margin: "0 auto" }}>
                                  <button 
                                    className="btn btn-outline-secondary"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <i className="bi bi-dash"></i>
                                  </button>
                                  <input 
                                    type="number" 
                                    className="form-control text-center"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                    min="1"
                                    max={item.stock}
                                  />
                                  <button 
                                    className="btn btn-outline-secondary"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <i className="bi bi-plus"></i>
                                  </button>
                                </div>
                                {item.quantity >= item.stock && (
                                  <small className="text-danger d-block text-center mt-1">Max stock reached</small>
                                )}
                              </td>
                              <td className="text-end">
                                <span className="fw-bold fs-5">${(item.price * item.quantity).toFixed(2)}</span>
                              </td>
                              <td className="text-end">
                                <button 
                                  className="btn btn-link text-danger p-0"
                                  onClick={() => removeItem(item.id)}
                                >
                                  <i className="bi bi-trash fs-5"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Cart Actions */}
                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mt-4 pt-3 border-top">
                      <Link to="/shop" className="btn btn-outline-success rounded-pill">
                        <i className="bi bi-arrow-left me-2"></i>
                        Continue Shopping
                      </Link>
                      <button 
                        className="btn btn-outline-danger rounded-pill"
                        onClick={() => setCartItems([])}
                      >
                        <i className="bi bi-trash me-2"></i>
                        Clear Cart
                      </button>
                    </div>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="card border-0 shadow-sm rounded-4 mt-4">
                  <div className="card-body p-4">
                    <h5 className="fw-bold mb-3">
                      <i className="bi bi-ticket-perforated text-success me-2"></i>
                      Coupon Code
                    </h5>
                    <div className="row g-2">
                      <div className="col-md-8">
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0">
                            <i className="bi bi-gift text-success"></i>
                          </span>
                          <input 
                            type="text" 
                            className="form-control border-start-0 bg-light"
                            placeholder="Enter coupon code (try: SAVE20)"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            disabled={couponApplied}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <button 
                          className={`btn w-100 rounded-pill ${couponApplied ? 'btn-success' : 'btn-outline-success'}`}
                          onClick={applyCoupon}
                          disabled={couponApplied || !couponCode}
                        >
                          {couponApplied ? (
                            <>
                              <i className="bi bi-check-circle me-2"></i>Applied
                            </>
                          ) : (
                            "Apply Coupon"
                          )}
                        </button>
                      </div>
                    </div>
                    {couponApplied && (
                      <div className="alert alert-success mt-3 mb-0">
                        <i className="bi bi-check-circle-fill me-2"></i>
                        Coupon applied! You saved 20% on your order.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="col-lg-4">
                <div className="card border-0 shadow-lg rounded-4 sticky-top" style={{ top: "20px" }}>
                  <div className="card-header bg-success text-white p-4 border-0">
                    <h5 className="fw-bold mb-0">
                      <i className="bi bi-receipt me-2"></i>
                      Order Summary
                    </h5>
                  </div>
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">Subtotal</span>
                      <span className="fw-bold">${subtotal.toFixed(2)}</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="d-flex justify-content-between mb-3 text-success">
                        <span>Discount (20%)</span>
                        <span className="fw-bold">-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">Shipping</span>
                      <span className={shipping === 0 ? "text-success fw-bold" : "fw-bold"}>
                        {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>

                    {shipping > 0 && (
                      <div className="alert alert-info py-2 small mb-3">
                        <i className="bi bi-info-circle me-2"></i>
                        Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                      </div>
                    )}

                    <hr className="my-4" />

                    <div className="d-flex justify-content-between mb-4">
                      <span className="fs-5 fw-bold">Total</span>
                      <span className="fs-3 fw-bold text-success">${total.toFixed(2)}</span>
                    </div>

                    <Link to="/checkout" className="btn btn-success btn-lg w-100 rounded-pill mb-3">
                      <i className="bi bi-credit-card me-2"></i>
                      Proceed to Checkout
                    </Link>

                    <div className="text-center">
                      <small className="text-muted">
                        <i className="bi bi-shield-check me-1"></i>
                        Secure Checkout
                      </small>
                    </div>

                    {/* Payment Methods */}
                    <div className="d-flex justify-content-center gap-3 mt-3 pt-3 border-top">
                      <i className="bi bi-credit-card fs-3 text-muted"></i>
                      <i className="bi bi-paypal fs-3 text-muted"></i>
                      <i className="bi bi-wallet2 fs-3 text-muted"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Custom Styles */}
      <style>{`
        .form-control:focus {
          box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
          border-color: #198754;
        }
        .table > tbody > tr:hover {
          background-color: rgba(25, 135, 84, 0.05);
        }
      `}</style>
    </div>
  );
};

export default Cart;