import { GetPlacePhoto } from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        hotel && fetchPhoto();
    }, [hotel]);
    const fetchPhoto = async () => {
        const name = hotel?.hotelName;
        if (!name) return;
        const photoUrl = await GetPlacePhoto(name);
        setPhotoUrl(photoUrl);
    }
    return (
        <div>
            <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel.hotelName + "," + hotel?.hotelAddress} target='_blank'>
                <div className='hover:scale-110 transition-all cursor-pointer'>
                    <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='rounded-xl h-[190px] w-full object-cover' />
                    <div className='my-2 flex flex-col gap-2'>
                        <h2 className='font-medium '>{hotel?.hotelName}</h2>
                        <h2 className='text-xs text-gray-500 '>📍{hotel?.hotelAddress}</h2>
                        <h2 className='text-sm'>💰{hotel?.price}</h2>
                        <h2 className='text-sm'>⭐{hotel?.rating}</h2>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default HotelCardItem
