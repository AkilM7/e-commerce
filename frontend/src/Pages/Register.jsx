import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import debounce from "lodash/debounce";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [checking, setChecking] = useState({ email: false, mobile: false });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Debounced check for email/mobile existence
  const checkExistence = useCallback(
    debounce(async (field, value) => {
      if (!value) return;
      
      setChecking((prev) => ({ ...prev, [field]: true }));
      try {
        const response = await api.post("/check-user-exists/", {
          [field]: value,
        });
        
        if (response.data.exists) {
          setFieldErrors((prev) => ({
            ...prev,
            [field]: `This ${field} is already registered`,
          }));
        } else {
          setFieldErrors((prev) => ({ ...prev, [field]: "" }));
        }
      } catch (err) {
        console.error("Check existence error:", err);
      } finally {
        setChecking((prev) => ({ ...prev, [field]: false }));
      }
    }, 500),
    []
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue,
    });

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }

    // Check email/mobile existence while typing
    if (name === "email" || name === "mobile") {
      checkExistence(name, newValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check if there are field errors
    if (fieldErrors.email || fieldErrors.mobile) {
      setError("Please fix the errors before submitting");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (!formData.agreeTerms) {
      setError("Please agree to the terms and conditions!");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/register/", {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
        password_confirm: formData.confirmPassword,
      });

      // Store tokens
      const { access, refresh, user } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("user", JSON.stringify(user));

      // Set auth header
      api.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      // Redirect to home page immediately
      navigate("/");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.email?.[0] ||
        err.response?.data?.mobile?.[0] ||
        err.response?.data?.password?.[0] ||
        "Registration failed. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    window.location.href = `http://localhost:8000/api/auth/${provider}/`;
  };

  return (
    <div>
      {/* Page Header */}
      <section className="bg-success bg-opacity-10 py-4 mb-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="fw-bold mb-0">Register</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-decoration-none text-muted">
                      Home
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item active text-success"
                    aria-current="page"
                  >
                    Register
                  </li>
                </ol>
              </nav>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <span className="text-muted">Create your account</span>
            </div>
          </div>
        </div>
      </section>

      {/* Register Section */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-8">
              {/* Register Card */}
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                {/* Card Header */}
                <div className="bg-success text-white text-center p-4">
                  <div
                    className="bg-white bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{ width: "70px", height: "70px" }}
                  >
                    <i className="bi bi-person-plus-fill fs-1"></i>
                  </div>
                  <h3 className="fw-bold mb-1">Create Account!</h3>
                  <p className="mb-0 opacity-75">Join our community today</p>
                </div>

                <div className="card-body p-4 p-md-5">
                  {/* Error Alert */}
                  {error && (
                    <div
                      className="alert alert-danger alert-dismissible fade show"
                      role="alert"
                    >
                      <i className="bi bi-exclamation-triangle-fill me-2"></i>
                      {error}
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setError("")}
                      ></button>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className="mb-3">
                      <label className="form-label fw-medium text-muted small">
                        FULL NAME
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <i className="bi bi-person text-success"></i>
                        </span>
                        <input
                          type="text"
                          name="name"
                          className="form-control border-start-0 bg-light"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Email & Mobile Row */}
                    <div className="row g-2">
                      <div className="col-md-7 mb-3">
                        <label className="form-label fw-medium text-muted small">
                          EMAIL ADDRESS
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0">
                            <i className="bi bi-envelope text-success"></i>
                          </span>
                          <input
                            type="email"
                            name="email"
                            className={`form-control border-start-0 bg-light ${
                              fieldErrors.email ? "is-invalid" : ""
                            }`}
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                          {checking.email && (
                            <span className="input-group-text bg-light">
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                              ></span>
                            </span>
                          )}
                        </div>
                        {fieldErrors.email && (
                          <div className="invalid-feedback d-block">
                            {fieldErrors.email}
                          </div>
                        )}
                      </div>
                      <div className="col-md-5 mb-3">
                        <label className="form-label fw-medium text-muted small">
                          MOBILE
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0">
                            <i className="bi bi-phone text-success"></i>
                          </span>
                          <input
                            type="tel"
                            name="mobile"
                            className={`form-control border-start-0 bg-light ${
                              fieldErrors.mobile ? "is-invalid" : ""
                            }`}
                            placeholder="Mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                          />
                          {checking.mobile && (
                            <span className="input-group-text bg-light">
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                              ></span>
                            </span>
                          )}
                        </div>
                        {fieldErrors.mobile && (
                          <div className="invalid-feedback d-block">
                            {fieldErrors.mobile}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                      <label className="form-label fw-medium text-muted small">
                        PASSWORD
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <i className="bi bi-lock text-success"></i>
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className="form-control border-start-0 border-end-0 bg-light"
                          placeholder="Create password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        <span
                          className="input-group-text bg-light border-start-0"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ cursor: "pointer" }}
                        >
                          <i
                            className={`bi ${
                              showPassword ? "bi-eye-slash" : "bi-eye"
                            } text-muted`}
                          ></i>
                        </span>
                      </div>
                      <div className="form-text small">
                        <i className="bi bi-info-circle me-1"></i>
                        Password must be at least 8 characters
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-3">
                      <label className="form-label fw-medium text-muted small">
                        CONFIRM PASSWORD
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <i className="bi bi-lock-fill text-success"></i>
                        </span>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          className="form-control border-start-0 border-end-0 bg-light"
                          placeholder="Confirm password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                        <span
                          className="input-group-text bg-light border-start-0"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <i
                            className={`bi ${
                              showConfirmPassword
                                ? "bi-eye-slash"
                                : "bi-eye"
                            } text-muted`}
                          ></i>
                        </span>
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="mb-4">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          className="form-check-input"
                          id="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                          required
                        />
                        <label
                          className="form-check-label text-muted small"
                          htmlFor="agreeTerms"
                        >
                          I agree to the{" "}
                          <Link
                            to="/terms"
                            className="text-success text-decoration-none"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            to="/privacy"
                            className="text-success text-decoration-none"
                          >
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn btn-success btn-lg w-100 rounded-pill mb-4"
                      disabled={
                        loading ||
                        fieldErrors.email ||
                        fieldErrors.mobile ||
                        checking.email ||
                        checking.mobile
                      }
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-person-plus me-2"></i>
                          Create Account
                        </>
                      )}
                    </button>

                    {/* Divider */}
                    <div className="text-center mb-4">
                      <span className="text-muted small">
                        OR SIGN UP WITH
                      </span>
                    </div>

                    {/* Social Register */}
                    <div className="row g-2 mb-4">
                      <div className="col-6">
                        <button
                          type="button"
                          className="btn btn-outline-secondary w-100 rounded-pill"
                          onClick={() => handleSocialRegister("google")}
                        >
                          <i className="bi bi-google text-danger me-2"></i>
                          Google
                        </button>
                      </div>
                      <div className="col-6">
                        <button
                          type="button"
                          className="btn btn-outline-secondary w-100 rounded-pill"
                          onClick={() => handleSocialRegister("facebook")}
                        >
                          <i className="bi bi-facebook text-primary me-2"></i>
                          Facebook
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* Login Link */}
                  <div className="text-center pt-3 border-top">
                    <p className="text-muted mb-0">
                      Already have an account?
                      <Link
                        to="/login"
                        className="text-success fw-bold text-decoration-none ms-1"
                      >
                        Sign In
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="row g-3 mt-4">
                <div className="col-4 text-center">
                  <div className="bg-white rounded-3 shadow-sm p-3">
                    <i className="bi bi-truck text-success fs-3 mb-2 d-block"></i>
                    <small className="text-muted d-block">Free Delivery</small>
                  </div>
                </div>
                <div className="col-4 text-center">
                  <div className="bg-white rounded-3 shadow-sm p-3">
                    <i className="bi bi-gift text-success fs-3 mb-2 d-block"></i>
                    <small className="text-muted d-block">
                      Special Offers
                    </small>
                  </div>
                </div>
                <div className="col-4 text-center">
                  <div className="bg-white rounded-3 shadow-sm p-3">
                    <i className="bi bi-shield-check text-success fs-3 mb-2 d-block"></i>
                    <small className="text-muted d-block">Secure</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style>{`
        .form-control:focus {
          box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
          border-color: #198754;
        }
        .form-check-input:checked {
          background-color: #198754;
          border-color: #198754;
        }
        .input-group:focus-within .input-group-text {
          background-color: #e9ecef;
        }
      `}</style>
    </div>
  );
};

export default Register;