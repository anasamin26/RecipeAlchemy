// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const login = () => {
    console.log("Setting login true");
    setAuthenticated(true);
  }

  const logout = () => {
    console.log("Setting login false");
    setAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
