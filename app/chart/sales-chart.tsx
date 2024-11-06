"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const generateDots = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    x: (i / (count - 1)) * 800,
    y: Math.random() * (280 - 200) + 200, // Adjusted to cluster around 0.71-0.73 range
    color: '#cccccc'
  }))
}

const generateBars = (count: number) => {
  // Create more consistent bar heights matching the image
  return Array.from({ length: count }, () => Math.random() * 30 + 15)
}

export default function SalesChart() {
  const [dots] = useState(() => generateDots(30)) // Reduced number of dots
  const [bars] = useState(() => generateBars(24))
  const [hoveredDot, setHoveredDot] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Updated line points to stay mostly at 0.71 with variations
  const linePoints = [
    { x: 0, y: 230 },    // Start at 0.71
    { x: 150, y: 230 },  // Continue at 0.71
    { x: 300, y: 225 },  // Slight variation
    { x: 450, y: 225 },  // Maintain level
    { x: 600, y: 225 },  // Continue
    { x: 800, y: 227 }   // End slightly higher
  ]

  useEffect(() => {
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

    // Grid lines
    ctx.strokeStyle = '#333333'
    ctx.lineWidth = 0.5
    for (let i = 50; i < canvas.height - 50; i += 30) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Y-axis labels
    ctx.fillStyle = '#666666'
    ctx.font = '12px monospace'
    const yLabels = ['0.74', '0.73', '0.72', '0.71', '0.70', '0.69']
    yLabels.forEach((label, i) => {
      ctx.fillText(label, 10, 50 + i * 30)
    })

    // Draw dots
    dots.forEach((dot, index) => {
      ctx.beginPath()
      ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2)
      ctx.fillStyle = '#cccccc'
      ctx.fill()
    })

    // Draw main line
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

    // Bar Chart - stretched across full width
    const totalWidth = canvas.width - 40 // Leave small margin
    const barWidth = 4
    const barSpacing = (totalWidth / bars.length) - barWidth
    
    bars.forEach((height, index) => {
      const xPos = 20 + (index * (barWidth + barSpacing))
      const yPos = canvas.height - height - 20

      ctx.fillStyle = '#ff6b00'
      ctx.fillRect(xPos, yPos, barWidth, height)
    })

    // Time labels with better spacing
    const timeLabels = ['1 PM', '6 PM', '11 PM', '4 AM']
    timeLabels.forEach((label, i) => {
      ctx.fillStyle = '#666666'
      ctx.font = '12px monospace'
      const xPos = 20 + (totalWidth * (i / (timeLabels.length - 1)))
      ctx.fillText(label, xPos - 20, canvas.height - 5)
    })

  }, [dots, hoveredDot, bars])

  return (
    <div className="w-full h-[60vh] max-w-4xl mx-auto bg-black p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[#999999] text-sm font-mono flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 20V4L20 4V20" stroke="#999999" strokeWidth="2"/>
          </svg>
          SALES
        </motion.div>
        <div className="flex gap-2">
          {['1D', '1W', '1M'].map((period) => (
            <motion.button
              key={period}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-2 py-1 rounded text-sm ${
                period === '1D' ? 'bg-[#ff6b00]' : 'bg-[#333333]'
              } text-[#999999] hover:bg-[#444444]`}
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
                  Value: {(0.74 - (dot.y / 300) * 0.05).toFixed(3)}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}