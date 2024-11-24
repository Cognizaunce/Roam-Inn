import React, { useState } from 'react';
import '../styling/tailwind.css';


const CreateAccount: React.FC = () => {
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
        const phoneRegex = /^\d{10,}$/; // At least 10 digits

        if (!emailRegex.test(formData.email)) {
            return "Please enter a valid email address.";
        }

        if (formData.password.length < 8) {
            return "Password must be at least 8 characters long.";
        }

        if (!phoneRegex.test(formData.phone_number)) {
            return "Phone number must be at least 10 digits.";
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
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Create Account</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={formData.phone_number}
                    onChange={handleChange}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default CreateAccount;
