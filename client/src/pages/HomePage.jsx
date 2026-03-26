import { useEffect, useState } from 'react';
import api from '../lib/api';
import BookCard from '../components/BookCard';
import ChatbotPanel from '../components/ChatbotPanel';
import { useAuth } from '../state/AuthContext';

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    api.get('/books?featured=true').then((res) => setBooks(res.data.books));
  }, []);

  const addToCart = async (bookId) => {
    await api.post('/cart', { bookId, quantity: 1 });
    alert('Added to cart');
  };

  const toggleWishlist = async (bookId) => {
    await api.post('/wishlist/toggle', { bookId });
    alert('Wishlist updated');
  };

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Independent bookstore inspired interface</span>
            <h1>A bookstore portal that feels crafted, not templated.</h1>
            <p>
              Browse warm, readable shelves. Save favorites. Build a cart. Let authors publish.
              Let managers review. Let the assistant help readers discover the right title.
            </p>
            <div className="hero-actions">
              <a href="#featured" className="primary-btn">Browse featured books</a>
              <a href="#assistant" className="ghost-btn">Try the assistant</a>
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-stat">
              <strong>Role aware</strong>
              <span>Customer, author, manager workflows</span>
            </div>
            <div className="hero-stat">
              <strong>Smart discovery</strong>
              <span>Semantic search with vector retrieval</span>
            </div>
            <div className="hero-stat">
              <strong>Real commerce</strong>
              <span>Stripe checkout and order flow</span>
            </div>
          </div>
        </div>
      </section>

      <section id="featured" className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Featured books</h2>
              <p>Curated picks with a refined, bookstore-style presentation.</p>
            </div>
          </div>

          <div className="book-grid">
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onAddToCart={user?.role === 'customer' ? addToCart : null}
                onWishlist={user?.role === 'customer' ? toggleWishlist : null}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="assistant" className="section">
        <div className="container">
          <ChatbotPanel />
        </div>
      </section>
    </>
  );
}
