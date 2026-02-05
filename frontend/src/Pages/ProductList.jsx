import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  // Sample product data
  const allProducts = [
    { id: 1, name: "Fresh Tomatoes", price: 2.99, oldPrice: 3.99, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop", category: "Vegetables", rating: 4.5, inStock: true, discount: 25, weight: "1kg" },
    { id: 2, name: "Organic Carrots", price: 1.99, oldPrice: 2.49, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop", category: "Vegetables", rating: 4.8, inStock: true, discount: 20, weight: "500g" },
    { id: 3, name: "Red Apples", price: 4.99, oldPrice: 5.99, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop", category: "Fruits", rating: 4.7, inStock: true, discount: 15, weight: "1kg" },
    { id: 4, name: "Fresh Broccoli", price: 2.49, oldPrice: 2.99, image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=400&fit=crop", category: "Vegetables", rating: 4.6, inStock: true, discount: 10, weight: "500g" },
    { id: 5, name: "Avocado", price: 1.99, oldPrice: null, image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop", category: "Fruits", rating: 4.9, inStock: true, discount: 0, weight: "each" },
    { id: 6, name: "Spinach", price: 2.29, oldPrice: 2.79, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop", category: "Vegetables", rating: 4.4, inStock: true, discount: 0, weight: "bunch" },
    { id: 7, name: "Strawberries", price: 5.99, oldPrice: 6.99, image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop", category: "Fruits", rating: 4.8, inStock: false, discount: 0, weight: "500g" },
    { id: 8, name: "Bell Peppers", price: 3.49, oldPrice: null, image: "https://images.unsplash.com/photo-1563565375-f3fdf5c69b37?w=400&h=400&fit=crop", category: "Vegetables", rating: 4.5, inStock: true, discount: 0, weight: "3pcs" },
    { id: 9, name: "Bananas", price: 1.49, oldPrice: 1.99, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop", category: "Fruits", rating: 4.6, inStock: true, discount: 25, weight: "1kg" },
    { id: 10, name: "Cucumber", price: 0.99, oldPrice: null, image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&h=400&fit=crop", category: "Vegetables", rating: 4.3, inStock: true, discount: 0, weight: "each" },
    { id: 11, name: "Oranges", price: 3.99, oldPrice: 4.49, image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=400&fit=crop", category: "Fruits", rating: 4.7, inStock: true, discount: 10, weight: "1kg" },
    { id: 12, name: "Potatoes", price: 2.99, oldPrice: null, image: "https://images.unsplash.com/photo-1518977676601-b53f82a6b696?w=400&h=400&fit=crop", category: "Vegetables", rating: 4.4, inStock: true, discount: 0, weight: "2kg" },
  ];

  const categories = ["All", "Vegetables", "Fruits", "Organic", "Fresh Juice"];
  const priceRanges = [
    { label: "All Price", min: 0, max: Infinity },
    { label: "Under $2", min: 0, max: 2 },
    { label: "$2 - $5", min: 2, max: 5 },
    { label: "$5 - $10", min: 5, max: 10 },
    { label: "Over $10", min: 10, max: Infinity },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState(priceRanges[0]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const productsPerPage = 8;

  // Filter and sort products
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesPrice = product.price >= selectedPrice.min && product.price <= selectedPrice.max;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  // Render stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i key={i} className={`bi ${i < Math.floor(rating) ? "bi-star-fill" : i < rating ? "bi-star-half" : "bi-star"} text-warning`}></i>
    ));
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedPrice(priceRanges[0]);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const FilterContent = () => (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">Filters</h5>
        <button className="btn btn-link text-success text-decoration-none p-0" onClick={clearFilters}>
          <small>Clear All</small>
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <label className="form-label fw-bold small text-muted">SEARCH</label>
        <div className="input-group">
          <span className="input-group-text bg-white border-end-0">
            <i className="bi bi-search text-muted"></i>
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-4">
        <label className="form-label fw-bold small text-muted">CATEGORIES</label>
        <div className="d-flex flex-column gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm text-start d-flex justify-content-between align-items-center ${selectedCategory === cat ? "btn-success" : "btn-outline-secondary border-0"}`}
              onClick={() => setSelectedCategory(cat)}
            >
              <span>{cat}</span>
              <span className={`badge ${selectedCategory === cat ? "bg-white text-success" : "bg-secondary bg-opacity-25 text-secondary"}`}>
                {cat === "All" ? allProducts.length : allProducts.filter(p => p.category === cat).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label className="form-label fw-bold small text-muted">PRICE RANGE</label>
        <div className="d-flex flex-column gap-2">
          {priceRanges.map((range, idx) => (
            <button
              key={idx}
              className={`btn btn-sm text-start ${selectedPrice.label === range.label ? "btn-success" : "btn-outline-secondary border-0"}`}
              onClick={() => setSelectedPrice(range)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="mb-4">
        <label className="form-label fw-bold small text-muted">AVAILABILITY</label>
        <div className="form-check mb-2">
          <input className="form-check-input" type="checkbox" id="inStock" defaultChecked />
          <label className="form-check-label" htmlFor="inStock">
            In Stock
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="onSale" />
          <label className="form-check-label" htmlFor="onSale">
            On Sale
          </label>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-success bg-opacity-10 rounded-3 p-4 text-center mt-4">
        <i className="bi bi-gift text-success fs-1 mb-2 d-block"></i>
        <h6 className="fw-bold mb-1">Special Offer!</h6>
        <p className="small text-muted mb-3">Get 20% off on your first order</p>
        <button className="btn btn-success w-100 rounded-pill">Shop Now</button>
      </div>
    </>
  );

  return (
    <div>
      {/* Page Header */}
      <section className="bg-success bg-opacity-10 py-4 mb-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="fw-bold mb-0">Our Products</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
                  <li className="breadcrumb-item active text-success" aria-current="page">Products</li>
                </ol>
              </nav>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <span className="text-muted">Showing <strong>{filteredProducts.length}</strong> products</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container pb-5">
        {/* Mobile Filter Toggle */}
        <div className="d-lg-none mb-3">
          <button 
            className="btn btn-success w-100 rounded-pill"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <i className={`bi bi-funnel${showMobileFilters ? '-fill' : ''} me-2`}></i>
            {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="row g-4">
          {/* Sidebar Filters - Desktop */}
          <div className="col-lg-3 d-none d-lg-block">
            <div className="card border-0 shadow-sm sticky-top" style={{ top: "20px" }}>
              <div className="card-body">
                <FilterContent />
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showMobileFilters && (
            <div className="col-12 d-lg-none">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <FilterContent />
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="col-lg-9">
            {/* Toolbar */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body d-flex flex-wrap justify-content-between align-items-center gap-3">
                <div className="d-flex align-items-center gap-2">
                  <span className="text-muted small">Sort by:</span>
                  <select 
                    className="form-select form-select-sm w-auto border-0 bg-light" 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
                
                <div className="d-flex align-items-center gap-3">
                  <div className="btn-group" role="group">
                    <button 
                      className={`btn btn-sm ${viewMode === "grid" ? "btn-success" : "btn-outline-secondary"}`}
                      onClick={() => setViewMode("grid")}
                    >
                      <i className="bi bi-grid-3x3-gap-fill"></i>
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

            {/* Products */}
            {currentProducts.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-search display-1 text-muted mb-3"></i>
                <h4>No products found</h4>
                <p className="text-muted">Try adjusting your filters or search query</p>
                <button className="btn btn-success rounded-pill" onClick={clearFilters}>Clear Filters</button>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "row g-4" : "d-flex flex-column gap-3"}>
                {currentProducts.map((product) => (
                  <div key={product.id} className={viewMode === "grid" ? "col-6 col-md-4" : "col-12"}>
                    <div className={`card border-0 shadow-sm h-100 product-card ${viewMode === "list" ? "flex-row align-items-center" : ""}`}>
                      <div className={`position-relative overflow-hidden ${viewMode === "list" ? "col-md-3" : ""}`}>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className={viewMode === "list" ? "img-fluid rounded-start" : "card-img-top"} 
                          style={{ 
                            height: viewMode === "list" ? "180px" : "220px", 
                            objectFit: "cover",
                            width: "100%"
                          }}
                        />
                        {product.discount > 0 && (
                          <span className="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 m-2 rounded-pill small fw-bold">
                            -{product.discount}%
                          </span>
                        )}
                        {!product.inStock && (
                          <span className="position-absolute top-0 end-0 bg-secondary text-white px-2 py-1 m-2 rounded-pill small">
                            Out of Stock
                          </span>
                        )}
                        <div className="product-actions position-absolute top-50 start-50 translate-middle d-flex gap-2 opacity-0">
                          <button className="btn btn-light rounded-circle shadow-sm" style={{ width: "38px", height: "38px" }}>
                            <i className="bi bi-heart"></i>
                          </button>
                          <button className="btn btn-success rounded-circle shadow-sm" style={{ width: "38px", height: "38px" }} disabled={!product.inStock}>
                            <i className="bi bi-cart-plus"></i>
                          </button>
                          <Link to={`/product/${product.id}`} className="btn btn-light rounded-circle shadow-sm" style={{ width: "38px", height: "38px" }}>
                            <i className="bi bi-eye"></i>
                          </Link>
                        </div>
                      </div>
                      
                      <div className={`card-body ${viewMode === "list" ? "col-md-9" : ""}`}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <span className="badge bg-success bg-opacity-10 text-success small">{product.category}</span>
                          <small className="text-muted">{product.weight}</small>
                        </div>
                        
                        <h5 className="card-title fw-bold mb-2">{product.name}</h5>
                        
                        <div className="mb-2">
                          {renderStars(product.rating)}
                          <small className="text-muted ms-1">({product.rating})</small>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <span className="text-success fw-bold fs-5">${product.price}</span>
                            {product.oldPrice && (
                              <span className="text-muted text-decoration-line-through ms-2 small">${product.oldPrice}</span>
                            )}
                          </div>
                          {viewMode === "list" && (
                            <button className={`btn ${product.inStock ? "btn-success" : "btn-secondary"} rounded-pill px-4`} disabled={!product.inStock}>
                              {product.inStock ? "Add to Cart" : "Out of Stock"}
                            </button>
                          )}
                        </div>
                        
                        {viewMode === "grid" && (
                          <button className={`btn ${product.inStock ? "btn-success" : "btn-secondary"} w-100 rounded-pill mt-3`} disabled={!product.inStock}>
                            {product.inStock ? "Add to Cart" : "Out of Stock"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Improved Pagination */}
            {totalPages > 1 && (
              <nav className="mt-5">
                <ul className="pagination justify-content-center align-items-center">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button 
                      className="page-link rounded-start-pill" 
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <i className="bi bi-chevron-left"></i>
                    </button>
                  </li>
                  
                  <div className="d-flex mx-2">
                    {getPageNumbers().map((page, idx) => (
                      <li key={idx} className={`page-item ${page === '...' ? 'disabled' : ''}`}>
                        {page === '...' ? (
                          <span className="page-link border-0 bg-transparent">...</span>
                        ) : (
                          <button 
                            className={`page-link ${currentPage === page ? "active bg-success border-success text-white" : ""}`}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </button>
                        )}
                      </li>
                    ))}
                  </div>

                  <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button 
                      className="page-link rounded-end-pill" 
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>

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
        .product-card img {
          transition: all 0.3s ease;
        }
        .product-card:hover img {
          transform: scale(1.05);
        }
        .page-link {
          color: #198754;
          border: none;
          padding: 0.5rem 0.8rem;
          margin: 0 2px;
          border-radius: 8px;
        }
        .page-link:hover {
          background-color: #e9ecef;
          color: #198754;
        }
        .page-item.disabled .page-link {
          color: #6c757d;
          background-color: transparent;
        }
        .sticky-top {
          z-index: 1020;
        }
      `}</style>
    </div>
  );
};

export default ProductList;