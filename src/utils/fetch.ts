import axios, { AxiosError } from 'axios';
import { TokensRes } from '../types';
import { clearToken, getToken, setToken } from '../utils/token-session-storage';

export const basicRoute = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function protectedBasicRoute() {
  axios.defaults.withCredentials = true;
  const protectedRoute = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });

  protectedRoute.interceptors.request.use(
    (config) => {
      console.log('sending request');
      return config;
    },
    (error: AxiosError) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // @typescript-eslint/prefer-ts-expect-error
  protectedRoute.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async (error: AxiosError) => {
      const config = error.config;

      if (error.response?.status === 401) {
        try {
          // @todo create refreshToken function.
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
            return protectedRoute.request(config);
          }
        } catch (e: unknown) {
          if (e instanceof AxiosError) {
            if ([400, 401, 403].includes(e.response?.status as number)) {
              clearToken();
            }
          }
        }
      }
      return await Promise.reject(error);
    }
  );
  return protectedRoute;
}
