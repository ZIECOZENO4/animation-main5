"use client"
import { useEffect, useRef } from 'react';
import Image from 'next/image';

const CryptoDisplay = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video autoplays and loops
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden px-8">
      {/* Grid Background Pattern */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 107, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 107, 0, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Top Right Ethereum */}
      <div className="absolute top-4 right-4 w-32 h-32">
        <Image
          src="https://commons.wikimedia.org/wiki/File:Rotating_earth_animated_transparent.gif" // Replace with actual Ethereum rotating GIF URL
          alt="Rotating Ethereum"
          width={128}
          height={128}
          className="rounded-full"
        />
      </div>

      {/* Bottom Left World */}
      <div className="absolute bottom-4 left-4 w-32 h-32">
        <Image
          src=" https://icons8.com/preloaders/en/cryptocurrency_and_money/ethereum-gold-coin/" // Replace with actual rotating world GIF URL
          alt="Rotating World"
          width={128}
          height={128}
          className="rounded-full"
        />
      </div>

      {/* Main Content with Video Background */}
      <div className="relative mx-auto max-w-4xl h-screen flex items-center justify-center">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
          {/* Video Background */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source 
              src="/videos/content.mp4" // Replace with actual video URL
              type="video/mp4" 
            />
          </video>

          {/* Content Overlay */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8 bg-black/40 backdrop-blur-sm">
            <h1 className="text-[#F7F2DA] text-4xl md:text-6xl font-bold mb-6">
              OMNIPUMP FOR THE COMMUNITY GROWTH
            </h1>
            
            <div className="text-slate-500 space-y-4 max-w-2xl mx-auto text-lg md:text-xl">
              <p>
                700M OMNIPUMP TOKENS was distributed to the community across Season 1 and 2.
              </p>
              <p>
                Season 3 has now begun, powered by Blast, the L2 with native
                yield backed by Paradigm and Standard Crypto.
              </p>
              <p>
                Start listing and bidding on Blur to get started on Season 3
                rewards.
              </p>
            </div>

            <button className="mt-8 px-8 py-3 bg-slate-500 text-white rounded-md hover:bg-slate-600 transition-colors text-lg font-medium">
              JOIN COMMUNITY
            </button>
          </div>
        </div>
      </div>

      {/* Optional: Floating Crypto Icons */}
      <div className="absolute bottom-0 w-full">
        <div className="flex gap-4 animate-float justify-center">
        {[...Array(8)].map((_, i) => (
            <Image
              key={i}
              src="https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/images/ethereumLogo.png"
              alt="Ethereum Logo"
              width={48}
              height={48}
              className="w-12 h-12 opacity-60"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoDisplay;