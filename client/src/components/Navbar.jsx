import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">B</span>
          <div>
            <strong>BoundPages</strong>
            <small>Bookstore & reading lounge</small>
          </div>
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/search">Discover</NavLink>
          {user?.role === 'customer' && <NavLink to="/wishlist">Wishlist</NavLink>}
          {user?.role === 'customer' && <NavLink to="/cart">Cart</NavLink>}
          {user?.role === 'author' && <NavLink to="/author">Author Desk</NavLink>}
          {user?.role === 'manager' && <NavLink to="/manager">Manager</NavLink>}
        </nav>

        <div className="nav-actions">
          {!user ? (
            <>
              <Link to="/login" className="ghost-btn">Login</Link>
              <Link to="/register" className="primary-btn">Get started</Link>
            </>
          ) : (
            <>
              <span className="user-badge">{user.name} · {user.role}</span>
              <button
                className="ghost-btn"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
