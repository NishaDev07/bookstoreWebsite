import { useEffect, useMemo, useState } from 'react';
import api from '../lib/api';

export default function CartPage() {
  const [cart, setCart] = useState({ items: [] });

  const load = async () => {
    const { data } = await api.get('/cart');
    setCart(data.cart);
  };

  useEffect(() => {
    load();
  }, []);

  const subtotal = useMemo(() => {
    return cart.items.reduce((sum, item) => sum + (item.book?.price || 0) * item.quantity, 0);
  }, [cart]);

  const updateQty = async (bookId, quantity) => {
    await api.patch(`/cart/${bookId}`, { quantity });
    load();
  };

  const removeItem = async (bookId) => {
    await api.delete(`/cart/${bookId}`);
    load();
  };

  const checkout = async () => {
    const { data } = await api.post('/payments/checkout-session');
    window.location.href = data.url;
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <h2>Your cart</h2>
            <p>Review selected books before secure checkout.</p>
          </div>
        </div>

        <div className="stack">
          {cart.items.map((item) => (
            <div className="list-card" key={item.book?._id}>
              <div>
                <h3>{item.book?.title}</h3>
                <p className="muted">{item.book?.authorName}</p>
              </div>
              <div className="row-gap">
                <button className="ghost-btn" onClick={() => updateQty(item.book._id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button className="ghost-btn" onClick={() => updateQty(item.book._id, item.quantity + 1)}>+</button>
              </div>
              <strong>₹{(item.book?.price || 0) * item.quantity}</strong>
              <button className="ghost-btn" onClick={() => removeItem(item.book._id)}>Remove</button>
            </div>
          ))}
        </div>

        <div className="checkout-bar">
          <strong>Subtotal: ₹{subtotal}</strong>
          <button className="primary-btn" onClick={checkout} disabled={!cart.items.length}>
            Pay with Stripe
          </button>
        </div>
      </div>
    </section>
  );
}
