import { createContext, useState, useContext, useCallback, useEffect } from 'react';
import instance from "../api/api.js";
import accountSystemService from './services/accountSystemService.js';
import customerService from './services/customerService.js';


const AuthContext = createContext();

// Function to decode JWT without external library
const decodeJWT = (token) => {
  try {
    // console.log('DEBUG decodeJWT input token:', token?.substring(0, 50) + '...');
    
    const parts = token.split('.');
      // console.log('DEBUG token parts count:', parts.length);
    // console.log('DEBUG token parts:', parts);
    if (parts.length !== 3) {
      console.error('ERROR: Invalid JWT format, parts count:', parts.length);
      return null;
    }
    
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    const decoded = JSON.parse(jsonPayload);
    // console.log('DEBUG decodeJWT decoded:', decoded);
    return decoded;
  } catch (error) {
    console.error('ERROR decodeJWT:', error.message);
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

    // console.log('DEBUG AuthProvider mount:', { adminToken: !!adminToken, customerToken: !!customerToken });

    if (adminToken) {
      const decoded = decodeJWT(adminToken);
      console.log('DEBUG: Found adminToken, decoded:', decoded);
      setUser(decoded);
      setAuthType("admin");
      setIsAuthenticated(true);
    } 
    else if (customerToken) {
      const decoded = decodeJWT(customerToken);
      console.log('DEBUG: Found customerToken, decoded:', decoded);
      setUser(decoded);
      setAuthType("customer");
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    // console.log('DEBUG AuthContext state after update:', { user, isAuthenticated, authType, loading });
  }, [user, isAuthenticated, authType, loading]);

  {/* Login and logout functions for both customer and admin */}
  const loginCustomer = async (email, password) => {
    const res = await customerService.login({ email, password });

    // console.log('DEBUG loginCustomer response:', res);

    // customerService trả về response.data, nên không cần .data nữa
    const { accessToken, refreshToken } = res.data || res;

    // console.log('DEBUG accessToken:', accessToken, 'refreshToken:', refreshToken);

    if (!accessToken) {
      console.error('ERROR: accessToken is undefined!');
      return;
    }

    localStorage.setItem('customerAccessToken', accessToken);
    localStorage.setItem('customerRefreshToken', refreshToken);

    const decoded = decodeJWT(accessToken);

    // console.log('DEBUG decoded user:', decoded);

    setUser(decoded);
    setAuthType("customer");
    setIsAuthenticated(true);

   // console.log('DEBUG after setIsAuthenticated - state updated');
  };
  const logoutcustomer = useCallback(() => {
    localStorage.removeItem('customerAccessToken');
    localStorage.removeItem('customerRefreshToken');
    setUser(null);
    setAuthType(null);
    setIsAuthenticated(false);
  }, []);


  {/* Admin login and logout functions */}
  const loginAdmin = async (email, password) => {

      const res =
          await accountSystemService.loginAccountSystem({
              email,
              password
          });

      const accessToken =
          res.data.accessTokenaccount;

      localStorage.setItem(
          "adminAccessToken",
          accessToken
      );

      const decoded = decodeJWT(accessToken);

      setUser(decoded);

      setAuthType("admin");

      setIsAuthenticated(true);

      return res;
  };
  
  const logoutadmin = useCallback(() => {
    localStorage.removeItem('adminAccessToken');
    localStorage.removeItem('adminRefreshToken');
    setUser(null);
    setAuthType(null);
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
    authType,
    loginCustomer,
    logoutcustomer,
    loginAdmin,
    logoutadmin,
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
