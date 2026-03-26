import { Link } from 'react-router-dom';

export default function BookCard({ book, onAddToCart, onWishlist }) {
  return (
    <article className="book-card">
      <div className="book-cover">
        {book.coverImageUrl ? (
          <img src={book.coverImageUrl} alt={book.title} />
        ) : (
          <div className="book-placeholder">{book.title.slice(0, 1)}</div>
        )}
      </div>

      <div className="book-content">
        <span className="pill">{book.category}</span>
        <h3>{book.title}</h3>
        <p className="muted">by {book.authorName}</p>
        <p className="description">{book.description}</p>

        <div className="book-meta">
          <strong>₹{book.price}</strong>
          <span>{book.language}</span>
        </div>

        <div className="book-actions">
          <Link className="ghost-btn" to={`/books/${book._id}`}>View</Link>
          {onAddToCart && <button className="primary-btn" onClick={() => onAddToCart(book._id)}>Add to cart</button>}
          {onWishlist && <button className="icon-btn" onClick={() => onWishlist(book._id)}>♡</button>}
        </div>
      </div>
    </article>
  );
}
