import React, { useState, useEffect, useContext } from "react";
import { UserCard, Chat } from "../components/components.js";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../contexts/chatContext.jsx";
import { Loader } from "../components/components.js";

function Home() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMobileUser, setIsMobileUser] = useState(false);
  const { users, loading } = useContext(ChatContext);
  const navigate = useNavigate();

  const handleClick = (user) => {
    if (isMobileUser) {
      navigate(`/chat/${user._id}`);
    } else setSelectedUser(user);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileUser(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="grid max-h-full min-h-0 grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
      <div className="space-y-2 overflow-y-auto p-3">
        {loading ? (
          <Loader>
            <h1>Loading Users</h1>
          </Loader>
        ) : users?.length > 0 ? (
          users.map((user) => {
            return <UserCard key={user._id} user={user} onClick={handleClick} />;
          })
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <h1>No User available to chat</h1>
          </div>
        )}
      </div>

      {users?.length === 0 ? (
        <p>No users found</p>
      ) : !isMobileUser ? (
        <div className="flex h-full min-h-0">
          <Chat selected={selectedUser}>
            {!selectedUser && (
              <div className="flex h-full items-center justify-center">
                <p>Select people to start new chat</p>
              </div>
            )}
          </Chat>
        </div>
      ) : null}
    </div>
  );
}

export default Home;
