import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../services/firebase';
import { collection, getDocs, limit } from 'firebase/firestore';
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
      // सिर्फ 6 प्रोडक्ट्स दिखाएँ
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
          <h1>आपका स्वागत है मोबाइल शॉप में</h1>
          <p>सर्वोत्तम गुणवत्ता के उत्पाद बेहतरीन कीमत पर</p>
          <Link to="/products" className="btn btn-primary">
            अभी खरीदारी शुरू करें <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">हमारी विशेषताएँ</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shipping-fast"></i>
              </div>
              <h3>मुफ़्त डिलीवरी</h3>
              <p>₹999 से अधिक के ऑर्डर पर</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-exchange-alt"></i>
              </div>
              <h3>आसान रिटर्न</h3>
              <p>10 दिनों की रिटर्न पॉलिसी</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>सुरक्षित भुगतान</h3>
              <p>100% सुरक्षित भुगतान विकल्प</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3>24/7 सहायता</h3>
              <p>हमेशा आपकी सेवा में</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">फ़ीचर्ड उत्पाद</h2>
          
          {loading ? (
            <div className="loading">उत्पाद लोड हो रहे हैं...</div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} />
                    ) : (
                      <div className="no-image">
                        <i className="fas fa-image"></i>
                      </div>
                    )}
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
                        देखें <i className="fas fa-eye"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="view-all">
            <Link to="/products" className="btn btn-primary">
              सभी उत्पाद देखें <i className="fas fa-external-link-alt"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>आज ही बनाएं अपना अकाउंट</h2>
          <p>पहले ऑर्डर पर 10% छूट पाएँ</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-success">
              फ्री अकाउंट बनाएं
            </Link>
            <Link to="/products" className="btn btn-primary">
              अभी खरीदें
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
