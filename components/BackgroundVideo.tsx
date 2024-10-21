"use client"
import React, { useState } from 'react';
import Video from 'next-video';

const BackgroundVideo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="fixed inset-0 -z-10 w-[100vw] h-[100vh] overflow-hidden">
      {isLoading && (
        <div className="flex items-center justify-center w-full h-full bg-black text-white">
          Loading video...
        </div>
      )}
      {hasError && (
        <div className="flex items-center justify-center w-full h-full bg-black text-white">
          No video available
        </div>
      )}
      {!hasError && (
        <Video
          src="https://utfs.io/f/09Bv5dtKx6OwK45Rnc6kiqwpz0IV69AOL3Uro5Sa4eHXlnWE"
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
          onLoadedData={handleLoadedData}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default BackgroundVideo;