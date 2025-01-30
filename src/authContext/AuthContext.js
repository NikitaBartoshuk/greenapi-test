// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Создаем контекст
export const AuthContext = createContext();

// Провайдер контекста
export const AuthProvider = ({ children }) => {
    const [idInstance, setIdInstance] = useState('');
    const [apiTokenInstance, setApiTokenInstance] = useState('');

    // Функция для сохранения данных
    const setAuthData = (id, token) => {
        setIdInstance(id);
        setApiTokenInstance(token);
    };

    return (
        <AuthContext.Provider value={{ idInstance, apiTokenInstance, setAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};

// Хук для использования контекста
export const useAuth = () => useContext(AuthContext);

