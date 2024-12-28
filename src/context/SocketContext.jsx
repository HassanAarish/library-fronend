import { useContext, createContext, useState, useEffect } from "react";
import socket from "../services/socket";
import { useDispatch, useSelector } from "react-redux";
// import { pushMessage } from "../Redux/chat/chatSlice";
import { useLocation } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { pushNotification } from "../Redux/notification/notificationSlice";
import { useChat } from "./ChatContext";

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [isConnected, setIsConnected] = useState(socket?.connected);
  const [onlineUsers, setOnlineUsers] = useState({});
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const { setChatState } = useChat();

  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    function onConnect() {
      console.log("🚀 ~ Socket connected");
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("🚀 ~ Socket disconnected");
      setIsConnected(false);
    }

    function onConnectError(error) {
      console.error("🚀 ~ Socket connection error:", error.message);
      setIsConnected(false);
    }

    function handleAllOnlineUsers(onlineUsers) {
      setOnlineUsers(onlineUsers);
    }

    function handleUserOnlineStatus({ userId, status }) {
      setOnlineUsers((prev) => ({
        ...prev,
        [userId]: status === "online" ? true : false,
      }));
    }

    function handleNewNotification(notification) {
      console.log("🚀 ~ handleNewNotification ~ notification:", notification);
      dispatch(pushNotification(notification));
    }

    if (isAuthenticated && token && socket) {
      console.log("🚀 ~ useEffect ~ token:", token);
      socket.auth = { token };

      // Attach event listeners
      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);
      socket.on("connect_error", onConnectError);
      socket.on("allOnlineUsers", handleAllOnlineUsers);
      socket.on("userOnlineStatus", handleUserOnlineStatus);
      socket.on("receiveNotification", handleNewNotification);

      socket.connect(); // Connect only after attaching listeners

      return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
        socket.off("connect_error", onConnectError);
        socket.off("allOnlineUsers");
        socket.off("userOnlineStatus");
        socket.off("receiveNotification", handleNewNotification);
        socket.disconnect(); // Ensure disconnection on cleanup
      };
    }
  }, [isAuthenticated, token]);

  useEffect(() => {
    function handleNewMessage(message) {
      if (
        (location?.pathname === "/inbox" ||
          location?.pathname === "/seller/messages") &&
        location?.search === `?i=${message?.chatId}`
      ) {
        setChatState((prev) => {
          return {
            ...prev,
            currentChat: {
              ...prev.currentChat,
              messages: [...prev.currentChat.messages, message],
            },
          };
        });
      } else {
        toast(`New Message: ${message.content}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    }

    if (socket) {
      socket.on("newMessage", handleNewMessage);

      return () => {
        socket.off("newMessage", handleNewMessage);
      };
    }
  }, [location, socket]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
