import React, { useState } from 'react';
import { populateHotels, getHotels } from './services/hotelService.ts';

const App: React.FC = () => {
    const [city, setCity] = useState('');
    const [hotels, setHotels] = useState<any[]>([]);

    const handlePopulate = async () => {
        await populateHotels(city); // First populate the database
        const hotelsData = await getHotels(city); // Then fetch the hotels from DB
        setHotels(hotelsData || []);
    };

    return (
        <div>
            <h1>Hotel Search</h1>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
            />
            <button onClick={handlePopulate}>Populate and Fetch Hotels</button>
            <div>
                {hotels.map((hotel, index) => (
                    <div key={index}>{hotel.name}</div>
                ))}
            </div>
        </div>
    );
};

export default App;
