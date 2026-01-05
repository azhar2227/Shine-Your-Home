import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={styles.header}>
      <div className="container">
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <Link to="/" style={styles.logoLink}>
              <i className="fas fa-store"></i>
              <span>मोबाइल शॉप</span>
            </Link>
          </div>
          
          <nav style={styles.nav}>
            <Link to="/" style={styles.navLink}>
              <i className="fas fa-home"></i> होम
            </Link>
            <Link to="/products" style={styles.navLink}>
              <i className="fas fa-box"></i> उत्पाद
            </Link>
            <Link to="/cart" style={styles.navLink}>
              <i className="fas fa-shopping-cart"></i> कार्ट
            </Link>
            <Link to="/admin" style={styles.navLink}>
              <i className="fas fa-user-shield"></i> एडमिन
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '15px 0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logoLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  nav: {
    display: 'flex',
    gap: '15px'
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  }
};

export default Header;
