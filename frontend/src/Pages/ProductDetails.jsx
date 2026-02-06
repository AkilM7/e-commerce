import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Sample product data (in real app, fetch by ID)
  const product = {
    id: id || 1,
    name: "Fresh Organic Tomatoes",
    price: 2.99,
    oldPrice: 3.99,
    rating: 4.8,
    reviews: 128,
    sku: "VEG-TOM-001",
    category: "Vegetables",
    stock: 15,
    weight: "1kg",
    brand: "Organic Farms",
    tags: ["Organic", "Fresh", "Vegetables", "Healthy"],
    description: "Our fresh organic tomatoes are hand-picked from local farms to ensure the highest quality and freshness. Perfect for salads, cooking, or eating raw. Rich in vitamins and antioxidants.",
    images: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524593166156-311f36f65f20?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1576858574144-6c8e89f6fa34?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1561136594-7f68413baa99?w=600&h=600&fit=crop"
    ],
    discount: 25
  };

  const relatedProducts = [
    { id: 2, name: "Organic Carrots", price: 1.99, oldPrice: 2.49, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&h=300&fit=crop", rating: 4.7, reviews: 89 },
    { id: 3, name: "Fresh Broccoli", price: 2.49, oldPrice: 2.99, image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=300&h=300&fit=crop", rating: 4.6, reviews: 76 },
    { id: 4, name: "Red Bell Peppers", price: 3.49, oldPrice: null, image: "https://images.unsplash.com/photo-1563565375-f3fdf5c69b37?w=300&h=300&fit=crop", rating: 4.5, reviews: 54 },
    { id: 5, name: "Cucumber", price: 0.99, oldPrice: null, image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=300&h=300&fit=crop", rating: 4.3, reviews: 112 }
  ];

  const reviews = [
    { id: 1, name: "Sarah Johnson", rating: 5, date: "2 days ago", comment: "Absolutely fresh and delicious! Will definitely buy again. The packaging was great and delivery was on time.", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Mike Chen", rating: 4, date: "1 week ago", comment: "Good quality, fast delivery. Recommended! Would have given 5 stars if the tomatoes were slightly bigger.", avatar: "https://i.pravatar.cc/150?img=3" },
    { id: 3, name: "Emily Davis", rating: 5, date: "2 weeks ago", comment: "Best tomatoes I've ever had. So fresh and juicy! Perfect for my salads.", avatar: "https://i.pravatar.cc/150?img=5" }
  ];

  const specifications = [
    { label: "Product Name", value: product.name },
    { label: "SKU", value: product.sku },
    { label: "Category", value: product.category },
    { label: "Weight", value: product.weight },
    { label: "Brand", value: product.brand },
    { label: "Origin", value: "Local Farm" },
    { label: "Freshness Guarantee", value: "7 days from delivery" },
    { label: "Storage", value: "Keep refrigerated" }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i 
        key={i} 
        className={`bi ${i < Math.floor(rating) ? "bi-star-fill" : i < rating ? "bi-star-half" : "bi-star"} text-warning`}
        style={{ fontSize: "0.9rem" }}
      ></i>
    ));
  };

  const renderLargeStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i 
        key={i} 
        className={`bi ${i < Math.floor(rating) ? "bi-star-fill" : i < rating ? "bi-star-half" : "bi-star"} text-warning`}
      ></i>
    ));
  };

  const incrementQty = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, Math.min(product.stock, value)));
  };

  const calculateSavings = () => {
    if (product.oldPrice) {
      return (product.oldPrice - product.price).toFixed(2);
    }
    return 0;
  };

  const calculateTotal = () => {
    return (product.price * quantity).toFixed(2);
  };

  return (
    <div className="product-detail-page">
      {/* Page Header */}
      <section className="bg-success bg-opacity-10 py-4 mb-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="fw-bold mb-0 display-6">{product.name}</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 mt-2">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-decoration-none text-muted">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/shop" className="text-decoration-none text-muted">Shop</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to={`/shop?category=${product.category}`} className="text-decoration-none text-muted">{product.category}</Link>
                  </li>
                  <li className="breadcrumb-item active text-success" aria-current="page">{product.name}</li>
                </ol>
              </nav>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <div className="d-flex align-items-center justify-content-md-end gap-2">
                {renderStars(product.rating)}
                <span className="text-muted ms-2">({product.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Detail Section */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            {/* Product Images - Left Side */}
            <div className="col-lg-6">
              {/* Main Image */}
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-3 position-relative">
                <div className="position-relative bg-light">
                  <img 
                    src={product.images[selectedImage]} 
                    alt={product.name} 
                    className="img-fluid w-100" 
                    style={{ height: "500px", objectFit: "cover" }}
                  />
                  
                  {/* Discount Badge */}
                  {product.discount > 0 && (
                    <span className="position-absolute top-0 start-0 bg-danger text-white px-3 py-2 m-3 rounded-pill fw-bold shadow">
                      -{product.discount}%
                    </span>
                  )}
                  
                  {/* Wishlist Button */}
                  <button 
                    className={`position-absolute top-0 end-0 btn rounded-circle m-3 shadow-sm ${isWishlisted ? 'btn-danger' : 'btn-light'}`} 
                    style={{ width: "50px", height: "50px" }}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <i className={`bi ${isWishlisted ? 'bi-heart-fill' : 'bi-heart'} ${isWishlisted ? 'text-white' : 'text-danger'} fs-5`}></i>
                  </button>

                  {/* Stock Badge */}
                  {product.stock <= 5 && product.stock > 0 && (
                    <span className="position-absolute bottom-0 start-0 bg-warning text-dark px-3 py-2 m-3 rounded-pill fw-bold shadow">
                      <i className="bi bi-exclamation-triangle-fill me-1"></i>
                      Only {product.stock} left!
                    </span>
                  )}
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="row g-2">
                {product.images.map((img, idx) => (
                  <div key={idx} className="col-3">
                    <button 
                      className={`btn p-1 w-100 rounded-3 border-2 ${selectedImage === idx ? "border-success" : "border-0"}`}
                      onClick={() => setSelectedImage(idx)}
                      style={{ transition: "all 0.3s ease" }}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} view ${idx + 1}`} 
                        className="img-fluid rounded-2" 
                        style={{ 
                          height: "100px", 
                          objectFit: "cover",
                          opacity: selectedImage === idx ? 1 : 0.7
                        }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info - Right Side */}
            <div className="col-lg-6">
              <div className="ps-lg-4">
                {/* Brand & Category Badges */}
                <div className="d-flex gap-2 mb-3 flex-wrap">
                  <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">
                    <i className="bi bi-patch-check-fill me-1"></i>
                    {product.brand}
                  </span>
                  <span className="badge bg-secondary bg-opacity-10 text-secondary px-3 py-2">
                    {product.category}
                  </span>
                  <span className="badge bg-info bg-opacity-10 text-info px-3 py-2">
                    <i className="bi bi-lightning-charge-fill me-1"></i>
                    Fast Delivery
                  </span>
                </div>

                {/* Product Title */}
                <h2 className="fw-bold mb-3 display-5" style={{ fontSize: "2.5rem" }}>{product.name}</h2>

                {/* Rating & Stock */}
                <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
                  <div className="bg-success bg-opacity-10 px-3 py-2 rounded-pill d-flex align-items-center">
                    <span className="fw-bold text-success fs-5 me-2">{product.rating}</span>
                    <div className="me-2">{renderLargeStars(product.rating)}</div>
                    <span className="text-success">|</span>
                    <Link to="#reviews" className="text-success text-decoration-none ms-2 fw-medium">
                      {product.reviews} Reviews
                    </Link>
                  </div>
                  
                  <span className="text-success fw-medium bg-success bg-opacity-10 px-3 py-2 rounded-pill">
                    <i className="bi bi-check-circle-fill me-1"></i>
                    In Stock ({product.stock} available)
                  </span>
                </div>

                {/* Price Section */}
                <div className="d-flex align-items-baseline gap-3 mb-4 flex-wrap">
                  <span className="display-4 fw-bold text-success">${product.price}</span>
                  {product.oldPrice && (
                    <>
                      <span className="fs-3 text-muted text-decoration-line-through">${product.oldPrice}</span>
                      <span className="badge bg-danger px-3 py-2 fs-6">
                        Save ${calculateSavings()}
                      </span>
                    </>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-muted lead mb-4">{product.description}</p>

                {/* Product Meta Info */}
                <div className="row g-3 mb-4 py-4 border-top border-bottom">
                  <div className="col-6 col-md-3 text-center">
                    <div className="bg-light rounded-3 p-3">
                      <small className="text-muted d-block mb-1">SKU</small>
                      <span className="fw-bold text-dark">{product.sku}</span>
                    </div>
                  </div>
                  <div className="col-6 col-md-3 text-center">
                    <div className="bg-light rounded-3 p-3">
                      <small className="text-muted d-block mb-1">Weight</small>
                      <span className="fw-bold text-dark">{product.weight}</span>
                    </div>
                  </div>
                  <div className="col-6 col-md-3 text-center">
                    <div className="bg-light rounded-3 p-3">
                      <small className="text-muted d-block mb-1">Category</small>
                      <span className="fw-bold text-dark">{product.category}</span>
                    </div>
                  </div>
                  <div className="col-6 col-md-3 text-center">
                    <div className="bg-light rounded-3 p-3">
                      <small className="text-muted d-block mb-1">Brand</small>
                      <span className="fw-bold text-dark">{product.brand}</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <small className="text-muted d-block mb-2 fw-bold text-uppercase" style={{ letterSpacing: "1px" }}>Tags</small>
                  <div className="d-flex flex-wrap gap-2">
                    {product.tags.map((tag, idx) => (
                      <Link 
                        key={idx} 
                        to={`/shop?tag=${tag.toLowerCase()}`}
                        className="badge bg-light text-dark border text-decoration-none px-3 py-2"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Add to Cart Card */}
                <div className="card border-0 shadow-lg rounded-4 p-4 bg-light mb-4">
                  <div className="row g-3 align-items-end">
                    <div className="col-md-4">
                      <label className="form-label fw-bold text-muted small text-uppercase mb-2" style={{ letterSpacing: "1px" }}>Quantity</label>
                      <div className="input-group input-group-lg">
                        <button 
                          className="btn btn-outline-secondary" 
                          type="button"
                          onClick={decrementQty}
                          disabled={quantity <= 1}
                        >
                          <i className="bi bi-dash-lg"></i>
                        </button>
                        <input 
                          type="number" 
                          className="form-control text-center fw-bold" 
                          value={quantity}
                          onChange={handleQuantityChange}
                          min="1"
                          max={product.stock}
                        />
                        <button 
                          className="btn btn-outline-secondary" 
                          type="button"
                          onClick={incrementQty}
                          disabled={quantity >= product.stock}
                        >
                          <i className="bi bi-plus-lg"></i>
                        </button>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <button className="btn btn-success btn-lg w-100 rounded-pill shadow-sm">
                        <i className="bi bi-cart-plus-fill me-2"></i>
                        Add to Cart - ${calculateTotal()}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-3 mb-4">
                  <button 
                    className={`btn rounded-pill flex-fill ${isWishlisted ? 'btn-danger' : 'btn-outline-danger'}`}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <i className={`bi ${isWishlisted ? 'bi-heart-fill' : 'bi-heart'} me-2`}></i>
                    {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                  </button>
                  <button className="btn btn-outline-secondary rounded-pill flex-fill">
                    <i className="bi bi-share-fill me-2"></i>
                    Share
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="row g-3">
                  <div className="col-6">
                    <div className="d-flex align-items-center p-3 bg-white rounded-3 shadow-sm">
                      <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                        <i className="bi bi-truck text-success fs-4"></i>
                      </div>
                      <div>
                        <small className="fw-bold d-block text-dark">Free Shipping</small>
                        <small className="text-muted">Orders over $50</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center p-3 bg-white rounded-3 shadow-sm">
                      <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                        <i className="bi bi-shield-check text-success fs-4"></i>
                      </div>
                      <div>
                        <small className="fw-bold d-block text-dark">Secure Payment</small>
                        <small className="text-muted">100% Protected</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Tabs Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            {/* Tab Navigation */}
            <div className="card-header bg-white border-0 p-0">
              <ul className="nav nav-pills p-3" role="tablist">
                <li className="nav-item me-2">
                  <button 
                    className={`nav-link rounded-pill px-4 py-2 fw-medium ${activeTab === "description" ? "active bg-success" : "text-dark"}`}
                    onClick={() => setActiveTab("description")}
                  >
                    <i className="bi bi-file-text me-2"></i>
                    Description
                  </button>
                </li>
                <li className="nav-item me-2">
                  <button 
                    className={`nav-link rounded-pill px-4 py-2 fw-medium ${activeTab === "specifications" ? "active bg-success" : "text-dark"}`}
                    onClick={() => setActiveTab("specifications")}
                  >
                    <i className="bi bi-list-check me-2"></i>
                    Specifications
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link rounded-pill px-4 py-2 fw-medium ${activeTab === "reviews" ? "active bg-success" : "text-dark"}`}
                    onClick={() => setActiveTab("reviews")}
                  >
                    <i className="bi bi-star-fill me-2"></i>
                    Reviews ({product.reviews})
                  </button>
                </li>
              </ul>
            </div>

            {/* Tab Content */}
            <div className="card-body p-4 p-md-5">
              {/* Description Tab */}
              {activeTab === "description" && (
                <div className="animate-fade-in">
                  <h4 className="fw-bold mb-4">Product Description</h4>
                  <p className="text-muted lead mb-4">{product.description}</p>
                  
                  <h5 className="fw-bold mb-3">Key Features</h5>
                  <div className="row g-4 mb-4">
                    <div className="col-md-6">
                      <ul className="list-unstyled">
                        <li className="mb-3 d-flex align-items-center">
                          <i className="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                          <span className="text-muted">100% Organic & Pesticide-free</span>
                        </li>
                        <li className="mb-3 d-flex align-items-center">
                          <i className="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                          <span className="text-muted">Hand-picked at peak ripeness</span>
                        </li>
                        <li className="mb-3 d-flex align-items-center">
                          <i className="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                          <span className="text-muted">Rich in vitamins A, C & K</span>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="list-unstyled">
                        <li className="mb-3 d-flex align-items-center">
                          <i className="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                          <span className="text-muted">Farm-fresh delivery</span>
                        </li>
                        <li className="mb-3 d-flex align-items-center">
                          <i className="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                          <span className="text-muted">Eco-friendly packaging</span>
                        </li>
                        <li className="mb-3 d-flex align-items-center">
                          <i className="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                          <span className="text-muted">Satisfaction guaranteed</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <h5 className="fw-bold mb-3">Perfect For</h5>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">Fresh Salads</span>
                    <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">Cooking Sauces</span>
                    <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">Healthy Snacks</span>
                    <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">Sandwiches</span>
                    <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">Juicing</span>
                  </div>
                </div>
              )}

              {/* Specifications Tab */}
              {activeTab === "specifications" && (
                <div className="animate-fade-in">
                  <h4 className="fw-bold mb-4">Product Specifications</h4>
                  <div className="table-responsive">
                    <table className="table table-borderless">
                      <tbody>
                        {specifications.map((spec, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? "bg-light rounded" : ""}>
                            <td className="fw-bold text-muted py-3" style={{ width: "250px", borderRadius: "8px 0 0 8px" }}>
                              {spec.label}
                            </td>
                            <td className="py-3" style={{ borderRadius: "0 8px 8px 0" }}>{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === "reviews" && (
                <div className="animate-fade-in" id="reviews">
                  <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
                    <div>
                      <h4 className="fw-bold mb-1">Customer Reviews</h4>
                      <p className="text-muted mb-0">See what our customers are saying</p>
                    </div>
                    <button className="btn btn-success rounded-pill">
                      <i className="bi bi-pencil-square me-2"></i>
                      Write a Review
                    </button>
                  </div>

                  {/* Rating Summary */}
                  <div className="row g-4 mb-5">
                    <div className="col-md-4">
                      <div className="card border-0 bg-success bg-opacity-10 rounded-4 h-100">
                        <div className="card-body text-center">
                          <h2 className="display-1 fw-bold text-success mb-2">{product.rating}</h2>
                          <div className="mb-2">{renderLargeStars(product.rating)}</div>
                          <p className="text-muted mb-0">Based on {product.reviews} reviews</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="card border-0 bg-light rounded-4 h-100">
                        <div className="card-body d-flex align-items-center">
                          <div className="w-100">
                            {[5, 4, 3, 2, 1].map((star) => (
                              <div key={star} className="d-flex align-items-center mb-2">
                                <span className="me-2 text-muted" style={{ width: "30px" }}>{star}★</span>
                                <div className="progress flex-grow-1 me-2" style={{ height: "8px" }}>
                                  <div 
                                    className="progress-bar bg-success" 
                                    role="progressbar" 
                                    style={{ width: star === 5 ? "70%" : star === 4 ? "20%" : "10%" }}
                                  ></div>
                                </div>
                                <span className="text-muted small" style={{ width: "40px" }}>
                                  {star === 5 ? "70%" : star === 4 ? "20%" : "10%"}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div className="reviews-list">
                    {reviews.map((review, idx) => (
                      <div key={review.id} className={`pb-4 mb-4 ${idx !== reviews.length - 1 ? "border-bottom" : ""}`}>
                        <div className="d-flex align-items-start gap-3">
                          <img 
                            src={review.avatar} 
                            alt={review.name} 
                            className="rounded-circle shadow-sm" 
                            width="60" 
                            height="60"
                          />
                          <div className="flex-grow-1">
                            <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
                              <h6 className="fw-bold mb-0 fs-5">{review.name}</h6>
                              <small className="text-muted">
                                <i className="bi bi-clock me-1"></i>
                                {review.date}
                              </small>
                            </div>
                            <div className="mb-2">{renderStars(review.rating)}</div>
                            <p className="text-muted mb-0 lead" style={{ fontSize: "1rem" }}>{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center mt-4">
                    <button className="btn btn-outline-success rounded-pill px-4">
                      Load More Reviews
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 mb-3">You May Also Like</span>
            <h2 className="fw-bold display-5">Related Products</h2>
            <p className="text-muted lead">Customers who bought this item also bought</p>
          </div>
          
          <div className="row g-4">
            {relatedProducts.map((item) => (
              <div key={item.id} className="col-6 col-md-3">
                <div className="card border-0 shadow-sm h-100 product-card rounded-4 overflow-hidden">
                  <div className="position-relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="card-img-top" 
                      style={{ height: "220px", objectFit: "cover" }}
                    />
                    {item.oldPrice && (
                      <span className="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 m-2 rounded-pill small fw-bold">
                        Sale
                      </span>
                    )}
                    <div className="product-actions position-absolute top-50 start-50 translate-middle d-flex gap-2 opacity-0">
                      <button className="btn btn-light rounded-circle shadow-sm" style={{ width: "42px", height: "42px" }}>
                        <i className="bi bi-heart"></i>
                      </button>
                      <button className="btn btn-success rounded-circle shadow-sm" style={{ width: "42px", height: "42px" }}>
                        <i className="bi bi-cart-plus"></i>
                      </button>
                      <Link to={`/product/${item.id}`} className="btn btn-light rounded-circle shadow-sm" style={{ width: "42px", height: "42px" }}>
                        <i className="bi bi-eye"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="card-body text-center p-4">
                    <div className="mb-2">{renderStars(item.rating)}</div>
                    <h5 className="card-title fw-bold mb-2">{item.name}</h5>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <span className="text-success fw-bold fs-4">${item.price}</span>
                      {item.oldPrice && (
                        <span className="text-muted text-decoration-line-through">${item.oldPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/shop" className="btn btn-outline-success btn-lg rounded-pill px-5">
              View All Products
              <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Custom CSS */}
      <style>{`
        .product-detail-page {
          min-height: 100vh;
        }
        
        .product-card {
          transition: all 0.3s ease;
        }
        
        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.1) !important;
        }
        
        .product-card:hover .product-actions {
          opacity: 1 !important;
        }
        
        .product-actions {
          transition: all 0.3s ease;
        }
        
        .product-card img {
          transition: all 0.5s ease;
        }
        
        .product-card:hover img {
          transform: scale(1.1);
        }
        
        .nav-pills .nav-link {
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }
        
        .nav-pills .nav-link:not(.active):hover {
          border-color: #198754;
          color: #198754 !important;
        }
        
        .nav-pills .nav-link.active {
          background-color: #198754 !important;
          box-shadow: 0 4px 15px rgba(25, 135, 84, 0.3);
        }
        
        .form-control:focus {
          box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
          border-color: #198754;
        }
        
        .btn-success {
          transition: all 0.3s ease;
        }
        
        .btn-success:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(25, 135, 84, 0.3);
        }
        
        .animate-fade-in {
          animation: fadeIn 0.4s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .progress {
          background-color: #e9ecef;
          border-radius: 10px;
        }
        
        .progress-bar {
          border-radius: 10px;
        }
        
        /* Custom scrollbar for webkit */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #198754;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #146c43;
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;