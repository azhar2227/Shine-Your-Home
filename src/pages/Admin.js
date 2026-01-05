import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import './Admin.css';

function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log('Fetching products...');
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsList = [];
      querySnapshot.forEach((doc) => {
        console.log('Product:', doc.id, doc.data());
        productsList.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productsList);
      console.log('Products fetched:', productsList.length);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Error loading products! Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price) {
      alert('Please enter product name and price');
      return;
    }

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category || 'General',
        imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log('Adding product:', productData);
      await addDoc(collection(db, 'products'), productData);
      alert('Product added successfully!');
      
      // Form reset
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: ''
      });
      
      // Refresh products list
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product! Check console.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'products', id));
      alert('Product deleted!');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product!');
    }
  };

  const addDemoProducts = async () => {
    if (!window.confirm('Add demo products?')) return;

    const demoProducts = [
      {
        name: 'Modern Sofa',
        description: 'Comfortable 3-seater sofa in grey fabric',
        price: 29999,
        category: 'Furniture',
        imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'LED Wall Lamp',
        description: 'Energy efficient LED wall lamp with dimmer',
        price: 3499,
        category: 'Lighting',
        imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Decorative Vase',
        description: 'Ceramic decorative vase for living room',
        price: 1499,
        category: 'Decor',
        imageUrl: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Coffee Table',
        description: 'Wooden coffee table with storage',
        price: 8999,
        category: 'Furniture',
        imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
      }
    ];

    try {
      for (const product of demoProducts) {
        await addDoc(collection(db, 'products'), {
          ...product,
          createdAt: new Date().toISOString()
        });
      }
      alert('Demo products added!');
      fetchProducts();
    } catch (error) {
      console.error('Error adding demo products:', error);
      alert('Error! Check console.');
    }
  };

  return (
    <div className="admin-page">
      <div className="container">
        <h1 className="page-title">Admin Panel</h1>
        
        <div className="admin-container">
          {/* Add Product Form */}
          <div className="admin-form-section">
            <h2>Add New Product</h2>
            
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Product name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Lighting">Lighting</option>
                  <option value="Decor">Decor</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Bathroom">Bathroom</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
                <small>Leave empty for default image</small>
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Product description"
                  rows="3"
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary">
                Add Product
              </button>
            </form>
            
            <div className="demo-section">
              <h3>Quick Start</h3>
              <p>No products? Add demo products:</p>
              <button onClick={addDemoProducts} className="btn btn-success">
                <i className="fas fa-plus"></i> Add Demo Products
              </button>
            </div>
          </div>
          
          {/* Products List */}
          <div className="products-list-section">
            <h2>All Products ({products.length})</h2>
            
            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
                <p>Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="no-products">
                <i className="fas fa-box-open"></i>
                <p>No products found. Add your first product or add demo products!</p>
              </div>
            ) : (
              <div className="products-grid">
                {products.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-image">
                      <img src={product.imageUrl} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="category">{product.category}</p>
                      <p className="price">₹{product.price}</p>
                      <div className="product-actions">
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="btn btn-danger btn-sm"
                        >
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
