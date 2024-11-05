
// import React, { useState, useRef, useEffect } from 'react'
// import { motion } from 'framer-motion'

// const generateDots = (count: number) => {
//   return Array.from({ length: count }, (_, i) => ({
//     x: Math.random() * 800,
//     y: 50 + Math.random() * 200,
//     color: Math.random() > 0.8 ? '#ff6b00' : '#cccccc'
//   }))
// }

// const generateBars = (count: number) => {
//   return Array.from({ length: count }, () => Math.random() * 100)
// }

// export default function SalesChart() {
//   const [dots] = useState(() => generateDots(50))
//   const [bars] = useState(() => generateBars(24)) // Bar chart data
//   const [hoveredDot, setHoveredDot] = useState<number | null>(null)
//   const canvasRef = useRef<HTMLCanvasElement>(null)

//   const connectedDots = [
//     dots[0],
//     dots[7],
//     dots[15],
//     dots[23],
//     dots[31],
//     dots[39],
//     dots[47]
//   ]

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     const ctx = canvas.getContext('2d')
//     if (!ctx) return

//     canvas.width = canvas.offsetWidth * window.devicePixelRatio
//     canvas.height = canvas.offsetHeight * window.devicePixelRatio
//     ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

//     // Background and grid
//     ctx.fillStyle = '#000000'
//     ctx.fillRect(0, 0, canvas.width, canvas.height)

//     ctx.strokeStyle = '#333333'
//     ctx.lineWidth = 0.5
//     for (let i = 0; i < canvas.height; i += 25) {
//       ctx.beginPath()
//       ctx.moveTo(0, i)
//       ctx.lineTo(canvas.width, i)
//       ctx.stroke()
//     }

//     // Labels on the left side
//     ctx.fillStyle = '#999999'
//     ctx.font = '12px monospace'
//     ctx.fillText('0.750', 10, 30)
//     ctx.fillText('0.725', 10, 80)
//     ctx.fillText('0.700', 10, 130)
//     ctx.fillText('0.675', 10, 180)

//     // Draw dots
//     dots.forEach((dot, index) => {
//       ctx.beginPath()
//       ctx.arc(dot.x, dot.y, index === hoveredDot ? 4 : 3, 0, Math.PI * 2)
//       ctx.fillStyle = dot.color
//       ctx.fill()
//     })

//     // Stepped Line connecting specific dots (like in the first image)
//     ctx.strokeStyle = '#ff6b00'
//     ctx.lineWidth = 2

//     connectedDots.forEach((dot, index) => {
//       if (index === 0) {
//         ctx.moveTo(dot.x, dot.y)
//       } else {
//         // Create a step-like effect by drawing horizontal and vertical lines
//         const prevDot = connectedDots[index - 1]
//         ctx.lineTo(dot.x, prevDot.y) // Horizontal line
//         ctx.lineTo(dot.x, dot.y)     // Vertical line
//       }
//       ctx.stroke()
//     })

    
//    // Bar Chart at the bottom (like in the second image)
//    const barWidth = canvas.width / bars.length;
//    bars.forEach((barHeight, index) => {
//      const xPos = index * barWidth;
//      const yPos = canvas.height - barHeight - 20; // Position bars above bottom margin

//      // Draw each bar with animation-like effect
//      ctx.fillStyle = '#ff6b00';
//      ctx.fillRect(xPos, yPos, barWidth - 2, barHeight);

//      // Optional: Add small labels below each bar (e.g., time labels like "1 PM", "3 AM")
//      if (index % 6 === 0) {
//        // Display time every few bars for readability
//        const timeLabel = `${(index % 12 || 12)} ${index < 12 ? 'AM' : 'PM'}`;
//        ctx.fillStyle = '#999999';
//        ctx.font = '10px monospace';
//        ctx.fillText(timeLabel, xPos + barWidth / 4, canvas.height - 5);
//      }

//      // Draw a horizontal axis line above bars
//      if (index === bars.length -1){
//          ctx.beginPath();
//          ctx.moveTo(0 ,canvas.height -20);
//          ctx.lineTo(canvas.width ,canvas.height -20);
//          ctx.stroke();
//      }
//    });

//  }, [dots, hoveredDot])

//  return (
//    <div className="w-full h-[80vh] max-w-4xl bg-black p-4 relative">
     
//      <div className="flex justify-between items-center mb-4">
//        <motion.div 
//          initial={{ opacity: 0 }}
//          animate={{ opacity: 1 }}
//          className="text-[#999999] text-sm"
//        >
//          SALES
//        </motion.div>
//        <div className="flex gap-2">
//          {['1D', '1W', '1M'].map((period) => (
//            <motion.button
//              key={period}
//              whileHover={{ scale: 1.05 }}
//              whileTap={{ scale: 0.95 }}
//              className="px-2 py-1 rounded text-sm bg-[#333333] text-[#999999] hover:bg-[#444444]"
//            >
//              {period}
//            </motion.button>
//          ))}
//        </div>
//      </div>
     
//      {/* Canvas for Dots and Lines */}
//      <div className="relative w-full h-full">
//        <canvas
//          ref={canvasRef}
//          className="w-full h-full cursor-crosshair"
//          style={{ imageRendering: 'pixelated' }}
//        />
       
//        {/* Hoverable Dots */}
//        <div className="absolute inset-0">
//          {dots.map((dot, index) => (
//            <motion.div
//              key={index}
//              className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full cursor-pointer"
//              style={{ left: dot.x, top: dot.y }}
//              onHoverStart={() => setHoveredDot(index)}
//              onHoverEnd={() => setHoveredDot(null)}
//              whileHover={{ scale: 1.5 }}
//            >
//              {hoveredDot === index && (
//                <motion.div
//                  initial={{ opacity: 0, y: -10 }}
//                  animate={{ opacity: 1, y: -20 }}
//                  exit={{ opacity: 0 }}
//                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#333333] text-[#999999] text-xs rounded whitespace-nowrap"
//                >
//                  Value: {(0.750 - (dot.y / 300) * 0.075).toFixed(3)}
//                </motion.div>
//              )}
//            </motion.div>
//          ))}
//        </div>
//      </div>
     
//      {/* Crosshair Cursor */}
//      <style jsx>{`
//        .cursor-crosshair {
//          cursor: crosshair;
//        }
//      `}</style>
     
//    </div>
//  )
// }

"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const generateDots = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    x: (i / (count - 1)) * 800, // Evenly spread dots
    y: 300 - (Math.random() * 150 + 50), // Adjust Y to start from around 0.400
    color: '#cccccc'
  }))
}

const generateBars = (count: number) => {
  return Array.from({ length: count }, () => Math.random() * 100)
}

export default function SalesChart() {
  const [dots] = useState(() => generateDots(50))
  const [bars] = useState(() => generateBars(24))
  const [hoveredDot, setHoveredDot] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Select points for the single connecting line
  const linePoints = [
    dots[0],
    dots[10],
    dots[20],
    dots[30],
    dots[40],
    dots[49]
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

    // Updated labels for new scale
    ctx.fillStyle = '#999999'
    ctx.font = '12px monospace'
    ctx.fillText('0.550', 10, 30)
    ctx.fillText('0.500', 10, 80)
    ctx.fillText('0.450', 10, 130)
    ctx.fillText('0.400', 10, 180)

    // Draw dots
    dots.forEach((dot, index) => {
      ctx.beginPath()
      ctx.arc(dot.x, dot.y, index === hoveredDot ? 4 : 3, 0, Math.PI * 2)
      ctx.fillStyle = '#cccccc'
      ctx.fill()
    })

    // Draw single connecting line
    ctx.strokeStyle = '#ff6b00'
    ctx.lineWidth = 2
    ctx.beginPath()
    
    linePoints.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y)
      } else {
        ctx.lineTo(point.x, point.y)
      }
    })
    ctx.stroke()

    // Bar Chart
    const barWidth = canvas.width / bars.length
    bars.forEach((barHeight, index) => {
      const xPos = index * barWidth
      const yPos = canvas.height - barHeight - 20

      ctx.fillStyle = '#ff6b00'
      ctx.fillRect(xPos, yPos, barWidth - 2, barHeight)

      if (index % 6 === 0) {
        const timeLabel = `${(index % 12 || 12)} ${index < 12 ? 'AM' : 'PM'}`
        ctx.fillStyle = '#999999'
        ctx.font = '10px monospace'
        ctx.fillText(timeLabel, xPos + barWidth / 4, canvas.height - 5)
      }

      if (index === bars.length - 1) {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height - 20)
        ctx.lineTo(canvas.width, canvas.height - 20)
        ctx.stroke()
      }
    })
  }, [dots, hoveredDot, bars, linePoints])

  return (
    <div className="w-full h-[80vh] max-w-4xl bg-black p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[#999999] text-sm"
        >
          SALES
        </motion.div>
        <div className="flex gap-2">
          {['1D', '1W', '1M'].map((period) => (
            <motion.button
              key={period}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-2 py-1 rounded text-sm bg-[#333333] text-[#999999] hover:bg-[#444444]"
            >
              {period}
            </motion.button>
          ))}
        </div>
      </div>
      
      <div className="relative w-full h-full">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          style={{ imageRendering: 'pixelated' }}
        />
        
        <div className="absolute inset-0">
          {dots.map((dot, index) => (
            <motion.div
              key={index}
              className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full cursor-pointer"
              style={{ left: dot.x, top: dot.y }}
              onHoverStart={() => setHoveredDot(index)}
              onHoverEnd={() => setHoveredDot(null)}
              whileHover={{ scale: 1.5 }}
            >
              {hoveredDot === index && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: -20 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#333333] text-[#999999] text-xs rounded whitespace-nowrap"
                >
                  Value: {(0.550 - (dot.y / 300) * 0.150).toFixed(3)}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .cursor-crosshair {
          cursor: crosshair;
        }
      `}</style>
    </div>
  )
}