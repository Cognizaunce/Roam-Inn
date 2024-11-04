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
