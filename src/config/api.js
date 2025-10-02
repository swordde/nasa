// API Configuration for NASA Space Biology Knowledge Graph

// Base API URL - can be overridden by environment variable
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password'
  },
  
  // Search & Publications
  search: '/search',
  publications: '/publications',
  filters: '/filters',
  
  // User Management
  users: '/users',
  profile: '/profile',
  
  // NASA Data Sources
  osdr: '/osdr',
  taskBook: '/task-book',
  spaceLifeLibrary: '/space-life-library',
  
  // Knowledge Graph
  knowledgeGraph: '/knowledge-graph',
  insights: '/insights',
  
  // Analytics
  analytics: '/analytics',
  stats: '/stats'
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};

// Request Configuration
export const REQUEST_CONFIG = {
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'nasa_auth_token',
  USER: 'nasa_user_data',
  REFRESH_TOKEN: 'nasa_refresh_token'
};