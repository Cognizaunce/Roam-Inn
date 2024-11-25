export const searchHotels = async (city: string, radius: number) => {
    try {
        const response = await fetch(`/api/search-hotels?city=${city}&radius=${radius}`);
        if (!response.ok) {
            throw new Error("Failed to fetch hotels");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching hotels:", error);
    }
};

export const hotelInfo = async (
    hotel_id: string[], // Single hotel ID sent as an array
    adults: number,
    check_in: string,
    check_out: string,
    rooms: number
) => {
    try {
        // Stringify the hotel_id array for the query parameter
        const query = new URLSearchParams({
            hotel_id: JSON.stringify(hotel_id), // Serialize array as a JSON string
            adults: adults.toString(),
            check_in,
            check_out,
            rooms: rooms.toString(),
        });

        const response = await fetch(`/api/hotel-info?${query.toString()}`);
        if (!response.ok) {
            throw new Error("Failed to fetch hotel info");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching hotel info:", error);
    }
};

export const hotelReviews = async (hotel_id: string[]) => {
    try {
        // Stringify the hotel_id array for the query parameter
        const query = new URLSearchParams({
            hotel_id: JSON.stringify(hotel_id), // Serialize array as a JSON string
        });

        const response = await fetch(`/api/hotel-review?${query.toString()}`);
        if (!response.ok) {
            throw new Error("Failed to fetch hotel reviews");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching hotel reviews:", error);
    }
};



export const processHotels = async (hotels: any[]) => {
    try {
        // Make a POST request to process-hotels endpoint
        const response = await fetch(`/process-hotels/`, {
            method: 'POST',  // Change to POST method
            headers: {
                'Content-Type': 'application/json',  // Set content type to JSON
            },
            body: JSON.stringify(hotels),  // Send the hotels array in the request body
        });

        if (!response.ok) {
            throw new Error("Failed to process hotels");
        }
        
        const data = await response.json();
        return data.processed_hotels;  // Return processed hotel data
    } catch (error) {
        console.error("Error processing hotels:", error);
    }
};


// export const populateHotels = async (city: string) => {
//     try {
//         const response = await fetch(`/api/populate-hotels?city=${city}`, {
//             method: 'GET',
//         });
//         if (!response.ok) throw new Error("Failed to populate hotels");
//         return await response.json();
//     } catch (error) {
//         console.error("Error populating hotels:", error);
//     }
// };

// export const getHotels = async (city: string) => {
//     try {
//         const response = await fetch(`/api/hotels?city=${city}`);
//         if (!response.ok) throw new Error("Failed to fetch hotels");
//         return await response.json();
//     } catch (error) {
//         console.error("Error fetching hotels:", error);
//     }
// };
