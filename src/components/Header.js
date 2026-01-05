import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';
import './Header.css';

function Header({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <i className="fas fa-home"></i> {/* Home icon */}
              <span>Shine Your Home</span> {/* नया नाम */}
            </Link>
          </div>

          <nav className="nav">
            <ul>
              <li><Link to="/"><i className="fas fa-home"></i> Home</Link></li>
              <li><Link to="/products"><i className="fas fa-box"></i> Products</Link></li>
              <li><Link to="/cart"><i className="fas fa-shopping-cart"></i> Cart</Link></li>
              
              {user ? (
                <>
                  {/* Admin बटन हर logged-in user के लिए दिखाएं */}
                  <li><Link to="/admin"><i className="fas fa-user-shield"></i> Admin</Link></li>
                  <li>
                    <button onClick={handleLogout} className="logout-btn">
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                  </li>
                  <li className="user-info">
                    <i className="fas fa-user-circle"></i>
                    <span>{user.email}</span>
                  </li>
                </>
              ) : (
                <>
                  <li><Link to="/login"><i className="fas fa-sign-in-alt"></i> Login</Link></li>
                  <li><Link to="/register"><i className="fas fa-user-plus"></i> Register</Link></li>
                </>
              )}
            </ul>
          </nav>

          <div className="mobile-menu-btn">
            <i className="fas fa-bars"></i>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
