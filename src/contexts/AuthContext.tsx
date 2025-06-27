import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  university: string;
  avatar?: string;
  rating: number;
  reviewCount: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, university: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    if (email && password) {
      setUser({
        id: '1',
        name: 'John Smith',
        email: email,
        university: 'State University',
        rating: 4.8,
        reviewCount: 24
      });
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string, university: string): Promise<boolean> => {
    // Mock registration - in real app, this would call an API
    if (name && email && password && university) {
      setUser({
        id: '1',
        name: name,
        email: email,
        university: university,
        rating: 5.0,
        reviewCount: 0
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};