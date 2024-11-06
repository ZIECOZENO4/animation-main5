"use client"

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function DeptComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size with device pixel ratio
    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const width = canvas.width / window.devicePixelRatio
    const height = canvas.height / window.devicePixelRatio

    // Background
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, width, height)

    // Grid lines
    ctx.strokeStyle = '#333333'
    ctx.lineWidth = 0.25 // Reduced from 0.5

    // Vertical grid lines
    for (let i = 2.5; i < width; i += 2.5) { // Adjusted from 5 to 2.5
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, height - 15) // Adjusted from 30 to 15
      ctx.stroke()
    }

    // Horizontal grid lines
    for (let i = 15; i < height - 15; i += 15) { // Adjusted from 30 to 15
      ctx.beginPath()
      ctx.moveTo(2, i) // Adjusted from 4 to 2
      ctx.lineTo(width, i)
      ctx.stroke()
    }

    // Y-axis labels
    ctx.fillStyle = '#666666'
    ctx.font = '10px monospace' // Reduced from 12px
    const yLabels = ['105', '80', '55', '30', '0']
    yLabels.forEach((label, i) => {
      ctx.fillText(label, 0.5, 20 + i * 30) // Adjusted from 1 and 40 to 0.5 and 20
    })

    // X-axis labels
    const xLabels = ['0.72', '0.78', '0.89', '0.95']
    xLabels.forEach((label, i) => {
      const x = 2.5 + (i * (width - 5) / (xLabels.length - 1)) // Adjusted from 5 and 10 to 2.5 and 5
      ctx.fillText(label, x - 7.5, height - 5) // Adjusted from -15 and -10 to -7.5 and -5
    })

    // Generate 200 depth data points
    const depthData = Array.from({ length: 200 }, (_, i) => {
      const x = 2.5 + (i * (width - 5) / 199) // Adjusted from 5 and 10 to 2.5 and 5
      const progress = i / 199
      // Exponential curve to simulate depth increase
      const y = height - 15 - (Math.pow(progress, 2) * (height - 30))
      return { x, y }
    })

    // Draw depth line
    ctx.strokeStyle = '#ff4400'
    ctx.lineWidth = 1 // Reduced from 2
    ctx.beginPath()
    depthData.forEach((point, i) => {
      if (i === 0) {
        ctx.moveTo(point.x, point.y)
      } else {
        // Create step effect
        ctx.lineTo(point.x, depthData[i - 1].y)
        ctx.lineTo(point.x, point.y)
      }
    })
    ctx.stroke()

    // Fill area under the line
    ctx.lineTo(depthData[depthData.length - 1].x, height)
    ctx.lineTo(depthData[0].x, height)
    ctx.closePath()
    ctx.fillStyle = 'rgba(255, 68, 0, 0.1)' // Semi-transparent orange
    ctx.fill()

    setIsLoaded(true)
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[200px] max-w-3xl mx-auto bg-black p-2 relative" // Adjusted height and padding
    >
      <motion.div 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="flex items-center gap-1 mb-2" // Adjusted gap and margin
      >
        <motion.svg 
          initial={{ rotate: -90 }}
          animate={{ rotate: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          className="w-3 h-3" // Reduced from w-4 h-4
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 3v18h18" stroke="#999999" strokeWidth="2" strokeLinecap="round"/>
          <path d="M7 17l4-4 4 4 4-4" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
        <motion.span 
          initial={{ x: -5, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
          className="text-[#999999] text-xs font-mono" // Reduced from text-sm
        >
          DEPTH
        </motion.span>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-[calc(100%-1.5rem)]" // Adjusted from 2rem to 1.5rem
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ imageRendering: 'pixelated' }}
        />
      </motion.div>
    </motion.div>
  )
}