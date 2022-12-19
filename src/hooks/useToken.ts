import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthProvider';

type ReturnType = [
  token: string | null,
  setToken: (newToken: string | null) => void
];

export const useToken = (): ReturnType => {
  const { token, setToken } = useContext(AuthContext);
  return [token, setToken];
};
