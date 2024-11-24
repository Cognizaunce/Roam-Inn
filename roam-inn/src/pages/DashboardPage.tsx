import React, { useState } from 'react';
import { searchHotels, processHotels } from '../services/hotelService.ts'; // Import both service functions
import Hotels from './Hotels.tsx';

export interface HotelsData {
    chainCode: string,
    iataCode: string,
    dupeId: number,
    name: string,
    hotelId: string,
    geoCode: {
        latitude: number,
        longitude: number
    },
    address: {
        countryCode: string
    },
    distance: {
        value: number,
        unit: string
    },
    lastUpdate: string | Date
}


const DashboardPage: React.FC = () => {
    const [selectedAirport, setSelectedAirport] = useState('LAX'); // Pre-select 'LAX'
    const [distance, setDistance] = useState<number>(2); // Default distance set to 2 km
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [hotelData, setHotelData] = useState<any>(null);
    const [hotels, setHotels] = useState<HotelsData[]>([]);

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
            const data = await searchHotels(selectedAirport, distance);
            if (!data) {
                throw new Error('No hotels found or failed to fetch hotels.');
            }
            const filterdHotels: HotelsData[] = data.data.filter((hotel) => hotel.iataCode === selectedAirport);
            setHotels(filterdHotels);


            if (!hotels || hotels.length === 0) {
                throw new Error('No valid hotels data found.');
            }

            // Use the processHotels function to process the extracted data
            // const processedHotels = await processHotels(hotels);
            // setHotelData(processedHotels); // Set the processed hotel data
            // setErrorMessage('');
        } catch (error: any) {
            console.error('Error submitting data:', error);
            setErrorMessage('Unable to fetch or process hotels. Please try again later.');
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
                        Select Airport:
                        <select
                            value={selectedAirport}
                            onChange={(e) => setSelectedAirport(e.target.value)}
                            style={{ margin: '10px', padding: '5px' }}
                        >
                            <option value="LAX">LAX</option>
                            <option value="YYZ">YYZ</option>
                            <option value="DXB">DXB</option>
                            <option value="ATL">ATL</option>
                            <option value="JFK">JFK</option>
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
            <Hotels hotels={hotels}/>
            {/* Render processed hotel data */}
            {hotelData && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Processed Hotels:</h3>
                    <ul>
                        {hotelData?.processed_hotels?.map((hotel: any, index: number) => (
                            <li key={index}>
                                {hotel.name} - {hotel.city}, {hotel.country}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
