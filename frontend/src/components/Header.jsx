import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const location = useLocation();
  const [cartCount] = useState(3); // Example cart count

  const isActive = (path) => location.pathname === path ? "active" : "";

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />
      {/* Top Bar - Dark Green Theme */}
      <div className="py-2 bg-success text-white small">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4 mb-2 mb-md-0">
              <i className="bi bi-telephone-fill me-2"></i>
              <span>+1235 2355 98</span>
            </div>
            <div className="col-md-4 text-md-center mb-2 mb-md-0">
              <i className="bi bi-envelope-fill me-2"></i>
              <span>youremail@email.com</span>
            </div>
            <div className="col-md-4 text-md-end">
              <i className="bi bi-truck me-2"></i>
              <span>3–5 Business days delivery & Free Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-2" 
                 style={{ width: "45px", height: "45px" }}>
              <i className="bi bi-leaf fs-5"></i>
            </div>
            <div>
              <span className="fw-bold text-success fs-4">Vege</span>
              <span className="fw-bold text-dark fs-4">foods</span>
            </div>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={!isNavCollapsed ? true : false}
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation */}
          <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item mx-lg-2">
                <Link 
                  className={`nav-link fw-medium ${isActive('/') ? 'text-success active fw-bold' : 'text-dark'}`} 
                  to="/"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item mx-lg-2">
                <Link 
                  className={`nav-link fw-medium ${isActive('/shop') ? 'text-success active fw-bold' : 'text-dark'}`} 
                  to="/shop"
                >
                  Shop
                </Link>
              </li>

              <li className="nav-item mx-lg-2">
                <Link 
                  className={`nav-link fw-medium ${isActive('/about') ? 'text-success active fw-bold' : 'text-dark'}`} 
                  to="/about"
                >
                  About
                </Link>
              </li>

              <li className="nav-item mx-lg-2">
                <Link 
                  className={`nav-link fw-medium ${isActive('/contact') ? 'text-success active fw-bold' : 'text-dark'}`} 
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* Right Side Actions */}
            <ul className="navbar-nav ms-lg-auto align-items-lg-center">
              {/* Search */}
              <li className="nav-item me-lg-4">
                <div className="input-group">
                  <input 
                    type="text" 
                    className="form-control form-control-sm border-end-0 bg-light" 
                    placeholder="Search..."
                    style={{ maxWidth: "150px" }}
                  />
                  <span className="input-group-text bg-light border-start-0">
                    <i className="bi bi-search text-success"></i>
                  </span>
                </div>
              </li>

              {/* User */}
              <li className="nav-item dropdown me-lg-3">
                <a
                  className="nav-link text-dark"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person fs-5"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg rounded-3">
                  <li><Link className="dropdown-item py-2" to="/login">Login</Link></li>
                  <li><Link className="dropdown-item py-2" to="/register">Register</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item py-2" to="/profile">My Account</Link></li>
                  <li><Link className="dropdown-item py-2" to="/orders">My Orders</Link></li>
                </ul>
              </li>

              {/* Cart */}
              <li className="nav-item">
                <Link className="nav-link position-relative" to="/cart">
                  <div className="bg-success bg-opacity-10 rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: "42px", height: "42px" }}>
                    <i className="bi bi-cart3 fs-5 text-success"></i>
                  </div>
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.7rem" }}>
                      {cartCount}
                      <span className="visually-hidden">items in cart</span>
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Custom Styles */}
      <style>{`
        .dropdown-menu {
          animation: fadeIn 0.2s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .nav-link {
          position: relative;
          padding: 0.5rem 1rem !important;
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 1rem;
          right: 1rem;
          height: 2px;
          background-color: #198754;
          border-radius: 2px;
        }
        .navbar-toggler:focus {
          box-shadow: none;
        }
        @media (max-width: 991px) {
          .nav-link.active::after {
            left: 0;
            right: auto;
            width: 30px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;