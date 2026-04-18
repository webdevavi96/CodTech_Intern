import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineChatBubble, MdCallEnd } from "react-icons/md";
import { BsFillMicMuteFill } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { endCall, muteCall, addNewPeople, chat } from "../services/callActions";
import { ChatContext } from "../contexts/chatContext";

function CallPage({ user, children }) {
  const { id } = useParams();
  const [isMobileUser, setIsMobileUser] = useState(false);
  const navigate = useNavigate();
  const { users } = useContext(ChatContext);

  const activeUser = user || users.find((u) => u.id.toString() === id);

  useEffect(() => {
    if (window.innerWidth < 1024) setIsMobileUser(true);
    else setIsMobileUser(false);
  });

  const handleClick = () => {
    navigate(window.history.back());
  };

  if (!activeUser) {
    return <div className="flex h-full w-full flex-col bg-[#F2F0EF]">{children}</div>;
  }

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-2xl bg-[#F2F0EF] p-6">
      {isMobileUser && (
        <div className="sticky top-0 p-2">
          <button onClick={handleClick} className="cursor-pointer rounded-full px-4 py-2">
            <FaArrowLeft />
          </button>
        </div>
      )}
      <div className="flex justify-end">
        <CiMenuKebab size={20} />
      </div>

      <div className="flex flex-1 flex-col items-center space-y-3">
        <img
          src={activeUser.avatar}
          alt={activeUser.name}
          className="h-20 w-20 rounded-full object-cover"
        />

        <h2 className="text-lg font-semibold">{activeUser.name}</h2>

        <p className="text-sm text-gray-600">00:02:39</p>
      </div>

      <div className="flex h-50 flex-col items-center justify-between gap-6 pb-4">
        <div className="flex gap-8">
          <button onClick={addNewPeople} className="rounded-full bg-black p-4 text-white">
            <IoMdPersonAdd size={18} />
          </button>

          <button onClick={muteCall} className="rounded-full bg-black p-4 text-white">
            <BsFillMicMuteFill size={18} />
          </button>

          <button onClick={chat} className="rounded-full bg-black p-4 text-white">
            <MdOutlineChatBubble size={18} />
          </button>
        </div>

        <button onClick={endCall} className="rounded-full bg-red-500 p-4 text-white">
          <MdCallEnd size={20} />
        </button>
      </div>
    </div>
  );
}

export default CallPage;
