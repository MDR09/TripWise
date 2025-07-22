export const SelectTravelOptions = [
    {
        id: 1,
        title: 'Solo Traveler',
        desc: 'Embark on a journey of self-discovery',
        icon: '🧳',
        people: '1 person',
    },
    {
        id: 2,
        title: 'Travel Duo',
        desc: 'Experience the world side by side',
        icon: '🥂',
        people: '2 people',
    },
    {
        id: 3,
        title: 'Family',
        desc: 'Create cherished memories',
        icon: '🏡',
        people: '3 to 5 people',
    },
    {
        id: 4,
        title: 'Group of Friends',
        desc: 'Enjoy the thrill of adventure',
        icon: '🎉',
        people: '5 to 10 people',
    },
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Economical',
        desc: 'Travel smart, spend less',
        icon: '🪙',
    },
    {
        id: 2,
        title: 'Standard',
        desc: 'Balanced comfort and cost',
        icon: '💵',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Ultimate & limitless luxury',
        icon: '💎',
    },
];



export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {totalDays} Days for {people} with a {budget} budget, give me a list of hotel options with the hotel name, hotel address, price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with place name, place details, place image url, geo coordinates, ticket pricing, amount of time to explore each location and what it depends on, all that for each of the locations for {totalDays} days with each day plan with the best time to visit in JSON format';