import React, { useState } from 'react';

function Products() {
  const [products] = useState([
    {
      id: 1,
      name: 'स्मार्टफोन',
      price: 19999,
      description: 'लैटेस्ट स्मार्टफोन 128GB',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60'
    },
    {
      id: 2,
      name: 'लैपटॉप',
      price: 45999,
      description: 'हाई परफॉर्मेंस लैपटॉप',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60'
    },
    {
      id: 3,
      name: 'हेडफोन',
      price: 2499,
      description: 'वायरलेस हेडफोन',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60'
    },
    {
      id: 4,
      name: 'स्मार्टवॉच',
      price: 5999,
      description: 'फ़िटनेस ट्रैकर वॉच',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60'
    }
  ]);

  const addToCart = (product) => {
    alert(`${product.name} कार्ट में जोड़ा गया!`);
  };

  return (
    <div>
      <h1 style={styles.pageTitle}>हमारे उत्पाद</h1>
      
      <div style={styles.productsGrid}>
        {products.map(product => (
          <div key={product.id} style={styles.productCard}>
            <img 
              src={product.image} 
              alt={product.name}
              style={styles.productImage}
            />
            <div style={styles.productInfo}>
              <h3 style={styles.productName}>{product.name}</h3>
              <p style={styles.productDesc}>{product.description}</p>
              <div style={styles.productFooter}>
                <span style={styles.productPrice}>₹{product.price}</span>
                <button 
                  onClick={() => addToCart(product)}
                  style={styles.addButton}
                >
                  <i className="fas fa-cart-plus"></i> कार्ट में डालें
                </button>
              </div>
            </div>
          </div>
        ))}
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
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '25px'
  },
  productCard: {
    background: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
  },
  productImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  productInfo: {
    padding: '20px'
  },
  productName: {
    fontSize: '1.3rem',
    marginBottom: '10px',
    color: '#2c3e50'
  },
  productDesc: {
    color: '#7f8c8d',
    marginBottom: '15px'
  },
  productFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  productPrice: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#e74c3c'
  },
  addButton: {
    background: '#3498db',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  }
};

export default Products;
