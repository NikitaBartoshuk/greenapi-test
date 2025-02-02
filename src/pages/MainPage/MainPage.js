import './mainpage.css'
import React, {createContext, useState, useEffect, useContext} from 'react';
import NavSection from "./NavSection/NavSection";
import ChatsSection from "./ChatsSection/ChatsSection";
import OpenChatSection from "./OpenChatSection/OpenChatSection";
import axios from 'axios';
import {AuthContext} from "../../authContext/AuthContext";


export const AppContext = createContext();

const MainPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [chats, setChats] = useState(new Set());
    const {idInstance, apiTokenInstance} = useContext(AuthContext)

    const addChat = (chatId) => {
        setChats(prev => new Set(prev.add(chatId)));
        setActiveChat(chatId);
    };

    const fetchAndDeleteNotifications = async () => {
        try {
            while (true) {
                const response = await axios.get(
                    `https://7105.api.greenapi.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=5`,
                    {
                        headers: {
                            'Cache-Control': 'no-cache',
                            'Accept': 'application/json',
                        },
                        timeout: 10000,
                    }
                );

                const notification = response.data;
                if (!notification) break;

                setNotifications((prev) => [...prev, notification]);
                console.log('Notification receaved:', notification);

                await deleteNotification(notification.receiptId);
            }
        } catch (error) {
            console.error('Error while receaving notification:', error);
        }
    };

    const deleteNotification = async (receiptId) => {
        try {
            await axios.delete(
                `https://7105.api.greenapi.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`
            );
            console.log(`Notification with ID deleted: ${receiptId}`);
        } catch (error) {
            console.error(`Error while deleting notification ${receiptId}:`, error);
        }
    };

    useEffect(() => {
        fetchAndDeleteNotifications();

        const intervalId = setInterval(() => {
            fetchAndDeleteNotifications();
        }, 8000);

        return () => clearInterval(intervalId);
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