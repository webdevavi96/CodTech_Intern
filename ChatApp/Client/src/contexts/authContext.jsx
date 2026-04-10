import { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
      setIsAuthenticated(true);
    };
    setLoading(false);
  }, []);

  const userContext = (username) => {
    setUsername(username);
  }

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));

    //   set Headers headers

    setUser(userData);
    setIsAuthenticated(true);
    setLoading(false);
  };

  const logOut = () => {
    localStorage.removeItem('user');

    //   delete Headers headers

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
