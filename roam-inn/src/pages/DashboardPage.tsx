import React, { useState } from 'react';
import { searchHotels } from '../services/hotelService.ts'; // Import your service function

const DashboardPage: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState('YYZ'); // Pre-select 'YYZ'
    const [distance, setDistance] = useState<number>(1); // Default distance set to 1
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [hotelData, setHotelData] = useState<any>(null);

    // Validate inputs
    const validateInputs = () => {
        if (distance <= 1) {
            return 'Distance must be greater than 1.';
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setHotelData(null);

        const validationError = validateInputs();
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        setLoading(true);
        try {
            // Use the searchHotels service function
            const data = await searchHotels(selectedCity, distance);

            if (!data) {
                throw new Error('No hotels found or failed to fetch hotels.');
            }

            console.log('Search results:', data);  // Log the response data for now
            setHotelData(data);
            setErrorMessage('');
        } catch (error: any) {
            console.error('Error submitting data:', error);
            setErrorMessage('Unable to fetch hotels. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Roam Inn</h1>

            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Select City:
                        <select
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            style={{ margin: '10px', padding: '5px' }}
                        >
                            <option value="YYZ">YYZ</option>
                        </select>
                    </label>
                </div>

                <div style={{ margin: '10px' }}>
                    <label>
                        Distance (km):
                        <input
                            type="number"
                            value={distance}
                            onChange={(e) => setDistance(parseInt(e.target.value, 10))}
                            placeholder="Enter distance"
                            min="2"
                            style={{ marginLeft: '10px', padding: '5px' }}
                        />
                    </label>
                </div>

                <button type="submit" style={{ padding: '10px 20px' }}>
                    {loading ? 'Loading...' : 'Search'}
                </button>
            </form>

            {/* Render hotel data */}
            {hotelData && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Hotels:</h3>
                    <ul>
                        {hotelData?.data?.map((hotel: any, index: number) => (
                            <li key={index}>{hotel.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
