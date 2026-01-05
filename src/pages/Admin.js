import React, { useState, useEffect } from 'react';
import { db, storage } from '../services/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  deleteDoc,
  updateDoc 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './Admin.css';

function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
    imageUrl: ''
  });

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
      setProducts(productsList);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('उत्पाद लोड करने में त्रुटि!');
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

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const uploadImage = async (file) => {
    if (!file) return null;
    
    const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price) {
      alert('कृपया उत्पाद का नाम और कीमत भरें');
      return;
    }

    try {
      let imageUrl = formData.imageUrl;
      
      if (formData.image) {
        imageUrl = await uploadImage(formData.image);
      }

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category || 'सामान्य',
        imageUrl: imageUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (editing && currentProduct) {
        await updateDoc(doc(db, 'products', currentProduct.id), productData);
        alert('उत्पाद अपडेट किया गया!');
      } else {
        await addDoc(collection(db, 'products'), productData);
        alert('उत्पाद जोड़ा गया!');
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('उत्पाद सेव करने में त्रुटि!');
    }
  };

  const handleEdit = (product) => {
    setEditing(true);
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      category: product.category || '',
      image: null,
      imageUrl: product.imageUrl || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('क्या आप वाकई इस उत्पाद को हटाना चाहते हैं?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'products', id));
      alert('उत्पाद हटा दिया गया!');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('उत्पाद हटाने में त्रुटि!');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      image: null,
      imageUrl: ''
    });
    setEditing(false);
    setCurrentProduct(null);
  };

  return (
    <div className="admin-page">
      <div className="container">
        <h1 className="page-title">एडमिन पैनल</h1>
        
        <div className="admin-container">
          {/* Product Form */}
          <div className="admin-form-section">
            <h2>{editing ? 'उत्पाद संपादित करें' : 'नया उत्पाद जोड़ें'}</h2>
            
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-row">
                <div className="form-group">
                  <label>उत्पाद का नाम *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="उत्पाद का नाम"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>कीमत (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="कीमत"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>श्रेणी</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">श्रेणी चुनें</option>
                  <option value="इलेक्ट्रॉनिक्स">इलेक्ट्रॉनिक्स</option>
                  <option value="कपड़े">कपड़े</option>
                  <option value="किताबें">किताबें</option>
                  <option value="घर">घर</option>
                  <option value="खेल">खेल</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>विवरण</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="उत्पाद का विवरण"
                  rows="4"
                ></textarea>
              </div>
              
              <div className="form-group">
                <label>उत्पाद की छवि</label>
                <div className="image-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {formData.imageUrl && (
                    <div className="image-preview">
                      <img src={formData.imageUrl} alt="Preview" />
                      <p>वर्तमान इमेज</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editing ? 'अपडेट करें' : 'जोड़ें'}
                </button>
                {editing && (
                  <button 
                    type="button" 
                    onClick={resetForm}
                    className="btn btn-secondary"
                  >
                    रद्द करें
                  </button>
                )}
              </div>
            </form>
          </div>
          
          {/* Products List */}
          <div className="products-list-section">
            <h2>सभी उत्पाद ({products.length})</h2>
            
            {loading ? (
              <div className="loading">लोड हो रहा है...</div>
            ) : products.length === 0 ? (
              <div className="no-products">
                <i className="fas fa-box-open"></i>
                <p>कोई उत्पाद नहीं है। पहला उत्पाद जोड़ें!</p>
              </div>
            ) : (
              <div className="products-table-container">
                <table className="products-table">
                  <thead>
                    <tr>
                      <th>छवि</th>
                      <th>नाम</th>
                      <th>कीमत</th>
                      <th>श्रेणी</th>
                      <th>क्रियाएँ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>
                          {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className="product-thumb" />
                          ) : (
                            <div className="no-thumb">
                              <i className="fas fa-image"></i>
                            </div>
                          )}
                        </td>
                        <td>
                          <strong>{product.name}</strong>
                          <p className="product-desc">{product.description?.substring(0, 50)}...</p>
                        </td>
                        <td>₹{product.price}</td>
                        <td>{product.category || 'सामान्य'}</td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              onClick={() => handleEdit(product)}
                              className="btn-edit"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              onClick={() => handleDelete(product.id)}
                              className="btn-delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
