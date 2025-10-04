import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import './SignUp.css';

const SignUp = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    institution: '',
    researchArea: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get auth functions but avoid complex state checks initially
  const auth = useAuth();
  const { register, error, clearError } = auth;

  console.log('SignUp component rendered successfully');

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

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
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
      if (register) {
        const result = await register({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          institution: formData.institution,
          researchArea: formData.researchArea
        });
        if (result && result.success) {
          setCurrentPage('profile');
        }
      }
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="container">
        <div className="signup-layout">
          {/* Left side - Welcome/Info */}
          <div className="signup-info">
            <div className="info-content">
              <h1>Join NASA Research Community</h1>
              <p>
                Create your account to access exclusive NASA Space Biology research resources 
                and collaborate with scientists worldwide.
              </p>
              
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-icon">
                    <div className="icon-text">📚</div>
                  </div>
                  <div>
                    <h4>Exclusive Access</h4>
                    <p>Access to 608+ research publications and datasets</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🤝</div>
                  <div>
                    <h4>Global Network</h4>
                    <p>Connect with researchers and scientists worldwide</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📊</div>
                  <div>
                    <h4>AI-Powered Tools</h4>
                    <p>Knowledge graphs and advanced research analytics</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🚀</div>
                  <div>
                    <h4>Mission Support</h4>
                    <p>Contribute to Moon and Mars exploration research</p>
                  </div>
                </div>
              </div>

              <div className="signup-links">
                <p>Already have an account? 
                  <button 
                    className="link-btn"
                    onClick={() => setCurrentPage('signin')}
                  >
                    Sign in here
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

          {/* Right side - Sign Up Form */}
          <div className="signup-form fade-in-right">
            <div className="form-container">
              <div className="form-header">
                <h2>Create Account</h2>
                <p>Join the NASA Space Biology research community</p>
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
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <div className="input-with-icon">
                      <span className="input-icon">👤</span>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className={`form-input ${validationErrors.firstName ? 'error' : ''}`}
                        placeholder="First name"
                        disabled={isSubmitting}
                      />
                    </div>
                    {validationErrors.firstName && (
                      <span className="field-error">{validationErrors.firstName}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <div className="input-with-icon">
                      <span className="input-icon">👤</span>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className={`form-input ${validationErrors.lastName ? 'error' : ''}`}
                        placeholder="Last name"
                        disabled={isSubmitting}
                      />
                    </div>
                    {validationErrors.lastName && (
                      <span className="field-error">{validationErrors.lastName}</span>
                    )}
                  </div>
                </div>

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
                      placeholder="Create a strong password"
                      disabled={isSubmitting}
                    />
                  </div>
                  {validationErrors.password && (
                    <span className="field-error">{validationErrors.password}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="input-with-icon">
                    <span className="input-icon">🔒</span>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className={`form-input ${validationErrors.confirmPassword ? 'error' : ''}`}
                      placeholder="Confirm your password"
                      disabled={isSubmitting}
                    />
                  </div>
                  {validationErrors.confirmPassword && (
                    <span className="field-error">{validationErrors.confirmPassword}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="institution">Institution (Optional)</label>
                  <div className="input-with-icon">
                    <span className="input-icon">🏫</span>
                    <input
                      type="text"
                      id="institution"
                      name="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Your university or organization"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="researchArea">Research Area (Optional)</label>
                  <div className="input-with-icon">
                    <span className="input-icon">🔬</span>
                    <select
                      id="researchArea"
                      name="researchArea"
                      value={formData.researchArea}
                      onChange={handleInputChange}
                      className="form-input"
                      disabled={isSubmitting}
                    >
                      <option value="">Select your research area</option>
                      <option value="astrobiology">Astrobiology</option>
                      <option value="plant-biology">Plant Biology</option>
                      <option value="microgravity">Microgravity Research</option>
                      <option value="radiation-biology">Radiation Biology</option>
                      <option value="cellular-biology">Cellular Biology</option>
                      <option value="space-medicine">Space Medicine</option>
                      <option value="environmental-systems">Environmental Systems</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn glow"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="loading-text">
                      <span className="loading-spinner-small"></span>
                      Creating Account...
                    </span>
                  ) : (
                    'Create Account'
                  )}
                </button>

                <div className="terms-notice">
                  <p>
                    By creating an account, you agree to our 
                    <a href="#"> Terms of Service</a> and 
                    <a href="#"> Privacy Policy</a>.
                  </p>
                </div>
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

export default SignUp;