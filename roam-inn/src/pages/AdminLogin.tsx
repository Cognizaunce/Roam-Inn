// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    const isAdminLogin = location.pathname === '/admin-login';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Logging in with:', { email, password, isAdminLogin });
        // Handle login logic here
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
