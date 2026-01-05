import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts();
    loadCart();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsList = [];
      querySnapshot.forEach((doc) => {
        productsList.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productsList);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  };

  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }
    
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${product.name} कार्ट में जोड़ दिया गया है!`);
  };

  return (
    <div className="products-page">
      <div className="container">
        <h1 className="page-title">हमारे सभी उत्पाद</h1>
        
        <div className="products-header">
          <div className="cart-summary">
            <Link to="/cart" className="cart-link">
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-count">{cart.length}</span>
              कार्ट देखें
            </Link>
          </div>
        </div>
        
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>उत्पाद लोड हो रहे हैं...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="no-products">
            <i className="fas fa-box-open"></i>
            <h3>कोई उत्पाद नहीं मिला</h3>
            <p>पहला उत्पाद जोड़ने के लिए एडमिन पैनल पर जाएँ</p>
          </div>
        ) : (
          <div className="products-container">
            {products.map((product) => (
              <div key={product.id} className="product-item">
                <div className="product-image">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} />
                  ) : (
                    <div className="no-image">
                      <i className="fas fa-image"></i>
                    </div>
                  )}
                  <div className="product-overlay">
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => addToCart(product)}
                    >
                      <i className="fas fa-cart-plus"></i> कार्ट में डालें
                    </button>
                  </div>
                </div>
                
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p className="product-category">
                    <i className="fas fa-tag"></i> {product.category || 'सामान्य'}
                  </p>
                  <p className="product-description">
                    {product.description?.substring(0, 100)}...
                  </p>
                  
                  <div className="product-footer">
                    <div className="price-section">
                      <span className="price">₹{product.price}</span>
                      {product.oldPrice && (
                        <span className="old-price">₹{product.oldPrice}</span>
                      )}
                    </div>
                    
                    <div className="product-actions">
                      <Link 
                        to={`/product/${product.id}`} 
                        className="btn-view"
                      >
                        <i className="fas fa-eye"></i> देखें
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
