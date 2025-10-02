// Utility functions for NASA Space Biology Knowledge Graph authentication

// Validation utilities
export const validation = {
  // Email validation
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Password strength validation
  isValidPassword: (password) => {
    return {
      isValid: password.length >= 6,
      hasMinLength: password.length >= 6,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
  },

  // Name validation
  isValidName: (name) => {
    return name && name.trim().length >= 2;
  },

  // Institution validation (optional field)
  isValidInstitution: (institution) => {
    return !institution || institution.trim().length >= 2;
  }
};

// Format utilities
export const formatters = {
  // Format user's display name
  getDisplayName: (user) => {
    if (!user) return '';
    const firstName = user.firstName?.trim() || '';
    const lastName = user.lastName?.trim() || '';
    return `${firstName} ${lastName}`.trim() || user.email || 'User';
  },

  // Get user initials for avatar
  getUserInitials: (user) => {
    if (!user) return 'U';
    const firstName = user.firstName?.trim() || '';
    const lastName = user.lastName?.trim() || '';
    const email = user.email?.trim() || '';
    
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    } else if (firstName) {
      return firstName[0].toUpperCase();
    } else if (email) {
      return email[0].toUpperCase();
    }
    return 'U';
  },

  // Format research area for display
  formatResearchArea: (area) => {
    if (!area) return 'Not specified';
    return area.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  },

  // Format date for display
  formatDate: (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
};

// Storage utilities
export const storage = {
  // Safe localStorage operations
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      return false;
    }
  },

  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Failed to read from localStorage:', error);
      return defaultValue;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
      return false;
    }
  }
};

// Form utilities
export const forms = {
  // Create form data object from form element
  getFormData: (form) => {
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    return data;
  },

  // Reset form
  resetForm: (form) => {
    if (form && typeof form.reset === 'function') {
      form.reset();
    }
  },

  // Sanitize form input
  sanitizeInput: (input) => {
    if (typeof input !== 'string') return input;
    return input.trim().replace(/[<>]/g, '');
  },

  // Validate form fields
  validateFields: (data, rules) => {
    const errors = {};
    
    Object.keys(rules).forEach(field => {
      const value = data[field];
      const rule = rules[field];
      
      if (rule.required && (!value || value.trim() === '')) {
        errors[field] = `${rule.label || field} is required`;
        return;
      }
      
      if (value && rule.minLength && value.length < rule.minLength) {
        errors[field] = `${rule.label || field} must be at least ${rule.minLength} characters`;
        return;
      }
      
      if (value && rule.maxLength && value.length > rule.maxLength) {
        errors[field] = `${rule.label || field} must be less than ${rule.maxLength} characters`;
        return;
      }
      
      if (value && rule.pattern && !rule.pattern.test(value)) {
        errors[field] = rule.patternMessage || `${rule.label || field} format is invalid`;
        return;
      }
      
      if (rule.custom && !rule.custom(value, data)) {
        errors[field] = rule.customMessage || `${rule.label || field} is invalid`;
      }
    });
    
    return errors;
  }
};

// Authentication utilities
export const auth = {
  // Check if token is expired
  isTokenExpired: (token) => {
    if (!token) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  },

  // Get token expiration time
  getTokenExpiration: (token) => {
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return new Date(payload.exp * 1000);
    } catch (error) {
      return null;
    }
  },

  // Check password strength
  getPasswordStrength: (password) => {
    let strength = 0;
    let feedback = [];
    
    if (password.length >= 8) strength += 1;
    else feedback.push('Use at least 8 characters');
    
    if (/[a-z]/.test(password)) strength += 1;
    else feedback.push('Include lowercase letters');
    
    if (/[A-Z]/.test(password)) strength += 1;
    else feedback.push('Include uppercase letters');
    
    if (/\d/.test(password)) strength += 1;
    else feedback.push('Include numbers');
    
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    else feedback.push('Include special characters');
    
    const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return {
      strength,
      level: levels[strength] || 'Very Weak',
      feedback
    };
  }
};

// Error handling utilities
export const errors = {
  // Get user-friendly error messages
  getUserFriendlyMessage: (error) => {
    if (!error) return 'An unknown error occurred';
    
    // Network errors
    if (error.message?.includes('Network')) {
      return 'Unable to connect to server. Please check your internet connection.';
    }
    
    // API errors
    if (error.status === 400) {
      return error.message || 'Invalid request. Please check your input.';
    }
    
    if (error.status === 401) {
      return 'Invalid credentials. Please check your email and password.';
    }
    
    if (error.status === 403) {
      return 'Access denied. You do not have permission to perform this action.';
    }
    
    if (error.status === 404) {
      return 'Resource not found. The requested item may have been deleted.';
    }
    
    if (error.status === 409) {
      return 'Conflict detected. This email address may already be in use.';
    }
    
    if (error.status >= 500) {
      return 'Server error. Please try again later or contact support.';
    }
    
    return error.message || 'An unexpected error occurred. Please try again.';
  },

  // Log errors safely
  logError: (error, context = '') => {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[Auth Error] ${context}:`, error);
    }
    
    // In production, you might want to send to error tracking service
    // Example: errorTrackingService.captureException(error, { context });
  }
};

export default {
  validation,
  formatters,
  storage,
  forms,
  auth,
  errors
};