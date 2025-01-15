import React, { useState } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import styles from "./Chat.module.css";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const chats = [
    {
      id: 1,
      name: "Vendor 1",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      messages: [
        { sender: "user", text: "Hi Vendor 1!", time: "10:00 AM" },
        { sender: "vendor", text: "Hello! How can I help you?", time: "10:01 AM" },
        { sender: "user", text: "I need some help with my booking.", time: "10:02 AM" },
        { sender: "vendor", text: "Sure! Can you share your booking ID?", time: "10:03 AM" },
      ],
    },
    {
      id: 2,
      name: "Vendor 2",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      messages: [
        { sender: "user", text: "Hello Vendor 2!", time: "11:00 AM" },
        { sender: "vendor", text: "Hi there! What can I do for you?", time: "11:01 AM" },
      ],
    },
    {
      id: 3,
      name: "Vendor 3",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      messages: [
        { sender: "user", text: "Hello Vendor 2!", time: "11:00 AM" },
        { sender: "vendor", text: "Hi there! What can I do for you?", time: "11:01 AM" },
      ],
    },
    {
      id: 4,
      name: "Vendor 4",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      messages: [
        { sender: "user", text: "Hello Vendor 2!", time: "11:00 AM" },
        { sender: "vendor", text: "Hi there! What can I do for you?", time: "11:01 AM" },
      ],
    },
  ];

  const handleBackToList = () => setSelectedChat(null);

  return (
    <div className={`${styles.chatPage} container-fluid`}>
      <div className="row h-100">
        {/* Chat List */}
        <div
          className={`col-lg-4 col-md-4 col-12 ${styles.chatListContainer} ${
            selectedChat && "d-none d-md-block"
          }`}
        >
          <ChatList
            chats={chats}
            onSelectChat={setSelectedChat}
            selectedChat={selectedChat}
          />
        </div>

        {/* Chat Window */}
        <div
          className={`col-lg-8 col-md-8 col-12 ${styles.chatWindowContainer} ${
            selectedChat ? "d-block" : "d-none d-md-block"
          }`}
        >
          {selectedChat ? (
            <ChatWindow chat={selectedChat} onBack={handleBackToList} />
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
