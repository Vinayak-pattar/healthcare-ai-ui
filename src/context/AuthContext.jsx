import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [role, setRole] = useState(
    localStorage.getItem("role") || null
  );

  const login = (userRole) => {
    localStorage.setItem("role", userRole);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem("role");
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}