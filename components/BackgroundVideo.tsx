// "use client"

// import React, { useRef, useEffect, useState } from 'react';

// const BackgroundVideo: React.FC = () => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const [isVideoReady, setIsVideoReady] = useState(false);

//   useEffect(() => {
//     const video = videoRef.current;
//     if (video) {
//       const playVideo = () => {
//         video.play().catch((error: Error) => {
//           console.error("Error attempting to play", error);
//         });
//       };

//       const handleEnded = () => {
//         console.log("Video ended, restarting");
//         video.currentTime = 0;
//         playVideo();
//       };

//       const handleCanPlay = () => {
//         console.log("Video can play");
//         setIsVideoReady(true);
//         playVideo();
//       };

//       const handleError = (e: Event) => {
//         console.error("Video error:", (e.target as HTMLVideoElement).error);
//       };

//       const handlePause = () => {
//         console.log("Video paused, attempting to resume");
//         playVideo();
//       };

//       video.addEventListener('canplay', handleCanPlay);
//       video.addEventListener('ended', handleEnded);
//       video.addEventListener('error', handleError);
//       video.addEventListener('pause', handlePause);

 
//       playVideo();

//       return () => {
//         video.removeEventListener('canplay', handleCanPlay);
//         video.removeEventListener('ended', handleEnded);
//         video.removeEventListener('error', handleError);
//         video.removeEventListener('pause', handlePause);
//       };
//     }
//   }, []);

//   return (
//     <div className="fixed inset-0 -z-10 w-[100vw] h-[100vh] overflow-hidden">
//       <video
//         ref={videoRef}
//         muted
//         playsInline
//         autoPlay
//         loop
//         preload="auto"
//         className="object-cover w-full h-full"
//       >
//         <source src="https://utfs.io/f/09Bv5dtKx6OwK45Rnc6kiqwpz0IV69AOL3Uro5Sa4eHXlnWE" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//       {!isVideoReady && (
//         <div className="absolute inset-0 flex items-center justify-center bg-black text-[#F7F2DA]">
//       <img src='/images/main.PNG' alt='loading' className='h-[100vh] w-[100vw]' />
//         </div>
//       )}
//     </div>
//   );
// };

// export default BackgroundVideo;

"use client"

import React, { useRef, useEffect, useState } from 'react';

const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    const videoUrl = "https://utfs.io/f/09Bv5dtKx6OwTflDVi2NvASUGXuB4oiJw5pyhV9QPclkse8t";
    const cacheName = 'video-cache';

    const fetchAndCacheVideo = async () => {
      try {
        const cache = await caches.open(cacheName);
        let response = await cache.match(videoUrl);

        if (!response) {
          console.log('Video not in cache, fetching...');
          response = await fetch(videoUrl);
          const clonedResponse = response.clone();
          await cache.put(videoUrl, clonedResponse);
        } else {
          console.log('Video found in cache');
        }

        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);
        setVideoSrc(objectURL);
      } catch (error) {
        console.error("Error fetching or caching video:", error);
      }
    };

    fetchAndCacheVideo();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video && videoSrc) {
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

      playVideo();

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('ended', handleEnded);
        video.removeEventListener('error', handleError);
        video.removeEventListener('pause', handlePause);
      };
    }
  }, [videoSrc]);

  return (
    <div className="fixed inset-0 -z-10 w-[100vw] h-[100vh] overflow-hidden">
      {videoSrc && (
        <video
          ref={videoRef}
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
          className="object-cover w-full h-full"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {!isVideoReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black text-[#F7F2DA]">
          <img src='/images/main.PNG' alt='loading' className='h-[100vh] w-[100vw]' />
        </div>
      )}
    </div>
  );
};

export default BackgroundVideo;