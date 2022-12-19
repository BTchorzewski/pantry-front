import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthProvider';

export const useToken = () => {
  const { token, setToken } = useContext(AuthContext);
  return [token, setToken];
};
