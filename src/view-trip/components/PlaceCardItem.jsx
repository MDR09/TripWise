import { GetPlacePhoto } from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function PlaceCardItem({ place }) {
    const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        place && fetchPhoto();
    }, [place]);
    const fetchPhoto = async () => {
        const name = place?.placeName;
        if (!name) return;
        const photoUrl = await GetPlacePhoto(name);
        setPhotoUrl(photoUrl);
    }
    return (
        <Link to = {'https://www.google.com/maps/search/?api=1&query='+place.placeName} target='_blank'>
        <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
            <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='w-[130px] h-[130px] rounded-xl object-cover' />
            <div>
                <h2 className='font-bold text-lg'>{place.placeName}</h2>
                <p className='text-sm text-gray-400'>{place.placeDetails}</p>
                <h2 className='mt-2'>⌛{place.timeToExplore}</h2>
                <h2 className="text-md mt-2 text-[#844d31]">🎫 {place.ticketPricing}</h2>
            </div>
        </div>
        </Link>
    )
}

export default PlaceCardItem
