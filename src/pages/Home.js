import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsList = [];
      querySnapshot.forEach((doc) => {
        productsList.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productsList.slice(0, 6));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Shine Your Home</h1>
          <p>Premium home decor products at amazing prices</p>
          <Link to="/products" className="btn btn-primary">
            Shop Now <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shipping-fast"></i>
              </div>
              <h3>Free Shipping</h3>
              <p>On orders above ₹999</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-exchange-alt"></i>
              </div>
              <h3>Easy Returns</h3>
              <p>10-day return policy</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Secure Payment</h3>
              <p>100% secure payment options</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3>24/7 Support</h3>
              <p>Always here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="no-products">
              <i className="fas fa-box-open"></i>
              <h3>No Products Available</h3>
              <p>Add products from admin panel to see them here</p>
              <Link to="/admin" className="btn btn-primary">
                Go to Admin Panel
              </Link>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.imageUrl || 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'} 
                         alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-description">
                      {product.description?.substring(0, 60)}...
                    </p>
                    <div className="product-footer">
                      <span className="price">₹{product.price}</span>
                      <Link 
                        to={`/product/${product.id}`} 
                        className="btn-view"
                      >
                        View <i className="fas fa-eye"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="view-all">
            <Link to="/products" className="btn btn-primary">
              View All Products <i className="fas fa-external-link-alt"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Transform Your Home Today</h2>
          <p>Get 10% off on your first order</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-success">
              Create Free Account
            </Link>
            <Link to="/products" className="btn btn-primary">
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
