import { useAuth } from './useAuth';
import { basicRoute, protectedBasicRoute } from '../utils/fetch';
import { TokensRes } from '../types';
import { AxiosResponse } from 'axios';

type UseRefreshTokenReturn = () => void;

export const useRefreshToken = (): UseRefreshTokenReturn => {
  const [token, setToken] = useAuth();
  const refreshToken = async (): Promise<void> => {
    try {
      const { data } = await protectedBasicRoute.get('/auth/refresh-token');
      const { accessToken } = data as TokensRes;
      setToken(accessToken);
    } catch (e) {
      // setToken(null);
    }
  };

  return refreshToken;
};
