// Base API Service for NASA Space Biology Knowledge Graph
import { API_BASE_URL, REQUEST_CONFIG, HTTP_STATUS, STORAGE_KEYS } from '../config/api.js';

class APIService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.defaultHeaders = REQUEST_CONFIG.headers;
  }

  // Get authentication token from localStorage
  getAuthToken() {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  }

  // Set authentication token
  setAuthToken(token) {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  }

  // Remove authentication token
  removeAuthToken() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  // Get request headers with authentication
  getHeaders(additionalHeaders = {}) {
    const headers = { ...this.defaultHeaders, ...additionalHeaders };
    const token = this.getAuthToken();
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      timeout: REQUEST_CONFIG.timeout,
      headers: this.getHeaders(options.headers),
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new APIError(
          data.message || `HTTP ${response.status}`,
          response.status,
          data
        );
      }

      return data;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      
      // Handle network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new APIError('Network error - please check your connection', 0);
      }
      
      throw new APIError(error.message || 'An unexpected error occurred', 0);
    }
  }

  // HTTP Methods
  async get(endpoint, params = {}) {
    const url = new URL(`${this.baseURL}${endpoint}`);
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key]);
      }
    });
    
    return this.request(endpoint + url.search, {
      method: 'GET'
    });
  }

  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async patch(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }

  // File upload method
  async upload(endpoint, formData) {
    const headers = this.getHeaders();
    delete headers['Content-Type']; // Let browser set content-type for FormData

    return this.request(endpoint, {
      method: 'POST',
      headers,
      body: formData
    });
  }
}

// Custom API Error class
export class APIError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }

  // Check if error is due to authentication
  isAuthError() {
    return this.status === HTTP_STATUS.UNAUTHORIZED || this.status === HTTP_STATUS.FORBIDDEN;
  }

  // Check if error is a validation error
  isValidationError() {
    return this.status === HTTP_STATUS.BAD_REQUEST;
  }

  // Check if error is a server error
  isServerError() {
    return this.status >= 500;
  }
}

// Create singleton instance
const apiService = new APIService();
export default apiService;