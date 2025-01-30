import './loginpage.css';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthContext';

const LoginPage = () => {
    const [idInstance, setIdInstance] = useState('');
    const [apiTokenInstance, setApiTokenInstance] = useState('');
    const { setAuthData, idInstance: storedIdInstance, apiTokenInstance: storedApiTokenInstance } = useContext(AuthContext); // Используем AuthContext для сохранения и получения данных
    const navigate = useNavigate();

    useEffect(() => {
        if (storedIdInstance && storedApiTokenInstance) {
            const contextData = JSON.stringify({
                idInstance: storedIdInstance,
                apiTokenInstance: storedApiTokenInstance
            });
            console.log('Данные из AuthContext:', contextData);
        }
    }, [storedIdInstance, storedApiTokenInstance]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!idInstance || !apiTokenInstance) {
            console.error('idInstance или apiTokenInstance не установлены');
            alert('Please fill in both fields');
            return;
        }

        setAuthData(idInstance, apiTokenInstance);

        navigate('/home');
    };

    return (
        <form className="login-form-container" onSubmit={handleSubmit}>
            <h1>Enter your credentials</h1>
            <input
                type="text"
                placeholder="Введите IdInstance"
                value={idInstance}
                onChange={(e) => setIdInstance(e.target.value)}
            />
            <input
                type="text"
                placeholder="Введите apiTokenInstance"
                value={apiTokenInstance}
                onChange={(e) => setApiTokenInstance(e.target.value)}
            />
            <button type="submit">Enter</button>
        </form>
    );
};

export default LoginPage;
