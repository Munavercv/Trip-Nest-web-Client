import React, { useEffect, useState, useRef } from "react";
import styles from "./Chat.module.css";
import { useSelector } from "react-redux";

const ChatWindow = ({ chat, onBack, messages, messageStatus, onSendMessage }) => {
  const defaultAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s'
  const { userRole, user } = useSelector((state) => state.auth);
  const [chatInput, setChatInput] = useState('');
  const chatBodyRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault()
    if (chatInput.trim()) {
      onSendMessage(chatInput.trim());
      setChatInput('');
    }
  };

  useEffect(() => {
    // to scroll to bottom
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={`${styles.chatWindow}`}>
      <div className={styles.chatHeader}>
        <button className="transparent-btn" onClick={onBack}>
          <i className="fa-solid fa-arrow-left-long"></i>
        </button>
        <img
          src={(userRole === "user" ? chat.vendorDetails[0].dpUrl : chat.userDetails[0].dpUrl) || defaultAvatar}
          alt={userRole === "user" ? chat.vendorDetails[0].name : chat.userDetails[0].name}
          className={styles.chatAvatar}
        />
        <h5 className="ms-2">
          {userRole === "user" ? chat.vendorDetails[0].name : chat.userDetails[0].name}
        </h5>

        <div style={{ marginLeft: 'auto' }}>
          <button className="transparent-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </button>
          <ul className="dropdown-menu border-0 shadow-sm">
            <li><a className="dropdown-item" href="#">Delete chat</a></li>
            <li><a className="dropdown-item" href="#">Clear chat</a></li>
          </ul>
        </div>
      </div>


      <div className={styles.chatBody} ref={chatBodyRef}>
        {messages?.length ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${message.sender === user.userId ? styles.sendor : styles.reciever}`}
            >
              <p>{message.content}</p>
              <span className={styles.time}>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))
        ) : (
          <p className="fw-bold text-center">{messageStatus}</p>
        )}
      </div>

      <form
        onSubmit={handleSend}
        className={styles.chatFooter}>
        <input
          type="text"
          className={styles.chatInput}
          placeholder="Type a message..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
        />
        <button
          disabled={!chatInput}
          // onClick={handleSend}
          type="submit"
          className="primary-btn rounded-5 py-2 px-sm-4 px-3 ms-2"
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
