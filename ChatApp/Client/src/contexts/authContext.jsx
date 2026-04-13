import { useState, useEffect, createContext, useRef } from 'react';

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
      try {
        const res = await fetch(`${url}/me`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!res.ok) {
          setUser(null);
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setUser(data?.data);
        setIsAuthenticated(true);
      } catch (err) {
        console.error(err);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

   if(didRun.current)return;
   getMe();
   didRun.current = true;
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

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        username,
        login,
        logOut,
        loading,
        userContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
