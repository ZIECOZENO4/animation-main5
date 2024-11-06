"use client"

import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DeptComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const drawChart = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const width = canvas.width / window.devicePixelRatio // Remove division by 4
    const height = canvas.height / window.devicePixelRatio

    // Background
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, width, height)

    // Grid lines
    ctx.strokeStyle = '#333333'
    ctx.lineWidth = 0.25

    // Vertical grid lines - maintain original spacing but increase count
    for (let i = 2.5; i < width; i += 2.5) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, height - 15)
      ctx.stroke()
    }

    // Horizontal grid lines
    for (let i = 15; i < height - 15; i += 15) {
      ctx.beginPath()
      ctx.moveTo(2, i)
      ctx.lineTo(width, i)
      ctx.stroke()
    }

    // Y-axis labels
    ctx.fillStyle = '#666666'
    ctx.font = '10px monospace'
    const yLabels = ['105', '80', '55', '30', '0']
    yLabels.forEach((label, i) => {
      ctx.fillText(label, 0.5, 20 + i * 30)
    })

    // X-axis labels - spread across full width
    const xLabels = ['0.72', '0.78', '0.89', '0.95']
    xLabels.forEach((label, i) => {
      const x = 2.5 + (i * (width - 5) / (xLabels.length - 1))
      ctx.fillText(label, x - 7.5, height - 5)
    })

    // Generate stepped depth data points
    const steps = 20
    const pointsPerStep = 10
    const depthData = []
    
    for (let i = 0; i < steps; i++) {
      const stepProgress = i / (steps - 1)
      const baseY = height - 15 - (Math.pow(stepProgress, 2) * (height - 30))
      
      // Add horizontal line
      for (let j = 0; j < pointsPerStep; j++) {
        const x = 2.5 + ((i * pointsPerStep + j) * (width - 5) / (steps * pointsPerStep - 1))
        depthData.push({ x, y: baseY })
      }
      
      // Add vertical line if not last step
      if (i < steps - 1) {
        const nextStepProgress = (i + 1) / (steps - 1)
        const nextY = height - 15 - (Math.pow(nextStepProgress, 2) * (height - 30))
        const x = 2.5 + ((i + 1) * pointsPerStep * (width - 5) / (steps * pointsPerStep - 1))
        depthData.push({ x, y: nextY })
      }
    }

    // Draw depth line
    ctx.strokeStyle = '#64748b'
    ctx.lineWidth = 2
    ctx.beginPath()
    depthData.forEach((point, i) => {
      if (i === 0) {
        ctx.moveTo(point.x, point.y)
      } else {
        ctx.lineTo(point.x, point.y)
      }
    })
    ctx.stroke()

    // Fill area under the line
    ctx.lineTo(depthData[depthData.length - 1].x, height)
    ctx.lineTo(depthData[0].x, height)
    ctx.closePath()
    ctx.fillStyle = 'rgba(100, 116, 139, 0.2)'
    ctx.fill()

    // Draw crosshair if hovering
    if (isHovering) {
      ctx.strokeStyle = '#666666'
      ctx.setLineDash([5, 5])
      
      // Vertical line
      ctx.beginPath()
      ctx.moveTo(mousePos.x, 0)
      ctx.lineTo(mousePos.x, height - 15)
      ctx.stroke()
      
      // Horizontal line
      ctx.beginPath()
      ctx.moveTo(2, mousePos.y)
      ctx.lineTo(width, mousePos.y)
      ctx.stroke()
      
      ctx.setLineDash([])

      // Show value
      const value = Math.round(105 - ((mousePos.y) / (height - 15)) * 105)
      ctx.fillStyle = '#ffffff'
      ctx.fillText(`Value: ${value}`, mousePos.x + 10, mousePos.y - 10)
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    drawChart(ctx, canvas)
    setIsLoaded(true)
  }, [isHovering, mousePos])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) // Remove division by 4
    const y = (e.clientY - rect.top)
    
    setMousePos({ x, y })
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[200px] max-w-3xl mx-auto bg-black p-2 relative" // Restored original max-width
    >
      <motion.div 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="flex items-center gap-1 mb-2"
      >
        <motion.svg 
          initial={{ rotate: -90 }}
          animate={{ rotate: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          className="w-3 h-3"
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
          className="text-[#999999] text-xs"
        >
          DEPTH
        </motion.span>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-[calc(100%-1.5rem)]"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          style={{ imageRendering: 'pixelated' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
      </motion.div>
    </motion.div>
  )
}