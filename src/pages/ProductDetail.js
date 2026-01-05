import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() });
      } else {
        alert('उत्पाद नहीं मिला!');
        navigate('/products');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('उत्पाद लोड करने में त्रुटि!');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
    if (!product) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({
        ...product,
        quantity: quantity
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} कार्ट में जोड़ दिया गया है!`);
  };

  const buyNow = () => {
    addToCart();
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>उत्पाद लोड हो रहा है...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="not-found">
        <i className="fas fa-exclamation-triangle"></i>
        <h2>उत्पाद नहीं मिला</h2>
        <button onClick={() => navigate('/products')} className="btn btn-primary">
          सभी उत्पाद देखें
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          <i className="fas fa-arrow-left"></i> वापस जाएँ
        </button>
        
        <div className="product-detail-container">
          <div className="product-images">
            <div className="main-image">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} />
              ) : (
                <div className="no-image-large">
                  <i className="fas fa-image"></i>
                  <p>कोई इमेज नहीं</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-meta">
              <span className="category">
                <i className="fas fa-tag"></i> {product.category || 'सामान्य'}
              </span>
              <span className="stock">
                <i className="fas fa-box"></i> स्टॉक में उपलब्ध
              </span>
            </div>
            
            <div className="price-container">
              <span className="current-price">₹{product.price}</span>
              {product.oldPrice && (
                <span className="old-price">₹{product.oldPrice}</span>
              )}
              {product.discount && (
                <span className="discount">-{product.discount}%</span>
              )}
            </div>
            
            <div className="quantity-selector">
              <label>मात्रा:</label>
              <div className="quantity-controls">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="quantity-btn"
                >
                  <i className="fas fa-minus"></i>
                </button>
                <input 
                  type="number" 
                  value={quantity}
                  min="1"
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="quantity-input"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="quantity-btn"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
            
            <div className="product-description">
              <h3>विवरण</h3>
              <p>{product.description || 'कोई विवरण नहीं'}</p>
            </div>
            
            <div className="product-actions">
              <button onClick={addToCart} className="btn btn-primary add-to-cart">
                <i className="fas fa-cart-plus"></i> कार्ट में डालें
              </button>
              <button onClick={buyNow} className="btn btn-success buy-now">
                <i className="fas fa-bolt"></i> अभी खरीदें
              </button>
            </div>
            
            <div className="product-features">
              <div className="feature">
                <i className="fas fa-shipping-fast"></i>
                <div>
                  <h4>मुफ़्त डिलीवरी</h4>
                  <p>₹999+ ऑर्डर पर</p>
                </div>
              </div>
              <div className="feature">
                <i className="fas fa-exchange-alt"></i>
                <div>
                  <h4>10 दिन रिटर्न</h4>
                  <p>आसान रिटर्न पॉलिसी</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
