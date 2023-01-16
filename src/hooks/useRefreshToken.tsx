import { useToken } from './useToken';
import { basicRoute, protectedBasicRoute } from '../utils/fetch';
import { TokensRes } from '../types';
import { AxiosResponse } from 'axios';

type UseRefreshTokenReturn = () => void;

export const UseRefreshToken = (): UseRefreshTokenReturn => {
  const [token, setToken] = useToken();
  const refreshToken = async () => {
    try {
      const { data } = await protectedBasicRoute.get('/auth/refresh-token');
      const { accessToken } = data as TokensRes;
      setToken(accessToken);
    } catch (e) {
      setToken(null);
    }
  };

  return refreshToken;
};
