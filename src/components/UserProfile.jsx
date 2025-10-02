import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import './UserProfile.css';

const UserProfile = () => {
  const { user, login, register, logout, loading, error, clearError, isAuthenticated, getUserInitials } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
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

  // Clear errors when switching between sign up and sign in
  useEffect(() => {
    clearError();
    setValidationErrors({});
  }, [isSignUp, clearError]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      clearError();
    };
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
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    
    if (isSignUp) {
      if (!formData.firstName.trim()) {
        errors.firstName = 'First name is required';
      }
      
      if (!formData.lastName.trim()) {
        errors.lastName = 'Last name is required';
      }
      
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    clearError();
    
    try {
      let result;
      
      if (isSignUp) {
        result = await register(formData);
      } else {
        result = await login({
          email: formData.email,
          password: formData.password
        });
      }
      
      if (result.success) {
        // Reset form on success
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          institution: '',
          researchArea: ''
        });
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        institution: '',
        researchArea: ''
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // If user is authenticated, show profile dashboard
  if (isAuthenticated()) {
    return (
      <div className="user-profile-page">
        <div className="container">
          <div className="profile-dashboard">
            <div className="dashboard-header">
              <div className="user-info">
                <div className="user-avatar">
                  <div className="avatar-text">
                    {getUserInitials()}
                  </div>
                </div>
                <div className="user-details">
                  <h1>Welcome back, {user.firstName}!</h1>
                  <p className="user-email">{user.email}</p>
                  {user.institution && (
                    <p className="user-institution">{user.institution}</p>
                  )}
                </div>
              </div>
              <button 
                className="btn btn-secondary logout-btn"
                onClick={handleLogout}
                disabled={loading}
              >
                {loading ? 'Signing out...' : 'Sign Out'}
              </button>
            </div>

            <div className="dashboard-content">
              <div className="profile-stats">
                <div className="stat-card">
                  <div className="stat-number">24</div>
                  <div className="stat-label">Publications Accessed</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">7</div>
                  <div className="stat-label">Searches This Month</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">3</div>
                  <div className="stat-label">Saved Queries</div>
                </div>
              </div>

              <div className="profile-sections">
                <div className="section">
                  <h3>Research Interests</h3>
                  <div className="research-area">
                    {user.researchArea || 'Not specified'}
                  </div>
                </div>

                <div className="section">
                  <h3>Recent Activity</h3>
                  <div className="activity-list">
                    <div className="activity-item">
                      <span className="activity-icon">🔍</span>
                      <span>Searched for "microgravity plant biology"</span>
                      <span className="activity-time">2 hours ago</span>
                    </div>
                    <div className="activity-item">
                      <span className="activity-icon">📄</span>
                      <span>Accessed "Effects of Microgravity on Plant Growth"</span>
                      <span className="activity-time">1 day ago</span>
                    </div>
                    <div className="activity-item">
                      <span className="activity-icon">💾</span>
                      <span>Saved search query</span>
                      <span className="activity-time">3 days ago</span>
                    </div>
                  </div>
                </div>

                <div className="section">
                  <h3>Quick Actions</h3>
                  <div className="quick-actions">
                    <button className="btn btn-primary">Search Publications</button>
                    <button className="btn btn-secondary">Browse Resources</button>
                    <button className="btn btn-secondary">View Knowledge Graph</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile-page">
      <div className="container">
        <div className="profile-layout">
          {/* Left side - Welcome/Info */}
          <div className="profile-info">
            <div className="info-content">
              <h1>Welcome Back</h1>
              <p>
                Join the NASA Space Biology research community and access 
                exclusive resources, collaborate with researchers, and 
                contribute to groundbreaking discoveries.
              </p>
              
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-icon">
                    <div className="icon-text">Lab</div>
                  </div>
                  <div>
                    <h4>Research Access</h4>
                    <p>Access to latest research papers and datasets</p>
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

              <div className="toggle-form">
                <p>
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                  <button 
                    className="link-btn"
                    onClick={() => setIsSignUp(!isSignUp)}
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Sign Up Form */}
          <div className="profile-form fade-in-right">
            <div className="form-container">
              <div className="form-header">
                <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
                <p>
                  {isSignUp 
                    ? 'Create your account to get started' 
                    : 'Welcome back! Please sign in to your account'
                  }
                </p>
              </div>

              {/* Error display */}
              {error && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  <span>{error}</span>
                  <button 
                    className="error-close"
                    onClick={clearError}
                  >
                    ×
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="auth-form">
                {isSignUp && (
                  <>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className={`form-input ${validationErrors.firstName ? 'error' : ''}`}
                          disabled={isSubmitting}
                        />
                        {validationErrors.firstName && (
                          <span className="field-error">{validationErrors.firstName}</span>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className={`form-input ${validationErrors.lastName ? 'error' : ''}`}
                          disabled={isSubmitting}
                        />
                        {validationErrors.lastName && (
                          <span className="field-error">{validationErrors.lastName}</span>
                        )}
                      </div>
                    </div>
                  </>
                )}

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
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
                  {validationErrors.email && (
                    <span className="field-error">{validationErrors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
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
                  {validationErrors.password && (
                    <span className="field-error">{validationErrors.password}</span>
                  )}
                </div>

                {isSignUp && (
                  <>
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
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
                      {validationErrors.confirmPassword && (
                        <span className="field-error">{validationErrors.confirmPassword}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="institution">Institution</label>
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

                    <div className="form-group">
                      <label htmlFor="researchArea">Research Area</label>
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
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </>
                )}

                {!isSignUp && (
                  <div className="form-options">
                    <label className="checkbox-label">
                      <input type="checkbox" disabled={isSubmitting} />
                      <span className="checkmark"></span>
                      Remember me
                    </label>
                    <a href="#" className="forgot-password">Forgot password?</a>
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn glow"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="loading-text">
                      <span className="loading-spinner-small"></span>
                      {isSignUp ? 'Creating Account...' : 'Signing In...'}
                    </span>
                  ) : (
                    isSignUp ? 'Create Account' : 'Sign In'
                  )}
                </button>

                {isSignUp && (
                  <div className="terms-notice">
                    <p>
                      By creating an account, you agree to our 
                      <a href="#"> Terms of Service</a> and 
                      <a href="#"> Privacy Policy</a>.
                    </p>
                  </div>
                )}
              </form>

              <div className="social-signin">
                <div className="divider">
                  <span>Or continue with</span>
                </div>
                <div className="social-buttons">
                  <button className="social-btn">
                    <span className="social-icon">🔗</span>
                    ORCID
                  </button>
                  <button className="social-btn">
                    <span className="social-icon">🎓</span>
                    Institution SSO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;