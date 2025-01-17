import React from "react";
import styles from "./Chat.module.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const ChatList = ({ chats, onSelectChat, selectedChat }) => {
  const defaultAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s'
  const { userRole } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className={styles.chatList}>
      <div className="border-bottom border-3 border-secondary p-3 d-flex justify-content-between align-items-center">
        <button
          className="transparent-btn"
          onClick={() => userRole === 'vendor' ? navigate('/vendor') : navigate('/')}
        >
          <i className="fa-solid fa-chevron-left"></i> back
        </button>
        <h5 className="fw-bold">Conversations</h5>
      </div>

      <div className={styles.chatListItems}>
        {chats.map((conversation) => {
          const participantDetails =
            userRole === "user" ? conversation.vendorDetails[0] : conversation.userDetails[0];

          return (
            <div
              key={conversation._id}
              className={`${styles.chatItem} ${selectedChat?._id === conversation._id ? styles.activeChat : ""
                }`}
              onClick={() => onSelectChat(conversation)
              }>
              <img
                src={(participantDetails?.dpUrl || participantDetails?.logoUrl) || defaultAvatar}
                alt={participantDetails?.name || "Participant"}
                className={styles.listAvatar}
              />
              <span className={styles.chatName}>{participantDetails?.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
