import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './Auth.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    
    if (formData.password !== formData.confirmPassword) {
      setError('पासवर्ड मेल नहीं खा रहे हैं!');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('पासवर्ड कम से कम 6 अक्षर का होना चाहिए!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      alert('रजिस्ट्रेशन सफल! आप लॉगिन कर सकते हैं।');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      setError('रजिस्ट्रेशन असफल! कृपया दोबारा कोशिश करें।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-header">
            <h1><i className="fas fa-user-plus"></i> रजिस्टर</h1>
            <p>नया अकाउंट बनाएं</p>
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label>पूरा नाम</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="आपका नाम"
                required
              />
            </div>
            
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
                placeholder="कम से कम 6 अक्षर"
                required
              />
            </div>
            
            <div className="form-group">
              <label>पासवर्ड पुष्टि करें</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="पासवर्ड दोबारा लिखें"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary auth-btn"
              disabled={loading}
            >
              {loading ? 'अकाउंट बन रहा है...' : 'रजिस्टर करें'}
            </button>
            
            <div className="auth-footer">
              <p>पहले से अकाउंट है? <Link to="/login">लॉगिन करें</Link></p>
              <p>वापस जाएँ <Link to="/">होमपेज</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
