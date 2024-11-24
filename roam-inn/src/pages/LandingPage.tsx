import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/tailwind.css';
import Header from '../components/header.tsx'; // Import the Header component


const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header/>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white">
            {/* Header Section */}
            <h1 className="text-4xl font-bold mb-6">Welcome to Roam-Inn</h1>

            {/* Buttons Section */}
            <div className="flex space-x-8"> {/* Added horizontal spacing */}
                <button
                    onClick={() => navigate('/create-account')}
                    className="px-6 py-3 bg-white text-blue-600 rounded-lg shadow-lg hover:bg-blue-100 transition duration-200 ease-in-out"
                >
                    Create Account
                </button>
                <button
                    onClick={() => navigate('/login')}
                    className="px-6 py-3 bg-white text-blue-600 rounded-lg shadow-lg hover:bg-blue-100 transition duration-200 ease-in-out"
                >
                    Login
                </button>
                <button
                    onClick={() => navigate('/admin-login')}
                    className="px-6 py-3 bg-white text-blue-600 rounded-lg shadow-lg hover:bg-blue-100 transition duration-200 ease-in-out"
                >
                    Admin Login
                </button>
            </div>
        </div>
        </div>

    );
};

export default LandingPage;
