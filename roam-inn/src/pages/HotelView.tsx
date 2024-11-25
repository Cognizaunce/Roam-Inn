import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { hotelInfo, hotelReviews } from '../services/hotelService.ts';
import Header from '../components/header.tsx'; // Import your Header component

const HotelView: React.FC = () => {
    const location = useLocation();
    const { hotels, check_in, check_out, rooms, adults } = location.state || {};
    const [filteredHotels, setFilteredHotels] = useState(hotels || []); // Filtered list of hotels
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [selectedHotel, setSelectedHotel] = useState<any | null>(null);

    // Handle filtering based on search query
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const filtered = hotels.filter((hotel: any) =>
            hotel.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredHotels(filtered);
    };

    const handleHotelClick = async (hotelName: string) => {
        try {
            const selectedHotelData = hotels.find((hotel: any) => hotel.name === hotelName);
            if (selectedHotelData) {
                const hotelID = selectedHotelData.hotel_id;
                const hotelDetails = await hotelInfo(hotelID, adults, check_in, check_out, rooms);
                const reviews = await hotelReviews(hotelID);

                setSelectedHotel({
                    details: hotelDetails.data[0], // Using the first hotel offer
                    reviews: reviews,
                });
            } else {
                console.error('Hotel not found');
            }
        } catch (error) {
            console.error("Error fetching hotel details:", error);
        }
    };

    const navigate = useNavigate();
    const handleCheckout = () => {
        navigate('/checkout-page');
    };

    const handleDownloadJson = () => {
        if (selectedHotel) {
            const dataStr = JSON.stringify(selectedHotel, null, 2); // Convert to JSON with pretty-print
            const blob = new Blob([dataStr], { type: "application/json" });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `${selectedHotel.details?.hotel?.name || 'hotel-details'}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            URL.revokeObjectURL(url);
        } else {
            alert("Please select a hotel first.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <Header />

            {/* Filter Section */}
            <div className="p-4 bg-gray-100 shadow">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search hotels by name..."
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>

            {/* Main Content */}
            <div className="flex flex-grow p-8 bg-gradient-to-r from-blue-600 to-blue-400">
                {/* Hotel List Section */}
                <div className="w-1/3 p-4 overflow-y-scroll max-h-screen no-scrollbar">
                    <h2 className="text-2xl font-bold mb-4">Hotel List</h2>
                    <div>
                        {filteredHotels.length > 0 ? (
                            filteredHotels.map((hotel: any, index: number) => (
                                <div
                                    key={hotel.hotelID}
                                    className="p-4 border border-gray-200 rounded-md mb-4 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleHotelClick(hotel.name)}
                                >
                                    <h3 className="font-semibold">{hotel.name}</h3>
                                    <p>{hotel.address}</p>
                                </div>
                            ))
                        ) : (
                            <p>No hotels found</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        onClick={handleCheckout}
                        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200"
                    >
                        Checkout
                    </button>
                </div>

                {/* Hotel Details Section */}
                <div className="w-2/3 p-4 bg-white rounded-lg shadow-md overflow-y-scroll max-h-screen">
                    <h2 className="text-3xl font-bold mb-4">Hotel Details</h2>
                    <button
                        onClick={handleDownloadJson}
                        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200 mb-4"
                    >
                        Download Hotel Data
                    </button>
                    {selectedHotel ? (
                        <>
                            <div>
                                <h3 className="text-xl font-semibold">{selectedHotel.details?.hotel?.name}</h3>
                                <p>
                                    <strong>Location:</strong> {selectedHotel.details?.hotel?.cityCode}
                                </p>
                                <p>
                                    <strong>Coordinates:</strong> Latitude: {selectedHotel.details?.hotel?.latitude}, Longitude:{" "}
                                    {selectedHotel.details?.hotel?.longitude}
                                </p>
                            </div>
                        </>
                    ) : (
                        <p>Select a hotel to see details</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HotelView;
