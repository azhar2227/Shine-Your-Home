import React from 'react';
import { Link } from 'react-router-dom'; // ✅ यहाँ Link import करें
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3><i className="fas fa-home"></i> Shine Your Home</h3>
            <p>Your one-stop home decor shop</p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/admin">Admin</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p><i className="fas fa-phone"></i> +91 9876543210</p>
            <p><i className="fas fa-envelope"></i> support@shineyourhome.com</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {currentYear} Shine Your Home. All rights reserved | This is a demo website</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
