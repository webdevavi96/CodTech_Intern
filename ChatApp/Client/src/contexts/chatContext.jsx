import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./authContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [loaing, setLoading] = useState(false);
  const didRun = useRef(false);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const query = {
          page: 1,
          limit: 10,
          sortBy: "createdAt",
          sortType: "asc",
        };

        const queryString = new URLSearchParams(query).toString();

        const res = await fetch(`${import.meta.env.VITE_USERS_URL}/users/?${queryString}`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          setUsers(null);
          setLoading(false);
        }

        const data = await res?.json();

        const usersList = (await data?.data?.length) == 0 ? null : data?.data;
        setUsers(usersList);
        setLoading(false);
      } catch (error) {
        setUsers(null);
      } finally {
        setLoading(false);
      }
    };
    if (!isAuthenticated) return;
    if (didRun.current) return;
    getUsers();
    didRun.current = true;
  }, [isAuthenticated]);

  return <ChatContext.Provider value={{ users, loaing }}>{children}</ChatContext.Provider>;
};
