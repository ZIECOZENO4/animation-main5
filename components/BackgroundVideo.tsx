"use client"
import React, { useState, useRef, useEffect } from 'react';
import Video from 'next-video';
import Image from 'next/image';

const BackgroundVideo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.5; // Adjust this value to change the speed (0.5 is half speed, 2 is double speed)
    }
  }, []);

  return (
    <div className="fixed inset-0 -z-10 w-[100vw] h-[100vh] overflow-hidden">
      {isLoading && (
        <div className="flex items-center justify-center w-[100vw] h-[100vh] bg-black">
          <Image
            src="/images/main.PNG" // Replace with your loading image path
            alt="Loading"
            width={100}
            height={100}
          />
        </div>
      )}
      {hasError && (
        <div className="flex items-center justify-center w-[100vw] h-[100vh] bg-black">
          <Image
            src="/images/loading.PNG" // Replace with your error image path
            alt="Error"
            width={100}
            height={100}
          />
        </div>
      )}
      {!hasError && (
        <Video
          ref={videoRef}
          src="https://utfs.io/f/09Bv5dtKx6OwK45Rnc6kiqwpz0IV69AOL3Uro5Sa4eHXlnWE"
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-[100vw] h-[100vh]"
          onLoadedData={handleLoadedData}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default BackgroundVideo;