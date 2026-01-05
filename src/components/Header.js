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
              <i className="fas fa-store"></i>
              <span>मोबाइल शॉप</span>
            </Link>
          </div>

          <nav className="nav">
            <ul>
              <li><Link to="/"><i className="fas fa-home"></i> होम</Link></li>
              <li><Link to="/products"><i className="fas fa-box"></i> उत्पाद</Link></li>
              <li><Link to="/cart"><i className="fas fa-shopping-cart"></i> कार्ट</Link></li>
              
              {user ? (
                <>
                  {user.email === "admin@example.com" && (
                    <li><Link to="/admin"><i className="fas fa-user-shield"></i> एडमिन</Link></li>
                  )}
                  <li>
                    <button onClick={handleLogout} className="logout-btn">
                      <i className="fas fa-sign-out-alt"></i> लॉगआउट
                    </button>
                  </li>
                  <li className="user-info">
                    <i className="fas fa-user-circle"></i>
                    <span>{user.email.split('@')[0]}</span>
                  </li>
                </>
              ) : (
                <>
                  <li><Link to="/login"><i className="fas fa-sign-in-alt"></i> लॉगिन</Link></li>
                  <li><Link to="/register"><i className="fas fa-user-plus"></i> रजिस्टर</Link></li>
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
