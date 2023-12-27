import useSWR from 'swr';
import * as UsersApi from '@/network/api/users';

export default function useAuthenticatedUser() {
  const { data, isLoading, error, mutate } = useSWR('user', UsersApi.getAuthenticatedUser);

  return {
    user: data,
    userLoading: isLoading,
    userError: error,
    userMutate: mutate,
  };
}
