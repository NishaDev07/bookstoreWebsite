import { useState } from 'react';
import api from '../lib/api';
import BookCard from '../components/BookCard';
import { useAuth } from '../state/AuthContext';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [mode, setMode] = useState('semantic');
  const { user } = useAuth();

  const search = async (event) => {
    event.preventDefault();
    const endpoint = mode === 'semantic'
      ? `/books/semantic-search?q=${encodeURIComponent(query)}`
      : `/books?q=${encodeURIComponent(query)}`;
    const { data } = await api.get(endpoint);
    setBooks(data.books || []);
  };

  const addToCart = async (bookId) => {
    await api.post('/cart', { bookId, quantity: 1 });
    alert('Added to cart');
  };

  const toggleWishlist = async (bookId) => {
    await api.post('/wishlist/toggle', { bookId });
    alert('Wishlist updated');
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <h2>Discover books</h2>
            <p>Switch between normal catalog search and semantic discovery.</p>
          </div>
        </div>

        <form className="search-bar" onSubmit={search}>
          <input
            type="text"
            placeholder="Search by title, theme, tone, or topic"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="semantic">Semantic search</option>
            <option value="catalog">Catalog search</option>
          </select>
          <button className="primary-btn">Search</button>
        </form>

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
  );
}
