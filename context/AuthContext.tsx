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
    const savedUser = localStorage.getItem('sicherUser');
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(getInitialState());

  useEffect(() => {
    try {
      if(user) {
        localStorage.setItem('sicherUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('sicherUser');
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
