import React from 'react'
import styles from './Chat.module.css'
import { useNavigate } from 'react-router'

const ChatList = ({ chats, onSelectChat, selectedChat }) => {
    const navigate = useNavigate()
    return (
        <div className={styles.chatList}>
            <div className='border-bottom border-3 border-secondary p-3 d-flex justify-content-between align-items-center'>
                <button
                    className='btn'
                    onClick={() => navigate(-1)}
                >
                    <i className="fa-solid fa-chevron-left"></i> back
                </button>
                <h5 className="fw-bold">Conversations</h5>
            </div>
            <div className={styles.chatListItems}>
                {chats.map((chat) => (
                    <div
                        key={chat.id}
                        className={`${styles.chatItem} ${selectedChat?.id === chat.id ? styles.activeChat : ""
                            }`}
                        onClick={() => onSelectChat(chat)}
                    >
                        <img
                            src={chat.avatar}
                            alt={chat.name}
                            className={styles.listAvatar}
                        />
                        <span className={styles.chatName}>{chat.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChatList
