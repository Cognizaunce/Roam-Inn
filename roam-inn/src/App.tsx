import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.tsx';
import CreateAccount from './pages/CreateAccount.tsx';
import LoginPage from './pages/LoginPage.tsx';
import AdminLogin from './pages/AdminLogin.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import CheckoutPage from './pages/CheckoutPage.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import HotelView from './pages/HotelView.tsx';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/checkout-page" element={<CheckoutPage />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/hotel-view" element={<HotelView />} />
            </Routes>
        </Router>
    );
};

export default App;

// import React, { useState } from 'react';
// import { populateHotels, getHotels } from './services/hotelService.ts';

// const App: React.FC = () => {
//     const [city, setCity] = useState('');
//     const [hotels, setHotels] = useState<any[]>([]);

//     const handlePopulate = async () => {
//         await populateHotels(city); // First populate the database
//         const hotelsData = await getHotels(city); // Then fetch the hotels from DB
//         setHotels(hotelsData || []);
//     };

//     return (
//         <div>
//             <h1>Hotel Search</h1>
//             <input
//                 type="text"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 placeholder="Enter city name"
//             />
//             <button onClick={handlePopulate}>Populate and Fetch Hotels</button>
//             <div>
//                 {hotels.map((hotel, index) => (
//                     <div key={index}>{hotel.name}</div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default App;
