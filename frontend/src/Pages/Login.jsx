import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      {/* Page Header */}
      <section className="bg-success bg-opacity-10 py-4 mb-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="fw-bold mb-0">Login</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-decoration-none text-muted">Home</Link>
                  </li>
                  <li className="breadcrumb-item active text-success" aria-current="page">Login</li>
                </ol>
              </nav>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <span className="text-muted">Welcome back</span>
            </div>
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5 col-xl-8">
              {/* Login Card */}
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                {/* Card Header */}
                <div className="bg-success text-white text-center p-4">
                  <div className="bg-white bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" 
                       style={{ width: "70px", height: "70px" }}>
                    <i className="bi bi-person-fill fs-1"></i>
                  </div>
                  <h3 className="fw-bold mb-1">Welcome Back!</h3>
                  <p className="mb-0 opacity-75">Sign in to continue</p>
                </div>

                <div className="card-body p-4 p-md-5">
                  <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="mb-4">
                      <label className="form-label fw-medium text-muted small">EMAIL ADDRESS</label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-light border-end-0">
                          <i className="bi bi-envelope text-success"></i>
                        </span>
                        <input
                          type="email"
                          name="email"
                          className="form-control border-start-0 bg-light"
                          placeholder="Enter your email"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                      <label className="form-label fw-medium text-muted small">PASSWORD</label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-light border-end-0">
                          <i className="bi bi-lock text-success"></i>
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className="form-control border-start-0 border-end-0 bg-light"
                          placeholder="Enter your password"
                          onChange={handleChange}
                          required
                        />
                        <span 
                          className="input-group-text bg-light border-start-0 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ cursor: "pointer" }}
                        >
                          <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} text-muted`}></i>
                        </span>
                      </div>
                    </div>

                    {/* Remember & Forgot */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          name="remember"
                          className="form-check-input"
                          id="remember"
                          onChange={handleChange}
                        />
                        <label className="form-check-label text-muted small" htmlFor="remember">
                          Remember me
                        </label>
                      </div>
                      <Link to="/forgot-password" className="text-success text-decoration-none small fw-medium">
                        Forgot Password?
                      </Link>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-success btn-lg w-100 rounded-pill mb-4">
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Sign In
                    </button>

                    {/* Divider */}
                    <div className="text-center mb-4">
                      <span className="text-muted small">OR SIGN IN WITH</span>
                    </div>

                    {/* Social Login */}
                    <div className="row g-2 mb-4">
                      <div className="col-6">
                        <button type="button" className="btn btn-outline-secondary w-100 rounded-pill">
                          <i className="bi bi-google text-danger me-2"></i>
                          Google
                        </button>
                      </div>
                      <div className="col-6">
                        <button type="button" className="btn btn-outline-secondary w-100 rounded-pill">
                          <i className="bi bi-facebook text-primary me-2"></i>
                          Facebook
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* Register Link */}
                  <div className="text-center pt-3 border-top">
                    <p className="text-muted mb-0">
                      Don't have an account? 
                      <Link to="/register" className="text-success fw-bold text-decoration-none ms-1">
                        Create Account
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="row g-3 mt-4 text-center">
                <div className="col-4">
                  <div className="p-2">
                    <i className="bi bi-shield-check text-success fs-3"></i>
                    <small className="d-block text-muted mt-1">Secure</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-2">
                    <i className="bi bi-lightning-charge text-success fs-3"></i>
                    <small className="d-block text-muted mt-1">Fast</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-2">
                    <i className="bi bi-heart text-success fs-3"></i>
                    <small className="d-block text-muted mt-1">Trusted</small>
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
        .cursor-pointer {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Login;