import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchHotels, processHotels } from '../services/hotelService.ts'; // Import both service functions
import Header from '../components/header.tsx'; // Include the Header component

const DashboardPage: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState('LAX'); // Pre-select 'LAX'
    const [distance, setDistance] = useState<number>(2); // Default distance set to 2 km
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [hotelData, setHotelData] = useState<any>(null);
    const navigate = useNavigate(); // Using useNavigate hook for navigation

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
            // Fetch hotels data from the first API
            const data = await searchHotels(selectedCity, distance);

            if (!data) {
                throw new Error('No hotels found or failed to fetch hotels.');
            }

            // Parse the hotels data to extract hotelId and geoCode
            const hotels = data?.data?.map((hotel: any) => ({
                hotelID: hotel.hotelId,
                hotelName: hotel.name,
                geoCode: {
                    latitude: hotel.geoCode.latitude,
                    longitude: hotel.geoCode.longitude,
                },
            }));

            console.log(hotels)

            if (!hotels || hotels.length === 0) {
                throw new Error('No valid hotels data found.');
            }

            // Use the processHotels function to process the extracted data
            const processedHotels = await processHotels(hotels);
            setHotelData(processedHotels); // Set the processed hotel data
            setErrorMessage('');

            // Redirect to the HotelView page and pass hotel data as state
            navigate('/hotel-View', { state: { hotels: processedHotels } });

        } catch (error: any) {
            console.error('Error submitting data:', error);
            setErrorMessage('Unable to fetch or process hotels. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-400">
            <Header /> {/* Include the Header component */}

            {/* Main content container */}
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">

                    {/* Error message */}
                    {errorMessage && (
                        <div className="bg-red-100 text-red-800 p-3 rounded mb-4 text-center">
                            {errorMessage}
                        </div>
                    )}

                    <h2 className="text-2xl font-bold text-center mb-6">Find Your Hotel</h2>

                    {/* Search Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-left font-semibold">
                                Select City:
                            </label>
                            <select
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="LAX">Los Angeles</option>
                                <option value="YYZ">Toronto</option>
                                <option value="ATL">Atlanta</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-left font-semibold">
                                Distance (km):
                            </label>
                            <input
                                type="number"
                                value={distance}
                                onChange={(e) => setDistance(parseInt(e.target.value, 10))}
                                placeholder="Enter distance"
                                min="2"
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                        >
                            {loading ? 'Loading...' : 'Search'}
                        </button>
                    </form>

                    {/* Render processed hotel data */}
                    {hotelData && (
                        <div className="mt-6">
                            <h3 className="text-xl font-bold text-center">Processed Hotels:</h3>
                            <ul className="space-y-2 mt-4">
                                {hotelData?.processed_hotels?.map((hotel: any, index: number) => (
                                    <li key={index} className="p-4 border border-gray-200 rounded-md">
                                        <span className="font-semibold">{hotel.name}</span> - {hotel.city}, {hotel.country}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
