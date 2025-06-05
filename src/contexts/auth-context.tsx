'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, UserData } from '@/services/auth-service';

// Define the shape of the authentication context
interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  error: null,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

// Storage keys
const USER_STORAGE_KEY = 'mta_user';
const TOKEN_STORAGE_KEY = 'mta_token';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in (from localStorage or sessionStorage)
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      
      try {
        

        // Get token from localStorage
        const token = localStorage.getItem(TOKEN_STORAGE_KEY);

        // // Check both localStorage and sessionStorage for token
        // const localToken = localStorage.getItem(TOKEN_STORAGE_KEY);
        // const sessionToken = sessionStorage.getItem(TOKEN_STORAGE_KEY);
        // const token = sessionToken || localToken;
        
        if (!token) {
          setIsLoading(false);
          return;
        }
        
        // Validate token with the server
        const userData = await authService.validateToken(token);
        setUser(userData);
      } catch (error) {
        // Clear invalid data from both storage types
        localStorage.removeItem(USER_STORAGE_KEY);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        sessionStorage.removeItem(USER_STORAGE_KEY);
        sessionStorage.removeItem(TOKEN_STORAGE_KEY);
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeAuth();
  }, []);
  
  // Login function
  const login = async (email: string, password: string, rememberMe = false) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const userData = await authService.login({ email, password, rememberMe });
      
      // Save user data in state
      setUser(userData);
      
      // Store in localStorage if rememberMe is true, otherwise in sessionStorage
      // if (rememberMe) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
        localStorage.setItem(TOKEN_STORAGE_KEY, userData.token);
      // } else {
        sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
        sessionStorage.setItem(TOKEN_STORAGE_KEY, userData.token);
      // }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout function
  const logout = async () => {
    setIsLoading(true);
    
    try {
      await authService.logout();
      
      // Clear user data from state
      setUser(null);
      
      // Clear stored data
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      sessionStorage.removeItem(USER_STORAGE_KEY);
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    error,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
