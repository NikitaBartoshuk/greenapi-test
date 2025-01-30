import './openchatsection.css';
import React, { useState, useContext } from 'react';
import chatPhoto from '../../../assets/chat-photo.jpg';
import { CiSearch } from "react-icons/ci";
import { AppContext } from '../MainPage';
import { AuthContext} from "../../../authContext/AuthContext";
import axios from "axios";

const OpenChatSection = ({ activeChat }) => {
    const [input, setInput] = useState('');
    const [sentMessages, setSentMessages] = useState([]);
    const { notifications } = useContext(AppContext);
    const {idInstance, apiTokenInstance} = useContext(AuthContext)
    const receivedMessages = notifications
        .filter(el => el.body?.senderData?.chatId === activeChat)
        .map(el => ({
            id: el.body.idMessage,
            text: el.body?.messageData?.textMessageData?.textMessage,
            fromMe: false,
            timestamp: el.body.timestamp ? new Date(el.body.timestamp * 1000).getTime() : Date.now(),
        }))
        .filter(el => el.text);

    const filteredSentMessages = sentMessages.filter(msg => msg.chatId === activeChat);

    const messages = [...receivedMessages, ...filteredSentMessages].sort((a, b) => a.timestamp - b.timestamp);

    const handleInput = (event) => {
        setInput(event.target.value);
    };

    const sendMessage = async () => {
        if (!activeChat || !input.trim()) return;

        const newMessage = {
            id: Date.now(),
            text: input,
            fromMe: true,
            timestamp: Date.now(),
            chatId: activeChat,
        };

        setSentMessages(prev => [...prev, newMessage]);

        try {
            await axios.post(
                `https://7105.api.greenapi.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
                { message: input, chatId: activeChat }
            );
        } catch (error) {
            console.error("Ошибка при отправке сообщения:", error);
        }

        setInput('');
    };

    return (
        <main className='open-chat-section-container'>
            {activeChat ? (
                <>
                    <section className='open-chat-header-container'>
                        <img src={chatPhoto} alt="no photo" className='chat' />
                        <p>{activeChat}</p>
                    </section>
                    <section className='open-chat-main-container'>
                        <ul className='messages-list'>
                            {messages.map((msg) => (
                                <li key={msg.id} className={`message-item ${msg.fromMe ? "outgoing" : "incoming"}`}>
                                    {msg.text}
                                </li>
                            ))}
                        </ul>

                    </section>
                    <section className='open-chat-input-container'>
                        <input type="text" placeholder='Type a message' value={input} onChange={handleInput} />
                        <CiSearch className='nav-icon' onClick={sendMessage} />
                    </section>
                </>
            ) : (
                <p className='choose-chat'>Choose chat</p>
            )}
        </main>
    );
};

export default OpenChatSection;

