import React from 'react';
import { useLocation } from 'react-router-dom';

const HotelView: React.FC = () => {
    const location = useLocation(); // Get location object
    const { hotels } = location.state || {}; // Access passed data
    console.log(hotels)
    return (
        <div className="flex p-8 bg-gradient-to-r from-blue-600 to-blue-400">
            {/* Hotel List Section */}
            <div className="w-1/3 p-4 overflow-y-scroll max-h-screen no-scrollbar">
                <h2 className="text-2xl font-bold mb-4">Hotel List</h2>
                <div>
                    {hotels?.map((hotel: any, index: number) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-md mb-4">
                            <h3 className="font-semibold">{hotel.name}</h3>
                            <p>{hotel.address}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hotel Details Section */}
            <div className="w-2/3 p-4 bg-white rounded-lg shadow-md overflow-y-scroll max-h-screen">
                <h2 className="text-3xl font-bold mb-4">Hotel Details</h2>
                {/* Add more hotel details as needed */}
            </div>
        </div>
    );
};

export default HotelView;
