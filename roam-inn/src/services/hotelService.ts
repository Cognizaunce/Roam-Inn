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
