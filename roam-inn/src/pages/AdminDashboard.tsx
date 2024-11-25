import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Header from '../components/header.tsx';
import '../styling/tailwind.css';

const AdminDashboard: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if admin is logged in
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            navigate('/admin-login'); // Redirect to login if not logged in
        } else {
            // Fetch the list of users with bookings
            fetch('/api/bookings-per-user', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 'success') {
                        setUsers(data.data); // Assuming the API returns { status: "success", data: [...] }
                    } else {
                        setErrorMessage('Failed to load bookings data. Please try again.');
                    }
                })
                .catch((error) => {
                    setErrorMessage('Failed to load bookings data. Please try again.');
                    console.error('Error fetching bookings per user:', error);
                });
        }
    }, [navigate]);

    const handleDeleteUser = (userId: number) => {
        const authToken = localStorage.getItem('authToken');
        fetch(`/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then(() => {
                setUsers(users.filter((user) => user.user_id !== userId));
            })
            .catch((error) => {
                setErrorMessage('Error deleting user.');
                console.error('Error deleting user:', error);
            });
    };

    const handlePromoteUser = (userId: number) => {
        const authToken = localStorage.getItem('authToken');
        fetch(`/api/users/${userId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_type: 'admin' }),
        })
            .then(() => {
                setUsers(
                    users.map((user) =>
                        user.user_id === userId ? { ...user, user_type: 'admin' } : user
                    )
                );
            })
            .catch((error) => {
                setErrorMessage('Error promoting user.');
                console.error('Error promoting user:', error);
            });
    };

    const handleDemoteUser = (userId: number) => {
        const authToken = localStorage.getItem('authToken');
        fetch(`/api/users/${userId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_type: 'user' }),
        })
            .then(() => {
                setUsers(
                    users.map((user) =>
                        user.user_id === userId ? { ...user, user_type: 'user' } : user
                    )
                );
            })
            .catch((error) => {
                setErrorMessage('Error demoting user.');
                console.error('Error demoting user:', error);
            });
    };

    return (
        <div>
            <Header />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
                    {errorMessage && (
                        <p className="bg-red-100 text-red-800 p-3 rounded mb-4 text-center">
                            {errorMessage}
                        </p>
                    )}

                    <h2 className="text-2xl font-bold text-center mb-6 w-full">Admin Dashboard</h2>

                    <table className="min-w-full table-auto bg-white mb-8">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Bookings</th>
                                <th className="px-4 py-2 text-left">User Type</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.user_id} className="hover:bg-gray-100 border-t border-b">
                                    <td className="px-4 py-2">
                                        {user.first_name} {user.last_name}
                                    </td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2">{user.total_bookings}</td>
                                    <td className="px-4 py-2">{user.user_type}</td>
                                    <td className="px-4 py-2 flex space-x-2 justify-start">
                                        {user.user_type !== 'admin' && (
                                            <button
                                                onClick={() => handlePromoteUser(user.user_id)}
                                                className="text-green-500 hover:text-green-700"
                                            >
                                                Promote to Admin
                                            </button>
                                        )}
                                        {user.user_type === 'admin' && (
                                            <button
                                                onClick={() => handleDemoteUser(user.user_id)}
                                                className="text-yellow-500 hover:text-yellow-700"
                                            >
                                                Demote to User
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDeleteUser(user.user_id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="w-full h-64">
                        <h3 className="text-lg font-semibold mb-4">Bookings Overview</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={users}>
                                <XAxis dataKey="first_name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="total_bookings" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
