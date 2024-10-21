// components/VideoBackground.tsx
import React from 'react';

interface VideoBackgroundProps {
  videoUrl: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = () => {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="object-cover w-full h-full"
      >
        <source src='first.mp4' type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;