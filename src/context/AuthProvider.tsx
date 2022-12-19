import React, { createContext, useState } from 'react';

export interface AuthContextType {
  token: string | null;
  setToken: (newToken: string | null) => void;
}

interface Props {
  children: React.ReactNode;
}
export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: (newToken: string | null) => {},
});

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(null);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
