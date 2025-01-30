import './mainpage.css'
import React, {createContext, useState, useEffect} from 'react';
import NavSection from "./NavSection/NavSection";
import ChatsSection from "./ChatsSection/ChatsSection";
import OpenChatSection from "./OpenChatSection/OpenChatSection";
import axios from 'axios';
import CreateChatPopup from "../../common/CreateChatPopup/CreateChatPopup";

// Создаем контекст для уведомлений
export const AppContext = createContext();

const MainPage = () => {
    const [notifications, setNotifications] = useState([]); // Храним уведомления
    const [activeChat, setActiveChat] = useState(null);
    const [chats, setChats] = useState(new Set()); // Уникальные чаты

    const addChat = (chatId) => {
        setChats(prev => new Set(prev.add(chatId))); // Добавляем новый чат
        setActiveChat(chatId); // Сразу открываем его
    };

    // Функция для получения всех уведомлений без задержек
    const fetchAndDeleteNotifications = async () => {
        try {
            while (true) { // Запускаем бесконечный цикл
                const response = await axios.get(
                    'https://7105.api.greenapi.com/waInstance7105182198/receiveNotification/a6a61c43c7e7444badc0641f69ffe2e13085e00605cd47bdbf?receiveTimeout=5',
                    {
                        headers: {
                            'Cache-Control': 'no-cache',
                            'Accept': 'application/json',
                        },
                        timeout: 10000,
                    }
                );

                const notification = response.data;
                if (!notification) break; // Если нет уведомлений, выходим из цикла

                setNotifications((prev) => [...prev, notification]); // Записываем в контекст
                console.log('Получено уведомление:', notification);

                // Удаляем уведомление с сервера
                await deleteNotification(notification.receiptId);
            }
        } catch (error) {
            console.error('Ошибка при получении уведомлений:', error);
        }
    };

    // Функция для удаления уведомления по receiptId
    const deleteNotification = async (receiptId) => {
        try {
            await axios.delete(
                `https://7105.api.greenapi.com/waInstance7105182198/deleteNotification/a6a61c43c7e7444badc0641f69ffe2e13085e00605cd47bdbf/${receiptId}`
            );
            console.log(`Удалено уведомление с ID: ${receiptId}`);
        } catch (error) {
            console.error(`Ошибка при удалении уведомления ${receiptId}:`, error);
        }
    };

    useEffect(() => {
        fetchAndDeleteNotifications(); // Получаем все уведомления при рендере

        const intervalId = setInterval(() => {
            fetchAndDeleteNotifications(); // Проверяем новые уведомления каждые 8 секунд
        }, 8000);

        return () => clearInterval(intervalId); // Очищаем интервал при размонтировании
    }, []);

    return (
        <AppContext.Provider value={{ notifications, setNotifications, activeChat, setActiveChat, chats, addChat }}>
            <div className='main-page-container'>
                <NavSection />
                <ChatsSection />
                <OpenChatSection activeChat={activeChat} />
            </div>
        </AppContext.Provider>
    );
};

export default MainPage;