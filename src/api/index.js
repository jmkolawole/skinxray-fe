import axios from 'axios';

const apiUrl = import.meta.env.DEV || import.meta.env.MODE === 'preview' 
  ? 'http://localhost:8000/api'  // Use backend URL with /api prefix in development/preview
  : 'https://api.skinxray.com/api';  // Use production API URL

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Response interceptor for handling token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if error is due to authentication (401)
    if (error.response && error.response.status === 401) {
      // Only handle token expiration for authenticated routes
      const isAuthRoute = ['/login', '/signup', '/auth/google'].some(route => 
        window.location.pathname.includes(route)
      );
      
      if (!isAuthRoute) {
        // Clear account data from localStorage
        localStorage.removeItem('account');
        
        // Redirect to landing page if not already there and not an API call
        if (window.location.pathname !== '/' && !error.config?.url?.includes('/api/')) {
          window.location.replace('/');
        }
      }
    }
    
    return Promise.reject(error);
  }
);

/**
 * Generic request handler
 * @param {string} path Request path
 * @param {method} method Request method (get, post, delete, put, etc)
 * @param {object} data Form data
 * @param {object} params Request parameters
 * @param {object} headers Request headers
 * @return {Promise}
 */
export const request = async (
  path,
  method,
  data = {},
  auth = true,
  params = {},
  headers = {}
) => {
  const account = JSON.parse(localStorage.getItem('account') || '{}');
  
  // Create a new config object for each request to prevent header pollution
  const currentReqConfig = {
    headers: { ...headers },
    params,
  };

  if (auth && account && account.token) {
    currentReqConfig.headers['Authorization'] = `Bearer ${account.token}`;
  }

  try {
    const response = ['get', 'delete'].includes(method)
      ? await axiosInstance[method](`${path}`, currentReqConfig)
      : await axiosInstance[method](`${path}`, data, currentReqConfig);

    return response.data;
  } catch (err) {
    // Handle CORS errors specifically
    if (err.message?.includes('Network Error') || err.code === 'ERR_NETWORK') {
      console.error('CORS or Network Error:', err);
      throw {
        status: false,
        error: 'Unable to connect to the server. Please check your connection.',
      };
    }

    const unauthenticated = auth && err.response
      ? {unauthenticated: err.response.status === 401}
      : {};

    throw {
      ...(err.response?.data || {}),
      ...unauthenticated,
      status: err.response?.status === 401 ? false : err.response?.data?.status,
      error: err.response?.status === 401 
        ? "You're not authenticated, please login" 
        : err.response?.data?.error,
    };
  }
};

export const getImagesUrl = (filename) => {
  return filename ? `${apiUrl}/image${filename}` : null;
}; 