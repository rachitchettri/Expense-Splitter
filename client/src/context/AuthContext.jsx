import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("auth")) || { user: null, token: null }
  );

  const loginUser = (user, token) => {
    const authData = { user, token };
    localStorage.setItem("auth", JSON.stringify(authData));
    setAuth(authData);
  };

  const logoutUser = () => {
    localStorage.removeItem("auth");
    setAuth({ user: null, token: null });
  };

  return (
    <AuthContext.Provider value={{ auth, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export context only, not the hook
export { AuthContext };
