import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>आपका स्वागत है मोबाइल शॉप में</h1>
          <p style={styles.heroText}>बेहतरीन उत्पाद बेहतरीन कीमत पर</p>
          <Link to="/products" style={styles.heroButton}>
            अभी खरीदारी शुरू करें
          </Link>
        </div>
      </section>

      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>हमारी विशेषताएँ</h2>
        <div style={styles.featuresGrid}>
          {[
            { icon: '🚚', title: 'मुफ़्त डिलीवरी', desc: '₹999+ ऑर्डर पर' },
            { icon: '↩️', title: 'आसान रिटर्न', desc: '10 दिन रिटर्न' },
            { icon: '🔒', title: 'सुरक्षित भुगतान', desc: '100% सुरक्षित' },
            { icon: '📞', title: '24/7 सहायता', desc: 'हमेशा उपलब्ध' }
          ].map((feature, index) => (
            <div key={index} style={styles.featureCard}>
              <div style={styles.featureIcon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const styles = {
  hero: {
    background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    textAlign: 'center',
    padding: '80px 20px',
    borderRadius: '10px',
    marginBottom: '40px'
  },
  heroTitle: {
    fontSize: '2rem',
    marginBottom: '15px'
  },
  heroText: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    opacity: 0.9
  },
  heroButton: {
    display: 'inline-block',
    background: '#e74c3c',
    color: 'white',
    padding: '12px 30px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: 'bold'
  },
  features: {
    padding: '20px 0'
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '1.8rem',
    marginBottom: '30px',
    color: '#2c3e50'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px'
  },
  featureCard: {
    background: 'white',
    padding: '25px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '15px'
  }
};

export default Home;
