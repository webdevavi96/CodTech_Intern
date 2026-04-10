import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CiMenuKebab } from 'react-icons/ci';
import { MdAddIcCall } from 'react-icons/md';
import { FaArrowLeft } from 'react-icons/fa';
import { getLastActive } from '../utils/getLastActive';
import ChatBubble from './ChatBubble';
import SendMessageBox from './SendMessageBox';

export default function Chat({ user, children }) {
  const { id } = useParams();
  const [isMobileUser, setIsMobileUser] = useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);

  useEffect(() => {
    if (window.innerWidth < 1024) setIsMobileUser(true);
    else setIsMobileUser(false);
  });

  const activeUser = user || users?.find((u) => u.id.toString() === id);

  const handleClick = () => {
    navigate(window.history.back());
  };

  if (!activeUser) {
    return <div className="flex h-full w-full flex-col bg-[#e1ecf7]">{children}</div>;
  }

  return (
    <div className="flex h-full w-full flex-col rounded-3xl bg-[#e1ecf7]">
      {isMobileUser && (
        <div className="sticky top-0 p-2">
          <button onClick={handleClick} className="cursor-pointer rounded-full px-4 py-2">
            <FaArrowLeft />
          </button>
        </div>
      )}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={activeUser.avatar}
              alt="User Avatar"
              className="h-10 w-10 rounded-full object-cover"
            />
            {activeUser.status === 'Online' && (
              <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
            )}
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">{activeUser.name}</span>
            <span
              className={`text-xs ${activeUser.status === 'Online' ? 'text-green-700' : 'text-gray-700'
                }`}
            >
              {activeUser.status}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-gray-600">
          <MdAddIcCall size={20} className="cursor-pointer" />
          <CiMenuKebab size={20} className="cursor-pointer" />
        </div>
      </div>

      <div className="py-2 text-center">
        <h3 className="text-sm text-gray-500 italic">{getLastActive(activeUser.last_message)}</h3>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-20">
        <div className="flex justify-start">
          <ChatBubble props={activeUser} messageStatus="recieved" />
        </div>

        <div className="flex justify-end">
          <ChatBubble props={activeUser} messageStatus="sent" />
        </div>
      </div>

      <div className="border-t p-2">
        <SendMessageBox />
      </div>
    </div>
  );
}
