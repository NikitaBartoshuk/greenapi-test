import './chatssection.css'
import React, { useState, useContext } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import CreateChatPopup from "../../../common/CreateChatPopup/CreateChatPopup";
import { AppContext } from '../MainPage';
import ChatItem from "./ChatItem/ChatItem";

const ChatsSection = () => {
    const { notifications, setActiveChat, chats } = useContext(AppContext);
    const [contactPopup, setContactPopup] = useState(false);

    const togglePopup = () => {
        setContactPopup(!contactPopup);
    };

    const addedChats = new Set();

    return (
        <aside className='chats-section-container'>
            <article className='chats-header'>
                <h1>Chats</h1>
                <CiCirclePlus className='nav-icon new-chat-icon' onClick={togglePopup} />
            </article>
            <article className='chats-list-container'>
                <ul className='chats-list'>
                    {[...chats, ...notifications.map(el => el.body?.senderData?.chatId)]
                        .filter(Boolean)
                        .filter(chatId => {
                            if (addedChats.has(chatId)) return false;
                            addedChats.add(chatId);
                            return true;
                        })
                        .map(chatId => (
                            <ChatItem
                                key={chatId}
                                chatName={chatId}
                                onClick={() => setActiveChat(chatId)}
                            />
                        ))}
                </ul>
            </article>
            {contactPopup && <CreateChatPopup onClick={togglePopup} />}
        </aside>
    );
};

export default ChatsSection;

