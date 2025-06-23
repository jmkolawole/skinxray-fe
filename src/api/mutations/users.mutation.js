import {useMutation} from '@tanstack/react-query';
import {request} from '..';

export const useUpdateUserMutation = () =>
  useMutation({
    mutationFn: (data) => request('/users/update', 'put', data),
  });

export const useDeleteAccountMutation = () =>
  useMutation({
    mutationFn: () => request('/users', 'delete'),
  });
