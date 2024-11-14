// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './LoginPage.module.css';
import '../styling/global.css';
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
        <div className={styles.userLogin}>
            <div className={styles.userLoginChild} />
            <div className={styles.userLoginInner}>
                <div className={styles.passwordiidefaultWrapper}>
                    <div className={styles.passwordiidefaultWrapper} />
                </div>
            </div>
            <div className={styles.groupParent}>
                <div className={styles.vectorParent}>
                    <img className={styles.groupChild} alt="" src="Rectangle 4.png" />
                    <div className={styles.userLogin1}>{isAdminLogin ? 'Admin Login' : 'User Login'}</div>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.usernameemailiidefault}>
                            <div className={styles.usernameemail}>Username/Email</div>
                            <div className={styles.innerFrame}>
                                <input
                                    className={styles.inputField}
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className={styles.password}>Password</div>
                        <div className={styles.innerFrame1}>
                            <input
                                className={styles.inputField}
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.rectangleParent}>
                            <div className={styles.groupItem} />
                            <button className={styles.submitButton} type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className={styles.headerComponent1}>
                <div className={styles.roamin}>RoamIn</div>
                <div className={styles.roamInRest}>Roam In, Rest Easy</div>
                <img className={styles.logoIcon} alt="" src="LOGO.png" />
            </div>
            <div className={styles.welcomeDiv2}>
                <div className={styles.hi}>
                    <img className={styles.image1Icon} alt="" src="image1.png" />
                    <div className={styles.welcome}>{`Welcome `}</div>
                    <img className={styles.image2Icon} alt="" src="image2.png" />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
