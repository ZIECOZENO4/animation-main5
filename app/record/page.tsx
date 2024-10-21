"use client";

import VideoBackground from '@/components/VideoBackground';
import { VideoUploader } from '@/components/VideoUploader';
import { useState } from 'react';


export default function Home() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!videoUrl && (
        <VideoUploader onUploadComplete={(url) => setVideoUrl(url)} />
      )} 
      {videoUrl && <VideoBackground videoUrl={videoUrl} />}
      <h1 className="text-4xl font-bold"> Welcome to My Site </h1>
    </main>
  );
}