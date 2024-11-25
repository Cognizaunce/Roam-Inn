// src/components/Header.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();

    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('authToken') !== null; // You can replace 'authToken' with your actual token key

    const handleLogout = () => {
        // Remove the token (or session data)
        localStorage.removeItem('authToken');
        // Redirect to the home page
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
            <h1 className="text-xl font-bold">RoamInn</h1>
            <button
                className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded"
                onClick={isLoggedIn ? handleLogout : handleLogin}
            >
                {isLoggedIn ? 'Log Out' : 'Log In'}
            </button>
        </header>
    );
};

export default Header;
