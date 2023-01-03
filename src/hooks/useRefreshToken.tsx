import { useToken } from './useToken';
import { protectedBasicRoute } from '../utils/fetch';
import { TokensRes } from '../types';
import { AxiosResponse } from 'axios';

type UseRefreshTokenReturn = () => void;

export const UseRefreshToken = (): UseRefreshTokenReturn => {
  const [token, setToken] = useToken();
  const refreshToken = async () => {
    const { data } = await protectedBasicRoute.get('/auth/refresh-token');
    const { accessToken } = data as TokensRes;
    console.log({
      token,
      accessToken,
    });
    setToken(accessToken);
  };

  return refreshToken;
};
