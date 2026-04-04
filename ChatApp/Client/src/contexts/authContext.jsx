import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

const tempUser = {
  "username": "test", 
  "email": "test"
}


export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const DEV_MODE = true;

  useEffect(() => {
    if (DEV_MODE) {
      const mockUser = {
        username: "test",
        email: "test@gmail.com",
      };

      setUser(mockUser);
      setIsAuthenticated(true);
      setLoading(false);
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (accessToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  const login = (userData, accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(userData));

    //   set Headers headers

    setUser(userData);
    setIsAuthenticated(true);
  };

  const logOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    //   delete Headers headers

    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
