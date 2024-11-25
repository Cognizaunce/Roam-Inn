import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { hotelInfo, hotelReviews } from '../services/hotelService.ts';
import Header from '../components/header.tsx'; // Import your Header component

const HotelView: React.FC = () => {
    const location = useLocation();
    const { hotels, check_in, check_out, rooms, adults } = location.state || {};
    const [selectedHotel, setSelectedHotel] = useState<any | null>(null);

    const handleHotelClick = async (hotelName: string) => {
        try {
            const selectedHotelData = hotels.find((hotel: any) => hotel.name === hotelName);
            if (selectedHotelData) {
                const hotelID = selectedHotelData.hotel_id;
                const hotelDetails = await hotelInfo(hotelID, adults, check_in, check_out, rooms);
                const reviews = await hotelReviews(hotelID);

                // Update state with hotel details and reviews
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

    return (
        <div>
            <Header /> {/* Include the Header component */}
        <div className="flex p-8 bg-gradient-to-r from-blue-600 to-blue-400">
            {/* Hotel List Section */}
            <div className="w-1/3 p-4 overflow-y-scroll max-h-screen no-scrollbar">
                <h2 className="text-2xl font-bold mb-4">Hotel List</h2>
                <div>
                    {hotels?.map((hotel: any, index: number) => (
                        <div
                            key={hotel.hotelID}
                            className="p-4 border border-gray-200 rounded-md mb-4 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleHotelClick(hotel.name)}
                        >
                            <h3 className="font-semibold">{hotel.name}</h3>
                            <p>{hotel.address}</p>
                        </div>
                    ))}
                </div>
                <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200"
                        >
                    Checkout
                </button>
            </div>

            {/* Hotel Details Section */}
            <div className="w-2/3 p-4 bg-white rounded-lg shadow-md overflow-y-scroll max-h-screen">
                <h2 className="text-3xl font-bold mb-4">Hotel Details</h2>
                {selectedHotel ? (
                    <>
                        <div>
                            <h3 className="text-xl font-semibold">{selectedHotel.details?.hotel?.name}</h3>
                            <p><strong>Location:</strong> {selectedHotel.details?.hotel?.cityCode}</p>
                            <p><strong>Coordinates:</strong> Latitude: {selectedHotel.details?.hotel?.latitude}, Longitude: {selectedHotel.details?.hotel?.longitude}</p>

                            {/* Offer Details */}
                            <div className="mt-4">
                                <h4 className="font-semibold">Room Type: {selectedHotel.details?.offers[0]?.room?.typeEstimated?.category}</h4>
                                <p><strong>Beds:</strong> {selectedHotel.details?.offers[0]?.room?.typeEstimated?.beds} x {selectedHotel.details?.offers[0]?.room?.typeEstimated?.bedType}</p>
                                <p>{selectedHotel.details?.offers[0]?.room?.description?.text}</p>

                                <h5 className="mt-2 text-lg font-semibold">Price: {selectedHotel.details?.offers[0]?.price?.total} {selectedHotel.details?.offers[0]?.price?.currency}</h5>
                                <p><strong>Check-in:</strong> {selectedHotel.details?.offers[0]?.checkInDate}</p>
                                <p><strong>Check-out:</strong> {selectedHotel.details?.offers[0]?.checkOutDate}</p>
                            </div>

                            {/* Cancellation Policy */}
                            <div className="mt-4">
                                <h5 className="font-semibold">Cancellation Policy</h5>
                                <p>Deadline: {selectedHotel.details?.offers[0]?.policies?.cancellations[0]?.deadline}</p>
                                <p>Fee: {selectedHotel.details?.offers[0]?.policies?.cancellations[0]?.amount} {selectedHotel.details?.offers[0]?.price?.currency}</p>
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold">Reviews</h3>
                            <ul>
                                {selectedHotel.reviews?.data?.map((review: any, index: number) => (
                                    <li key={index} className="mb-4">
                                        <p><strong>{review.author?.name}</strong></p>
                                        <p>{review.text}</p>
                                    </li>
                                ))}
                            </ul>
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
