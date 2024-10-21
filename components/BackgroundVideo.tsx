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
      video.playbackRate = 0.5;
    }
  }, []);

  useEffect(() => {
    // Preload images
    const preloadImage = (src: string) => {
      const img = new window.Image();
      img.src = src;
    };
    preloadImage('/images/main.PNG');
    preloadImage('/images/loading.PNG');
  }, []);

  return (
    <div className="fixed inset-0 -z-10 w-screen h-screen overflow-hidden">
      {isLoading && (
        <div className="flex items-center justify-center w-screen h-screen bg-black" aria-label="Loading">
          <Image
            src="/images/main.PNG"
            alt="Loading"
            width={100}
            height={100}
            priority
          />
        </div>
      )}
      {hasError && (
        <div className="flex items-center justify-center w-screen h-screen bg-black" aria-label="Error loading video">
          <Image
            src="/images/loading.PNG"
            alt="Error"
            width={100}
            height={100}
            priority
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
          className="object-cover w-screen h-screen"
          onLoadedData={handleLoadedData}
          onError={handleError}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default BackgroundVideo;