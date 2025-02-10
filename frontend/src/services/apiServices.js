import axios from 'axios';

// Create an axios instance with common configuration
const apiService = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api/v1', // Base URL for the API
 // timeout: 60000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to headers
apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken'); // You can change this to use session or other storage
    if (token) {
  
      config.headers['Authorization'] = `Bearer ${token}`; // Add token to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      console.error('Unauthorized access - redirecting to login');
    }
    return Promise.reject(error);
  }
);

// API call helper functions
const api = {
  get: (url, config = {}) => apiService.get(url, config),
  post: (url, data, config = {}) => apiService.post(url, data, config),
  put: (url, data, config = {}) => apiService.put(url, data, config),
  delete: (url, config = {}) => apiService.delete(url, config),
};

export default api;
