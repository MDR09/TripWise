import React, { useEffect, useState } from 'react';
import LocationIQAutocomplete from './LocationIQAutocomplete';
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { SelectTravelOptions, SelectBudgetOptions, AI_PROMPT } from '@/constants/options';
import { toast } from 'sonner';
import { chatSession } from '../services/AIModel';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../components/ui/dialog'
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { doc,setDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
    const [place, setPlace] = useState();
    const [formData, setFormData] = useState([]);
    const [openDialog,setOpenDialog] = useState(false);
    const [loading,setLoading] = useState(false);
    const navigate=useNavigate();
    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    }
    useEffect(() => {
        console.log(formData);
    }, [formData])

    const login = useGoogleLogin({
        onSuccess:(codeResp)=>GetUserProfile(codeResp),
        onError:(error)=>console.log(error)
    })

    const OnGenerateTrip =async () => {

        const user = localStorage.getItem('user');

        if (!user) {
            console.log('Opening dialog');
            setOpenDialog(true);
            return;
        }

        if (formData?.noOfDays > 10 && !formData?.location || !formData?.budget || !formData?.traveler) {
            toast("Please ensure all questions are answered!")
            return;
        }
        setLoading(true);
        const FINAL_PROMPT=AI_PROMPT
        .replace('{location}',formData?.location?.address?.name)
        .replace('{totalDays}',formData?.noOfDays)
        .replace('{budget}',formData?.budget)
        .replace('{people}',formData?.traveler)
        .replace('{totalDays}',formData?.noOfDays)

        const result = await chatSession.sendMessage(FINAL_PROMPT);
        setLoading(false);
        SavaAiTrip(result?.response?.text())
    }
    const SavaAiTrip = async(TripData)=>{
        setLoading(true)
        const user = JSON.parse( localStorage.getItem('user'));
        const docId = Date.now().toString()

        await setDoc(doc(db, "AITrips", docId), {
            userSelection:formData,
            tripData: JSON.parse(TripData),
            userEmail:user?.email,
            id:docId
        });
        setLoading(false);
        navigate('/view-trip/'+docId)
    } 

    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((resp) => {
            console.log(resp);
            localStorage.setItem('user', JSON.stringify(resp.data));
            setOpenDialog(false);
            OnGenerateTrip();
        })
    }
    
    return (
        <div className='sm:px-10 md"px-32 lg:px-56 xl:px-10 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>Tell Us Your Travel Preferences</h2>
            <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences</p>

            <div className='mt-10 flex flex-col gap-10'>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
                    <LocationIQAutocomplete
                        onSelect={(v) => { setPlace(v); handleInputChange('location', v); }}
                    />
                </div>
                <div>
                    <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
                    <Input 
                        placeholder={'Ex.3'} 
                        type="number"
                        style={{ fontWeight: 500 }}
                        onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                    />
                </div>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectBudgetOptions.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange('budget', item.title)}
                                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                                ${formData?.budget == item.title && 'shadow-lg border-black'}`}>
                                <h2 className='text-4xl '>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectTravelOptions.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange('traveler', item.people)}
                                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                                ${formData?.traveler == item.people && 'shadow-lg border-black'}`}>
                                <h2 className='text-4xl '>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='my-10 justify-end flex'>
                    <Button
                        disabled={loading}
                        className='bg-[#462F26] text-white rounded  hover:bg-[#805545] hover:text-white hover:border-[#805545]'
                        onClick={OnGenerateTrip}
                    >
                        {loading ?
                            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : 'Generate Trip'
                        }

                    </Button>
                </div>

                <Dialog open={openDialog}>
                    
                    <DialogContent>
                        <DialogHeader>
                            
                            <DialogDescription>
                                <img src="/logo.svg"/>
                                <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
                                <p>Sign in to the App with Google authentication securely </p>
                                <Button 
                                onClick={login}
                                className='w-full mt-5 flex gap-3 items-center'>
                                    <FcGoogle className='w-7'/> 
                                    Sign In With Google
                                    </Button>     
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default CreateTrip
