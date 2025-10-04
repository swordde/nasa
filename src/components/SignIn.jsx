import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import './SignIn.css';

const SignIn = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get auth functions but avoid complex state checks initially
  const auth = useAuth();
  const { login, error, clearError } = auth;

  console.log('SignIn component rendered successfully');

  // Simple cleanup effect
  useEffect(() => {
    if (clearError) {
      clearError();
    }
    setValidationErrors({});
  }, [clearError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (login) {
        const result = await login(formData.email, formData.password);
        if (result && result.success) {
          setCurrentPage('profile');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signin-page">
      <div className="container">
        <div className="signin-layout">
          {/* Left side - Welcome/Info */}
          <div className="signin-info">
            <div className="info-content">
              <h1>Welcome Back</h1>
              <p>
                Sign in to access your NASA Space Biology research dashboard 
                and continue your exploration of groundbreaking discoveries.
              </p>
              
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-icon">
                    <div className="icon-text">📚</div>
                  </div>
                  <div>
                    <h4>Research Access</h4>
                    <p>Access to 608+ research papers and datasets</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🤝</div>
                  <div>
                    <h4>Collaboration</h4>
                    <p>Connect with researchers worldwide</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📊</div>
                  <div>
                    <h4>Knowledge Graph</h4>
                    <p>Explore interconnected research findings</p>
                  </div>
                </div>
              </div>

              <div className="signin-links">
                <p>Don't have an account? 
                  <button 
                    className="link-btn"
                    onClick={() => setCurrentPage('signup')}
                  >
                    Sign up here
                  </button>
                </p>
                <p>Want to learn more? 
                  <button 
                    className="link-btn"
                    onClick={() => setCurrentPage('about')}
                  >
                    About our research
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Sign In Form */}
          <div className="signin-form fade-in-right">
            <div className="form-container">
              <div className="form-header">
                <h2>Sign In</h2>
                <p>Enter your credentials to access your dashboard</p>
              </div>

              {/* Error display */}
              {error && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  <span>{error}</span>
                  <button 
                    className="error-close"
                    onClick={() => clearError && clearError()}
                  >
                    ×
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-with-icon">
                    <span className="input-icon">📧</span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`form-input ${validationErrors.email ? 'error' : ''}`}
                      placeholder="your.email@institution.edu"
                      disabled={isSubmitting}
                    />
                  </div>
                  {validationErrors.email && (
                    <span className="field-error">{validationErrors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-with-icon">
                    <span className="input-icon">🔒</span>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className={`form-input ${validationErrors.password ? 'error' : ''}`}
                      placeholder="Enter your password"
                      disabled={isSubmitting}
                    />
                  </div>
                  {validationErrors.password && (
                    <span className="field-error">{validationErrors.password}</span>
                  )}
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" disabled={isSubmitting} />
                    <span className="checkmark"></span>
                    Remember me
                  </label>
                  <a href="#" className="forgot-password">Forgot password?</a>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn glow"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="loading-text">
                      <span className="loading-spinner-small"></span>
                      Signing In...
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <div className="social-signin">
            
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;