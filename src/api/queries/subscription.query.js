import {useQuery} from '@tanstack/react-query';
import {request} from '..';

export const useSubscriptionStatusQuery = () => {
  return useQuery({
    queryKey: ['subscription-status'],
    queryFn: () => request('/subscription/status', 'get', {}, true),
  });
}; 