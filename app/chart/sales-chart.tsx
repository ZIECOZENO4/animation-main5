"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const generateDots = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    x: Math.random() * 800,
    y: 50 + Math.random() * 200,
    color: Math.random() > 0.8 ? '#ff6b00' : '#cccccc'
  }))
}

const generateBars = (count: number) => {
  return Array.from({ length: count }, () => ({
    height: Math.random() * 100,
    color: Math.random() > 0.8 ? '#ff6b00' : '#cccccc'
  }))
}

export default function SalesChart() {
  const [dots] = useState(() => generateDots(50))
  const [bars] = useState(() => generateBars(24)) // Bar chart data
  const [hoveredDot, setHoveredDot] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const connectedDots = [
    dots[0],
    dots[7],
    dots[15],
    dots[23],
    dots[31],
    dots[39],
    dots[47]
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // Background and grid
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = '#333333'
    ctx.lineWidth = 0.5
    for (let i = 0; i < canvas.height; i += 25) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Labels on the left side
    ctx.fillStyle = '#999999'
    ctx.font = '12px monospace'
    ctx.fillText('0.750', 10, 30)
    ctx.fillText('0.725', 10, 80)
    ctx.fillText('0.700', 10, 130)
    ctx.fillText('0.675', 10, 180)

    // Draw dots with black center and colored borders
    dots.forEach((dot, index) => {
      ctx.beginPath()
      ctx.arc(dot.x, dot.y, index === hoveredDot ? 6 : 5, 0, Math.PI * 2)
      ctx.fillStyle = '#000000' // Black center
      ctx.fill()
      ctx.strokeStyle = dot.color // Border color matches original dot color
      ctx.lineWidth = index === hoveredDot ? 3 : 2
      ctx.stroke()
    })

    // Stepped Line connecting specific dots (like in the first image)
    ctx.strokeStyle = '#ff6b00'
    ctx.lineWidth = 2

    connectedDots.forEach((dot, index) => {
      if (index === 0) {
        ctx.moveTo(dot.x, dot.y)
      } else {
        // Create a step-like effect by drawing horizontal and vertical lines
        const prevDot = connectedDots[index - 1]
        ctx.lineTo(dot.x, prevDot.y) // Horizontal line
        ctx.lineTo(dot.x, dot.y)     // Vertical line
      }
      ctx.stroke()
    })

   // Bar Chart at the bottom (like in the second image)
   const barWidth = Math.max(canvas.width / bars.length - 2, 3); // Each bar is at least 3px wide
   bars.forEach((barData, index) => {
     const { height: barHeight, color } = barData;
     const xPos = index * (barWidth + 2);
     const yPos = canvas.height - barHeight - 20; // Position bars above bottom margin

     // Draw each bar with black fill and colored borders matching some of the dots
     ctx.fillStyle = '#000000';
     ctx.fillRect(xPos, yPos, barWidth - 1, barHeight);

     if (color === '#ff6b00') {
       // Add a border to some bars to match dot colors
       ctx.strokeStyle = color;
       ctx.lineWidth = 2;
       ctx.strokeRect(xPos, yPos, barWidth -1 , barHeight);
     }

     // Optional: Add small labels below each bar (e.g., time labels like "1 PM", "3 AM")
     if (index % 6 === 0) {
       const timeLabel = `${(index % 12 || 12)} ${index < 12 ? 'AM' : 'PM'}`;
       ctx.fillStyle = '#999999';
       ctx.font = '10px monospace';
       ctx.fillText(timeLabel, xPos + barWidth /4 , canvas.height -5);
     }

     if (index === bars.length -1){
         // Draw a horizontal axis line above bars
         ctx.beginPath();
         ctx.moveTo(0 ,canvas.height -20);
         ctx.lineTo(canvas.width ,canvas.height -20);
         ctx.stroke();
     }
   });

   // Draw dotted white lines from mouse position to all edges of the screen if hovering over component
   if (hoveredDot !== null && canvasRef.current) {
     const rect = canvasRef.current.getBoundingClientRect();
     const mouseX = connectedDots[hoveredDot].x;
     const mouseY = connectedDots[hoveredDot].y;

     // Dotted line style
     ctx.setLineDash([5,5]);
     ctx.strokeStyle= "#ffffff";
     
     // Vertical line from top to bottom through the hovered dot's x position
     ctx.beginPath();
     ctx.moveTo(mouseX ,0);
     ctx.lineTo(mouseX ,canvas.height);
     ctx.stroke();

     // Horizontal line from left to right through hovered dot's y position
     ctx.beginPath();
     ctx.moveTo(0 ,mouseY);
     ctx.lineTo(canvas.width ,mouseY);
     ctx.stroke();

   }

 }, [dots ,hoveredDot])

 return (
   <div className="w-full max-w-4xl bg-black p-4 relative">
     
     <div className="flex justify-between items-center mb-4">
       <motion.div 
         initial={{ opacity:0 }}
         animate={{ opacity:1 }}
         className="text-[#999999] text-sm"
       >
         SALES
       </motion.div>
       <div className="flex gap-2">
         {['1D', '1W', '1M'].map((period) => (
           <motion.button
             key={period}
             whileHover={{ scale:1.05 }}
             whileTap={{ scale:0.95 }}
             className="px-2 py-1 rounded text-sm bg-[#333333] text-[#999999] hover:bg-[#444444]"
           >
             {period}
           </motion.button>
         ))}
       </div>
     </div>
     
     {/* Canvas for Dots and Lines */}
     <div className="relative">
       <canvas
         ref={canvasRef}
         className="w-screen h-slate cursor-crosshair"
         style={{ imageRendering:'pixelated' }}
       />
       
       {/* Hoverable Dots */}
       <div className="absolute inset-0">
         {dots.map((dot ,index) => (
           <motion.div
             key={index}
             className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full cursor-pointer"
             style={{ left:dot.x ,top:dot.y }}
             onHoverStart={() => setHoveredDot(index)}
             onHoverEnd={() => setHoveredDot(null)}
             whileHover={{ scale:1.5 }}
           >
             {hoveredDot === index && (
               <motion.div
                 initial={{ opacity:0 ,y:-10 }}
                 animate={{ opacity:1 ,y:-20 }}
                 exit={{ opacity:0 }}
                 className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#333333] text-[#999999] text-xs rounded whitespace-nowrap"
               >
                 Value:{(0.750 -(dot.y /300)*0.075).toFixed(3)}
               </motion.div>
             )}
           </motion.div>
         ))}
       </div>
     </div>
     
     {/* Crosshair Cursor */}
     <style jsx>{`
       .cursor-crosshair {
         cursor: crosshair;
       }
     `}</style>
     
   </div>
 )
}