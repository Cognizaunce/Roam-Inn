export const searchHotels = async (city: string) => {
    try {
        const response = await fetch(`/api/search-hotels?city=${city}`);
        if (!response.ok) {
            throw new Error("Failed to fetch hotels");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching hotels:", error);
    }
};
export const populateHotels = async (city: string) => {
    try {
        const response = await fetch(`/api/populate-hotels?city=${city}`, {
            method: 'GET',
        });
        if (!response.ok) throw new Error("Failed to populate hotels");
        return await response.json();
    } catch (error) {
        console.error("Error populating hotels:", error);
    }
};

export const getHotels = async (city: string) => {
    try {
        const response = await fetch(`/api/hotels?city=${city}`);
        if (!response.ok) throw new Error("Failed to fetch hotels");
        return await response.json();
    } catch (error) {
        console.error("Error fetching hotels:", error);
    }
};
