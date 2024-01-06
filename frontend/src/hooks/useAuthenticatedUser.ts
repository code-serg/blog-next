import useSWR from 'swr';
import * as UsersApi from '@/network/api/users';
import { UnauthorizedError } from '@/network/http-errors';

// SWR retries failed requests by default, but we don't want that in case of a 401 error
export default function useAuthenticatedUser() {
  const { data, isLoading, error, mutate } = useSWR('user', async () => {
    try {
      return await UsersApi.getAuthenticatedUser();
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return null;
      } else {
        throw error;
      }
    }
  });

  return {
    user: data,
    userLoading: isLoading,
    userError: error,
    userMutate: mutate,
  };
}
