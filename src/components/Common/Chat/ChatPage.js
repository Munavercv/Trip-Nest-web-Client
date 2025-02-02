import React, { useState, useEffect } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import styles from "./Chat.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import config from '../../../config/api'
import io from "socket.io-client";

const socket = io("https://tripnest.xyz", {
  path: "/socket.io/",
  transports: ["websocket", "polling"]
});

const ChatPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { selectedChatId } = useSelector((state) => state.chat);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageStatus, setMessageStatus] = useState("Loading...");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/api/common/get-conversations/${user.userId}`);
        setChats(response.data.conversations || []);
      } catch (error) {
        console.error("Error fetching conversations:", error.response?.data?.message || error.message);
      }
    };

    if (user) fetchConversations();

    if (selectedChat) {
      socket.emit("join-chat", selectedChat._id);
    }

    socket.on("receive-message", (message) => {
      if (message.sender !== user.userId || message.conversationId !== selectedChat?._id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });
    // socket.on("receive-message", (message) => {
    //   if (message.sender !== user.userId || message.conversationId !== selectedChat?._id) {
    //     setMessages((prevMessages) => [...prevMessages, message]);
    //   }
    // });

    return () => socket.off("receive-message");
  }, [user, selectedChat]);

  useEffect(() => {
    if (selectedChatId && chats.length > 0) {
      const chat = chats.find((c) => c._id === selectedChatId);
      if (chat && chat._id !== selectedChat?._id) {
        setSelectedChat(chat);
      }
    }
  }, [chats, selectedChatId, selectedChat]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedChat) {
        try {
          const response = await axios.get(`${config.API_BASE_URL}/api/common/get-messages/${selectedChat._id}`);
          if (response.data.messages.length === 0) {
            setMessageStatus("No messages Yet");
          } else {
            setMessageStatus("");
            setMessages(response.data.messages);
          }
        } catch (error) {
          console.error("Error fetching messages:", error.response?.data?.message || error.message);
          setMessageStatus("Failed to load messages.");
        }
      }
    };

    fetchMessages();
  }, [selectedChat]);

  const handleSendMessage = (content) => {
    if (selectedChat) {
      const messageData = {
        conversationId: selectedChat._id,
        sender: user.userId,
        content,
      };

      socket.emit("send-message", messageData);

      setMessages((prevMessages) => [
        ...prevMessages,
        { ...messageData, timestamp: new Date() },
      ]);
    }
  };

  return (
    <div className={`${styles.chatPage} container-fluid`}>
      <div className="row h-100">
        <div className={`col-lg-4 col-md-4 col-12 ${styles.chatListContainer} ${selectedChat && "d-none d-md-block"}`}>
          <ChatList
            chats={chats}
            onSelectChat={setSelectedChat}
            selectedChat={selectedChat}
          />
        </div>
        <div className={`col-lg-8 col-md-8 col-12 ${styles.chatWindowContainer} ${selectedChat ? "d-block" : "d-none d-md-block"}`}>
          {selectedChat ? (
            <ChatWindow
              chat={selectedChat}
              messages={messages}
              messageStatus={messageStatus}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <div className={styles.noChatSelected}>
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
