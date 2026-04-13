import { createContext, useEffect, useState } from 'react';

export const ChatContext = createContext();

export const ChatContextProvier = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [loaing, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const query = {
          page: 1,
          limit: 1,
          sortBy: 'asc',
          sortType: 'createdAt',
        };

        const queryString = new URLSearchParams(query).toString();

        const res = await fetch(`${import.meta.env.VITE_CHAT_URL}/users/?${queryString}`, {
          credentials: 'include',
        });

        if (!res.ok) {
          setUsers(null);
          setLoading(false);
        }

        const data = await res?.json();
        console.log(data);
        // setUsers(data.users);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setUsers(null);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return <ChatContext.Provider value={{ users, loaing }}>{children}</ChatContext.Provider>;
};
