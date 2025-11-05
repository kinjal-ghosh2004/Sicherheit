import React, { createContext, useState, ReactNode, useEffect } from 'react';
import type { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  login: (name: string, role: Role) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getInitialState = (): User | null => {
  try {
    const savedUser = localStorage.getItem('sicherheitUser');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser.name && parsedUser.role) {
        return parsedUser;
      }
    }
  } catch (error) {
    console.error("Could not load user from localStorage", error);
    return null;
  }
  return null;
};

// FIX: Changed component definition to use React.FC for consistency with other components
// and to resolve a potential typing issue with JSX children.
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getInitialState());

  useEffect(() => {
    try {
      if(user) {
        localStorage.setItem('sicherheitUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('sicherheitUser');
      }
    } catch (error) {
      console.error("Could not save user to localStorage", error);
    }
  }, [user]);

  const login = (name: string, role: Role) => {
    if (role) {
      setUser({ name, role });
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};