import React, { useState, useEffect } from 'react';

const DashboardPage: React.FC = () => {
    const [cities, setCities] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [distance, setDistance] = useState('');

    useEffect(() => {
        // Fetch cities from backend
        fetch('/api/cities') // Replace with your actual endpoint
            .then((response) => response.json())
            .then((data) => setCities(data))
            .catch((error) => console.error('Error fetching cities:', error));
    }, []);

    const handleSubmit = () => {
        console.log('Selected City:', selectedCity);
        console.log('Distance:', distance);
        // Add logic to send data to the backend
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Roam Inn</h1>
            <div>
                <label>
                    Select City:
                    <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        style={{ margin: '10px', padding: '5px' }}
                    >
                        <option value="" disabled>
                            --Choose a City--
                        </option>
                        {cities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Distance (km):
                    <input
                        type="number"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        placeholder="Enter distance"
                        style={{ margin: '10px', padding: '5px' }}
                    />
                </label>
            </div>
            <button onClick={handleSubmit} style={{ padding: '10px 20px' }}>
                Submit
            </button>
        </div>
    );
};

export default DashboardPage;