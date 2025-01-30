import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [idInstance, setIdInstance] = useState('');
    const [apiTokenInstance, setApiTokenInstance] = useState('');

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

export const useAuth = () => useContext(AuthContext);

