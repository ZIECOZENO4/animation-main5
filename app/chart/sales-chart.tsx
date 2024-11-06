"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const generateDots = (count: number) => {
  return Array.from({ length: count }, () => {
    const x = Math.random() * 800
    // Position dots around the line height (50-80 range)
    const y = Math.random() * (80 - 50) + 50
    return {
      x: x,
      y: y,
      color: '#cccccc'
    }
  })
}

const generateBars = (count: number) => {
  return Array.from({ length: count }, () => Math.random() * 30 + 15)
}

export default function SalesChart() {
  const [dots] = useState(() => generateDots(70))
  const [bars] = useState(() => generateBars(24))
  const [hoveredDot, setHoveredDot] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Line points following the exact pattern from the image
  const linePoints = [
    { x: 0, y: 70 },      // Start at bottom
    { x: 100, y: 70 },    // Horizontal line
    { x: 100, y: 50 },    // Sharp vertical up
    { x: 200, y: 50 },    // Horizontal at top
    { x: 200, y: 60 },    // Sharp vertical down
    { x: 400, y: 60 },    // Long horizontal middle
    { x: 400, y: 50 },    // Sharp vertical up
    { x: 600, y: 50 },    // Horizontal at top
    { x: 600, y: 60 },    // Sharp vertical down
    { x: 800, y: 60 }     // End horizontal
  ]

  useEffect(() => {
    setIsVisible(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // Background
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Vertical border line
    ctx.strokeStyle = '#333333'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(40, 20)
    ctx.lineTo(40, canvas.height - 100)
    ctx.stroke()

    // Grid lines
    ctx.strokeStyle = '#333333'
    ctx.lineWidth = 0.5
    for (let i = 30; i < canvas.height - 100; i += 20) {
      ctx.beginPath()
      ctx.moveTo(41, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Y-axis labels
    ctx.fillStyle = '#666666'
    ctx.font = '12px monospace'
    const yLabels = ['0.73', '0.72', '0.71', '0.70', '0.69']
    yLabels.forEach((label, i) => {
      ctx.fillText(label, 10, 30 + i * 20)
    })

    // Draw dots
    dots.forEach((dot, index) => {
      ctx.beginPath()
      ctx.arc(dot.x + 41, dot.y, 1.5, 0, Math.PI * 2)
      ctx.fillStyle = '#cccccc'
      ctx.fill()
    })

    // Draw main line
    ctx.strokeStyle = '#64748b'
    ctx.lineWidth = 2
    ctx.beginPath()
    linePoints.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x + 41, point.y)
      } else {
        ctx.lineTo(point.x + 41, point.y)
      }
    })
    ctx.stroke()

    // Bar Chart
    const totalWidth = canvas.width - 60
    const barWidth = 8
    const barSpacing = (totalWidth / bars.length) - barWidth
    
    bars.forEach((height, index) => {
      const xPos = 50 + (index * (barWidth + barSpacing))
      const yPos = canvas.height - height - 100

      ctx.fillStyle = '#64748b'
      ctx.fillRect(xPos, yPos, barWidth, height)
    })

    // Time labels
    const timeLabels = ['1 PM', '6 PM', '11 PM', '4 AM']
    timeLabels.forEach((label, i) => {
      ctx.fillStyle = '#666666'
      ctx.font = '12px monospace'
      const xPos = 50 + (totalWidth * (i / (timeLabels.length - 1)))
      ctx.fillText(label, xPos - 20, canvas.height - 80)
    })

  }, [dots, hoveredDot, bars])

  const getValueFromY = (y: number) => {
    return (0.73 - ((y - 50) / (80 - 50)) * 0.04).toFixed(3)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[60vh] container mx-auto bg-black p-4 relative"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-between items-center mb-4"
      >
        <motion.div 
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="text-[#999999] text-sm font-mono flex items-center gap-2"
        >
          <motion.svg 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="w-4 h-4" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 20V4L20 4V20" stroke="#999999" strokeWidth="2"/>
          </motion.svg>
          <motion.span
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            SALES
          </motion.span>
        </motion.div>
        <motion.div 
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          className="flex gap-2"
        >
          {['1D', '1W', '1M'].map((period) => (
            <motion.button
              key={period}
              whileHover={{ scale: 1.05, backgroundColor: '#64748b' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
              className={`px-2 py-1 rounded text-sm ${
                period === '1D' ? 'bg-slate-500' : 'bg-[#333333]'
              } text-[#999999] hover:bg-slate-600`}
            >
              {period}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
      
      <motion.div 
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-full h-full"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          style={{ imageRendering: 'pixelated' }}
        />
        
        <AnimatePresence>
          <div className="absolute inset-0">
            {dots.map((dot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.01 }}
                className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full cursor-pointer"
                style={{ left: dot.x + 41, top: dot.y }}
                onHoverStart={() => setHoveredDot(index)}
                onHoverEnd={() => setHoveredDot(null)}
                whileHover={{ scale: 1.5 }}
              >
                {hoveredDot === index && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: -20 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-slate-200 text-xs rounded whitespace-nowrap shadow-lg"
                  >
                    Value: {getValueFromY(dot.y)}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}