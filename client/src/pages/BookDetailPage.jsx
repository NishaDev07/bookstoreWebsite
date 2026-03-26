import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../lib/api';
import ChatbotPanel from '../components/ChatbotPanel';
import { useAuth } from '../state/AuthContext';

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    api.get(`/books/${id}`).then((res) => setBook(res.data.book));
  }, [id]);

  const addToCart = async () => {
    await api.post('/cart', { bookId: id, quantity: 1 });
    alert('Added to cart');
  };

  const toggleWishlist = async () => {
    await api.post('/wishlist/toggle', { bookId: id });
    alert('Wishlist updated');
  };

  if (!book) return <div className="container section"><p>Loading book...</p></div>;

  return (
    <>
      <section className="section">
        <div className="container detail-grid">
          <div className="detail-cover">
            {book.coverImageUrl ? <img src={book.coverImageUrl} alt={book.title} /> : <div className="book-placeholder big">{book.title.slice(0, 1)}</div>}
          </div>

          <div>
            <span className="pill">{book.category}</span>
            <h1 className="detail-title">{book.title}</h1>
            {book.subtitle && <p className="detail-subtitle">{book.subtitle}</p>}
            <p className="muted">by {book.authorName}</p>
            <p className="detail-description">{book.description}</p>
            <div className="book-meta detail-meta">
              <strong>₹{book.price}</strong>
              <span>{book.language}</span>
              <span>{book.stock} in stock</span>
            </div>

            {user?.role === 'customer' && (
              <div className="row-gap">
                <button className="primary-btn" onClick={addToCart}>Add to cart</button>
                <button className="ghost-btn" onClick={toggleWishlist}>Wishlist</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ChatbotPanel bookId={id} />
        </div>
      </section>
    </>
  );
}
