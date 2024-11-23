import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const isAdminLogin = location.pathname === '/admin-login';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password, isAdminLogin });
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
          <h2 className={styles.userLogin1}>{isAdminLogin ? 'Admin Login' : 'User Login'}</h2>
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
