import React, { useState } from "react";
import { Link } from "react-router-dom";

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("profile");
  
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 234 567 890",
    avatar: "https://i.pravatar.cc/150?img=11",
    address: "123 Street Name",
    city: "California",
    state: "CA",
    zip: "90210",
    country: "USA"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setUserData(formData);
    setIsEditing(false);
  };

  const stats = [
    { icon: "bi-bag-check", label: "Total Orders", value: "24", color: "success" },
    { icon: "bi-heart", label: "Wishlist", value: "12", color: "danger" },
    { icon: "bi-ticket-perforated", label: "Coupons", value: "5", color: "warning" },
    { icon: "bi-star", label: "Reviews", value: "8", color: "info" }
  ];

  const recentOrders = [
    { id: "#12345", date: "2024-01-15", total: "$45.99", status: "Delivered", statusColor: "success" },
    { id: "#12344", date: "2024-01-10", total: "$32.50", status: "Shipped", statusColor: "primary" },
    { id: "#12343", date: "2024-01-05", total: "$78.25", status: "Processing", statusColor: "warning" }
  ];

  return (
    <div>
      {/* Page Header */}
      <section className="bg-success bg-opacity-10 py-4 mb-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="fw-bold mb-0">My Account</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-decoration-none text-muted">Home</Link>
                  </li>
                  <li className="breadcrumb-item active text-success" aria-current="page">My Account</li>
                </ol>
              </nav>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <span className="text-muted">Welcome back, {userData.firstName}!</span>
            </div>
          </div>
        </div>
      </section>

      {/* Account Content */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {/* Sidebar */}
            <div className="col-lg-3">
              <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body text-center p-4">
                  <div className="position-relative d-inline-block mb-3">
                    <img 
                      src={userData.avatar} 
                      alt="Profile" 
                      className="rounded-circle border border-4 border-success"
                      style={{ width: "120px", height: "120px", objectFit: "cover" }}
                    />
                    <button className="btn btn-success btn-sm rounded-circle position-absolute bottom-0 end-0" style={{ width: "35px", height: "35px" }}>
                      <i className="bi bi-camera-fill"></i>
                    </button>
                  </div>
                  <h5 className="fw-bold mb-1">{userData.firstName} {userData.lastName}</h5>
                  <p className="text-muted small mb-0">{userData.email}</p>
                </div>
              </div>

              <div className="card border-0 shadow-sm rounded-4">
                <div className="list-group list-group-flush">
                  <button 
                    className={`list-group-item list-group-item-action py-3 ${activeTab === 'profile' ? 'active bg-success border-success' : ''}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <i className="bi bi-person-circle me-2"></i>
                    Profile Information
                  </button>
                  <button 
                    className={`list-group-item list-group-item-action py-3 ${activeTab === 'orders' ? 'active bg-success border-success' : ''}`}
                    onClick={() => setActiveTab('orders')}
                  >
                    <i className="bi bi-bag me-2"></i>
                    My Orders
                  </button>
                  <button 
                    className={`list-group-item list-group-item-action py-3 ${activeTab === 'addresses' ? 'active bg-success border-success' : ''}`}
                    onClick={() => setActiveTab('addresses')}
                  >
                    <i className="bi bi-geo-alt me-2"></i>
                    Addresses
                  </button>
                  <button 
                    className={`list-group-item list-group-item-action py-3 ${activeTab === 'wishlist' ? 'active bg-success border-success' : ''}`}
                    onClick={() => setActiveTab('wishlist')}
                  >
                    <i className="bi bi-heart me-2"></i>
                    Wishlist
                  </button>
                  <button 
                    className={`list-group-item list-group-item-action py-3 ${activeTab === 'settings' ? 'active bg-success border-success' : ''}`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <i className="bi bi-gear me-2"></i>
                    Settings
                  </button>
                  <Link to="/logout" className="list-group-item list-group-item-action py-3 text-danger">
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-lg-9">
              {/* Stats Cards */}
              <div className="row g-3 mb-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="col-6 col-md-3">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                      <div className="card-body text-center p-3">
                        <div className={`bg-${stat.color} bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2`} style={{ width: "50px", height: "50px" }}>
                          <i className={`bi ${stat.icon} text-${stat.color} fs-4`}></i>
                        </div>
                        <h5 className="fw-bold mb-0">{stat.value}</h5>
                        <small className="text-muted">{stat.label}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="card border-0 shadow-sm rounded-4">
                  <div className="card-header bg-white border-0 p-4 d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold mb-0">
                      <i className="bi bi-person-vcard text-success me-2"></i>
                      Profile Information
                    </h5>
                    <button 
                      className={`btn ${isEditing ? 'btn-success' : 'btn-outline-success'} rounded-pill`}
                      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    >
                      <i className={`bi ${isEditing ? 'bi-check-lg' : 'bi-pencil'} me-2`}></i>
                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                  </div>
                  <div className="card-body p-4 pt-0">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-medium text-muted small">FIRST NAME</label>
                        {isEditing ? (
                          <input type="text" name="firstName" className="form-control" value={formData.firstName} onChange={handleChange} />
                        ) : (
                          <p className="fw-bold mb-0">{userData.firstName}</p>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-medium text-muted small">LAST NAME</label>
                        {isEditing ? (
                          <input type="text" name="lastName" className="form-control" value={formData.lastName} onChange={handleChange} />
                        ) : (
                          <p className="fw-bold mb-0">{userData.lastName}</p>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-medium text-muted small">EMAIL ADDRESS</label>
                        {isEditing ? (
                          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
                        ) : (
                          <p className="fw-bold mb-0">{userData.email}</p>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-medium text-muted small">PHONE NUMBER</label>
                        {isEditing ? (
                          <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} />
                        ) : (
                          <p className="fw-bold mb-0">{userData.phone}</p>
                        )}
                      </div>
                    </div>

                    <hr className="my-4" />

                    <h6 className="fw-bold mb-3">Default Address</h6>
                    <div className="bg-light rounded-3 p-3">
                      <p className="mb-1">{userData.address}</p>
                      <p className="mb-1">{userData.city}, {userData.state} {userData.zip}</p>
                      <p className="mb-0">{userData.country}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="card border-0 shadow-sm rounded-4">
                  <div className="card-header bg-white border-0 p-4">
                    <h5 className="fw-bold mb-0">
                      <i className="bi bi-bag-check text-success me-2"></i>
                      Recent Orders
                    </h5>
                  </div>
                  <div className="card-body p-4 pt-0">
                    <div className="table-responsive">
                      <table className="table table-borderless">
                        <thead className="bg-light">
                          <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentOrders.map((order) => (
                            <tr key={order.id} className="border-bottom">
                              <td className="fw-bold">{order.id}</td>
                              <td>{order.date}</td>
                              <td>{order.total}</td>
                              <td>
                                <span className={`badge bg-${order.statusColor} bg-opacity-10 text-${order.statusColor} px-3 py-2`}>
                                  {order.status}
                                </span>
                              </td>
                              <td>
                                <Link to={`/orders${order.id}`} className="btn btn-sm btn-outline-success rounded-pill">
                                  View Details
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="text-center mt-3">
                      <Link to="/orders" className="btn btn-success rounded-pill">
                        View All Orders
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Tabs Placeholder */}
              {activeTab === 'addresses' && (
                <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
                  <i className="bi bi-geo-alt display-1 text-success opacity-25"></i>
                  <h5 className="mt-3">Manage Your Addresses</h5>
                  <p className="text-muted">Feature coming soon...</p>
                </div>
              )}
              {activeTab === 'wishlist' && (
                <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
                  <i className="bi bi-heart display-1 text-danger opacity-25"></i>
                  <h5 className="mt-3">Your Wishlist</h5>
                  <p className="text-muted">Feature coming soon...</p>
                </div>
              )}
              {activeTab === 'settings' && (
                <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
                  <i className="bi bi-gear display-1 text-secondary opacity-25"></i>
                  <h5 className="mt-3">Account Settings</h5>
                  <p className="text-muted">Feature coming soon...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .list-group-item.active {
          color: white !important;
        }
        .list-group-item:hover:not(.active) {
          background-color: rgba(25, 135, 84, 0.05);
          color: #198754;
        }
      `}</style>
    </div>
  );
};

export default MyAccount;