import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthProvider';

type ReturnType = [
  user: string | null,
  setUser: (newUser: string | null) => void
];

export const useAuth = (): ReturnType => {
  const { user, setUser } = useContext(AuthContext);
  return [user, setUser];
};
