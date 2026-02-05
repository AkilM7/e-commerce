import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  // Sample data for categories
  const categories = [
    { id: 1, name: "Vegetables", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop", count: "50+ Items" },
    { id: 2, name: "Fruits", image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop", count: "40+ Items" },
    { id: 3, name: "Organic", image: "https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=400&h=300&fit=crop", count: "30+ Items" },
    { id: 4, name: "Fresh Juice", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop", count: "20+ Items" },
    { id: 5, name: "Dried Fruits", image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400&h=300&fit=crop", count: "25+ Items" },
    { id: 6, name: "Salads", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop", count: "15+ Items" },
  ];

  // Sample data for products
  const featuredProducts = [
    { id: 1, name: "Fresh Tomatoes", price: 2.99, oldPrice: 3.99, image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=400&fit=crop", rating: 4.5, discount: 25 },
    { id: 2, name: "Organic Carrots", price: 1.99, oldPrice: 2.49, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop", rating: 4.8, discount: 20 },
    { id: 3, name: "Red Apples", price: 4.99, oldPrice: 5.99, image: "https://images.unsplash.com/photo-1584306670957-acf935f5033c?w=400&h=400&fit=crop", rating: 4.7, discount: 15 },
    { id: 4, name: "Fresh Broccoli", price: 2.49, oldPrice: 2.99, image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=400&fit=crop", rating: 4.6, discount: 10 },
  ];

  const newArrivals = [
    { id: 5, name: "Avocado", price: 1.99, oldPrice: null, image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop", rating: 4.9, badge: "New" },
    { id: 6, name: "Spinach", price: 2.29, oldPrice: 2.79, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop", rating: 4.4, badge: "New" },
    { id: 7, name: "Strawberries", price: 5.99, oldPrice: 6.99, image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop", rating: 4.8, badge: "New" },
    { id: 8, name: "Lemons", price: 3.49, oldPrice: null, image: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=300&h=300&fit=crop", rating: 4.5, badge: "New" },
  ];

  // Hero slider data
  const heroSlides = [
    {
      id: 1,
      title: "Fresh Organic Vegetables",
      subtitle: "100% Fresh & Natural",
      description: "Get farm-fresh organic vegetables delivered to your doorstep",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=500&fit=crop",
      color: "success"
    },
    {
      id: 2,
      title: "Premium Quality Fruits",
      subtitle: "Handpicked Daily",
      description: "Sweet, juicy fruits sourced directly from local farmers",
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&h=500&fit=crop",
      color: "warning"
    },
    {
      id: 3,
      title: "Healthy Living Starts Here",
      subtitle: "Organic & Natural",
      description: "Transform your lifestyle with our organic produce collection",
      image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1200&h=500&fit=crop",
      color: "info"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);

  // Auto-slide hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Render stars for rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
      } else if (i - 0.5 <= rating) {
        stars.push(<i key={i} className="bi bi-star-half text-warning"></i>);
      } else {
        stars.push(<i key={i} className="bi bi-star text-warning"></i>);
      }
    }
    return stars;
  };

  const nextCategory = () => {
    setCategoryIndex((prev) => (prev + 1) % Math.max(1, categories.length - 3));
  };

  const prevCategory = () => {
    setCategoryIndex((prev) => (prev - 1 + Math.max(1, categories.length - 3)) % Math.max(1, categories.length - 3));
  };

  return (
    <div>
      {/* Add Bootstrap Icons CSS */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />

      {/* Hero Slider */}
      <section id="heroSlider" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#heroSlider"
              data-bs-slide-to={index}
              className={index === currentSlide ? "active" : ""}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {heroSlides.map((slide, index) => (
            <div key={slide.id} className={`carousel-item ${index === currentSlide ? "active" : ""}`}>
              <div 
                className="position-relative" 
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "500px"
                }}
              >
                <div className="container h-100 d-flex align-items-center">
                  <div className="row w-100">
                    <div className="col-md-8 col-lg-6 text-white">
                      <span className={`badge bg-${slide.color} mb-3 px-3 py-2`}>{slide.subtitle}</span>
                      <h1 className="display-3 fw-bold mb-3">{slide.title}</h1>
                      <p className="lead mb-4 fs-4">{slide.description}</p>
                      <div className="d-flex gap-3">
                        <Link to="/shop" className={`btn btn-${slide.color} btn-lg px-4 rounded-pill`}>
                          Shop Now <i className="bi bi-arrow-right ms-2"></i>
                        </Link>
                        <Link to="/about" className="btn btn-outline-light btn-lg px-4 rounded-pill">
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}>
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}>
          <span className="carousel-control-next-icon"></span>
        </button>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-6 col-md-3">
              <div className="d-flex align-items-center gap-3 p-3 bg-white rounded-3 shadow-sm">
                <div className="bg-success bg-opacity-10 p-3 rounded-circle">
                  <i className="bi bi-truck text-success fs-3"></i>
                </div>
                <div>
                  <h6 className="mb-1 fw-bold">Free Shipping</h6>
                  <small className="text-muted">On orders over $50</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="d-flex align-items-center gap-3 p-3 bg-white rounded-3 shadow-sm">
                <div className="bg-warning bg-opacity-10 p-3 rounded-circle">
                  <i className="bi bi-shield-check text-warning fs-3"></i>
                </div>
                <div>
                  <h6 className="mb-1 fw-bold">Secure Payment</h6>
                  <small className="text-muted">100% secure</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="d-flex align-items-center gap-3 p-3 bg-white rounded-3 shadow-sm">
                <div className="bg-info bg-opacity-10 p-3 rounded-circle">
                  <i className="bi bi-arrow-counterclockwise text-info fs-3"></i>
                </div>
                <div>
                  <h6 className="mb-1 fw-bold">Easy Returns</h6>
                  <small className="text-muted">30 day policy</small>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="d-flex align-items-center gap-3 p-3 bg-white rounded-3 shadow-sm">
                <div className="bg-danger bg-opacity-10 p-3 rounded-circle">
                  <i className="bi bi-headset text-danger fs-3"></i>
                </div>
                <div>
                  <h6 className="mb-1 fw-bold">24/7 Support</h6>
                  <small className="text-muted">Call us anytime</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Slider */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">Shop by Category</h2>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-success rounded-circle" style={{ width: "40px", height: "40px" }} onClick={prevCategory}>
                <i className="bi bi-chevron-left"></i>
              </button>
              <button className="btn btn-outline-success rounded-circle" style={{ width: "40px", height: "40px" }} onClick={nextCategory}>
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
          
          <div className="row g-4" style={{ overflow: "hidden" }}>
            {categories.slice(categoryIndex, categoryIndex + 4).map((category) => (
              <div key={category.id} className="col-6 col-md-3">
                <Link to={`/shop?category=${category.name.toLowerCase()}`} className="text-decoration-none">
                  <div className="card border-0 shadow-sm h-100 category-card overflow-hidden">
                    <div className="position-relative">
                      <img src={category.image} alt={category.name} className="card-img-top" style={{ height: "180px", objectFit: "cover" }} />
                      <div className="card-img-overlay d-flex align-items-end">
                        <div className="bg-white bg-opacity-95 rounded-3 px-3 py-2 w-100 text-center">
                          <h5 className="mb-0 text-dark fw-bold">{category.name}</h5>
                          <small className="text-muted">{category.count}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Slider */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-success fw-bold text-uppercase ls-2">Best Deals</span>
            <h2 className="fw-bold mt-2">Featured Products</h2>
            <p className="text-muted">Handpicked selection of our best products</p>
          </div>

          <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row g-4">
                  {featuredProducts.map((product) => (
                    <div key={product.id} className="col-6 col-lg-3">
                      <div className="card border-0 shadow-sm h-100 product-card">
                        <div className="position-relative overflow-hidden">
                          <img src={product.image} alt={product.name} className="card-img-top" style={{ height: "250px", objectFit: "cover" }} />
                          {product.discount && (
                            <span className="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 m-2 rounded-pill small">
                              -{product.discount}%
                            </span>
                          )}
                          <div className="product-actions position-absolute top-50 start-50 translate-middle d-flex gap-2 opacity-0">
                            <button className="btn btn-light rounded-circle" style={{ width: "40px", height: "40px" }}>
                              <i className="bi bi-heart"></i>
                            </button>
                            <button className="btn btn-success rounded-circle" style={{ width: "40px", height: "40px" }}>
                              <i className="bi bi-cart-plus"></i>
                            </button>
                            <button className="btn btn-light rounded-circle" style={{ width: "40px", height: "40px" }}>
                              <i className="bi bi-eye"></i>
                            </button>
                          </div>
                        </div>
                        <div className="card-body text-center">
                          <div className="mb-2 small">{renderStars(product.rating)}</div>
                          <h5 className="card-title h6 fw-bold">{product.name}</h5>
                          <div className="d-flex justify-content-center align-items-center gap-2">
                            <span className="text-success fw-bold fs-5">${product.price}</span>
                            {product.oldPrice && (
                              <span className="text-muted text-decoration-line-through small">${product.oldPrice}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <Link to="/shop" className="btn btn-outline-success rounded-pill px-4">View All Products</Link>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="position-relative rounded-4 overflow-hidden" style={{ height: "300px" }}>
                <img 
                  src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop" 
                  alt="Promo 1" 
                  className="w-100 h-100 object-fit-cover"
                />
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center p-4" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)" }}>
                  <span className="text-warning fw-bold text-uppercase mb-2">Weekend Special</span>
                  <h3 className="text-white fw-bold mb-2">Fresh Vegetables</h3>
                  <p className="text-white-50 mb-3">Up to 30% off on selected items</p>
                  <Link to="/shop" className="btn btn-warning rounded-pill w-fit-content">Shop Now</Link>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="position-relative rounded-4 overflow-hidden" style={{ height: "300px" }}>
                <img 
                  src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600&h=400&fit=crop" 
                  alt="Promo 2" 
                  className="w-100 h-100 object-fit-cover"
                />
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center p-4" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)" }}>
                  <span className="text-success fw-bold text-uppercase mb-2">New Arrival</span>
                  <h3 className="text-white fw-bold mb-2">Organic Fruits</h3>
                  <p className="text-white-50 mb-3">Fresh from the farm daily</p>
                  <Link to="/shop" className="btn btn-success rounded-pill w-fit-content">Explore</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals - Product List */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <span className="text-success fw-bold text-uppercase ls-2">Just Added</span>
              <h2 className="fw-bold mt-1">New Arrivals</h2>
            </div>
            <Link to="/shop" className="text-success text-decoration-none fw-bold">View All <i className="bi bi-arrow-right"></i></Link>
          </div>

          <div className="row g-4">
            {newArrivals.map((product) => (
              <div key={product.id} className="col-6 col-md-4 col-lg-3">
                <div className="card border-0 shadow-sm h-100 product-card">
                  <div className="position-relative overflow-hidden">
                    <img src={product.image} alt={product.name} className="card-img-top" style={{ height: "220px", objectFit: "cover" }} />
                    {product.badge && (
                      <span className="position-absolute top-0 end-0 bg-success text-white px-2 py-1 m-2 rounded-pill small">
                        {product.badge}
                      </span>
                    )}
                    <div className="product-actions position-absolute top-50 start-50 translate-middle d-flex gap-2 opacity-0">
                      <button className="btn btn-light rounded-circle shadow-sm" style={{ width: "40px", height: "40px" }}>
                        <i className="bi bi-heart"></i>
                      </button>
                      <button className="btn btn-success rounded-circle shadow-sm" style={{ width: "40px", height: "40px" }}>
                        <i className="bi bi-cart-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="mb-2 small">{renderStars(product.rating)}</div>
                    <h5 className="card-title h6 fw-bold mb-2">{product.name}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="text-success fw-bold fs-5">${product.price}</span>
                        {product.oldPrice && (
                          <span className="text-muted text-decoration-line-through small ms-2">${product.oldPrice}</span>
                        )}
                      </div>
                      <button className="btn btn-outline-success btn-sm rounded-pill">Add</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style>{`
        .product-card:hover .product-actions {
          opacity: 1 !important;
          transition: all 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-5px);
          transition: all 0.3s ease;
        }
        .category-card:hover img {
          transform: scale(1.1);
          transition: all 0.3s ease;
        }
        .ls-2 {
          letter-spacing: 2px;
        }
        .w-fit-content {
          width: fit-content;
        }
      `}</style>
    </div>
  );
};

export default Home;