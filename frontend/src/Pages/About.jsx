import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: "bi-leaf",
      title: "100% Organic",
      description: "We source only certified organic produce from trusted local farmers"
    },
    {
      icon: "bi-truck",
      title: "Fast Delivery",
      description: "Same-day delivery available for orders placed before 2 PM"
    },
    {
      icon: "bi-award",
      title: "Quality Guarantee",
      description: "Freshness guaranteed or your money back, no questions asked"
    },
    {
      icon: "bi-heart",
      title: "Made with Love",
      description: "Handpicked and packed with care for your family"
    }
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "500+", label: "Products" },
    { number: "50+", label: "Local Farmers" },
    { number: "15+", label: "Cities Served" }
  ];

  const team = [
    {
      name: "John Smith",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop"
    },
    {
      name: "Sarah Johnson",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop"
    },
    {
      name: "Mike Chen",
      role: "Quality Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop"
    }
  ];

  return (
    <div>
      {/* Page Header */}
      <section className="bg-success bg-opacity-10 py-4 mb-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="fw-bold mb-0">About Us</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-decoration-none text-muted">Home</Link>
                  </li>
                  <li className="breadcrumb-item active text-success" aria-current="page">About</li>
                </ol>
              </nav>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <span className="text-muted">Learn our story</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="badge bg-success bg-opacity-10 text-success mb-3 px-3 py-2">Since 2010</span>
              <h2 className="fw-bold mb-4 display-5">We Are <span className="text-success">Vegefoods</span></h2>
              <p className="lead text-muted mb-4">
                Your trusted online store for fresh, organic vegetables and fruits delivered straight from farms to your doorstep.
              </p>
              <p className="text-muted mb-4">
                We work directly with local farmers to ensure the highest quality produce at affordable prices. Our mission is to promote healthy living and sustainable farming practices while supporting local agriculture communities.
              </p>
              
              <div className="row g-3 mb-4">
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success fs-4 me-2"></i>
                    <span className="fw-medium">Fresh & Organic</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success fs-4 me-2"></i>
                    <span className="fw-medium">Fast Delivery</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success fs-4 me-2"></i>
                    <span className="fw-medium">Affordable Pricing</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success fs-4 me-2"></i>
                    <span className="fw-medium">24/7 Support</span>
                  </div>
                </div>
              </div>

              <Link to="/shop" className="btn btn-success btn-lg rounded-pill px-4">
                Explore Our Shop <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>

            <div className="col-lg-6">
              <div className="position-relative">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop"
                  className="img-fluid rounded-4 shadow-lg"
                  alt="About Vegefoods"
                />
                <div className="position-absolute bottom-0 start-0 m-4 bg-white rounded-3 p-3 shadow-lg d-none d-md-block">
                  <div className="d-flex align-items-center">
                    <div className="bg-success rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "50px", height: "50px" }}>
                      <i className="bi bi-trophy-fill text-white fs-4"></i>
                    </div>
                    <div>
                      <h6 className="mb-0 fw-bold">Award Winning</h6>
                      <small className="text-muted">Best Organic Store 2023</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-success text-white">
        <div className="container">
          <div className="row g-4 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="col-6 col-md-3">
                <div className="p-3">
                  <h2 className="fw-bold display-4 mb-2">{stat.number}</h2>
                  <p className="mb-0 opacity-75">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-success fw-bold text-uppercase ls-2">Why Choose Us</span>
            <h2 className="fw-bold mt-2">What Makes Us Different</h2>
            <p className="text-muted">We are committed to providing the best quality organic products</p>
          </div>

          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm h-100 text-center p-4 feature-card">
                  <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" 
                       style={{ width: "80px", height: "80px" }}>
                    <i className={`bi ${feature.icon} text-success fs-2`}></i>
                  </div>
                  <h5 className="fw-bold mb-3">{feature.title}</h5>
                  <p className="text-muted mb-0">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 order-lg-2">
              <span className="badge bg-success bg-opacity-10 text-success mb-3 px-3 py-2">Our Story</span>
              <h2 className="fw-bold mb-4">From Farm to Table</h2>
              <p className="text-muted mb-4">
                Founded in 2010, Vegefoods started with a simple mission: to make fresh, organic produce accessible to everyone. What began as a small family business has grown into a trusted name in organic food delivery.
              </p>
              <p className="text-muted mb-4">
                We partner with over 50 local farmers who share our commitment to sustainable agriculture. Every product in our store is carefully selected to ensure it meets our strict quality standards.
              </p>
              <div className="d-flex gap-3">
                <div className="text-center">
                  <h4 className="text-success fw-bold mb-0">14+</h4>
                  <small className="text-muted">Years Experience</small>
                </div>
                <div className="border-start ps-3 text-center">
                  <h4 className="text-success fw-bold mb-0">100%</h4>
                  <small className="text-muted">Organic</small>
                </div>
                <div className="border-start ps-3 text-center">
                  <h4 className="text-success fw-bold mb-0">50+</h4>
                  <small className="text-muted">Farm Partners</small>
                </div>
              </div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="position-relative">
                <img
                  src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop"
                  className="img-fluid rounded-4 shadow-lg"
                  alt="Farm to Table"
                />
                <div className="position-absolute top-0 end-0 m-4 bg-success text-white rounded-3 p-3 shadow-lg d-none d-md-block">
                  <div className="text-center">
                    <h3 className="fw-bold mb-0">100%</h3>
                    <small>Organic</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-success fw-bold text-uppercase ls-2">Our Team</span>
            <h2 className="fw-bold mt-2">Meet The Experts</h2>
            <p className="text-muted">Dedicated professionals committed to your health</p>
          </div>

          <div className="row g-4 justify-content-center">
            {team.map((member, index) => (
              <div key={index} className="col-md-4 col-lg-3">
                <div className="card border-0 shadow-sm text-center team-card overflow-hidden">
                  <div className="position-relative overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="card-img-top" 
                      style={{ height: "280px", objectFit: "cover" }}
                    />
                    <div className="team-overlay position-absolute bottom-0 start-0 end-0 p-3 bg-gradient-dark">
                      <div className="d-flex justify-content-center gap-2">
                        <a href="#" className="btn btn-light btn-sm rounded-circle" style={{ width: "35px", height: "35px" }}>
                          <i className="bi bi-facebook text-success"></i>
                        </a>
                        <a href="#" className="btn btn-light btn-sm rounded-circle" style={{ width: "35px", height: "35px" }}>
                          <i className="bi bi-twitter text-success"></i>
                        </a>
                        <a href="#" className="btn btn-light btn-sm rounded-circle" style={{ width: "35px", height: "35px" }}>
                          <i className="bi bi-linkedin text-success"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="fw-bold mb-1">{member.name}</h5>
                    <p className="text-success mb-0">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-success text-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Ready to Start Eating Healthy?</h2>
          <p className="lead opacity-75 mb-4">Join thousands of satisfied customers who trust Vegefoods for their daily organic needs.</p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/shop" className="btn btn-light btn-lg rounded-pill px-4 fw-bold text-success">
              Shop Now <i className="bi bi-arrow-right ms-2"></i>
            </Link>
            <Link to="/contact" className="btn btn-outline-light btn-lg rounded-pill px-4">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style>{`
        .ls-2 {
          letter-spacing: 2px;
        }
        .feature-card {
          transition: all 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-10px);
        }
        .team-card:hover .team-overlay {
          opacity: 1;
          transform: translateY(0);
        }
        .team-overlay {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s ease;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        }
        .bg-gradient-dark {
          background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
        }
      `}</style>
    </div>
  );
};

export default About;