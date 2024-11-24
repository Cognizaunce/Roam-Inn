import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/header.tsx'; // Import the Header component
import '../styling/tailwind.css';

const AdminLoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const isAdminLogin = location.pathname === '/admin-login';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setStatusMessage('');

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                // Store the token in localStorage
                localStorage.setItem('authToken', data.token); // Store authentication token
                setStatusMessage(data.message || 'Admin Login successful!');
                // Redirect to the admin dashboard after successful login
                navigate('/admin-dashboard');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.detail || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div>
            <Header /> {/* Include the Header component */}

            {/* Main content container */}
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
                    {/* Title based on user type */}
                    <h2 className="text-2xl font-bold text-center mb-6">
                        {isAdminLogin ? 'Admin Login' : 'User Login'}
                    </h2>

                    {/* Error and status messages */}
                    {errorMessage && (
                        <p className="bg-red-100 text-red-800 p-3 rounded mb-4 text-center">{errorMessage}</p>
                    )}
                    {statusMessage && (
                        <p className="bg-green-100 text-green-800 p-3 rounded mb-4 text-center">{statusMessage}</p>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email input */}
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Password input */}
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
