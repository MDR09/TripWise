import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../services/firebaseConfig';
import { useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';
import UserTripCard from "./components/UserTripCard";
// import Footer from '@/components/custom/Footer';

function MyTrips() {

    const navigation = useNavigation();
    const [userTrips, setUserTrips] = useState([]);

    useEffect(() => {
        GetUserTrips();
    }, [])

    /**
     * Used to get all user trips
     * @returns 
     */
    const GetUserTrips = async() => {

        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            navigation('/');
            return;
        }

       
        const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));

        const querySnapshot = await getDocs(q);

        setUserTrips([]);

        querySnapshot.forEach((doc) => {

        console.log(doc.id, " => ", doc.data());
        setUserTrips(prevVal => [...prevVal, doc.data()]);
        });
    }

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 mb-10">
            <h2 className="font-bold text-5xl text-blue-400" style={{ fontFamily: 'Monotype Corsiva, cursive' }}>My Trips</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8"> 
              {userTrips?.length> 0 ? userTrips.map((trip, index)=> (
                
                 
                <UserTripCard trip={trip} index={index} key={index}/>

              ))
            
              :

              [1,2,3,4,5,6].map((item, index) => (

                <div key={index} className="h-[250px] w-full bg-slate-200 animate-pulse rounded-xl">
                

                </div>

              ))
            
            }
            </div>
        </div>

    )
}

export default MyTrips