import { protectedBasicRoute } from '../utils/fetch';
import axios, { AxiosError } from 'axios';
import { useToken } from './useToken';
import { useRefreshToken } from './useRefreshToken';
import { useBearerToken } from './useBearerToken';
import { TokensRes } from '../types';
import { useState } from 'react';
export async function useAxios() {
  const [token, setToken] = useToken();
  const [count, setCount] = useState(0);
  console.log({ count });
  axios.defaults.withCredentials = true;
  const protectedBasicRoute = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  protectedBasicRoute.interceptors.request.use(
    (config) => {
      setCount((prevState) => prevState++);
      return config;
    },
    (error: AxiosError) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // @typescript-eslint/prefer-ts-expect-error
  protectedBasicRoute.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async (error: AxiosError) => {
      const config = error.config;

      if (error.response?.status === 401 || count < 3) {
        const { data } = await axios.get(
          'http://localhost:3001/auth/refresh-token',
          { withCredentials: true }
        );
        const { accessToken } = data as TokensRes;
        if (config !== undefined) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
          };
          setToken(accessToken);
          return protectedBasicRoute.request(config);
        }
      }
      return await Promise.reject(error);
    }
  );
  return protectedBasicRoute;
}
