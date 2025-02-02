import './loginpage.css';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthContext';

const LoginPage = () => {
    const [idInstance, setIdInstance] = useState('');
    const [apiTokenInstance, setApiTokenInstance] = useState('');
    const { setAuthData, idInstance: storedIdInstance, apiTokenInstance: storedApiTokenInstance } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (storedIdInstance && storedApiTokenInstance) {
            const contextData = JSON.stringify({
                idInstance: storedIdInstance,
                apiTokenInstance: storedApiTokenInstance
            });
            console.log('Data from AuthContext:', contextData);
        }
    }, [storedIdInstance, storedApiTokenInstance]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!idInstance || !apiTokenInstance) {
            console.error('idInstance or apiTokenInstance are unset');
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
                placeholder="Enter IdInstance"
                value={idInstance}
                onChange={(e) => setIdInstance(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter apiTokenInstance"
                value={apiTokenInstance}
                onChange={(e) => setApiTokenInstance(e.target.value)}
            />
            <button type="submit">Enter</button>
        </form>
    );
};

export default LoginPage;
