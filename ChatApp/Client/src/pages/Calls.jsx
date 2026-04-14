import React, { useState, useEffect, useContext } from 'react';
import CallerCard from '../components/CallerCard';
import CallPage from '../components/CallPage';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../contexts/chatContext';
import Loader from '../components/Loader';

function Calls() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMobileUser, setIsMobileUser] = useState(false);
  const { users, loading } = useContext(ChatContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileUser(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
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
        {loading ? (
          <Loader />
        ) : users?.length > 0 ? (
          users.map((user) => <CallerCard key={user._id} user={user} onClick={handleClick} />)
        ) : (
          <p>No users found</p>
        )}
      </div>

      {loading ? (
        <Loader />
      ) : (
        !isMobileUser && (
          <div className="grid grid-rows-[auto_1fr_auto]">
            <div />

            <div className="flex items-center justify-center">
              <div className="h-full w-full max-w-md rounded-2xl p-4">
                {selectedUser ? (
                  <CallPage user={selectedUser} />
                ) : users?.length > 0 ? (
                  <div className="flex h-full items-center justify-center text-gray-500">
                    Select a user to start a call
                  </div>
                ) : (
                  <p></p>
                )}
              </div>
            </div>

            <div />
          </div>
        )
      )}
    </div>
  );
}

export default Calls;
