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
    if (window.confirm('Clear entire cart?')) {
      setCartItems([]);
      localStorage.removeItem('cart');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const proceedToCheckout = () => {
    if (!user) {
      alert('Please login to checkout');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    alert('Checkout successful! (Demo)');
    setCartItems([]);
    localStorage.removeItem('cart');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <i className="fas fa-shopping-cart"></i>
            <h2>Your cart is empty</h2>
            <p>Browse products to add items</p>
            <Link to="/products" className="btn btn-primary">
              <i className="fas fa-shopping-bag"></i> Start Shopping
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
                    <i className="fas fa-trash"></i> Clear Cart
                  </button>
                  <Link to="/products" className="btn btn-primary">
                    <i className="fas fa-plus"></i> Add More
                  </Link>
                </div>
              </div>
              
              <div className="cart-summary">
                <h2>Order Summary</h2>
                
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>₹{calculateTotal()}</span>
                </div>
                
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span className="free">Free</span>
                </div>
                
                <div className="summary-row">
                  <span>Tax (18%):</span>
                  <span>₹{(calculateTotal() * 0.18).toFixed(2)}</span>
                </div>
                
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>₹{(calculateTotal() * 1.18).toFixed(2)}</span>
                </div>
                
                <button onClick={proceedToCheckout} className="btn btn-success checkout-btn">
                  <i className="fas fa-lock"></i> Checkout
                </button>
                
                <div className="payment-methods">
                  <h3>Payment Methods</h3>
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
