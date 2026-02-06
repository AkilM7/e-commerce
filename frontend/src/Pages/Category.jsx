import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const Category = () => {
  const { categoryName } = useParams();
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 100]);

  // Sample category data
  const categoryData = {
    name: categoryName || "Vegetables",
    description: "Fresh, organic vegetables sourced directly from local farms. Perfect for healthy cooking and nutritious meals.",
    banner: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop",
    productCount: 48,
    subcategories: ["Leafy Greens", "Root Vegetables", "Peppers", "Tomatoes", "Onions & Garlic"]
  };

  // Sample products
  const products = [
    { id: 1, name: "Fresh Organic Tomatoes", price: 2.99, oldPrice: 3.99, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop", rating: 4.8, reviews: 128, badge: "Best Seller" },
    { id: 2, name: "Organic Carrots", price: 1.99, oldPrice: 2.49, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop", rating: 4.7, reviews: 89, badge: null },
    { id: 3, name: "Fresh Broccoli", price: 2.49, oldPrice: 2.99, image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=400&fit=crop", rating: 4.6, reviews: 76, badge: null },
    { id: 4, name: "Red Bell Peppers", price: 3.49, oldPrice: null, image: "https://images.unsplash.com/photo-1563565375-f3fdf5c69b37?w=400&h=400&fit=crop", rating: 4.5, reviews: 54, badge: "New" },
    { id: 5, name: "Spinach", price: 2.29, oldPrice: 2.79, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop", rating: 4.8, reviews: 112, badge: null },
    { id: 6, name: "Cucumber", price: 0.99, oldPrice: null, image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&h=400&fit=crop", rating: 4.3, reviews: 67, badge: null },
    { id: 7, name: "Organic Potatoes", price: 2.99, oldPrice: 3.49, image: "https://images.unsplash.com/photo-1518977676601-b53f82a6b696?w=400&h=400&fit=crop", rating: 4.6, reviews: 93, badge: null },
    { id: 8, name: "Green Beans", price: 2.99, oldPrice: null, image: "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?w=400&h=400&fit=crop", rating: 4.4, reviews: 45, badge: "Organic" }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i key={i} className={`bi ${i < Math.floor(rating) ? "bi-star-fill" : i < rating ? "bi-star-half" : "bi-star"} text-warning small`}></i>
    ));
  };

  return (
    <div>
      {/* Category Banner */}
      <section className="position-relative">
        <div 
          className="w-100" 
          style={{ 
            height: "350px", 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${categoryData.banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="container h-100 d-flex align-items-center">
            <div className="text-white">
              <span className="badge bg-success mb-3 px-3 py-2">
                <i className="bi bi-grid-3x3-gap me-2"></i>
                {categoryData.productCount} Products
              </span>
              <h1 className="display-3 fw-bold mb-3">{categoryData.name}</h1>
              <p className="lead mb-4" style={{ maxWidth: "600px" }}>{categoryData.description}</p>
              <div className="d-flex flex-wrap gap-2">
                {categoryData.subcategories.map((sub, idx) => (
                  <Link key={idx} to={`/category/${sub.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`} className="btn btn-outline-light rounded-pill btn-sm">
                    {sub}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb & Filters */}
      <section className="bg-light py-3 border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-2 mb-md-0">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
                  <li className="breadcrumb-item"><Link to="/shop" className="text-decoration-none">Shop</Link></li>
                  <li className="breadcrumb-item active text-success fw-bold" aria-current="page">{categoryData.name}</li>
                </ol>
              </nav>
            </div>
            <div className="col-md-6 d-flex justify-content-md-end gap-3">
              <select 
                className="form-select form-select-sm w-auto border-0 bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
              <div className="btn-group">
                <button 
                  className={`btn btn-sm ${viewMode === "grid" ? "btn-success" : "btn-outline-secondary"}`}
                  onClick={() => setViewMode("grid")}
                >
                  <i className="bi bi-grid-3x3-gap"></i>
                </button>
                <button 
                  className={`btn btn-sm ${viewMode === "list" ? "btn-success" : "btn-outline-secondary"}`}
                  onClick={() => setViewMode("list")}
                >
                  <i className="bi bi-list-ul"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {/* Sidebar Filters */}
            <div className="col-lg-3">
              <div className="card border-0 shadow-sm rounded-4 sticky-top" style={{ top: "20px" }}>
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">
                    <i className="bi bi-funnel text-success me-2"></i>
                    Filters
                  </h5>

                  {/* Price Range */}
                  <div className="mb-4">
                    <h6 className="fw-bold mb-3">Price Range</h6>
                    <input 
                      type="range" 
                      className="form-range" 
                      min="0" 
                      max="100" 
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    />
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">$0</span>
                      <span className="text-muted">${priceRange[1]}</span>
                    </div>
                  </div>

                  {/* Subcategories */}
                  <div className="mb-4">
                    <h6 className="fw-bold mb-3">Subcategories</h6>
                    <div className="d-flex flex-column gap-2">
                      {categoryData.subcategories.map((sub, idx) => (
                        <div key={idx} className="form-check">
                          <input className="form-check-input" type="checkbox" id={`sub-${idx}`} />
                          <label className="form-check-label" htmlFor={`sub-${idx}`}>
                            {sub}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ratings */}
                  <div className="mb-4">
                    <h6 className="fw-bold mb-3">Minimum Rating</h6>
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="form-check">
                        <input className="form-check-input" type="radio" name="rating" id={`rating-${rating}`} />
                        <label className="form-check-label" htmlFor={`rating-${rating}`}>
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`bi ${i < rating ? "bi-star-fill" : "bi-star"} text-warning small`}></i>
                          ))}
                          <span className="ms-1 text-muted">& Up</span>
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Availability */}
                  <div className="mb-4">
                    <h6 className="fw-bold mb-3">Availability</h6>
                    <div className="form-check mb-2">
                      <input className="form-check-input" type="checkbox" id="in-stock" defaultChecked />
                      <label className="form-check-label" htmlFor="in-stock">
                        In Stock
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="on-sale" />
                      <label className="form-check-label" htmlFor="on-sale">
                        On Sale
                      </label>
                    </div>
                  </div>

                  <button className="btn btn-success w-100 rounded-pill">
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="col-lg-9">
              {/* Results Count */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="text-muted">Showing {products.length} of {categoryData.productCount} products</span>
                <div className="d-flex gap-2">
                  <span className="badge bg-light text-dark border">New Arrivals</span>
                  <span className="badge bg-light text-dark border">On Sale</span>
                </div>
              </div>

              {/* Products */}
              <div className={viewMode === "grid" ? "row g-4" : "d-flex flex-column gap-3"}>
                {products.map((product) => (
                  <div key={product.id} className={viewMode === "grid" ? "col-6 col-md-4" : "col-12"}>
                    <div className={`card border-0 shadow-sm rounded-4 overflow-hidden product-card ${viewMode === "list" ? "flex-row" : ""}`}>
                      <div className={`position-relative ${viewMode === "list" ? "col-md-4" : ""}`}>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className={viewMode === "list" ? "img-fluid h-100" : "card-img-top"} 
                          style={{ height: viewMode === "list" ? "200px" : "250px", objectFit: "cover" }}
                        />
                        {product.badge && (
                          <span className="position-absolute top-0 start-0 bg-success text-white px-2 py-1 m-2 rounded-pill small fw-bold">
                            {product.badge}
                          </span>
                        )}
                        {product.oldPrice && (
                          <span className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 m-2 rounded-pill small fw-bold">
                            Sale
                          </span>
                        )}
                        <div className="product-actions position-absolute top-50 start-50 translate-middle d-flex gap-2 opacity-0">
                          <button className="btn btn-light rounded-circle shadow-sm" style={{ width: "40px", height: "40px" }}>
                            <i className="bi bi-heart"></i>
                          </button>
                          <button className="btn btn-success rounded-circle shadow-sm" style={{ width: "40px", height: "40px" }}>
                            <i className="bi bi-cart-plus"></i>
                          </button>
                          <Link to={`/product/${product.id}`} className="btn btn-light rounded-circle shadow-sm" style={{ width: "40px", height: "40px" }}>
                            <i className="bi bi-eye"></i>
                          </Link>
                        </div>
                      </div>
                      <div className={`card-body ${viewMode === "list" ? "col-md-8 d-flex flex-column justify-content-center" : ""}`}>
                        <div className="mb-2">{renderStars(product.rating)}</div>
                        <h5 className="card-title fw-bold mb-2">{product.name}</h5>
                        <p className="text-muted small mb-2">{product.reviews} reviews</p>
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <span className="text-success fw-bold fs-4">${product.price}</span>
                          {product.oldPrice && (
                            <span className="text-muted text-decoration-line-through">${product.oldPrice}</span>
                          )}
                        </div>
                        {viewMode === "list" && (
                          <p className="text-muted mb-3">Fresh organic produce sourced from local farms. Perfect for healthy cooking and nutritious meals.</p>
                        )}
                        <button className="btn btn-success w-100 rounded-pill">
                          <i className="bi bi-cart-plus me-2"></i>
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <nav className="mt-5">
                <ul className="pagination justify-content-center">
                  <li className="page-item disabled">
                    <button className="page-link rounded-start-pill">
                      <i className="bi bi-chevron-left"></i>
                    </button>
                  </li>
                  <li className="page-item active"><button className="page-link">1</button></li>
                  <li className="page-item"><button className="page-link">2</button></li>
                  <li className="page-item"><button className="page-link">3</button></li>
                  <li className="page-item"><button className="page-link">...</button></li>
                  <li className="page-item"><button className="page-link">6</button></li>
                  <li className="page-item">
                    <button className="page-link rounded-end-pill">
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>


      <style>{`
        .product-card:hover .product-actions {
          opacity: 1 !important;
          transition: all 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-5px);
          transition: all 0.3s ease;
        }
        .product-card img {
          transition: all 0.5s ease;
        }
        .product-card:hover img {
          transform: scale(1.05);
        }
        .page-item.active .page-link {
          background-color: #198754;
          border-color: #198754;
        }
        .page-link {
          color: #198754;
        }
      `}</style>
    </div>
  );
};

export default Category;