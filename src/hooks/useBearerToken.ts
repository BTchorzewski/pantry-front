import { useToken } from './useToken';
import { AxiosRequestConfig } from 'axios';

export const useBearerToken = (): AxiosRequestConfig => {
  const [token] = useToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
