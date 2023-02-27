import React, { createContext, useState } from 'react';

export interface AuthContextType {
  user: string | null;
  setUser: (newToken: string | null) => void;
}

interface Props {
  children: React.ReactNode;
}
export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: (newUser: string | null) => {},
});

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<string | null>(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
