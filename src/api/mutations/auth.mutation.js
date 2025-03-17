import {useMutation} from '@tanstack/react-query';
import {request} from '..';

// Login Mutation
export const useLogin = () =>
  useMutation({
    mutationFn: (data) => request('/auth/login', 'post', data, false),
    retry: false,
  });

// Register Mutation (for Laravel endpoint)
export const useRegister = () =>
  useMutation({
    mutationFn: (data) => request('/auth/register', 'post', data, false),
    retry: false,
  });

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: () => request('/auth/logout', 'post', {}, true),
  });
};

// Google Redirect Mutation (POST request)
export const useGoogleRedirect = () =>
  useMutation({
    mutationFn: async () => {
      try {
        const response = await request('/auth/google/redirect', 'post', {}, false);
        console.log('Redirect response:', response); // Debug response

        // Check if we have a redirect_url directly in response
        if (response?.redirect_url) {
          window.location.href = response.redirect_url;
          return;
        }

        // Check nested data structure
        if (response?.data?.redirect_url) {
          window.location.href = response.data.redirect_url;
          return;
        }

        // If we have a URL in any other format
        if (response?.url || response?.data?.url) {
          window.location.href = response.url || response.data.url;
          return;
        }

        console.error('Invalid redirect response structure:', response);
        throw new Error('Invalid redirect response structure');
      } catch (error) {
        console.error('Redirect error:', error);
        throw error;
      }
    },
    retry: false,
  });

// Google Callback Query (GET request - must be GET to handle Google's redirect)
export const useGoogleCallback = () =>
  useMutation({
    mutationFn: ({ code }) => request('/auth/google/callback', 'get', {}, false, { code }),
    retry: false,
  });
