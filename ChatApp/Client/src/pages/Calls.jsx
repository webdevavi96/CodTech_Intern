import React, { useState, useEffect } from "react";
import CallerCard from "../components/CallerCard";
import CallPage from "../components/CallPage";
import { users } from "../services/api";
import { useNavigate } from "react-router-dom";

function Calls() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMobileUser, setIsMobileUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileUser(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (user) => {
    if (isMobileUser) {
      navigate(`/call/${user.id}`);
    } else {
      setSelectedUser(user);
    }
  };

  return (
    <div className="grid h-[calc(90vh-72px)] grid-cols-1 gap-4 p-4 lg:grid-cols-[1.5fr_1fr]">
      <div className="space-y-3 overflow-y-auto rounded-2xl p-4">
        {users.map((user) => (
          <CallerCard key={user.id} user={user} onClick={handleClick} />
        ))}
      </div>

      {!isMobileUser && (
        <div className="grid grid-rows-[auto_1fr_auto]">
          <div />

          <div className="flex items-center justify-center bg-[#F2F0EF]">
            <div className="h-full w-full max-w-md rounded-2xl p-4 shadow-md">
              {selectedUser ? (
                <CallPage user={selectedUser} />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-500">
                  Select a user to start a call
                </div>
              )}
            </div>
          </div>

          <div />
        </div>
      )}
    </div>
  );
}

export default Calls;
