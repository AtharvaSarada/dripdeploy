import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { authApi } from '../services/api';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string, userData?: User) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await authApi.getCurrentUser();
        if (response.success && response.user) {
          setUser(response.user);
        } else {
          localStorage.removeItem('token');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (token: string, userData?: User) => {
    try {
      setLoading(true);
      
      // Check if it's a Google token (starts with eyJ) or JWT token
      if (token.startsWith('eyJ')) {
        // It's a JWT token from email/password login
        localStorage.setItem('token', token);
        
        if (userData) {
          // Use the user data from the login response
          setUser(userData);
          toast.success(`Welcome back, ${userData.name}!`);
        } else {
          // Get user data using the token
          const response = await authApi.getCurrentUser();
          if (response.success && response.user) {
            setUser(response.user);
            toast.success(`Welcome back, ${response.user.name}!`);
          } else {
            throw new Error('Failed to get user data');
          }
        }
      } else {
        // It's a Google token
        const response = await authApi.googleLogin(token);
        
        if (response.success && response.token) {
          localStorage.setItem('token', response.token);
          setUser(response.user);
          toast.success(`Welcome back, ${response.user.name}!`);
        } else {
          throw new Error('Login failed');
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      toast.success('Logged out successfully');
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
