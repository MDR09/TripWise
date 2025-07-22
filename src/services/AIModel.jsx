import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};



export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                {
                    text: `Generate Travel Plan for Location: Las Vegas, for 3 Days for a Couple with a Cheap budget. 
                    Include many hotel options and a detailed itinerary in JSON format.`,
                },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: `{
    "hotels": [
        {
            "hotelName": "The D Las Vegas",
            "hotelAddress": "301 Fremont Street, Las Vegas, NV 89101",
            "price": "$50-$100 per night",
            "hotelImageUrl": "https://www.theDcasino.com/images/hero/main-hero-02.jpg",
            "geoCoordinates": "36.1695, -115.1438",
            "rating": "3.5 stars",
            "description": "A budget-friendly hotel located in downtown Las Vegas with a retro vibe. It features a casino, a pool, and several dining options."
        },
        {
            "hotelName": "Circus Circus Hotel",
            "hotelAddress": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",
            "price": "$30-$80 per night",
            "hotelImageUrl": "https://www.circuscircus.com/images/hero.jpg",
            "geoCoordinates": "36.1372, -115.1628",
            "rating": "3 stars",
            "description": "Affordable lodging with a lively atmosphere. Features a theme park, casino, and multiple restaurants."
        }
    ],
    "itinerary": [
        {
            "day": "Day 1",
            "plan": [
                {
                    "time": "9:00 AM - 12:00 PM",
                    "placeName": "Fremont Street Experience",
                    "placeDetails": "A pedestrian-friendly street in downtown Las Vegas with a canopy of lights and street performers. It's a great place to start your trip and get a feel for the city's energy.",
                    "placeImageUrl": "https://www.fremontstreetexperience.com/images/fremont-street-experience.jpg",
                    "geoCoordinates": "36.1695,-115.1438",
                    "ticketPricing": "Free",
                    "timeToExplore": "2-3 hours"
                },
                {
                    "time": "1:00 PM - 3:00 PM",
                    "placeName": "Bellagio Conservatory & Botanical Gardens",
                    "placeDetails": "A stunning indoor garden with seasonal displays.",
                    "placeImageUrl": "https://www.bellagio.com/content/dam/MGM/bellagio/Photos/conservatory/hero.jpg",
                    "geoCoordinates": "36.1126, -115.1766",
                    "ticketPricing": "Free",
                    "timeToExplore": "1-2 hours"
                }
            ]
        },
        {
            "day": "Day 2",
            "plan": [
                {
                    "time": "10:00 AM - 1:00 PM",
                    "placeName": "Red Rock Canyon",
                    "placeDetails": "A scenic desert area with hiking trails and breathtaking views.",
                    "placeImageUrl": "https://www.redrockcanyonlv.org/wp-content/uploads/2021/03/redrock.jpg",
                    "geoCoordinates": "36.1352,-115.4275",
                    "ticketPricing": "$15 per vehicle",
                    "timeToExplore": "2-3 hours (depending on hiking)"
                }
            ]
        },
        {
            "day": "Day 3",
            "plan": [
                {
                    "time": "11:00 AM - 3:00 PM",
                    "placeName": "The Strip",
                    "placeDetails": "A famous stretch of Las Vegas Boulevard lined with hotels, casinos, and attractions.",
                    "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e7/Las_Vegas_Strip.jpg",
                    "geoCoordinates": "36.1147,-115.1728",
                    "ticketPricing": "Free",
                    "timeToExplore": "3-4 hours (or more depending on activities)"
                }
            ]
        }
    ]
}`,
                },
            ],
        },
    ],
});
