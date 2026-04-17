import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CiMenuKebab } from "react-icons/ci";
import { MdAddIcCall } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { getLastActive } from "../utils/getLastActive";
import ChatBubble from "./ChatBubble";
import SendMessageBox from "./SendMessageBox";
import { chat } from "../services/callActions";
import { ChatContext } from "../contexts/chatContext";
import { AuthContext } from "../contexts/authContext";
import { fetchChat } from "../services/chatService";

export default function Chat({ selected, children }) {
  const [isMobileUser, setIsMobileUser] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [sendMessage, setSendMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { users } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const socket = useRef(null);
  const { id } = useParams();

  const activeUser = selected || users?.find((u) => u._id.toString() === id);

  // Auto scroll when new message arrives
  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages]);

  // Show load more button when user reaches on the top of message container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const isNearTop = el.scrollTop < 50;
      setShowLoadMore(isNearTop);
    };

    el.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Checking cleint's devices width for routing in small devices
  useEffect(() => {
    setIsMobileUser(window.innerWidth < 1024);
  }, []);

  // Back back in small screen devices
  const handleClick = () => {
    navigate(window.history.back());
  };

  // Connecting socket for live chat
  useEffect(() => {
    socket.current = chat();

    return () => {
      socket.current.disconnect();
    };
  }, []);

  // Checking user active status when page mounted
  useEffect(() => {
    if (!socket.current) return;

    socket.current.emit("join", user._id);

    const handler = (data) => {
      if (data.userId === activeUser?._id) {
        setIsActive(data.status === "Online");
      }
    };

    socket.current.on("status", handler);

    return () => socket.current.off("status", handler);
  }, [activeUser]);

  // Sending messages through sockets
  useEffect(() => {
    if (!socket.current || sendMessage === "") return;

    socket.current.emit(
      "send_message",
      {
        senderId: user._id,
        receiverId: activeUser._id,
        text: sendMessage,
      },
      [sendMessage]
    );
  }, [sendMessage]);

  // Receiving messages and upating UI
  useEffect(() => {
    if (!socket.current) return;

    socket.current.on("receive_message", (data) => {
      setMessages((pre) => [...pre, data]);
    });

    return () => {
      socket.current.off("receive_message");
    };
  }, []);

  // Getting old messages when user first visits
  useEffect(() => {
    const getChat = async () => {
      if (!activeUser?._id) return;
      const res = await fetchChat(activeUser?._id);
      setMessages(res?.data.reverse());
      setPage(2);
      setHasMore(res?.hasMore);
    };
    getChat();
  }, [activeUser]);

  // Setting new messages to send via socket
  const messageHandler = (message) => {
    setSendMessage(message);
  };

  // Handler function for loading more messages
  const loadMoreMessages = async () => {
    if (!hasMore) return;

    const el = containerRef.current;
    if (!el) return;

    const prevHeight = el.scrollHeight;
    const res = await fetchChat(activeUser._id, page);
    console.log(res);

    setMessages((prev) => [...(res?.data || []), ...prev]);

    setPage((prev) => prev + 1);

    if (res?.data.length < 10) {
      setHasMore(false);
    }

    setTimeout(() => {
      const newHeight = el.scrollHeight;
      el.scrollTop = newHeight - prevHeight;
    }, 0);
  };

  // Initial check if there is user selected or not
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
            <span className="text-sm font-semibold">{activeUser.username}</span>
            <span className={`text-xs ${isActive ? "text-green-700" : "text-gray-700"}`}></span>
          </div>
        </div>

        {/* <div className="flex items-center gap-4 text-gray-600">
          <MdAddIcCall size={20} className="cursor-pointer" />
          <CiMenuKebab size={20} className="cursor-pointer" />
        </div> */}
      </div>

      <div className="py-2 text-center">
        <h3 className="text-sm text-gray-500 italic">{getLastActive(activeUser.last_message)}</h3>
      </div>

      <div
        className="no-scrollbar max-h-screen flex-1 space-y-2 overflow-y-auto px-4 py-3"
        ref={containerRef}
      >
        {showLoadMore && (
          <div className="text-center">
            <button
              onClick={loadMoreMessages}
              className="rounded bg-transparent px-3 py-1 text-blue-800 underline"
            >
              Load more
            </button>
          </div>
        )}

        {messages?.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${msg.sentBy === user._id ? "justify-end" : "min-h-0 justify-start"}`}
          >
            <ChatBubble
              messageProps={msg}
              currUser={msg.sentBy === user._id ? user : activeUser}
              messageStatus={msg.sentBy === user._id ? "sent" : "recieved"}
              timeStamp={msg.sentOn}
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
