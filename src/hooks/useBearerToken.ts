import { useAuth } from './useAuth';
import { AxiosRequestConfig } from 'axios';

export const useBearerToken = (): AxiosRequestConfig => {
  const [token] = useAuth();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
