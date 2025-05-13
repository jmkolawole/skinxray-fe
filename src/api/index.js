import axios from 'axios';

const apiUrl = import.meta.env.VITE_APP_API_URL;

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: apiUrl,
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
        
        // Redirect to landing page if not already there
        if (window.location.pathname !== '/') {
          window.location.replace('/');
        }
      }
    }
    
    return Promise.reject(error);
  }
);

const reqConfig = {
  headers: {},
};

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
  if (auth && account && account.token) {
    reqConfig.headers['Authorization'] = `Bearer ${account.token}`;
  }

  reqConfig.params = params;
  reqConfig.headers = {...reqConfig.headers, ...headers};

  if (['get', 'delete'].includes(method)) {
    return axiosInstance[method](`${path}`, reqConfig)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        const unauthenticated = auth && err.response
          ? {unauthenticated: err.response.status === 401}
          : {};

        throw {
          ...(err.response?.data || {}),
          ...unauthenticated,
          status: err.response?.status === 401 ? false : err.response?.data?.status,
        };
      });
  } else {
    return axiosInstance[method](`${path}`, data, reqConfig)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
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
      });
  }
};

export const getImagesUrl = (filename) => {
  return `${apiUrl}/image${filename}`;
}; 