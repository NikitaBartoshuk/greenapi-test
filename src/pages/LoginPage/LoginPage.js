import './loginpage.css';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Для навигации
import { AuthContext } from '../../authContext/AuthContext'; // Импортируйте контекст для сохранения данных

const LoginPage = () => {
    const [idInstance, setIdInstance] = useState('');
    const [apiTokenInstance, setApiTokenInstance] = useState('');
    const { setAuthData } = useContext(AuthContext); // Используйте контекст для сохранения данных
    const navigate = useNavigate(); // Для навигации на другую страницу

    const handleSubmit = (event) => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы

        // Проверяем, что введены оба значения
        if (idInstance && apiTokenInstance) {
            setAuthData(idInstance, apiTokenInstance); // Сохраняем данные в контексте
            navigate('/home'); // Переходим на страницу Home
        } else {
            alert('Please fill in both fields');
        }
    };

    return (
        <form className="login-form-container" onSubmit={handleSubmit}>
            <h1>Enter your credentials</h1>
            <input
                type="text"
                placeholder="Введите IdInstance"
                value={idInstance}
                onChange={(e) => setIdInstance(e.target.value)} // Обновляем состояние
            />
            <input
                type="text"
                placeholder="Введите apiTokenInstance"
                value={apiTokenInstance}
                onChange={(e) => setApiTokenInstance(e.target.value)} // Обновляем состояние
            />
            <button type="submit">Войти</button>
        </form>
    );
};

export default LoginPage;

