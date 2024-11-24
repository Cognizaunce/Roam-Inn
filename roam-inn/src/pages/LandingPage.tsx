// src/pages/LandingPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/tailwind.css';


const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Roam-Inn</h1>
            <button onClick={() => navigate('/create-account')}>Create Account</button>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/admin-login')}>Admin Login</button>
        </div>
    );
};

export default LandingPage;
