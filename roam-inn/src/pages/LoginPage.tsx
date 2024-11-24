import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const navigate = useNavigate();

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
                setStatusMessage(data.message || 'Login successful!');
                // Navigate to the dashboard after successful login
                navigate('/dashboard');
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
    <div className={styles.userLogin}>
      {/* Header Section */}
      <div className={styles.headerComponent1}>
        <img className={styles.logoIcon} alt="Logo" src="LOGO.png" />
        <h1 className={styles.roamin}>RoamIn</h1>
        <p className={styles.roamInRest}>Roam In, Rest Easy</p>
      </div>

      {/* Main Content Section */}
      <div className={styles.mainContent}>
        {/* Left Content: Images and Welcome */}
        <div className={styles.leftContent}>
          <img className={styles.image2Icon} alt="Room View 1" src="image1.png" />
          <h2 className={styles.welcome}>Welcome</h2>
          <img className={styles.image1Icon} alt="Room View 2" src="image2.png" />
        </div>

        {/* Right Content: User Login Form */}
        <div className={styles.groupParent}>
          <h2 className={styles.userLogin1}>{'User Login'}</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {statusMessage && <p style={{ color: 'green' }}>{statusMessage}</p>}
          <form onSubmit={handleSubmit}>
            <input
              id="email"
              className={styles.inputField}
              type="email"
              placeholder="Username / Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              id="password"
              className={styles.inputField}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className={styles.submitButton} type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
