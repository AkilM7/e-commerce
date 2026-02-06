import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const MyOrders = () => {
  const { orderId } = useParams();
  const [selectedOrder, setSelectedOrder] = useState(orderId || null);
  const [filterStatus, setFilterStatus] = useState("all");

  const orders = [
    {
      id: "#12345",
      date: "2024-01-15",
      items: [
        { name: "Fresh Organic Tomatoes", qty: 2, price: 2.99, image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=100&h=100&fit=crop" },
        { name: "Organic Carrots", qty: 1, price: 1.99, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=100&h=100&fit=crop" }
      ],
      total: 45.99,
      status: "delivered",
      trackingNumber: "TRK789456123",
      estimatedDelivery: "Delivered on Jan 18, 2024",
      timeline: [
        { date: "Jan 15, 2024", time: "09:30 AM", status: "Order Placed", completed: true, icon: "bi-cart-check" },
        { date: "Jan 15, 2024", time: "02:15 PM", status: "Order Confirmed", completed: true, icon: "bi-check-circle" },
        { date: "Jan 16, 2024", time: "10:00 AM", status: "Shipped", completed: true, icon: "bi-truck" },
        { date: "Jan 17, 2024", time: "08:45 AM", status: "Out for Delivery", completed: true, icon: "bi-box-seam" },
        { date: "Jan 18, 2024", time: "02:30 PM", status: "Delivered", completed: true, icon: "bi-house-check" }
      ]
    },
    {
      id: "#12344",
      date: "2024-01-10",
      items: [
        { name: "Fresh Broccoli", qty: 3, price: 2.49, image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=100&h=100&fit=crop" }
      ],
      total: 32.50,
      status: "shipped",
      trackingNumber: "TRK789456124",
      estimatedDelivery: "Jan 13, 2024",
      timeline: [
        { date: "Jan 10, 2024", time: "11:20 AM", status: "Order Placed", completed: true, icon: "bi-cart-check" },
        { date: "Jan 10, 2024", time: "03:45 PM", status: "Order Confirmed", completed: true, icon: "bi-check-circle" },
        { date: "Jan 11, 2024", time: "09:00 AM", status: "Shipped", completed: true, icon: "bi-truck" },
        { date: "Jan 12, 2024", time: "Pending", status: "Out for Delivery", completed: false, icon: "bi-box-seam" },
        { date: "Jan 13, 2024", time: "Expected", status: "Delivered", completed: false, icon: "bi-house-check" }
      ]
    },
    {
      id: "#12343",
      date: "2024-01-05",
      items: [
        { name: "Red Bell Peppers", qty: 2, price: 3.49, image: "https://images.unsplash.com/photo-1563565375-f3fdf5c69b37?w=100&h=100&fit=crop" },
        { name: "Cucumber", qty: 4, price: 0.99, image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=100&h=100&fit=crop" }
      ],
      total: 78.25,
      status: "processing",
      trackingNumber: "TRK789456125",
      estimatedDelivery: "Jan 10, 2024",
      timeline: [
        { date: "Jan 5, 2024", time: "10:15 AM", status: "Order Placed", completed: true, icon: "bi-cart-check" },
        { date: "Jan 5, 2024", time: "04:30 PM", status: "Order Confirmed", completed: true, icon: "bi-check-circle" },
        { date: "Jan 6, 2024", time: "Expected", status: "Shipped", completed: false, icon: "bi-truck" },
        { date: "Jan 7, 2024", time: "Expected", status: "Out for Delivery", completed: false, icon: "bi-box-seam" },
        { date: "Jan 8, 2024", time: "Expected", status: "Delivered", completed: false, icon: "bi-house-check" }
      ]
    },
    {
      id: "#12342",
      date: "2024-01-01",
      items: [
        { name: "Bananas", qty: 2, price: 1.49, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=100&h=100&fit=crop" }
      ],
      total: 15.99,
      status: "cancelled",
      trackingNumber: null,
      estimatedDelivery: "Cancelled",
      timeline: [
        { date: "Jan 1, 2024", time: "02:00 PM", status: "Order Placed", completed: true, icon: "bi-cart-check" },
        { date: "Jan 1, 2024", time: "05:30 PM", status: "Order Cancelled", completed: true, icon: "bi-x-circle", isCancel: true }
      ]
    }
  ];

  const filteredOrders = filterStatus === "all" 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const getStatusBadge = (status) => {
    const badges = {
      delivered: { bg: "success", text: "Delivered" },
      shipped: { bg: "primary", text: "Shipped" },
      processing: { bg: "warning", text: "Processing" },
      cancelled: { bg: "danger", text: "Cancelled" }
    };
    const badge = badges[status] || badges.processing;
    return (
      <span className={`badge bg-${badge.bg} bg-opacity-10 text-${badge.bg} px-3 py-2`}>
        {badge.text}
      </span>
    );
  };

  const renderTimeline = (timeline) => {
    return (
      <div className="position-relative">
        {timeline.map((step, idx) => (
          <div key={idx} className="d-flex mb-4 position-relative">
            {/* Timeline Line */}
            {idx !== timeline.length - 1 && (
              <div 
                className={`position-absolute start-0 translate-middle-x ${step.completed ? 'bg-success' : 'bg-secondary'}`}
                style={{ 
                  width: "2px", 
                  height: "100%", 
                  left: "20px", 
                  top: "40px",
                  opacity: step.completed ? 1 : 0.3
                }}
              ></div>
            )}
            
            {/* Icon */}
            <div 
              className={`rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0 ${
                step.completed 
                  ? step.isCancel ? 'bg-danger' : 'bg-success' 
                  : 'bg-secondary bg-opacity-25'
              }`}
              style={{ width: "40px", height: "40px", zIndex: 1 }}
            >
              <i className={`bi ${step.icon} ${step.completed ? 'text-white' : 'text-secondary'}`}></i>
            </div>
            
            {/* Content */}
            <div>
              <h6 className={`fw-bold mb-1 ${step.completed ? (step.isCancel ? 'text-danger' : 'text-dark') : 'text-muted'}`}>
                {step.status}
              </h6>
              <small className="text-muted">
                {step.date} at {step.time}
              </small>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Page Header */}
      <section className="bg-success bg-opacity-10 py-4 mb-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="fw-bold mb-0">My Orders</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-decoration-none text-muted">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/account" className="text-decoration-none text-muted">My Account</Link>
                  </li>
                  <li className="breadcrumb-item active text-success" aria-current="page">My Orders</li>
                </ol>
              </nav>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <span className="text-muted">{orders.length} total orders</span>
            </div>
          </div>
        </div>
      </section>

      {/* Orders Content */}
      <section className="py-5">
        <div className="container">
          {/* Filter Tabs */}
          <div className="d-flex flex-wrap gap-2 mb-4">
            {[
              { key: "all", label: "All Orders", count: orders.length },
              { key: "processing", label: "Processing", count: orders.filter(o => o.status === "processing").length },
              { key: "shipped", label: "Shipped", count: orders.filter(o => o.status === "shipped").length },
              { key: "delivered", label: "Delivered", count: orders.filter(o => o.status === "delivered").length },
              { key: "cancelled", label: "Cancelled", count: orders.filter(o => o.status === "cancelled").length }
            ].map((filter) => (
              <button
                key={filter.key}
                className={`btn rounded-pill ${filterStatus === filter.key ? 'btn-success' : 'btn-outline-secondary'}`}
                onClick={() => setFilterStatus(filter.key)}
              >
                {filter.label}
                <span className={`badge ${filterStatus === filter.key ? 'bg-white text-success' : 'bg-secondary'} ms-2`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>

          <div className="row g-4">
            {/* Orders List */}
            <div className={selectedOrder ? "col-lg-5" : "col-12"}>
              {filteredOrders.map((order) => (
                <div 
                  key={order.id} 
                  className={`card border-0 shadow-sm rounded-4 mb-3 cursor-pointer ${selectedOrder === order.id ? 'border-success border-2' : ''}`}
                  onClick={() => setSelectedOrder(order.id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h6 className="fw-bold mb-1">{order.id}</h6>
                        <small className="text-muted">Placed on {order.date}</small>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>

                    <div className="d-flex gap-2 mb-3">
                      {order.items.slice(0, 3).map((item, idx) => (
                        <img 
                          key={idx}
                          src={item.image} 
                          alt={item.name}
                          className="rounded-2"
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                      ))}
                      {order.items.length > 3 && (
                        <div 
                          className="bg-light rounded-2 d-flex align-items-center justify-content-center fw-bold text-muted"
                          style={{ width: "50px", height: "50px" }}
                        >
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <small className="text-muted d-block">Total Amount</small>
                        <span className="fw-bold fs-5 text-success">${order.total.toFixed(2)}</span>
                      </div>
                      <button className="btn btn-sm btn-outline-success rounded-pill">
                        Track Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Details / Tracking */}
            {selectedOrder && (
              <div className="col-lg-7">
                {(() => {
                  const order = orders.find(o => o.id === selectedOrder);
                  if (!order) return null;
                  
                  return (
                    <div className="card border-0 shadow-lg rounded-4 sticky-top" style={{ top: "20px" }}>
                      <div className="card-header bg-success text-white p-4 border-0 rounded-top-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h5 className="fw-bold mb-1">Order {order.id}</h5>
                            <small className="opacity-75">Tracking: {order.trackingNumber || "N/A"}</small>
                          </div>
                          <button 
                            className="btn btn-light btn-sm rounded-pill"
                            onClick={() => setSelectedOrder(null)}
                          >
                            <i className="bi bi-x-lg"></i>
                          </button>
                        </div>
                      </div>
                      
                      <div className="card-body p-4">
                        {/* Status Banner */}
                        <div className={`alert ${order.status === 'delivered' ? 'alert-success' : order.status === 'cancelled' ? 'alert-danger' : 'alert-info'} d-flex align-items-center mb-4`}>
                          <i className={`bi ${order.status === 'delivered' ? 'bi-check-circle-fill' : order.status === 'cancelled' ? 'bi-x-circle-fill' : 'bi-truck'} fs-4 me-3`}></i>
                          <div>
                            <h6 className="fw-bold mb-0">
                              {order.status === 'delivered' ? 'Delivered' : order.status === 'cancelled' ? 'Order Cancelled' : 'In Transit'}
                            </h6>
                            <small className="mb-0">{order.estimatedDelivery}</small>
                          </div>
                        </div>

                        {/* Tracking Timeline */}
                        <h6 className="fw-bold mb-4">Order Status</h6>
                        {renderTimeline(order.timeline)}

                        <hr className="my-4" />

                        {/* Order Items */}
                        <h6 className="fw-bold mb-3">Order Items</h6>
                        {order.items.map((item, idx) => (
                          <div key={idx} className="d-flex align-items-center gap-3 mb-3 p-2 bg-light rounded-3">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="rounded-2"
                              style={{ width: "60px", height: "60px", objectFit: "cover" }}
                            />
                            <div className="flex-grow-1">
                              <h6 className="fw-bold mb-1">{item.name}</h6>
                              <small className="text-muted">Qty: {item.qty}</small>
                            </div>
                            <span className="fw-bold">${(item.price * item.qty).toFixed(2)}</span>
                          </div>
                        ))}

                        <hr className="my-4" />

                        {/* Order Summary */}
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">Subtotal</span>
                          <span>${(order.total * 0.9).toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">Shipping</span>
                          <span>${(order.total * 0.1).toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between pt-3 border-top">
                          <span className="fw-bold">Total</span>
                          <span className="fw-bold fs-4 text-success">${order.total.toFixed(2)}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="d-flex gap-2 mt-4">
                          {order.status === 'delivered' && (
                            <button className="btn btn-success rounded-pill flex-fill">
                              <i className="bi bi-arrow-counterclockwise me-2"></i>
                              Reorder
                            </button>
                          )}
                          <button className="btn btn-outline-secondary rounded-pill flex-fill">
                            <i className="bi bi-download me-2"></i>
                            Invoice
                          </button>
                          {order.status !== 'cancelled' && order.status !== 'delivered' && (
                            <button className="btn btn-outline-danger rounded-pill">
                              <i className="bi bi-x-circle me-2"></i>
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .cursor-pointer {
          transition: all 0.3s ease;
        }
        .cursor-pointer:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default MyOrders;