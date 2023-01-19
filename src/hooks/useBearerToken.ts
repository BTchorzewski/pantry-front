import { useToken } from './useToken';

export const useBearerToken = (): { headers: { Authorization: string } } => {
  const [token] = useToken();
  return {
    headers: {
      // prettier-ignore
      'Authorization': `Bearer ${token}`,
    },
  };
};
