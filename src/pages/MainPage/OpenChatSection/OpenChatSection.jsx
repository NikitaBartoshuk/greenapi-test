import './openchatsection.css';
import React, { useState, useContext } from 'react';
import chatPhoto from '../../../assets/chat-photo.jpg';
import { CiSearch } from "react-icons/ci";
import { AppContext } from '../MainPage';
import axios from "axios";

const OpenChatSection = ({ activeChat }) => {
    const [input, setInput] = useState('');
    const [sentMessages, setSentMessages] = useState([]); // Храним отправленные сообщения
    const { notifications } = useContext(AppContext); // Берем уведомления из контекста

    // Фильтруем полученные сообщения по activeChat
    const receivedMessages = notifications
        .filter(el => el.body?.senderData?.chatId === activeChat)
        .map(el => ({
            id: el.body.idMessage,
            text: el.body?.messageData?.textMessageData?.textMessage,
            fromMe: false, // Полученные сообщения
            timestamp: el.body.timestamp ? new Date(el.body.timestamp * 1000).getTime() : Date.now(), // Конвертируем серверный timestamp
        }))
        .filter(el => el.text); // Убираем пустые сообщения

    // Фильтруем отправленные сообщения по activeChat
    const filteredSentMessages = sentMessages.filter(msg => msg.chatId === activeChat);

    // Объединяем все сообщения и сортируем их по времени
    const messages = [...receivedMessages, ...filteredSentMessages].sort((a, b) => a.timestamp - b.timestamp);

    const handleInput = (event) => {
        setInput(event.target.value);
    };

    const sendMessage = async () => {
        if (!activeChat || !input.trim()) return;

        const newMessage = {
            id: Date.now(), // Временный ID
            text: input,
            fromMe: true, // Исходящее сообщение
            timestamp: Date.now(), // Локальное время отправки
            chatId: activeChat,
        };

        // Добавляем сообщение в состояние сразу
        setSentMessages(prev => [...prev, newMessage]);

        try {
            await axios.post(
                'https://7105.api.greenapi.com/waInstance7105182198/sendMessage/a6a61c43c7e7444badc0641f69ffe2e13085e00605cd47bdbf',
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
