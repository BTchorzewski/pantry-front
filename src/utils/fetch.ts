import axios, { AxiosError, AxiosInstance } from 'axios';
import { TokensRes } from '../types';

export const basicRoute = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const protectedBasicRoute = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

// export const routeWithInterceptor = protectedRoute.interceptors.response.use(
//   (res) => {
//     console.log('fetch api');
//     return res;
//   },
//   async (error: unknown): Promise<AxiosError> => {
//     if (error instanceof AxiosError) {
//       console.log({ 'interceptor status': error.status });
//     }
//     return await Promise.reject(error);
//   }
// ) as unknown as AxiosInstance;

export const refreshToken = async (): Promise<string | null> => {
  const results = await basicRoute.get('/auth/refresh-token');
  if (results.status !== 200) return null;
  const { accessToken }: TokensRes = await results.data;
  return accessToken;
};
