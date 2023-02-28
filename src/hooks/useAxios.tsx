import axios, { AxiosError } from 'axios';
import { TokensRes } from '../types';
import { useState } from 'react';
import { clearToken, getToken, setToken } from '../utils/token-session-storage';
import { useNavigate } from 'react-router-dom';
export async function useAxios() {
  const [count, setCount] = useState(0);
  const navigation = useNavigate();
  axios.defaults.withCredentials = true;
  const protectedBasicRoute = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
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

      if (error.response?.status === 401) {
        try {
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
        } catch (e: unknown) {
          if (e instanceof AxiosError) {
            if ([400, 401, 403].includes(e.response?.status as number)) {
              clearToken();
              navigation('/login');
            }
          }
        }
      }
      return await Promise.reject(error);
    }
  );
  return protectedBasicRoute;
}
