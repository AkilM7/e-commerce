import React, { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import api from "../api/axios";

const Category = () => {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get('category');
  
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  
  // API data states
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data based on category ID or show all
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get all categories first
        const categoriesRes = await api.get('/categories/');
        const allCategories = categoriesRes.data;
        setCategories(allCategories);
        
        // Determine which category to show
        let targetCategory = null;
        
        if (categoryId) {
          // Find category by ID from URL param
          targetCategory = allCategories.find(cat => cat.id === parseInt(categoryId));
        } else if (urlCategory) {
          // Find category by name from query param
          targetCategory = allCategories.find(cat => 
            cat.category_name.toLowerCase() === urlCategory.toLowerCase()
          );
        }
        
        if (targetCategory) {
          setCurrentCategory(targetCategory);
          setSubcategories(targetCategory.subcategories || []);
          
          // Fetch products for this category
          const productsRes = await api.get(`/products/?category=${targetCategory.id}`);
          setProducts(productsRes.data);
        } else {
          // No specific category - show all products
          setCurrentCategory(null);
          setSubcategories([]);
          
          // Fetch all products
          const productsRes = await api.get('/products/');
          setProducts(productsRes.data);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId, urlCategory]);

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/400x300?text=No+Image';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://127.0.0.1:8000${imagePath}`;
  };

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'price-high':
        return parseFloat(b.price) - parseFloat(a.price);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'newest':
        return new Date(b.created_at) - new Date(a.created_at);
      default:
        return 0;
    }
  });

  // Filter by price range
  const filteredProducts = sortedProducts.filter(product => {
    const price = parseFloat(product.price);
    return price >= priceRange[0] && price <= priceRange[1];
  });

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating || 0)) {
        stars.push(<i key={i} className="bi bi-star-fill text-warning small"></i>);
      } else if (i - 0.5 <= (rating || 0)) {
        stars.push(<i key={i} className="bi bi-star-half text-warning small"></i>);
      } else {
        stars.push(<i key={i} className="bi bi-star text-warning small"></i>);
      }
    }
    return stars;
  };

  // Calculate max price for range slider
  const maxPrice = products.length > 0 
    ? Math.max(...products.map(p => parseFloat(p.price))) 
    : 1000;

  if (loading) {
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
      {/* Category Banner - Show if specific category selected */}
      {currentCategory ? (
        <section className="position-relative">
          <div 
            className="w-100" 
            style={{ 
              height: "350px", 
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${getImageUrl(currentCategory.photo)})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="container h-100 d-flex align-items-center">
              <div className="text-white">
                <span className="badge bg-success mb-3 px-3 py-2">
                  <i className="bi bi-grid-3x3-gap me-2"></i>
                  {products.length} Products
                </span>
                <h1 className="display-3 fw-bold mb-3">{currentCategory.category_name}</h1>
                <p className="lead mb-4" style={{ maxWidth: "600px" }}>
                  {currentCategory.description || `Browse our selection of ${currentCategory.category_name}`}
                </p>
                {subcategories.length > 0 && (
                  <div className="d-flex flex-wrap gap-2">
                    {subcategories.map((sub, idx) => (
                      <Link 
                        key={idx} 
                        to={`/category/${sub.id}`} 
                        className="btn btn-outline-light rounded-pill btn-sm"
                      >
                        {sub.category_name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        // All Categories Banner
        <section className="position-relative">
          <div 
            className="w-100" 
            style={{ 
              height: "300px", 
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop)`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="container h-100 d-flex align-items-center">
              <div className="text-white">
                <h1 className="display-3 fw-bold mb-3">All Categories</h1>
                <p className="lead mb-4">Browse all our fresh organic products</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Breadcrumb & Filters */}
      <section className="bg-light py-3 border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-2 mb-md-0">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
                  <li className="breadcrumb-item"><Link to="/shop" className="text-decoration-none">Shop</Link></li>
                  <li className="breadcrumb-item active text-success fw-bold" aria-current="page">
                    {currentCategory ? currentCategory.category_name : "All Categories"}
                  </li>
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

                  {/* Categories List (when showing all) */}
                  {!currentCategory && categories.length > 0 && (
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">Categories</h6>
                      <div className="d-flex flex-column gap-2">
                        {categories.map((cat) => (
                          <Link 
                            key={cat.id} 
                            to={`/category/${cat.id}`}
                            className="text-decoration-none text-dark d-flex justify-content-between align-items-center p-2 rounded hover-bg-light"
                            style={{ background: cat.id === parseInt(categoryId) ? '#e8f5e9' : 'transparent' }}
                          >
                            <span>{cat.category_name}</span>
                            <span className="badge bg-success bg-opacity-10 text-success">
                              {cat.subcategories?.length || 0}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Subcategories (when in specific category) */}
                  {currentCategory && subcategories.length > 0 && (
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">Subcategories</h6>
                      <div className="d-flex flex-column gap-2">
                        {subcategories.map((sub, idx) => (
                          <div key={idx} className="form-check">
                            <input className="form-check-input" type="checkbox" id={`sub-${idx}`} />
                            <label className="form-check-label" htmlFor={`sub-${idx}`}>
                              {sub.category_name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price Range */}
                  <div className="mb-4">
                    <h6 className="fw-bold mb-3">Price Range</h6>
                    <input 
                      type="range" 
                      className="form-range" 
                      min="0" 
                      max={maxPrice} 
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    />
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">${priceRange[0]}</span>
                      <span className="text-muted">${priceRange[1]}</span>
                    </div>
                  </div>

                  <button 
                    className="btn btn-success w-100 rounded-pill"
                    onClick={() => setPriceRange([0, maxPrice])}
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="col-lg-9">
              {/* Results Count */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="text-muted">
                  Showing {filteredProducts.length} of {products.length} products
                </span>
                <div className="d-flex gap-2">
                  {currentCategory && (
                    <span className="badge bg-success">{currentCategory.category_name}</span>
                  )}
                </div>
              </div>

              {/* No Products Message */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-inbox fs-1 text-muted mb-3"></i>
                  <h5>No products found</h5>
                  <p className="text-muted">Try adjusting your filters or browse other categories</p>
                  <Link to="/category" className="btn btn-success">View All Products</Link>
                </div>
              ) : (
                <>
                  {/* Products */}
                  <div className={viewMode === "grid" ? "row g-4" : "d-flex flex-column gap-3"}>
                    {filteredProducts.map((product) => (
                      <div key={product.id} className={viewMode === "grid" ? "col-6 col-md-4" : "col-12"}>
                        <div className={`card border-0 shadow-sm rounded-4 overflow-hidden product-card ${viewMode === "list" ? "flex-row" : ""}`}>
                          <div className={`position-relative ${viewMode === "list" ? "col-md-4" : ""}`}>
                            <img 
                              src={getImageUrl(product.photo)} 
                              alt={product.product_name} 
                              className={viewMode === "list" ? "img-fluid h-100" : "card-img-top"} 
                              style={{ height: viewMode === "list" ? "200px" : "250px", objectFit: "cover" }}
                            />
                            <div className="product-actions position-absolute top-50 start-50 translate-middle d-flex gap-2 opacity-0">
                              <button className="btn btn-light rounded-circle shadow-sm" style={{ width: "40px", height: "40px" }}>
                                <i className="bi bi-heart"></i>
                              </button>
                              <button className="btn btn-success rounded-circle shadow-sm" style={{ width: "40px", height: "40px" }}>
                                <i className="bi bi-cart-plus"></i>
                              </button>
                              <Link 
                                to={`/product/${product.product_url}`} 
                                className="btn btn-light rounded-circle shadow-sm" 
                                style={{ width: "40px", height: "40px" }}
                              >
                                <i className="bi bi-eye"></i>
                              </Link>
                            </div>
                          </div>
                          <div className={`card-body ${viewMode === "list" ? "col-md-8 d-flex flex-column justify-content-center" : ""}`}>
                            <div className="mb-2">{renderStars(product.rating || 4.5)}</div>
                            <h5 className="card-title fw-bold mb-2">{product.product_name}</h5>
                            <p className="text-muted small mb-2">
                              {product.category_name}
                              {product.sub_category_name && ` > ${product.sub_category_name}`}
                            </p>
                            <div className="d-flex align-items-center gap-2 mb-3">
                              <span className="text-success fw-bold fs-4">${product.price}</span>
                            </div>
                            {viewMode === "list" && (
                              <p className="text-muted mb-3">{product.description?.substring(0, 100)}...</p>
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
                  {filteredProducts.length > 12 && (
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
                        <li className="page-item">
                          <button className="page-link rounded-end-pill">
                            <i className="bi bi-chevron-right"></i>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  )}
                </>
              )}
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
        .hover-bg-light:hover {
          background-color: #f8f9fa !important;
        }
      `}</style>
    </div>
  );
};

export default Category;