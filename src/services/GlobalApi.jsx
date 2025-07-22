const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const GetPlacePhoto = async (query) => {
    if (!query) return undefined;
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results[0]?.urls?.regular || '/placeholder.jpg';
    } catch (e) {
        return '/placeholder.jpg';
    }
}