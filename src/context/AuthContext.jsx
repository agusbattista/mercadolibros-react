import { createContext, useState, useContext } from "react";
const AuthContext = createContext();

function extractUsername(token) {
  if (typeof token === "string" && token.startsWith("fake-token-")) {
    return token.replace("fake-token-", "");
  } else {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedToken = localStorage.getItem("authToken");
    return savedToken ? extractUsername(savedToken) : null;
  });

  //login y logout simulados
  const login = (username) => {
    const token = `fake-token-${username}`;
    localStorage.setItem("authToken", token);
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
