import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchHotels, processHotels } from '../services/hotelService.ts';
import Header from '../components/header.tsx';

const DashboardPage: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState('LAX'); // Default city
    const [distance, setDistance] = useState<number>(2); // Default distance
    const [adults, setAdults] = useState<number>(1); // Default adults
    const [rooms, setRooms] = useState<number>(1); // Default rooms
    const [checkInDate, setCheckInDate] = useState<string>('');
    const [checkOutDate, setCheckOutDate] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Validate inputs
    const validateInputs = () => {
        if (distance <= 1) {
            return 'Distance must be greater than 1.';
        }
        if (!checkInDate || !checkOutDate) {
            return 'Please select both check-in and check-out dates.';
        }
        if (new Date(checkInDate) >= new Date(checkOutDate)) {
            return 'Check-out date must be after check-in date.';
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        
        const validationError = validateInputs();
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        setLoading(true);
        try {
            // Fetch and process hotel data
            const data = await searchHotels(selectedCity, distance);
            const hotels = data?.data?.map((hotel: any) => ({
                hotelID: hotel.hotelId,
                hotelName: hotel.name,
                geoCode: {
                    latitude: hotel.geoCode.latitude,
                    longitude: hotel.geoCode.longitude,
                },
            }));

            if (!hotels || hotels.length === 0) {
                throw new Error('No valid hotels data found.');
            }

            const processedHotels = await processHotels(hotels);

            // Navigate to hotel view with all necessary data
            navigate('/hotel-view', { state: { hotels:processedHotels, check_in: checkInDate, check_out: checkOutDate, rooms: rooms, adults: adults } });

        } catch (error) {
            console.error('Error fetching hotels:', error);
            setErrorMessage('Unable to fetch hotels. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-400">
            <Header />

            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
                    {errorMessage && (
                        <div className="bg-red-100 text-red-800 p-3 rounded mb-4 text-center">
                            {errorMessage}
                        </div>
                    )}

                    <h2 className="text-2xl font-bold text-center mb-6">Find Your Hotel</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-left font-semibold">Select City:</label>
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
                            <label className="block text-left font-semibold">Distance (km):</label>
                            <input
                                type="number"
                                value={distance}
                                onChange={(e) => setDistance(parseInt(e.target.value, 10))}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                min="2"
                            />
                        </div>

                        <div>
                            <label className="block text-left font-semibold">Number of Adults:</label>
                            <input
                                type="number"
                                value={adults}
                                onChange={(e) => setAdults(parseInt(e.target.value, 10))}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                min="1"
                            />
                        </div>

                        <div>
                            <label className="block text-left font-semibold">Number of Rooms:</label>
                            <input
                                type="number"
                                value={rooms}
                                onChange={(e) => setRooms(parseInt(e.target.value, 10))}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                min="1"
                            />
                        </div>

                        <div>
                            <label className="block text-left font-semibold">Check-In Date:</label>
                            <input
                                type="date"
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-left font-semibold">Check-Out Date:</label>
                            <input
                                type="date"
                                value={checkOutDate}
                                onChange={(e) => setCheckOutDate(e.target.value)}
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
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
