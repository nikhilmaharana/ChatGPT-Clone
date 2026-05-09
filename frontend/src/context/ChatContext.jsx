import {
  createContext,
  useContext,
  useState,
} from "react";

const ChatContext = createContext();

export const ChatProvider = ({
  children,
}) => {

  const [chatList, setChatList] =
    useState([]);

  const [currentChatId, setCurrentChatId] =
    useState(null);

  const [messages, setMessages] =
    useState([]);

  return (
    <ChatContext.Provider
      value={{

        chatList,
        setChatList,

        currentChatId,
        setCurrentChatId,

        messages,
        setMessages,

      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () =>
  useContext(ChatContext);