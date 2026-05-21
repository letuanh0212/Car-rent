import { createContext, useState } from "react";

const AuthContext = createContext(null);

function decodeJWT(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

function getInitialAuthState() {
  const adminToken = localStorage.getItem("adminAccessToken");
  const customerToken = localStorage.getItem("customerAccessToken");

  if (adminToken) {
    return {
      user: decodeJWT(adminToken),
      authType: "admin",
    };
  }

  if (customerToken) {
    return {
      user: decodeJWT(customerToken),
      authType: "customer",
    };
  }

  return {
    user: null,
    authType: null,
  };
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getInitialAuthState);

  const isAuthenticated = !!auth.user;

  const logout = () => {
    localStorage.removeItem("adminAccessToken");
    localStorage.removeItem("adminRefreshToken");
    localStorage.removeItem("customerAccessToken");
    localStorage.removeItem("customerRefreshToken");

    setAuth({
      user: null,
      authType: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: auth.user,
        authType: auth.authType,
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}