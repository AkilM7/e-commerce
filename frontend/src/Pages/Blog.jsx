import React, { useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All Posts", count: 12 },
    { id: "recipes", name: "Recipes", count: 5 },
    { id: "health", name: "Health Tips", count: 4 },
    { id: "sustainability", name: "Sustainability", count: 2 },
    { id: "news", name: "News", count: 1 }
  ];

  const featuredPost = {
    id: 1,
    title: "The Ultimate Guide to Eating Organic: Benefits for Your Health and the Planet",
    excerpt: "Discover why organic food matters and how making the switch can improve your health while supporting sustainable farming practices.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=600&fit=crop",
    category: "Health Tips",
    author: "Sarah Johnson",
    date: "January 15, 2024",
    readTime: "8 min read",
    authorImage: "https://i.pravatar.cc/150?img=5"
  };

  const blogPosts = [
    {
      id: 2,
      title: "10 Quick and Healthy Salad Recipes for Busy Weekdays",
      excerpt: "Fresh, delicious salads that take less than 15 minutes to prepare. Perfect for lunch or a light dinner.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
      category: "Recipes",
      author: "Mike Chen",
      date: "January 12, 2024",
      readTime: "5 min read",
      authorImage: "https://i.pravatar.cc/150?img=3"
    },
    {
      id: 3,
      title: "Seasonal Eating: Why It Matters and How to Start",
      excerpt: "Learn about the benefits of eating seasonally and get tips on how to incorporate seasonal produce into your diet.",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop",
      category: "Health Tips",
      author: "Emily Davis",
      date: "January 10, 2024",
      readTime: "6 min read",
      authorImage: "https://i.pravatar.cc/150?img=9"
    },
    {
      id: 4,
      title: "Reducing Food Waste: Tips from Our Farmers",
      excerpt: "Simple strategies to minimize food waste at home while maximizing the freshness of your produce.",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop",
      category: "Sustainability",
      author: "John Smith",
      date: "January 8, 2024",
      readTime: "4 min read",
      authorImage: "https://i.pravatar.cc/150?img=11"
    },
    {
      id: 5,
      title: "Smoothie Bowl Recipes for a Healthy Breakfast",
      excerpt: "Start your day right with these nutritious and delicious smoothie bowl recipes featuring fresh organic fruits.",
      image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600&h=400&fit=crop",
      category: "Recipes",
      author: "Sarah Johnson",
      date: "January 5, 2024",
      readTime: "5 min read",
      authorImage: "https://i.pravatar.cc/150?img=5"
    },
    {
      id: 6,
      title: "Meet the Farmers: The Story Behind Your Vegetables",
      excerpt: "Get to know the dedicated farmers who grow your food and learn about their sustainable farming practices.",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&h=400&fit=crop",
      category: "News",
      author: "Lisa Wang",
      date: "January 3, 2024",
      readTime: "7 min read",
      authorImage: "https://i.pravatar.cc/150?img=16"
    },
    {
      id: 7,
      title: "Composting 101: Turn Kitchen Scraps into Garden Gold",
      excerpt: "A beginner's guide to composting at home. Learn how to reduce waste and create nutrient-rich soil for your garden.",
      image: "https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?w=600&h=400&fit=crop",
      category: "Sustainability",
      author: "Tom Wilson",
      date: "December 28, 2023",
      readTime: "6 min read",
      authorImage: "https://i.pravatar.cc/150?img=12"
    }
  ];

  const popularTags = ["Organic", "Healthy Eating", "Recipes", "Sustainability", "Fresh", "Local", "Nutrition", "Cooking Tips"];

  const filteredPosts = activeCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") === activeCategory);

  return (
    <div>
      {/* Page Header */}
      <section className="bg-success bg-opacity-10 py-4 mb-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="fw-bold mb-0">Our Blog</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-decoration-none text-muted">Home</Link>
                  </li>
                  <li className="breadcrumb-item active text-success" aria-current="page">Blog</li>
                </ol>
              </nav>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <span className="text-muted">Fresh stories, healthy tips</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-4 bg-light border-bottom">
        <div className="container">
          <div className="row g-3 align-items-center">
            <div className="col-lg-6">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search text-success"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control border-start-0 bg-white"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="d-flex flex-wrap gap-2 justify-content-lg-end">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`btn btn-sm rounded-pill ${activeCategory === cat.id ? 'btn-success' : 'btn-outline-secondary'}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    {cat.name}
                    <span className={`badge ${activeCategory === cat.id ? 'bg-white text-success' : 'bg-secondary'} ms-2`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-5">
        <div className="container">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="row g-0">
              <div className="col-lg-6">
                <div className="position-relative h-100">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="w-100 h-100"
                    style={{ objectFit: "cover", minHeight: "400px" }}
                  />
                  <span className="position-absolute top-0 start-0 bg-success text-white px-3 py-2 m-3 rounded-pill">
                    Featured
                  </span>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card-body p-4 p-lg-5 d-flex flex-column justify-content-center h-100">
                  <span className="badge bg-success bg-opacity-10 text-success mb-3 w-fit-content">
                    {featuredPost.category}
                  </span>
                  <h2 className="fw-bold display-6 mb-3">{featuredPost.title}</h2>
                  <p className="lead text-muted mb-4">{featuredPost.excerpt}</p>
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <img 
                      src={featuredPost.authorImage} 
                      alt={featuredPost.author} 
                      className="rounded-circle"
                      width="50"
                      height="50"
                    />
                    <div>
                      <h6 className="fw-bold mb-0">{featuredPost.author}</h6>
                      <small className="text-muted">{featuredPost.date} • {featuredPost.readTime}</small>
                    </div>
                  </div>
                  <Link to={`/blog/${featuredPost.id}`} className="btn btn-success btn-lg rounded-pill w-fit-content">
                    Read Article
                    <i className="bi bi-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div>
              <span className="text-success fw-bold text-uppercase ls-2">Latest Articles</span>
              <h2 className="fw-bold mt-2">Fresh from the Blog</h2>
            </div>
            <Link to="/blog/archive" className="btn btn-outline-success rounded-pill">
              View Archive
              <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>

          <div className="row g-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 blog-card">
                  <div className="position-relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="card-img-top"
                      style={{ height: "220px", objectFit: "cover" }}
                    />
                    <span className="position-absolute top-0 start-0 bg-white text-dark px-2 py-1 m-3 rounded-pill small fw-bold">
                      {post.category}
                    </span>
                  </div>
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <img 
                        src={post.authorImage} 
                        alt={post.author} 
                        className="rounded-circle"
                        width="30"
                        height="30"
                      />
                      <small className="text-muted">{post.author}</small>
                      <span className="text-muted">•</span>
                      <small className="text-muted">{post.readTime}</small>
                    </div>
                    <h5 className="fw-bold mb-3">{post.title}</h5>
                    <p className="text-muted mb-4 flex-grow-1">{post.excerpt}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">{post.date}</small>
                      <Link to={`/blog/${post.id}`} className="btn btn-sm btn-outline-success rounded-pill">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tags */}
      <section className="py-5">
        <div className="container text-center">
          <h4 className="fw-bold mb-4">Popular Tags</h4>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {popularTags.map((tag, idx) => (
              <Link 
                key={idx} 
                to={`/blog/tag/${tag.toLowerCase()}`} 
                className="btn btn-outline-secondary rounded-pill"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .ls-2 {
          letter-spacing: 2px;
        }
        .w-fit-content {
          width: fit-content;
        }
        .blog-card {
          transition: all 0.3s ease;
        }
        .blog-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.1) !important;
        }
        .blog-card img {
          transition: all 0.5s ease;
        }
        .blog-card:hover img {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default Blog;