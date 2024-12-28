import React, {
    createContext,
    useContext,
    useState,
  } from "react";
  import FetchAPI from "../API/FetchAPI";
  import PostAPI from "../API/PostApi";
  import { useSelector } from "react-redux";
  
  const ChatContext = createContext();
  
  const initialStates = {
    inboxes: null,
    currentChat: null,
    error: null,
    inboxLoading: false,
    chatLoading: false,
    sendMessageLoading: false,
  };
  
  export function ChatProvider({ children }) {
    const [chatState, setChatState] = useState(initialStates);
    const { token } = useSelector((state) => state.auth);
  
    const clearCurrentChat = () => {
      setChatState((prev) => ({ ...prev, currentChat: null }));
    };
  
    const clearInbox = () => {
      setChatState((prev) => ({ ...prev, inboxes: null }));
    };
  
    const updateMessageStatus = (messageId, status) => {
      if (chatState?.currentChat?.messages) {
        setChatState((prev) => ({
          ...prev,
          currentChat: {
            ...prev.currentChat,
            messages: prev.currentChat.messages.map((msg) =>
              msg._id === messageId ? { ...msg, status } : msg
            ),
          },
        }));
      }
    };
  
    const updateInbox = async (chatId) => {
      if (chatState?.inboxes) {
        setChatState((prev) => ({
          ...prev,
          inboxes: prev.inboxes.map((inbox) =>
            inbox.chat._id === chatId ? { ...inbox, unseenCount: 0 } : inbox
          ),
        }));
      }
      try {
        await PostAPI().UpdateChatMessage({ chatId }, token);
      } catch (error) {
        console.log("🚀 ~ updateInbox ~ error:", error);
      }
      setChatState((prev) => ({
        ...prev,
        currentChat: prev?.currentChat?.messages?.map((message) => ({
          ...message,
          status: "seen",
        })),
      }));
    };
  
    const setLoadingState = (loadingType, value) => {
      setChatState((prev) => ({ ...prev, [loadingType]: value }));
    };
  
    const setError = (error) => {
      setChatState((prev) => ({ ...prev, error }));
    };
  
    const fetchInboxes = async (token) => {
      setLoadingState("inboxLoading", true);
      try {
        const response = await FetchAPI().GetUserInbox(token);
        if (response.success) {
          setChatState((prev) => ({
            ...prev,
            inboxes: response.data,
            error: null,
          }));
        }
      } catch (error) {
        setError(error.response?.data || "Failed to fetch inboxes");
      } finally {
        setLoadingState("inboxLoading", false);
      }
    };
  
    const fetchSpecificChat = async (token, chatId) => {
      setLoadingState("chatLoading", true);
      try {
        const response = await FetchAPI().GetSingleUserChat(chatId, token);
        if (response.success) {
          setChatState((prev) => ({
            ...prev,
            currentChat: response.data,
            error: null,
          }));
        }
      } catch (error) {
        setError(error.response?.data || "Failed to fetch specific chat");
      } finally {
        setLoadingState("chatLoading", false);
      }
    };
  
    return (
      <ChatContext.Provider
        value={{
          clearInbox,
          clearCurrentChat,
          updateMessageStatus,
          updateInbox,
          fetchInboxes,
          fetchSpecificChat,
          setChatState,
          ...chatState,
        }}
      >
        {children}
      </ChatContext.Provider>
    );
  }
  
  export const useChat = () => {
    return useContext(ChatContext);
  };
  