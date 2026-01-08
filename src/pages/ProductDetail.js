import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Demo data - replace with Firebase later
        const demoProducts = [
          {
            id: "1",
            name: "Modern Sofa",
            price: 29999,
            description: "Comfortable 3-seater sofa in premium fabric",
            imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
            category: "Furniture"
          },
          {
            id: "2", 
            name: "LED Lamp",
            price: 3499,
            description: "Energy efficient LED wall lamp with dimmer",
            imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
            category: "Lighting"
          }
        ];
        
        const foundProduct = demoProducts.find(p => p.id === id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          alert('Product not found!');
          navigate('/products');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('Error loading product!');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

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
    alert(`${product.name} added to cart!`);
  };

  const buyNow = () => {
    addToCart();
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="not-found">
        <i className="fas fa-exclamation-triangle"></i>
        <h2>Product Not Found</h2>
        <button onClick={() => navigate('/products')} className="btn btn-primary">
          View All Products
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          <i className="fas fa-arrow-left"></i> Back
        </button>
        
        <div className="product-detail-container">
          <div className="product-images">
            <div className="main-image">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} />
              ) : (
                <div className="no-image-large">
                  <i className="fas fa-image"></i>
                  <p>No Image</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-meta">
              <span className="category">
                <i className="fas fa-tag"></i> {product.category || 'General'}
              </span>
              <span className="stock">
                <i className="fas fa-box"></i> In Stock
              </span>
            </div>
            
            <div className="price-container">
              <span className="current-price">₹{product.price}</span>
            </div>
            
            <div className="quantity-selector">
              <label>Quantity:</label>
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
              <h3>Description</h3>
              <p>{product.description || 'No description available'}</p>
            </div>
            
            <div className="product-actions">
              <button onClick={addToCart} className="btn btn-primary add-to-cart">
                <i className="fas fa-cart-plus"></i> Add to Cart
              </button>
              <button onClick={buyNow} className="btn btn-success buy-now">
                <i className="fas fa-bolt"></i> Buy Now
              </button>
            </div>
            
            <div className="product-features">
              <div className="feature">
                <i className="fas fa-shipping-fast"></i>
                <div>
                  <h4>Free Shipping</h4>
                  <p>On orders above ₹999</p>
                </div>
              </div>
              <div className="feature">
                <i className="fas fa-exchange-alt"></i>
                <div>
                  <h4>10 Day Returns</h4>
                  <p>Easy return policy</p>
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
