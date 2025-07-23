import { useState, useEffect } from 'react';
import { GetPlacePhoto } from '@/services/GlobalApi';
import { Link } from 'react-router-dom';

function UserTripCard({ trip, index }) {
  const [photoURL, setPhotoURL] = useState();

  useEffect(() => {
    trip && fetchPhoto();
  }, [trip]);

  const fetchPhoto = async () => {
    const label = trip?.userSelection?.location?.address?.city;
    if (!label) return;
    const photoUrl = await GetPlacePhoto(label);
    setPhotoURL(photoUrl);
  };

  return (
    <Link to={'/view-trip/' + trip?.id}>
      <div className="hover:scale-105 transition-all hover:shadow-2xl" style={{ width: '100%', overflow: 'hidden', position: 'relative', padding: '12px', borderRadius: '10px'}}>
        {/* Image Container */}
        <div style={{ height: '230px', width: '100%', overflow: 'hidden', borderRadius: '10px' }}>
          <img src={photoURL ? photoURL : '/placeholder.jpg'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Trip"/>
        </div>

        {/* Details Container */}
        <div style={{ marginTop: '5px'}}>
          <h1 className="font-bold text-xl text-[#4F5A2D] mt-3 mb-1">#{index + 1}</h1>
          <h2 className="font-bold text-lg text-[#271a14]">{trip?.userSelection?.location?.address?.city}</h2>
          <h2 className="text-sm text-[#844d31] mt-1"> {trip?.userSelection?.noOfDays} Day(s) trip with a {trip?.userSelection?.budget} Budget for {trip?.userSelection?.people} </h2>
        </div>
      </div>
    </Link>
  )
}

export default UserTripCard
