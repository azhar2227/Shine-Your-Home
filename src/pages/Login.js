import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      alert('लॉगिन सफल!');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setError('लॉगिन असफल! कृपया ईमेल और पासवर्ड चेक करें।');
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, 'demo@example.com', 'demopassword');
      alert('डेमो अकाउंट से लॉगिन सफल!');
      navigate('/');
    } catch (error) {
      console.error('Demo login error:', error);
      setError('डेमो लॉगिन असफल! कृपया मैन्युअल लॉगिन करें।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-header">
            <h1><i className="fas fa-sign-in-alt"></i> लॉगिन</h1>
            <p>अपने अकाउंट में लॉगिन करें</p>
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label>ईमेल एड्रेस</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label>पासवर्ड</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="पासवर्ड"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary auth-btn"
              disabled={loading}
            >
              {loading ? 'लॉगिन हो रहा है...' : 'लॉगिन करें'}
            </button>
            
            <div className="demo-login">
              <p>या</p>
              <button 
                type="button" 
                onClick={demoLogin}
                className="btn btn-secondary"
                disabled={loading}
              >
                <i className="fas fa-user-secret"></i> डेमो अकाउंट से लॉगिन
              </button>
            </div>
            
            <div className="auth-footer">
              <p>खाता नहीं है? <Link to="/register">रजिस्टर करें</Link></p>
              <p>वापस जाएँ <Link to="/">होमपेज</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
