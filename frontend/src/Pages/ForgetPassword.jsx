import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
  };

  return (
    <div>
      {/* Page Header */}
      <section className="bg-success bg-opacity-10 py-4 mb-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="fw-bold mb-0">Forgot Password</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-decoration-none text-muted">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/login" className="text-decoration-none text-muted">Login</Link>
                  </li>
                  <li className="breadcrumb-item active text-success" aria-current="page">Forgot Password</li>
                </ol>
              </nav>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <span className="text-muted">Reset your password</span>
            </div>
          </div>
        </div>
      </section>

      {/* Forgot Password Section */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5 col-xl-8">
              {/* Forgot Password Card */}
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                {/* Card Header */}
                <div className="bg-success text-white text-center p-4">
                  <div className="bg-white bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" 
                       style={{ width: "70px", height: "70px" }}>
                    <i className="bi bi-shield-lock-fill fs-1"></i>
                  </div>
                  <h3 className="fw-bold mb-1">Forgot Password?</h3>
                  <p className="mb-0 opacity-75">No worries, we'll help you reset it</p>
                </div>

                <div className="card-body p-4 p-md-5">
                  {!isSubmitted ? (
                    <>
                      <div className="text-center mb-4">
                        <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" 
                             style={{ width: "60px", height: "60px" }}>
                          <i className="bi bi-envelope-open text-success fs-2"></i>
                        </div>
                        <p className="text-muted">
                          Enter your email address and we'll send you a link to reset your password.
                        </p>
                      </div>

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
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-success btn-lg w-100 rounded-pill mb-4">
                          <i className="bi bi-send-fill me-2"></i>
                          Send Reset Link
                        </button>
                      </form>

                      {/* Back to Login */}
                      <div className="text-center">
                        <p className="text-muted mb-0">
                          <i className="bi bi-arrow-left me-1"></i>
                          Remember your password? 
                          <Link to="/login" className="text-success fw-bold text-decoration-none ms-1">
                            Back to Login
                          </Link>
                        </p>
                      </div>
                    </>
                  ) : (
                    // Success State
                    <div className="text-center py-4">
                      <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" 
                           style={{ width: "80px", height: "80px" }}>
                        <i className="bi bi-check-circle-fill text-success fs-1"></i>
                      </div>
                      <h4 className="fw-bold mb-3">Check Your Email!</h4>
                      <p className="text-muted mb-4">
                        We've sent a password reset link to <strong className="text-dark">{email}</strong>. 
                        Please check your inbox and follow the instructions to reset your password.
                      </p>
                      <div className="alert alert-success bg-success bg-opacity-10 border-0 text-success" role="alert">
                        <i className="bi bi-info-circle me-2"></i>
                        Link expires in 24 hours
                      </div>
                      <div className="d-grid gap-2 mt-4">
                        <Link to="/login" className="btn btn-success rounded-pill">
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Back to Login
                        </Link>
                        <button 
                          className="btn btn-outline-secondary rounded-pill"
                          onClick={() => {
                            setIsSubmitted(false);
                            setEmail("");
                          }}
                        >
                          <i className="bi bi-arrow-counterclockwise me-2"></i>
                          Try Another Email
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Help Section */}
              <div className="card border-0 shadow-sm rounded-4 mt-4 bg-light">
                <div className="card-body p-4 text-center">
                  <h6 className="fw-bold mb-3">
                    <i className="bi bi-question-circle text-success me-2"></i>
                    Need Help?
                  </h6>
                  <p className="text-muted small mb-3">
                    If you're having trouble accessing your account, our support team is here to help.
                  </p>
                  <Link to="/contact" className="btn btn-outline-success btn-sm rounded-pill">
                    <i className="bi bi-headset me-1"></i>
                    Contact Support
                  </Link>
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
        .input-group:focus-within .input-group-text {
          background-color: #e9ecef;
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;