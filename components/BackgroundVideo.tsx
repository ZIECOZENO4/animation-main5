"use client"

import React, { useRef, useEffect, useState } from 'react';

const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playVideo = () => {
        video.play().catch((error: Error) => {
          console.error("Error attempting to play", error);
        });
      };

      const handleEnded = () => {
        console.log("Video ended, restarting");
        video.currentTime = 0;
        playVideo();
      };

      const handleCanPlay = () => {
        console.log("Video can play");
        setIsVideoReady(true);
        playVideo();
      };

      const handleError = (e: Event) => {
        console.error("Video error:", (e.target as HTMLVideoElement).error);
      };

      const handlePause = () => {
        console.log("Video paused, attempting to resume");
        playVideo();
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('ended', handleEnded);
      video.addEventListener('error', handleError);
      video.addEventListener('pause', handlePause);

      // Attempt to play when component mounts
      playVideo();

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('ended', handleEnded);
        video.removeEventListener('error', handleError);
        video.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  return (
    <div className="fixed inset-0 -z-10 w-[100vw] h-[100vh] overflow-hidden">
      <video
        ref={videoRef}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        className="object-cover w-full h-full"
      >
        <source src="https://utfs.io/f/09Bv5dtKx6OwK45Rnc6kiqwpz0IV69AOL3Uro5Sa4eHXlnWE" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {!isVideoReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
          Loading video...
        </div>
      )}
    </div>
  );
};

export default BackgroundVideo;