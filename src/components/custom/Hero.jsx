import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import Footer from '@/view-trip/components/Footer';

function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const timeoutRef = useRef(null);

  // Generate image paths for /assets/background/image1.png to image35.png
  const imageList = Array.from({ length: 35 }, (_, i) => `/assets/background/image${i + 1}.png`);

  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % imageList.length);
    }, 5000); // 5 seconds
    return () => clearInterval(timeoutRef.current);
  }, [imageList.length]);

  return (
    <div
      className='flex flex-col items-center mx-56 gap-9'
    >
      <h1
        className='font-extrabold text-[60px] text-center mt-16'
      >
        <span className='text-[#f56551]'>Discover Your Next Adventure With AI:</span> Personalized Itineraries at Your Fingertips
      </h1>
      <p className='text-xl text-gray-500 text-center'>Your Personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>

      <Link to={'/create-trip'}>
        <Button className='cursor-pointer'>Get Started, It's Free</Button>
      </Link>

      <img
        src={imageList[currentImage]}
        alt="Slideshow"
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          marginTop: '24px',
          objectFit: 'cover',
          background: '#fff',
        }}
      />
      <div>
        <Footer />
      </div>
    </div>
    
  );
}

export default Hero
