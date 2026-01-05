import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart({ user }) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
    setLoading(false);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }

    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    if (window.confirm('क्या आप पूरी कार्ट साफ़ करना चाहते हैं?')) {
      setCartItems([]);
      localStorage.removeItem('cart');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const proceedToCheckout = () => {
    if (!user) {
      alert('चेकआउट के लिए कृपया लॉगिन करें');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      alert('कार्ट खाली है!');
      return;
    }

    alert('चेकआउट सफल! यह एक डेमो वेबसाइट है।');
    setCartItems([]);
    localStorage.removeItem('cart');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>कार्ट लोड हो रही है...</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">आपकी शॉपिंग कार्ट</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <i className="fas fa-shopping-cart"></i>
            <h2>आपकी कार्ट खाली है</h2>
            <p>कुछ अच्छे उत्पाद खोजने के लिए ब्राउज़ करें</p>
            <Link to="/products" className="btn btn-primary">
              <i className="fas fa-shopping-bag"></i> खरीदारी शुरू करें
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-container">
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} />
                      ) : (
                        <div className="no-image">
                          <i className="fas fa-image"></i>
                        </div>
                      )}
                    </div>
                    
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-description">
                        {item.description?.substring(0, 100)}...
                      </p>
                      <div className="item-price">₹{item.price}</div>
                    </div>
                    
                    <div className="item-quantity">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="quantity-btn"
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    
                    <div className="item-total">
                      ₹{item.price * item.quantity}
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))}
                
                <div className="cart-actions">
                  <button onClick={clearCart} className="btn btn-danger">
                    <i className="fas fa-trash"></i> कार्ट साफ़ करें
                  </button>
                  <Link to="/products" className="btn btn-primary">
                    <i className="fas fa-plus"></i> और उत्पाद जोड़ें
                  </Link>
                </div>
              </div>
              
              <div className="cart-summary">
                <h2>ऑर्डर सारांश</h2>
                
                <div className="summary-row">
                  <span>उप-योग:</span>
                  <span>₹{calculateTotal()}</span>
                </div>
                
                <div className="summary-row">
                  <span>शिपिंग:</span>
                  <span className="free">मुफ़्त</span>
                </div>
                
                <div className="summary-row">
                  <span>कर (18%):</span>
                  <span>₹{(calculateTotal() * 0.18).toFixed(2)}</span>
                </div>
                
                <div className="summary-row total">
                  <span>कुल राशि:</span>
                  <span>₹{(calculateTotal() * 1.18).toFixed(2)}</span>
                </div>
                
                <button onClick={proceedToCheckout} className="btn btn-success checkout-btn">
                  <i className="fas fa-lock"></i> सुरक्षित चेकआउट
                </button>
                
                <div className="payment-methods">
                  <h3>भुगतान के तरीके</h3>
                  <div className="methods">
                    <i className="fab fa-cc-visa"></i>
                    <i className="fab fa-cc-mastercard"></i>
                    <i className="fab fa-cc-paypal"></i>
                    <i className="fas fa-university"></i>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
