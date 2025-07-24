import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { googleLogout } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose
} from "@/components/ui/dialog";
import { X } from "lucide-react";

function Header() {

  const user = JSON.parse(localStorage.getItem('user'));

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  })

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenInfo?.access_token}`, {
      header: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    })

  }

  return (
    <div className='p-2 shadow-lg flex justify-between items-center px-5'
      style={{ zIndex: 2 }}
    >
      <a href="/">
        <img src="/logo.png" width={70} height={70} style={{ cursor: 'pointer' }} />
      </a>

      <div>
        {user ?

          <div className='flex items-center gap-3'>

            <a href="/create-trip">
              <Button variant="outline" className="bg-[#462F26] text-white rounded  hover:bg-[#805545] hover:text-white hover:border-[#805545] rounded-full cursor-pointer">+ Create Trip</Button>
            </a>


            <a href="/my-trips">
              <Button variant="outline" className="bg-[#462F26] text-white rounded  hover:bg-[#805545] hover:text-white hover:border-[#805545] rounded-full cursor-pointer">My Trips</Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className=" h-[35px] w-[35px] rounded-full cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent className="bg-white">
                <h2 className="cursor-pointer" onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Log Out</h2>
              </PopoverContent>
            </Popover>

          </div>

          :

          <Button onClick={() => setOpenDialog(true)} className='bg-[#462F26] text-white rounded  hover:bg-[#805545] hover:text-white hover:border-[#805545]'>Sign In</Button>

        }

        {openDialog && (
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogDescription>
                  <img src="/logo.png" width={60} />

                  <h2 className='font-bold text-lg mt-5'>Continue with Google Authentication</h2>

                  <Button
                    onClick={login}
                    className="w-full mt-5 bg-[#462F26] text-white hover:border-[#291813] flex gap-2 items-center"
                  >
                    <FcGoogle className="w-6" />
                    Sign In With Google
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}



      </div>
    </div>
  )
}

export default Header