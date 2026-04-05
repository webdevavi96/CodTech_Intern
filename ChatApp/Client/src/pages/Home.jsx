import React, { useState } from "react";
import { Card, Chat } from "../components/components.js";
import { users } from "../services/api.js";
import { useNavigate } from "react-router-dom";

function Home() {
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const handleClick = (user) => {
    if (window.innerWidth < 1024) {
      navigate(`/chat/${user.id}`);
    } else setSelectedUser(user);
  };

  return (
    <div className="grid h-[calc(90vh-72px)] grid-cols-1 lg:grid-cols-[350px_1fr]">
      <div className="space-y-2 overflow-y-auto p-3">
        {users.map((user) => {
          return <Card key={user.id} user={user} onClick={handleClick} />;
        })}
      </div>

      <div className="hidden h-full lg:flex">
        <Chat user={selectedUser}>
          {!selectedUser && (
            <div className="flex h-full items-center justify-center">
              <p>Select people to start new chat</p>
            </div>
          )}
        </Chat>
      </div>
    </div>
  );
}

export default Home;
