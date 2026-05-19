import { createContext, useState, useContext, useCallback, useEffect } from 'react';
import instance from "./api/api.js";
import accountSystemService from './services/accountSystemService.js';
import customerService from './services/customerService.js';
const AuthContext = createContext();

// Function to decode JWT without external library
const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authType, setAuthType] = useState(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const adminToken = localStorage.getItem("adminAccessToken");
    const customerToken = localStorage.getItem("customerAccessToken");

    if (adminToken) {
      setUser(decodeJWT(adminToken));
      setAuthType("admin");
      setIsAuthenticated(true);
    } 
    else if (customerToken) {
      setUser(decodeJWT(customerToken));
      setAuthType("customer");
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  {/* Login and logout functions for both customer and admin */}
  const loginCustomer = async (email, password) => {
    const res = await customerService.loginService({ email, password });

    const { accessToken, refreshToken } = res.data.data;

    localStorage.setItem('customerAccessToken', accessToken);
    localStorage.setItem('customerRefreshToken', refreshToken);

    const decoded = decodeJWT(accessToken);

    setUser(decoded);
    setAuthType("customer");
    setIsAuthenticated(true);
  };
  const logoutcustomer = useCallback(() => {
    localStorage.removeItem('customerAccessToken');
    localStorage.removeItem('customerRefreshToken');
    setUser(null);
    setIsAuthenticated(false);
  }, []);


  {/* Admin login and logout functions */}
  const loginAdmin = async (email, password) => {
    const res = await accountSystemService.loginService({ email, password });

    const { accessToken, refreshToken } = res.data.data;

    localStorage.setItem('adminAccessToken', accessToken);
    localStorage.setItem('adminRefreshToken', refreshToken);

    const decoded = decodeJWT(accessToken);

    setUser(decoded);
    setAuthType("admin");
    setIsAuthenticated(true);
  };
  
  const logoutadmin = useCallback(() => {
    localStorage.removeItem('adminAccessToken');
    localStorage.removeItem('adminRefreshToken');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  {/* Function to refresh access token using refresh token for customers */}
  const refreshAccessToken = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('customerRefreshToken');
      if (!refreshToken) {
        logoutcustomer();
        throw new Error('No refresh token available');
      }

      const response = await instance.post('/customer/refresh', { refreshToken });
      const { accessToken, refreshToken: newRefreshToken } = response.data.data;

      localStorage.setItem('customerAccessToken', accessToken);
      if (newRefreshToken) {
        localStorage.setItem('customerRefreshToken', newRefreshToken);
      }

      return accessToken;
    } catch (error) {
      logoutcustomer();
      throw error;
    }
  }, [logoutcustomer]);

  const value = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    loginCustomer,
    logoutcustomer,
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
