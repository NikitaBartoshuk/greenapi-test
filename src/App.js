import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './authContext/AuthContext';
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";


const ProtectedRoute = ({ children }) => {
    const { idInstance, apiTokenInstance } = React.useContext(AuthContext);
    return idInstance && apiTokenInstance ? children : <Navigate to="/" />;
};

const App = () => {
    return (
        <AuthProvider>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/home" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
                </Routes>
        </AuthProvider>
    );
};

export default App;