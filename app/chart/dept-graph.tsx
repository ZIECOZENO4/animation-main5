"use client"

import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DeptComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
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
    ctx.lineWidth = 0.5

    // Vertical grid lines
    for (let i = 40; i < width; i += 40) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, height - 20)
      ctx.stroke()
    }

    // Horizontal grid lines
    for (let i = 20; i < height - 20; i += 20) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(width, i)
      ctx.stroke()
    }

    // Y-axis labels
    ctx.fillStyle = '#666666'
    ctx.font = '12px monospace'
    const yLabels = ['0.73', '0.72', '0.71', '0.70', '0.69']
    yLabels.forEach((label, i) => {
      ctx.fillText(label, 5, 25 + i * 30)
    })

    // Generate line points with fewer steps
    const steps = 150
    const linePoints = []
    const baseY = height * 0.7 // Base position for the line

    for (let i = 0; i < steps; i++) {
      const x = (width / steps) * i
      let y = baseY

      // Create the pattern from the image
      if (i < steps * 0.2) y = baseY
      else if (i < steps * 0.4) y = baseY - 20
      else if (i < steps * 0.6) y = baseY - 10
      else if (i < steps * 0.8) y = baseY - 15
      else y = baseY - 10

      linePoints.push({ x, y })
    }

    // Draw main line
    ctx.strokeStyle = '#64748b' // slate-500
    ctx.lineWidth = 2
    ctx.beginPath()
    linePoints.forEach((point, i) => {
      if (i === 0) {
        ctx.moveTo(point.x, point.y)
      } else {
        ctx.lineTo(point.x, point.y)
      }
    })
    ctx.stroke()

    // Draw dots
    const dots = Array.from({ length: 70 }, () => ({
      x: Math.random() * width,
      y: baseY + (Math.random() * 40 - 20)
    }))

    dots.forEach(dot => {
      ctx.beginPath()
      ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2)
      ctx.fillStyle = '#cccccc'
      ctx.fill()
    })

    setIsLoaded(true)
  }, [])

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
          className="flex items-center gap-2"
        >
          <motion.svg 
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="w-4 h-4" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              d="M3 3v18h18" 
              stroke="#999999" 
              strokeWidth="2"
            />
          </motion.svg>
          <motion.span
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="text-[#999999] text-sm font-mono"
          >
            DEPTH
          </motion.span>
        </motion.div>
        
        <motion.div 
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          className="flex gap-2"
        >
          {['1H', '1D', '1W'].map((period) => (
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
        <AnimatePresence>
          <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full cursor-crosshair"
            style={{ imageRendering: 'pixelated' }}
          />
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}