"use client"
import { useEffect, useRef, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';

const FirstAnimation: React.FC = () => {
  const controls = useAnimation();
  const gapControls = useAnimation();
  const mouseControls = useAnimation();
  const dropControls = useAnimation();
  const audioRef = useRef<HTMLAudioElement | null>(null);


  const gridCells = useMemo(() => {
    if (typeof window !== 'undefined') {
      const cachedGrid = localStorage.getItem('animationGrid');
      if (cachedGrid) {
        return JSON.parse(cachedGrid) as number[];
      }
      const newGrid = Array.from({ length: 57600 }, (_, i) => i);
      localStorage.setItem('animationGrid', JSON.stringify(newGrid));
      return newGrid;
    }
    return [] as number[];
  }, []);

  useEffect(() => {
    const animateBackground = async () => {
      while (true) {
   
        await Promise.all([
          controls.start({
            scale: [1, 100],
            rotate: [0, 2],
            transition: { 
              duration: 3, 
              ease: "easeInOut" 
            }
          }),
          gapControls.start({
            gap: ["0.1px", "50px"],
            transition: { 
              duration: 3,
              ease: "easeInOut" 
            }
          })
        ]);

    
        await new Promise(resolve => setTimeout(resolve, 2000));

        
        await Promise.all([
          controls.start({
            scale: [100, 1],
            rotate: [-2, 0],
            transition: { 
              duration: 3,
              ease: "easeInOut" 
            }
          }),
          gapControls.start({
            gap: ["50px", "0.1px"],
            transition: { 
              duration: 3,
              ease: "easeInOut" 
            }
          })
        ]);

        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    };

    const animateMouse = async () => {
      while (true) {
        await mouseControls.start({
          x: Math.random() * 100 - 50,
          y: Math.random() * 100 - 50,
          scale: [1, 1.3, 1],
          rotate: [0, 360],
          transition: { duration: 5, ease: "easeInOut" }
        });
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    };

    const animateDrop = async () => {
      while (true) {
        await dropControls.start({
          scale: [0, 1],
          opacity: [1, 0],
          transition: { duration: 2, ease: "easeOut" }
        });
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    };

    animateBackground();
    animateMouse();
    animateDrop();


    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.error("Audio playback failed:", error);
        });
      }
    };


    playAudio();

    // Add event listener for user interaction
    document.addEventListener('click', playAudio);

    return () => {
      document.removeEventListener('click', playAudio);
    };
  }, [controls, gapControls, mouseControls, dropControls]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-black z-0">
      <motion.div
        className="w-full h-full wave"
        animate={controls}
        initial={{ scale: 1, rotate: 0 }}
      >
        <motion.div 
          className="w-full h-full grid grid-cols-[repeat(240,1fr)] grid-rows-[repeat(240,1fr)]"
          animate={gapControls}
          initial={{ gap: "0.1px" }}
        >
          {gridCells.map((i: number) => (
            <div key={i} className="border border-[#373737]"></div>
          ))}
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute top-1/2 left-1/2 w-4 h-4  rounded-full"
        animate={dropControls}
        initial={{ scale: 0, opacity: 0 }}
      />
      <audio ref={audioRef} src="/audio/play.mp3" loop />
    </div>      
  );
};

export default FirstAnimation;

