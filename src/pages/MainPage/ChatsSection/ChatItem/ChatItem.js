import React from 'react';
import chatPhoto from "../../../../assets/chat-photo.jpg";

const ChatItem = ({ chatName, onClick }) => {
    return (
        <li className='chats-list-item' onClick={onClick}>
            <img src={chatPhoto} alt="not loaded" />
            <p>{chatName}</p>
        </li>
    );
};


export default ChatItem;