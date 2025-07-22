import React, { useEffect, useState } from 'react'
import { FiShare } from "react-icons/fi";
import { Button } from '@/components/ui/button';
import { GetPlacePhoto } from '@/services/GlobalApi';

function InfoSection({trip}) {

    const [photoUrl,setPhotoUrl] = useState();
    useEffect(()=>{
        trip&&fetchPhoto();
    },[trip])
    const fetchPhoto = async () => {
        const city = trip.userSelection?.location?.address?.city;
        if (!city) return;
        const photoUrl = await GetPlacePhoto(city);
        setPhotoUrl(photoUrl);
    }

    return (
        <div>
            <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='h-[340px] w-full object-cover rounded' />
            <div>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip.userSelection?.location?.address?.city}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅{trip.userSelection?.noOfDays} Day</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💲{trip.userSelection?.budget} </h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>👨‍👩‍👧‍👦{trip.userSelection?.traveler} </h2>

                    </div>
                </div>
                <Button className="bg-[#462F26] text-white rounded  hover:bg-[#805545] hover:text-white hover:border-[#805545]" ><FiShare /> Share Trip</Button>

            </div>
        </div>
    )
}

export default InfoSection
