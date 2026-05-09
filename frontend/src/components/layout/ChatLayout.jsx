import {
  useEffect,
  useState,
} from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import ChatArea from "../chat/ChatArea";
import ChatInput from "../chat/ChatInput";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  useChat,
} from "../../context/ChatContext";

import {
  createChat,
  getAllChats,
  getSingleChat,
  updateChat,
  deleteChat,
} from "../../api/chatApi";

import {
  getAIResponse,
} from "../../api/aiApi";

function ChatLayout() {

  const { token } = useAuth();

  const {

    chatList,
    setChatList,

    currentChatId,
    setCurrentChatId,

    messages,
    setMessages,

  } = useChat();

  const [loading, setLoading] =
    useState(false);

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  useEffect(() => {

    if (token) {
      fetchChats();
    }

  }, [token]);

  const fetchChats = async () => {

    try {

      const chats =
        await getAllChats(token);

      setChatList(chats);

    } catch (error) {

      console.log(error);
    }
  };

  const openChat = async (
    chatId
  ) => {

    try {

      const chat =
        await getSingleChat(
          chatId,
          token
        );

      setCurrentChatId(chatId);

      setMessages(chat.messages);

    } catch (error) {

      console.log(error);
    }
  };

  const handleNewChat = () => {

    setCurrentChatId(null);

    setMessages([]);
  };

  const handleDeleteChat = async (
    chatId
  ) => {

    try {

      await deleteChat(
        chatId,
        token
      );

      if (
        currentChatId ===
        chatId
      ) {

        setCurrentChatId(null);

        setMessages([]);
      }

      fetchChats();

    } catch (error) {

      console.log(error);
    }
  };

  const handleSendMessage = async (
    text
  ) => {

    const userMessage = {
      role: "user",
      content: text,
    };

    const updatedMessages = [
      ...messages,
      userMessage,
    ];

    setMessages(updatedMessages);

    setLoading(true);

    try {

      /* GET AI RESPONSE */

      const aiData =
        await getAIResponse(text);

      const fullResponse =
        aiData.response;

      /* EMPTY AI MESSAGE */

      const aiMessage = {
        role: "assistant",
        content: "",
      };

      setMessages([
        ...updatedMessages,
        aiMessage,
      ]);

      /* WORD STREAMING */

      const words =
        fullResponse.split(" ");

      let currentText = "";

      const delay =
        fullResponse.length > 2500
          ? 4
          : fullResponse.length > 1200
          ? 8
          : 15;

      for (
        let i = 0;
        i < words.length;
        i++
      ) {

        currentText +=
          words[i] + " ";

        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              delay
            )
        );

        setMessages((prev) => {

          const updated = [
            ...prev,
          ];

          updated[
            updated.length - 1
          ] = {
            role: "assistant",
            content: currentText,
          };

          return updated;
        });
      }

      /* FINAL SAVE */

      const finalMessages = [
        ...updatedMessages,
        {
          role: "assistant",
          content: fullResponse,
        },
      ];

      if (token) {

        if (currentChatId) {

          await updateChat(
            currentChatId,
            {
              title:
                finalMessages[0]
                  .content
                  .slice(0, 30),

              messages:
                finalMessages,
            },
            token
          );

        } else {

          const response =
            await createChat(
              {
                title:
                  text.slice(0, 30),

                messages:
                  finalMessages,
              },
              token
            );

          setCurrentChatId(
            response.chat_id
          );
        }

        fetchChats();
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#212121] text-white flex overflow-hidden">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        chatList={chatList}
        openChat={openChat}
        currentChatId={
          currentChatId
        }
        handleNewChat={
          handleNewChat
        }
        handleDeleteChat={
          handleDeleteChat
        }
      />

      <div className="flex-1 flex flex-col">

        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <ChatArea
          messages={messages}
          loading={loading}
          onSuggestionClick={
            handleSendMessage
          }
        />

        <ChatInput
          onSend={handleSendMessage}
        />

      </div>

    </div>
  );
}

export default ChatLayout;