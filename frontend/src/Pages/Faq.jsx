import React, { useState } from "react";
import { Link } from "react-router-dom";

const FAQs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openItems, setOpenItems] = useState({});

  const categories = [
    { id: "all", name: "All Questions", icon: "bi-grid" },
    { id: "orders", name: "Orders & Shipping", icon: "bi-truck" },
    { id: "returns", name: "Returns & Refunds", icon: "bi-arrow-counterclockwise" },
    { id: "products", name: "Products", icon: "bi-box" },
    { id: "account", name: "Account", icon: "bi-person" },
    { id: "payment", name: "Payment", icon: "bi-credit-card" }
  ];

  const faqs = [
    {
      id: 1,
      category: "orders",
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and visiting the 'My Orders' section. Real-time tracking updates are available through our delivery partner's website."
    },
    {
      id: 2,
      category: "orders",
      question: "What are the delivery charges?",
      answer: "We offer free standard delivery on all orders over $50. For orders below $50, a flat shipping fee of $5.99 applies. Express delivery is available for $12.99 regardless of order value."
    },
    {
      id: 3,
      category: "orders",
      question: "How long will delivery take?",
      answer: "Standard delivery takes 3-5 business days. Express delivery takes 1-2 business days. Delivery times may vary based on your location and local conditions. You'll see an estimated delivery date at checkout."
    },
    {
      id: 4,
      category: "returns",
      question: "What is your return policy?",
      answer: "We offer a 30-day money-back guarantee on all unopened items. For perishable products, please report any issues within 24 hours of delivery. Returns are free - we'll provide a prepaid shipping label."
    },
    {
      id: 5,
      category: "returns",
      question: "How do I return an item?",
      answer: "To return an item, log into your account, go to 'My Orders', select the order you want to return, and click 'Request Return'. Follow the instructions to print your return label and drop off the package at any authorized location."
    },
    {
      id: 6,
      category: "returns",
      question: "When will I receive my refund?",
      answer: "Refunds are processed within 3-5 business days after we receive your returned item. The refund will be credited to your original payment method. You'll receive an email confirmation once the refund is processed."
    },
    {
      id: 7,
      category: "products",
      question: "Are your products organic?",
      answer: "Yes! All our products are certified organic and sourced from trusted local farms. We maintain strict quality control to ensure you receive only the freshest, chemical-free produce."
    },
    {
      id: 8,
      category: "products",
      question: "How do you ensure freshness?",
      answer: "We work directly with local farmers and use temperature-controlled storage and transportation. Products are packed just before delivery to maintain maximum freshness. Our quality guarantee ensures you get farm-fresh produce every time."
    },
    {
      id: 9,
      category: "products",
      question: "What if a product is out of stock?",
      answer: "If an item becomes unavailable after you place your order, we'll notify you immediately and offer a suitable replacement or refund. You can also choose to wait for the item to be restocked."
    },
    {
      id: 10,
      category: "account",
      question: "How do I create an account?",
      answer: "Click the 'Login' button in the top right corner and select 'Create Account'. Fill in your details, verify your email, and you're ready to start shopping! Account holders enjoy faster checkout and exclusive offers."
    },
    {
      id: 11,
      category: "account",
      question: "How can I reset my password?",
      answer: "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a password reset link. The link is valid for 24 hours. If you don't receive the email, check your spam folder."
    },
    {
      id: 12,
      category: "payment",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are processed securely through encrypted connections. We never store your full credit card details."
    },
    {
      id: 13,
      category: "payment",
      question: "Is my payment information secure?",
      answer: "Absolutely! We use industry-standard SSL encryption to protect your data. All transactions are processed through PCI-compliant payment gateways. Your financial information is never stored on our servers."
    }
  ];

  const toggleItem = (id) => {
    setOpenItems({
      ...openItems,
      [id]: !openItems[id]
    });
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Page Header */}
      <section className="bg-success bg-opacity-10 py-4 mb-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="fw-bold mb-0">Frequently Asked Questions</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-decoration-none text-muted">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/help" className="text-decoration-none text-muted">Help</Link>
                  </li>
                  <li className="breadcrumb-item active text-success" aria-current="page">FAQs</li>
                </ol>
              </nav>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <span className="text-muted">Find answers quickly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-lg rounded-4">
                <div className="card-body p-4 p-md-5 text-center">
                  <h3 className="fw-bold mb-4">How Can We Help You?</h3>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-light border-end-0">
                      <i className="bi bi-search text-success fs-4"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0 bg-light"
                      placeholder="Search for answers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <p className="text-muted mt-3 mb-0">
                    <i className="bi bi-info-circle me-1"></i>
                    Can't find what you're looking for? <Link to="/contact" className="text-success">Contact us</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories & FAQs */}
      <section className="py-5 bg-light">
        <div className="container">
          {/* Category Tabs */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`btn rounded-pill px-4 py-2 ${activeCategory === cat.id ? 'btn-success' : 'btn-outline-secondary'}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <i className={`bi ${cat.icon} me-2`}></i>
                {cat.name}
              </button>
            ))}
          </div>

          {/* FAQs Accordion */}
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-search display-1 text-muted mb-3"></i>
                  <h4>No results found</h4>
                  <p className="text-muted">Try adjusting your search or category filter</p>
                  <button 
                    className="btn btn-success rounded-pill"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {filteredFaqs.map((faq) => (
                    <div 
                      key={faq.id} 
                      className={`card border-0 shadow-sm rounded-4 overflow-hidden ${openItems[faq.id] ? 'border-success border-2' : ''}`}
                    >
                      <button
                        className="card-header bg-white border-0 p-4 d-flex justify-content-between align-items-center w-100 text-start"
                        onClick={() => toggleItem(faq.id)}
                      >
                        <div className="d-flex align-items-center">
                          <div className={`bg-${openItems[faq.id] ? 'success' : 'light'} rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0`} style={{ width: "40px", height: "40px" }}>
                            <i className={`bi ${openItems[faq.id] ? 'bi-dash' : 'bi-plus'} ${openItems[faq.id] ? 'text-white' : 'text-success'} fs-4`}></i>
                          </div>
                          <h6 className={`fw-bold mb-0 ${openItems[faq.id] ? 'text-success' : ''}`}>{faq.question}</h6>
                        </div>
                      </button>
                      {openItems[faq.id] && (
                        <div className="card-body p-4 pt-0">
                          <div className="ps-5">
                            <p className="text-muted mb-0">{faq.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-5">
        <div className="container">
          <div className="card border-0 shadow-lg rounded-4 bg-success text-white overflow-hidden">
            <div className="card-body p-4 p-md-5">
              <div className="row align-items-center">
                <div className="col-lg-8 text-center text-lg-start mb-4 mb-lg-0">
                  <h3 className="fw-bold mb-2">Still Have Questions?</h3>
                  <p className="opacity-75 mb-0">Our friendly customer support team is here to help you 24/7.</p>
                </div>
                <div className="col-lg-4 text-center text-lg-end">
                  <Link to="/contact" className="btn btn-light btn-lg rounded-pill px-4 fw-bold text-success">
                    <i className="bi bi-headset me-2"></i>
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .card-header {
          transition: all 0.3s ease;
        }
        .card-header:hover {
          background-color: rgba(25, 135, 84, 0.05) !important;
        }
      `}</style>
    </div>
  );
};

export default FAQs;