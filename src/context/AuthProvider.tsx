import React, { createContext, useState } from 'react';

type AuthContextType = {
  token: string | null;
  setToken: (newToken: string) => void;
} | null;

interface Props {
  children: React.ReactNode;
}
const AuthContext = createContext<AuthContextType>(null);

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(null);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
