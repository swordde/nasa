// User Authentication Service for NASA Space Biology Knowledge Graph
import apiService, { APIError } from './apiService.js';
import { API_ENDPOINTS, STORAGE_KEYS, HTTP_STATUS } from '../config/api.js';

class UserService {
  constructor() {
    this.currentUser = null;
    this.loadUserFromStorage();
  }

  // Load user data from localStorage
  loadUserFromStorage() {
    const userData = localStorage.getItem(STORAGE_KEYS.USER);
    if (userData) {
      try {
        this.currentUser = JSON.parse(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        this.clearUserData();
      }
    }
  }

  // Save user data to localStorage
  saveUserToStorage(user) {
    this.currentUser = user;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  // Clear user data from localStorage
  clearUserData() {
    this.currentUser = null;
    localStorage.removeItem(STORAGE_KEYS.USER);
    apiService.removeAuthToken();
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.currentUser && !!apiService.getAuthToken();
  }

  // Login user
  async login(credentials) {
    try {
      const response = await this.mockLogin(credentials); // Use mock for now
      
      if (response.token) {
        apiService.setAuthToken(response.token);
        this.saveUserToStorage(response.user);
        
        if (response.refreshToken) {
          localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
        }
      }
      
      return {
        success: true,
        user: response.user,
        message: 'Login successful'
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.message || 'Login failed',
        status: error.status
      };
    }
  }

  // Register new user
  async register(userData) {
    try {
      const response = await this.mockRegister(userData); // Use mock for now
      
      if (response.token) {
        apiService.setAuthToken(response.token);
        this.saveUserToStorage(response.user);
        
        if (response.refreshToken) {
          localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
        }
      }
      
      return {
        success: true,
        user: response.user,
        message: 'Registration successful'
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.message || 'Registration failed',
        status: error.status
      };
    }
  }

  // Logout user
  async logout() {
    try {
      // Try to notify backend (won't work with mock, but structure is ready)
      // await apiService.post(API_ENDPOINTS.auth.logout);
      
      this.clearUserData();
      return {
        success: true,
        message: 'Logout successful'
      };
    } catch (error) {
      // Even if backend logout fails, clear local data
      this.clearUserData();
      return {
        success: true,
        message: 'Logout successful'
      };
    }
  }

  // Refresh authentication token
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      if (!refreshToken) {
        throw new APIError('No refresh token available', HTTP_STATUS.UNAUTHORIZED);
      }

      const response = await apiService.post(API_ENDPOINTS.auth.refresh, {
        refreshToken
      });

      if (response.token) {
        apiService.setAuthToken(response.token);
        if (response.user) {
          this.saveUserToStorage(response.user);
        }
      }

      return response;
    } catch (error) {
      this.clearUserData();
      throw error;
    }
  }

  // Get current user profile
  async getProfile() {
    try {
      const response = await apiService.get(API_ENDPOINTS.auth.me);
      if (response.user) {
        this.saveUserToStorage(response.user);
      }
      return response;
    } catch (error) {
      if (error.isAuthError()) {
        this.clearUserData();
      }
      throw error;
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await apiService.put(API_ENDPOINTS.profile, profileData);
      if (response.user) {
        this.saveUserToStorage(response.user);
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await apiService.post(API_ENDPOINTS.auth.forgotPassword, { email });
      return {
        success: true,
        message: response.message || 'Password reset email sent'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to send password reset email'
      };
    }
  }

  // Reset password
  async resetPassword(token, newPassword) {
    try {
      const response = await apiService.post(API_ENDPOINTS.auth.resetPassword, {
        token,
        password: newPassword
      });
      return {
        success: true,
        message: response.message || 'Password reset successful'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Password reset failed'
      };
    }
  }

  // Mock login for development (remove when backend is ready)
  async mockLogin(credentials) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (!credentials.email || !credentials.password) {
      throw new APIError('Email and password are required', HTTP_STATUS.BAD_REQUEST);
    }

    if (credentials.password.length < 6) {
      throw new APIError('Invalid credentials', HTTP_STATUS.UNAUTHORIZED);
    }

    // Mock successful login
    return {
      user: {
        id: 'user_123',
        email: credentials.email,
        firstName: 'Jane',
        lastName: 'Smith',
        institution: 'NASA Ames Research Center',
        researchArea: 'Plant Biology',
        role: 'scientist',
        avatar: null,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      },
      token: 'mock_jwt_token_' + Date.now(),
      refreshToken: 'mock_refresh_token_' + Date.now(),
      expiresIn: 86400 // 24 hours
    };
  }

  // Mock register for development (remove when backend is ready)
  async mockRegister(userData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Mock validation
    if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
      throw new APIError('All required fields must be filled', HTTP_STATUS.BAD_REQUEST);
    }

    if (userData.password !== userData.confirmPassword) {
      throw new APIError('Passwords do not match', HTTP_STATUS.BAD_REQUEST);
    }

    if (userData.password.length < 6) {
      throw new APIError('Password must be at least 6 characters long', HTTP_STATUS.BAD_REQUEST);
    }

    // Mock email already exists check
    if (userData.email === 'existing@nasa.gov') {
      throw new APIError('Email already exists', HTTP_STATUS.CONFLICT);
    }

    // Mock successful registration
    return {
      user: {
        id: 'user_' + Date.now(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        institution: userData.institution || '',
        researchArea: userData.researchArea || '',
        role: 'scientist',
        avatar: null,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      },
      token: 'mock_jwt_token_' + Date.now(),
      refreshToken: 'mock_refresh_token_' + Date.now(),
      expiresIn: 86400 // 24 hours
    };
  }
}

// Create singleton instance
const userService = new UserService();
export default userService;