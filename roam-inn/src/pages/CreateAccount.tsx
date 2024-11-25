import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add navigation for redirect
import '../styling/tailwind.css';
import Header from '../components/header.tsx'; // Import the Header component


const CreateAccount: React.FC = () => {
    const navigate = useNavigate(); // Use navigate for redirection
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        user_type: 'user',
        phone_number: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateInputs = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10,}$/;

        if (!emailRegex.test(formData.email)) {
            return 'Please enter a valid email address.';
        }

        if (formData.password.length < 8) {
            return 'Password must be at least 8 characters long.';
        }

        if (!phoneRegex.test(formData.phone_number)) {
            return 'Phone number must be at least 10 digits.';
        }

        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        const validationError = validateInputs();
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        try {
            const response = await fetch(`/create-account`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage(data.message || 'Account created successfully!');
                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    user_type: 'user',
                    phone_number: '',
                });

                // Redirect to login page on success
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.detail || 'Failed to create account.');
            }
        } catch (error) {
            console.error('Error creating account:', error);
            setErrorMessage('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div>
            <Header/>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Create Your Account</h2>

                {errorMessage && (
                    <p className="bg-red-100 text-red-800 p-3 rounded mb-4 text-center">{errorMessage}</p>
                )}
                {successMessage && (
                    <p className="bg-green-100 text-green-800 p-3 rounded mb-4 text-center">{successMessage}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <input
                        type="text"
                        name="phone_number"
                        placeholder="Phone Number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
        </div>

    );
};

export default CreateAccount;
