import { useEffect, useState } from 'react';
import api from '../lib/api';
import BookCard from '../components/BookCard';

export default function WishlistPage() {
  const [items, setItems] = useState([]);

  const load = async () => {
    const { data } = await api.get('/wishlist');
    setItems(data.wishlist);
  };

  useEffect(() => {
    load();
  }, []);

  const addToCart = async (bookId) => {
    await api.post('/cart', { bookId, quantity: 1 });
    alert('Added to cart');
  };

  const toggleWishlist = async (bookId) => {
    await api.post('/wishlist/toggle', { bookId });
    load();
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <h2>Your wishlist</h2>
            <p>Keep books here until you are ready to buy them.</p>
          </div>
        </div>

        <div className="book-grid">
          {items.map((entry) => entry.book && (
            <BookCard
              key={entry.book._id}
              book={entry.book}
              onAddToCart={addToCart}
              onWishlist={toggleWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
