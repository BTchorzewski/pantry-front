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
    'Access-Control-Allow-Credentials': 'include',
  },
});

// protectedBasicRoute.interceptors.request.use((req) => {
//   console.log('request');
//   return req;
// });
//
// protectedBasicRoute.interceptors.response.use(
//   (res) => {
//     console.log('fetch api');
//     return res;
//   },
//   async (error: AxiosError): Promise<AxiosError> => {
//     if (error.response?.status === 401) {
//       const refreshedToken = await refreshToken();
//       console.log('refreshing token', refreshedToken);
//     }
//     return await Promise.reject(error);
//   }
// );
//
// export default protectedBasicRoute;

// export const refreshToken = async (): Promise<string | null> => {
//   try {
//     const results = await protectedBasicRoute.get('/auth/refresh-token');
//     if (results.status !== 200) return null;
//     const { accessToken }: TokensRes = await results.data;
//     return accessToken;
//   } catch (e: unknown) {
//     if (e instanceof AxiosError) {
//       console.log(e.response?.statusText);
//     }
//     return null;
//   }
// };
