import React, { useState } from 'react';
import { searchHotels } from './services/hotelService.ts';

const App: React.FC = () => {
    const [city, setCity] = useState('');
    const [hotels, setHotels] = useState<any[]>([]);

    const handleSearch = async () => {
        const result = await searchHotels(city);
        setHotels(result.data || []); // Adjust based on API response structure
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
            <button onClick={handleSearch}>Search</button>
            <div>
                {hotels.map((hotel, index) => (
                    <div key={index}>{hotel.name}</div>
                ))}
            </div>
        </div>
    );
};

export default App;
