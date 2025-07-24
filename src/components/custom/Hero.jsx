import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import Footer from '@/view-trip/components/Footer';

function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const imageList = Array.from({ length: 35 }, (_, i) => `/assets/background/image${i + 1}.png`);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % imageList.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [imageList.length]);

  return (
    <div className='flex flex-col items-center gap-9 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-56'>
      <h1 className='font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mt-10 sm:mt-14 md:mt-16'>
        <span className='text-[#f56551]'>Discover Your Next Adventure With AI:</span> Personalized Itineraries at Your Fingertips
      </h1>
      <p className='text-base sm:text-lg md:text-xl text-gray-500 text-center'>Your Personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>

      <Link to={'/create-trip'}>
        <Button className='cursor-pointer text-base sm:text-lg md:text-xl px-6 py-3 sm:px-8 sm:py-4'>Get Started, It's Free</Button>
      </Link>

      <div className="w-full flex justify-center mt-6">
        <img
          src={imageList[currentImage]}
          alt="Slideshow"
          className="rounded-xl shadow-lg bg-white object-cover w-full max-w-5xl h-[40vw] max-h-[500px] min-h-[180px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]"
          style={{
            transition: 'box-shadow 0.3s',
          }}
        />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Hero;
