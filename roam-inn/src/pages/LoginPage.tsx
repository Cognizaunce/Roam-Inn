// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    const isAdminLogin = location.pathname === '/admin-login';
    const [error, setError] = useState<string>(''); // Explicit type annotation
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Clear any previous error message
        console.log('Logging in with:', { email, password, isAdminLogin });

        try {
            const response = await fetch('/login', { // Replace '/login' with your API endpoint
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (response.ok && result.message === 'success') {
                // Navigate to the dashboard if login is successful
                navigate('/dashboard');
            } else {
                // Display error message from backend
                setError(result.message || 'Login failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
            console.error('Error during login:', err);
        }

        navigate('/dashboard');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>{isAdminLogin ? 'Admin Login' : 'User Login'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
