import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api/axios";

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get initial values from URL params
  const initialCategory = searchParams.get('category') || "All";
  const initialSearch = searchParams.get('search') || "";
  const initialMinPrice = searchParams.get('min_price') || "";
  const initialMaxPrice = searchParams.get('max_price') || "";
  const initialPage = parseInt(searchParams.get('page')) || 1;
  const initialSort = searchParams.get('sort') || "featured";

  // State
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [sortBy, setSortBy] = useState(initialSort);
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  
  const productsPerPage = 12;

  // Price ranges for quick select
  const priceRanges = [
    { label: "All Price", min: "", max: "" },
    { label: "Under $2", min: "0", max: "2" },
    { label: "$2 - $5", min: "2", max: "5" },
    { label: "$5 - $10", min: "5", max: "10" },
    { label: "Over $10", min: "10", max: "" },
  ];

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories/');
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Build query params
        const params = new URLSearchParams();
        params.set('page', currentPage);
        params.set('page_size', productsPerPage);
        
        if (selectedCategory !== "All") {
          params.set('category', selectedCategory);
        }
        if (searchQuery) {
          params.set('search', searchQuery);
        }
        if (minPrice) {
          params.set('min_price', minPrice);
        }
        if (maxPrice) {
          params.set('max_price', maxPrice);
        }
        
        // Handle sorting
        switch (sortBy) {
          case 'price-low':
            params.set('ordering', 'price');
            break;
          case 'price-high':
            params.set('ordering', '-price');
            break;
          case 'rating':
            params.set('ordering', '-rating');
            break;
          case 'newest':
            params.set('ordering', '-created_at');
            break;
          default:
            params.set('ordering', '-created_at');
        }
        
        const res = await api.get(`/products/?${params.toString()}`);
        setProducts(res.data.results || res.data);
        setTotalProducts(res.data.count || res.data.length);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
    
    // Update URL params
    const newParams = new URLSearchParams();
    if (selectedCategory !== "All") newParams.set('category', selectedCategory);
    if (searchQuery) newParams.set('search', searchQuery);
    if (minPrice) newParams.set('min_price', minPrice);
    if (maxPrice) newParams.set('max_price', maxPrice);
    if (sortBy !== "featured") newParams.set('sort', sortBy);
    if (currentPage > 1) newParams.set('page', currentPage);
    setSearchParams(newParams);
    
  }, [selectedCategory, searchQuery, minPrice, maxPrice, sortBy, currentPage]);

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/400x400?text=No+Image';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://127.0.0.1:8000${imagePath}`;
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalProducts / productsPerPage);

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
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating || 0)) {
        stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
      } else if (i - 0.5 <= (rating || 0)) {
        stars.push(<i key={i} className="bi bi-star-half text-warning"></i>);
      } else {
        stars.push(<i key={i} className="bi bi-star text-warning"></i>);
      }
    }
    return stars;
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("featured");
    setCurrentPage(1);
  };

  const handlePriceRangeSelect = (range) => {
    setMinPrice(range.min);
    setMaxPrice(range.max);
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
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-4">
        <label className="form-label fw-bold small text-muted">CATEGORIES</label>
        <div className="d-flex flex-column gap-2">
          <button
            className={`btn btn-sm text-start d-flex justify-content-between align-items-center ${selectedCategory === "All" ? "btn-success" : "btn-outline-secondary border-0"}`}
            onClick={() => {
              setSelectedCategory("All");
              setCurrentPage(1);
            }}
          >
            <span>All</span>
            <span className={`badge ${selectedCategory === "All" ? "bg-white text-success" : "bg-secondary bg-opacity-25 text-secondary"}`}>
              All
            </span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`btn btn-sm text-start d-flex justify-content-between align-items-center ${selectedCategory === cat.id.toString() ? "btn-success" : "btn-outline-secondary border-0"}`}
              onClick={() => {
                setSelectedCategory(cat.id.toString());
                setCurrentPage(1);
              }}
            >
              <span>{cat.category_name}</span>
              <span className={`badge ${selectedCategory === cat.id.toString() ? "bg-white text-success" : "bg-secondary bg-opacity-25 text-secondary"}`}>
                {cat.subcategories?.length || 0}
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
              className={`btn btn-sm text-start ${
                minPrice === range.min && maxPrice === range.max 
                  ? "btn-success" 
                  : "btn-outline-secondary border-0"
              }`}
              onClick={() => handlePriceRangeSelect(range)}
            >
              {range.label}
            </button>
          ))}
        </div>
        
        {/* Custom Price Input */}
        <div className="row g-2 mt-2">
          <div className="col-6">
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="col-6">
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>

    </>
  );

  if (loading && products.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
        <button className="btn btn-success" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

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
              <span className="text-muted">Showing <strong>{products.length}</strong> of <strong>{totalProducts}</strong> products</span>
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
                    <option value="newest">Newest First</option>
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
            {products.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-search display-1 text-muted mb-3"></i>
                <h4>No products found</h4>
                <p className="text-muted">Try adjusting your filters or search query</p>
                <button className="btn btn-success rounded-pill" onClick={clearFilters}>Clear Filters</button>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "row g-4" : "d-flex flex-column gap-3"}>
                {products.map((product) => (
                  <div key={product.id} className={viewMode === "grid" ? "col-6 col-md-4" : "col-12"}>
                    <div className={`card border-0 shadow-sm h-100 product-card ${viewMode === "list" ? "flex-row align-items-center" : ""}`}>
                      <div className={`position-relative overflow-hidden ${viewMode === "list" ? "col-md-3" : ""}`}>
                        <img 
                          src={getImageUrl(product.photo)} 
                          alt={product.product_name} 
                          className={viewMode === "list" ? "img-fluid rounded-start" : "card-img-top"} 
                          style={{ 
                            height: viewMode === "list" ? "180px" : "220px", 
                            objectFit: "cover",
                            width: "100%"
                          }}
                        />
                        {/* Discount badge - calculate if needed */}
                        {product.old_price && parseFloat(product.old_price) > parseFloat(product.price) && (
                          <span className="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 m-2 rounded-pill small fw-bold">
                            -{Math.round((1 - product.price/product.old_price) * 100)}%
                          </span>
                        )}
                        {product.quantity === 0 && (
                          <span className="position-absolute top-0 end-0 bg-secondary text-white px-2 py-1 m-2 rounded-pill small">
                            Out of Stock
                          </span>
                        )}
                        <div className="product-actions position-absolute top-50 start-50 translate-middle d-flex gap-2 opacity-0">
                          <button className="btn btn-light rounded-circle shadow-sm" style={{ width: "38px", height: "38px" }}>
                            <i className="bi bi-heart"></i>
                          </button>
                          <button 
                            className="btn btn-success rounded-circle shadow-sm" 
                            style={{ width: "38px", height: "38px" }} 
                            disabled={product.quantity === 0}
                          >
                            <i className="bi bi-cart-plus"></i>
                          </button>
                          <Link 
                            to={`/product/${product.product_url}`} 
                            className="btn btn-light rounded-circle shadow-sm" 
                            style={{ width: "38px", height: "38px" }}
                          >
                            <i className="bi bi-eye"></i>
                          </Link>
                        </div>
                      </div>
                      
                      <div className={`card-body ${viewMode === "list" ? "col-md-9" : ""}`}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <span className="badge bg-success bg-opacity-10 text-success small">
                            {product.category_name}
                          </span>
                          <small className="text-muted">{product.minimum}-{product.maximum} pcs</small>
                        </div>
                        
                        <h5 className="card-title fw-bold mb-2">{product.product_name}</h5>
                        
                        <div className="mb-2">
                          {renderStars(product.rating || 4.5)}
                          <small className="text-muted ms-1">({product.rating || 4.5})</small>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <span className="text-success fw-bold fs-5">${product.price}</span>
                            {product.old_price && (
                              <span className="text-muted text-decoration-line-through ms-2 small">${product.old_price}</span>
                            )}
                          </div>
                          {viewMode === "list" && (
                            <button 
                              className={`btn ${product.quantity > 0 ? "btn-success" : "btn-secondary"} rounded-pill px-4`} 
                              disabled={product.quantity === 0}
                            >
                              {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
                            </button>
                          )}
                        </div>
                        
                        {viewMode === "grid" && (
                          <button 
                            className={`btn ${product.quantity > 0 ? "btn-success" : "btn-secondary"} w-100 rounded-pill mt-3`} 
                            disabled={product.quantity === 0}
                          >
                            {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
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
        
        /* FIXED: Lower z-index for sticky sidebar so it stays below header */
        .sticky-top {
          z-index: 1020;
        }
        
        /* Ensure header has higher z-index - add this if needed in your Header component */
        .navbar {
          z-index: 1030 !important;
        }
      `}</style>
    </div>
  );
};

export default ProductList;