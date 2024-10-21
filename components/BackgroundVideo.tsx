"use client"

import React, { useRef, useEffect } from 'react';

const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error: Error) => {
        console.error("Error attempting to play", error);
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 -z-10 w-[100vw] h-[100vh] overflow-hidden">
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        className="object-cover w-full h-full"
      >
        <source    src="https://utfs.io/f/09Bv5dtKx6OwK45Rnc6kiqwpz0IV69AOL3Uro5Sa4eHXlnWE" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideo;