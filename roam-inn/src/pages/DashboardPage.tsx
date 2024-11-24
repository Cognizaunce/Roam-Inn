import React, { useState, useEffect } from 'react';

const DashboardPage: React.FC = () => {
    const [cities, setCities] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [distance, setDistance] = useState<number>(4); // Initialize distance as a number
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCities = async () => {
            setLoading(true); // Set loading to true when starting the request
            try {
                const city = "YYZ"; // Hardcoded city 'YYZ'
                const distance = 4;   // Hardcoded distance '4'

                const url = new URL('http://127.0.0.1:8000/api/search-hotels');
                url.searchParams.append('city', city);
                url.searchParams.append('distance', distance.toString()); // Convert distance to string

                const response = await fetch(url.toString());
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                
                console.log("Fetched data:", data);  // Log the fetched data to see its structure
                
                // Assuming cities are inside the 'cities' property of the object
                if (data && Array.isArray(data.cities)) {
                    setCities(data.cities); // Set the cities array
                } else {
                    throw new Error("Cities data not found in response.");
                }

                setError(null); // Clear any previous errors
            } catch (error: any) {
                console.error("Error fetching cities:", error);
                setError('Unable to load cities. Please try again later.');
            } finally {
                setLoading(false); // Set loading to false after the request is complete
            }
        };

        fetchCities();
    }, []); // Empty dependency array means this runs once when the component is mounted

    const handleSubmit = async () => {
        if (!selectedCity || !distance) {
            setError('Please select a city and enter a distance.');
            return;
        }

        setLoading(true);
        try {
            // Construct the API URL with the selected city and distance
            const url = new URL('http://127.0.0.1:8000/api/search-hotels');
            url.searchParams.append('city', selectedCity);
            url.searchParams.append('distance', distance.toString()); // Convert distance to string

            const response = await fetch(url.toString());

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Search results:', data);  // Log the response data for now

            // Process the data as needed (e.g., display hotels)

            setError(null); // Clear any previous errors
        } catch (error: any) {
            console.error('Error submitting data:', error);
            setError('Unable to fetch hotels. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Roam Inn</h1>

            {error && <div style={{ color: 'red' }}>{error}</div>}

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
                        {Array.isArray(cities) && cities.length > 0 ? (
                            cities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))
                        ) : (
                            <option>No cities available</option>
                        )}
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
                        style={{ marginLeft: '10px', padding: '5px' }}
                    />
                </label>
            </div>

            <button onClick={handleSubmit} style={{ padding: '10px 20px' }}>
                {loading ? 'Loading...' : 'Submit'}
            </button>
        </div>
    );
};

export default DashboardPage;