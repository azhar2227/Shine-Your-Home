import React from 'react';
import { Link } from 'react-router-dom';

function Cart() {
  return (
    <div>
      <h1 style={styles.pageTitle}>आपकी शॉपिंग कार्ट</h1>
      
      <div style={styles.emptyCart}>
        <i className="fas fa-shopping-cart" style={styles.cartIcon}></i>
        <h2>आपकी कार्ट खाली है</h2>
        <p style={styles.emptyText}>कुछ अच्छे उत्पाद खोजने के लिए ब्राउज़ करें</p>
        <Link to="/products" style={styles.shopButton}>
          <i className="fas fa-shopping-bag"></i> खरीदारी शुरू करें
        </Link>
      </div>
      
      <div style={styles.cartSummary}>
        <h3>कार्ट सारांश</h3>
        <div style={styles.summaryRow}>
          <span>उप-योग:</span>
          <span>₹0</span>
        </div>
        <div style={styles.summaryRow}>
          <span>शिपिंग:</span>
          <span style={{color: '#2ecc71'}}>मुफ़्त</span>
        </div>
        <div style={styles.summaryRow}>
          <span>कुल राशि:</span>
          <span style={styles.total}>₹0</span>
        </div>
        <button style={styles.checkoutButton} disabled>
          <i className="fas fa-lock"></i> चेकआउट (डेमो)
        </button>
        <p style={styles.demoNote}>यह एक डेमो कार्ट है। असली उत्पादों के लिए Firebase कनेक्ट करें।</p>
      </div>
    </div>
  );
}

const styles = {
  pageTitle: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#2c3e50'
  },
  emptyCart: {
    textAlign: 'center',
    padding: '50px 20px',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    marginBottom: '30px'
  },
  cartIcon: {
    fontSize: '4rem',
    color: '#bdc3c7',
    marginBottom: '20px'
  },
  emptyText: {
    margin: '15px 0 25px',
    color: '#7f8c8d'
  },
  shopButton: {
    display: 'inline-block',
    background: '#3498db',
    color: 'white',
    padding: '12px 25px',
    borderRadius: '5px',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontSize: '1.1rem'
  },
  cartSummary: {
    background: 'white',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #eee'
  },
  total: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#e74c3c'
  },
  checkoutButton: {
    width: '100%',
    background: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '15px',
    borderRadius: '5px',
    fontSize: '1.1rem',
    marginTop: '20px',
    cursor: 'not-allowed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  },
  demoNote: {
    textAlign: 'center',
    marginTop: '15px',
    color: '#7f8c8d',
    fontSize: '0.9rem'
  }
};

export default Cart;
