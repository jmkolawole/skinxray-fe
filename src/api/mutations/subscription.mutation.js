import { useMutation } from '@tanstack/react-query';
import { request } from '..';

export const useCreateCheckoutSession = () =>
  useMutation({
    mutationFn: (data) => request('/create-checkout-session', 'post', data, true),
    retry: false,
  });

export const useVerifyCheckoutSession = () =>
  useMutation({
    mutationFn: (data) => request('/verify-checkout-session', 'post', data, true),
    retry: false,
  }); 