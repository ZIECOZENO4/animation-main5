"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const generateDots = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    x: (i / (count - 1)) * 800,
    // Adjust Y values to spread between 0.69 and 0.72
    y: 250 - (Math.random() * 30), // 250 is 0.69 level, subtract up to 30 to reach 0.72
    color: '#cccccc'
  }))
}

const generateBars = (count: number) => {
  return Array.from({ length: count }, () => Math.random() * 30 + 15)
}

export default function SalesChart() {
  const [dots] = useState(() => generateDots(30))
  const [bars] = useState(() => generateBars(24))
  const [hoveredDot, setHoveredDot] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Updated line points to match the pattern
  const linePoints = [
    { x: 0, y: 250 },     // Start at 0.69
    { x: 100, y: 250 },   // Continue at 0.69
    { x: 200, y: 235 },   // Rise to 0.71
    { x: 300, y: 235 },   // Stay at 0.71
    { x: 400, y: 230 },   // Rise to 0.72
    { x: 500, y: 230 },   // Stay at 0.72
    { x: 600, y: 230 },   // Continue at 0.72
    { x: 800, y: 230 }    // End at 0.72
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

    // Vertical border line for labels
    ctx.strokeStyle = '#333333'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(40, 30)
    ctx.lineTo(40, canvas.height - 30)
    ctx.stroke()

    // Grid lines
    ctx.strokeStyle = '#333333'
    ctx.lineWidth = 0.5
    for (let i = 50; i < canvas.height - 50; i += 30) {
      ctx.beginPath()
      ctx.moveTo(41, i) // Start after vertical border
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
      ctx.arc(dot.x + 41, dot.y, 2, 0, Math.PI * 2) // Offset dots by vertical border
      ctx.fillStyle = '#cccccc'
      ctx.fill()
    })

    // Draw main line
    ctx.strokeStyle = '#ff6b00'
    ctx.lineWidth = 2
    ctx.beginPath()
    linePoints.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x + 41, point.y) // Offset line by vertical border
      } else {
        ctx.lineTo(point.x + 41, point.y)
      }
    })
    ctx.stroke()

    // Bar Chart
    const totalWidth = canvas.width - 80 // Account for margins and vertical border
    const barWidth = 4
    const barSpacing = (totalWidth / bars.length) - barWidth
    
    bars.forEach((height, index) => {
      const xPos = 60 + (index * (barWidth + barSpacing)) // Start after vertical border
      const yPos = canvas.height - height - 20

      ctx.fillStyle = '#ff6b00'
      ctx.fillRect(xPos, yPos, barWidth, height)
    })

    // Time labels
    const timeLabels = ['1 PM', '6 PM', '11 PM', '4 AM']
    timeLabels.forEach((label, i) => {
      ctx.fillStyle = '#666666'
      ctx.font = '12px monospace'
      const xPos = 60 + (totalWidth * (i / (timeLabels.length - 1)))
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
              style={{ left: dot.x + 41, top: dot.y }}
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