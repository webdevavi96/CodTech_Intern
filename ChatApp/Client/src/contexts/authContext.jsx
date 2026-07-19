import { useState, useEffect, createContext, useRef } from "react";

export const AuthContext = createContext();
const url = import.meta.env.VITE_AUTH_URL;

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const didRun = useRef(false);

  useEffect(() => {
    const getMe = async () => {
      const controller = new AbortController();

      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 5000);

      try {
        const res = await fetch(`${url}/me`, {
          method: "GET",
          credentials: "include",
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          setUser(null);
          setIsAuthenticated(false);
          return;
        }

        const data = await res.json();
        setUser(data.data);
        setIsAuthenticated(true);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Server timeout");
        } else {
          console.error(err);
          setUser(null);
          setIsAuthenticated(false);
        }
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    getMe();
  }, []);

  const userContext = (username) => setUsername(username);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setLoading(false);
  };

  const logOut = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshUser = (newUser) => {
    if (!newUser) return;
    setUser(newUser);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        username,
        login,
        logOut,
        loading,
        refreshUser,
        userContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
