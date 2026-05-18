import { createContext, useState, useContext, useCallback, useEffect } from 'react';
import instance from "./api/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const response = await instance.post('/customer/login', { email, password });
      const { accessToken, refreshToken } = response.data.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const refreshAccessToken = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        logout();
        throw new Error('No refresh token available');
      }

      const response = await instance.post('/customer/refresh', { refreshToken });
      const { accessToken, refreshToken: newRefreshToken } = response.data.data;

      localStorage.setItem('accessToken', accessToken);
      if (newRefreshToken) {
        localStorage.setItem('refreshToken', newRefreshToken);
      }

      return accessToken;
    } catch (error) {
      logout();
      throw error;
    }
  }, [logout]);

  const value = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    login,
    logout,
    refreshAccessToken,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
