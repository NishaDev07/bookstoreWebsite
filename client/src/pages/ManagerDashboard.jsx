import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function ManagerDashboard() {
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);

  const load = async () => {
    const [bookRes, orderRes] = await Promise.all([
      api.get('/books?status=pending'),
      api.get('/orders')
    ]);
    setBooks(bookRes.data.books);
    setOrders(orderRes.data.orders);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    await api.patch(`/books/${id}/status`, { status });
    load();
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <h2>Manager dashboard</h2>
            <p>Approve submissions and monitor orders.</p>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="panel">
            <h3>Pending books</h3>
            <div className="stack">
              {books.map((book) => (
                <div className="list-card" key={book._id}>
                  <div>
                    <h4>{book.title}</h4>
                    <p className="muted">{book.authorName}</p>
                  </div>
                  <div className="row-gap">
                    <button className="primary-btn" onClick={() => updateStatus(book._id, 'approved')}>Approve</button>
                    <button className="ghost-btn" onClick={() => updateStatus(book._id, 'rejected')}>Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <h3>Orders</h3>
            <div className="stack">
              {orders.map((order) => (
                <div className="list-card" key={order._id}>
                  <div>
                    <h4>Order #{order._id.slice(-6)}</h4>
                    <p className="muted">{order.user?.name} · {order.paymentStatus}</p>
                  </div>
                  <strong>₹{order.subtotal}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
