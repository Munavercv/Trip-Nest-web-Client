import React, { useState } from "react";
import styles from "./Chat.module.css";

const ChatWindow = ({ chat, onBack }) => {
    const [chatInput, setChatInput] = useState('')

  return (
    <div className={`${styles.chatWindow}`}>
      {/* Header */}
      <div className={styles.chatHeader}>
        <button
          className="btn d-md-none"
          onClick={onBack}
        >
          <i class="fa-solid fa-arrow-left-long"></i>
        </button>
        <img
          src={chat.avatar}
          alt={chat.name}
          className={styles.chatAvatar}
        />
        <h5 className="ms-2">{chat.name}</h5>
      </div>

      {/* Chat Body */}
      <div className={styles.chatBody}>
        {chat.messages.length ? (
          chat.messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                message.sender === "user" ? styles.sendor : styles.reciever
              }`}
            >
              <p>{message.text}</p>
              <span className={styles.time}>{message.time}</span>
            </div>
          ))
        ) : (
          <p>No messages yet.</p>
        )}
      </div>

      {/* Footer */}
      <div className={styles.chatFooter}>
        <input
          type="text"
          className={styles.chatInput}
          placeholder="Type a message..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
        />
        <button 
        disabled={!chatInput}
        className="primary-btn rounded-5 py-2 px-sm-4 px-3 ms-2">
            <i className="fa-solid fa-paper-plane"></i></button>
      </div>
    </div>
  );
};

export default ChatWindow;
