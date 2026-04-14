import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CiMenuKebab } from 'react-icons/ci';
import { MdAddIcCall } from 'react-icons/md';
import { FaArrowLeft } from 'react-icons/fa';
import { getLastActive } from '../utils/getLastActive';
import ChatBubble from './ChatBubble';
import SendMessageBox from './SendMessageBox';
import { chat } from '../services/callActions';
import { ChatContext } from '../contexts/chatContext';
import { AuthContext } from '../contexts/authContext';

export default function Chat({ selected, children }) {
  const [isMobileUser, setIsMobileUser] = useState(false);
  const [sendMessage, setSendMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const { users } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const socket = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [receivedMessage]);

  useEffect(() => {
    if (window.innerWidth < 1024) setIsMobileUser(true);
    else setIsMobileUser(false);
  });

  const activeUser = selected || users?.find((u) => u._id.toString() === id);
  const handleClick = () => {
    navigate(window.history.back());
  };

  useEffect(() => {
    socket.current = chat();

    socket.current.emit('join', user._id);

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket.current || !activeUser) return;

    const handler = (data) => {
      if (data.userId === activeUser._id) {
        setIsActive(data.status === 'Online');
      }
    };

    socket.current.on('status', handler);

    return () => {
      socket.current.off('status', handler);
    };
  }, [activeUser]);

  useEffect(() => {
    if (!socket.current || sendMessage === '') return;

    socket.current.emit(
      'send_message',
      {
        senderId: user._id,
        receiverId: activeUser._id,
        text: sendMessage,
      },
      [sendMessage]
    );
  }, [sendMessage]);

  useEffect(() => {
    if (!socket.current) return;

    socket.current.on('receive_message', (data) => {
      setReceivedMessage((pre) => [...pre, data]);
    });

    return () => {
      socket.current.off('receive_message');
    };
  }, []);

  const messageHandler = (message) => {
    setSendMessage(message);
  };

  if (!activeUser) {
    return <div className="flex h-full w-full flex-col bg-[#e1ecf7]">{children}</div>;
  }

  return (
    <div className="flex max-h-100 min-h-0 w-full flex-col overflow-hidden rounded-xl bg-gray-300 shadow-sm">
      {isMobileUser && (
        <div className="sticky top-0 p-2">
          <button onClick={handleClick} className="cursor-pointer rounded-full px-4 py-2">
            <FaArrowLeft />
          </button>
        </div>
      )}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img className="h-9 w-9 rounded-full object-cover" />
            <span className="text-sm font-medium">{activeUser.fullname}</span>
            {isActive && (
              <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
            )}
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">{activeUser.fullname}</span>
            <span className={`text-xs ${isActive ? 'text-green-700' : 'text-gray-700'}`}></span>
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

      <div
        className="no-scrollbar max-h-screen flex-1 space-y-2 overflow-y-auto px-4 py-3"
        ref={containerRef}
      >
        {receivedMessage.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${msg.sentBy === user._id ? 'justify-end' : 'min-h-0 justify-start'}`}
          >
            <ChatBubble
              messageProps={msg}
              currUser={msg.sentBy === user._id ? user : activeUser}
              messageStatus={msg.sentBy === user._id ? 'sent' : 'recieved'}
            />
          </div>
        ))}
      </div>

      <div className="p-2">
        <SendMessageBox handler={messageHandler} />
      </div>
    </div>
  );
}
