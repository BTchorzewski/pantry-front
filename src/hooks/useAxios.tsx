import { protectedBasicRoute } from '../utils/fetch';
import { AxiosError } from 'axios';
import { useToken } from './useToken';
import { useRefreshToken } from './useRefreshToken';

export function useAxios() {
  const [token, setToken] = useToken();
  const refreshToken = useRefreshToken();
  // @typescript-eslint/prefer-ts-expect-error
  protectedBasicRoute.interceptors.request.use(
    (config) => {
      // Do something before request is sent
      console.log({ token });
      // @ts-ignore
      config.headers.common['Authorization'] = `Bearer ${token}`;
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
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      console.log('error response', { token });
      const { config, status } = error;
      if (status === 403) {
        const refreshedToken = await refreshToken();
        // @ts-ignore
        config.headers.common['Authorization'] = `Bearer ${refreshedToken}`;
        // @ts-ignore
        return protectedBasicRoute(config);
      }

      return Promise.reject(error);
    }
  );
  return protectedBasicRoute;
}
