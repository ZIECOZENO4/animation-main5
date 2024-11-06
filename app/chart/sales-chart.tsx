"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const generateDots = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    x: (i / (count - 1)) * 800,
    y: 300 - (Math.random() * 50 + 280),
    color: '#cccccc'
  }))
}

const generateBars = (count: number) => {
  return Array.from({ length: count }, () => Math.random() * 40 + 20) // Adjusted bar heights
}

export default function SalesChart() {
  const [dots] = useState(() => generateDots(50))
  const [bars] = useState(() => generateBars(24))
  const [hoveredDot, setHoveredDot] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Define the line points to match the specific pattern
  const linePoints = [
    { x: 0, y: 230 },      // Start at 0.71
    { x: 200, y: 230 },    // Straight line at 0.71
    { x: 220, y: 240 },    // Drop to 0.70
    { x: 300, y: 240 },    // Small line at 0.70
    { x: 320, y: 250 },    // Drop to 0.69
    { x: 400, y: 250 },    // Tiny line at 0.69
    { x: 420, y: 240 },    // Rise to 0.70
    { x: 500, y: 240 },    // Small line at 0.70
    { x: 520, y: 230 },    // Rise to 0.71
    { x: 800, y: 230 }     // Complete width at 0.71
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

    // Draw the main line
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

    // Bar Chart with wider spacing
    const barWidth = 6
    const barSpacing = 15
    bars.forEach((height, index) => {
      const xPos = 50 + (index * (barWidth + barSpacing))
      const yPos = canvas.height - height - 20

      ctx.fillStyle = '#ff6b00'
      ctx.fillRect(xPos, yPos, barWidth, height)
    })

    // Time labels
    const timeLabels = ['1 PM', '6 PM', '11 PM', '4 AM']
    timeLabels.forEach((label, i) => {
      ctx.fillStyle = '#666666'
      ctx.font = '12px monospace'
      const xPos = canvas.width * (i + 1) / 5
      ctx.fillText(label, xPos - 20, canvas.height - 5)
    })

  }, [dots, hoveredDot, bars])

  return (
    <div className="w-full h-[60vh] max-w-full bg-black p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[#999999] text-sm font-mono"
        >
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