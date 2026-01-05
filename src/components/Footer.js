import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3><i className="fas fa-store"></i> मोबाइल शॉप</h3>
            <p>आपकी पसंद का ऑनलाइन शॉपिंग स्टोर</p>
          </div>
          
          <div className="footer-section">
            <h3>जल्दी लिंक</h3>
            <ul>
              <li><a href="/">होम</a></li>
              <li><a href="/products">उत्पाद</a></li>
              <li><a href="/cart">कार्ट</a></li>
              <li><a href="/admin">एडमिन</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>संपर्क करें</h3>
            <p><i className="fas fa-phone"></i> +91 9876543210</p>
            <p><i className="fas fa-envelope"></i> support@mobileshop.com</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {currentYear} मोबाइल शॉप. सभी अधिकार सुरक्षित | यह एक डेमो वेबसाइट है</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
