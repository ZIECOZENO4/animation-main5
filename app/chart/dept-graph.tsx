"use client"

import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DeptComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const progressRef = useRef(0)

  const generateSteps = (width: number, height: number) => {
    // Reduced number of steps with increased width
    const steps = 100 // Reduced from 200
    const stepWidth = width / steps
    const data = []
    
    for (let i = 0; i < steps; i++) {
      const x = stepWidth * i
      const progress = i / steps
      const y = height - 30 - (Math.pow(progress, 2) * (height - 60))
      data.push({ x, y })
    }
    return data
  }

  const drawChart = (
    ctx: CanvasRenderingContext2D, 
    canvas: HTMLCanvasElement,
    progress: number = 1
  ) => {
    const width = canvas.width / window.devicePixelRatio
    const height = canvas.height / window.devicePixelRatio

    // Clear and set background
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, width, height)

    // Grid lines
    ctx.strokeStyle = '#333333'
    ctx.lineWidth = 0.5

    // Vertical grid lines with increased spacing
    for (let i = 5; i < width; i += 5) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, height - 30)
      ctx.stroke()
    }

    // Horizontal grid lines with increased spacing
    for (let i = 30; i < height - 30; i += 30) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(width, i)
      ctx.stroke()
    }

    // Labels
    ctx.fillStyle = '#666666'
    ctx.font = '12px monospace'
    const yLabels = ['105', '80', '55', '30', '0']
    yLabels.forEach((label, i) => {
      ctx.fillText(label, 5, 40 + i * 40)
    })

    // Generate and draw steps
    const depthData = generateSteps(width, height)
    const currentPoints = depthData.slice(0, Math.floor(depthData.length * progress))

    // Draw main line
    ctx.strokeStyle = '#64748b' // slate-500
    ctx.lineWidth = 4 // Increased width
    ctx.beginPath()
    currentPoints.forEach((point, i) => {
      if (i === 0) {
        ctx.moveTo(point.x, point.y)
      } else {
        // Create wider steps
        ctx.lineTo(point.x, currentPoints[i - 1].y)
        ctx.lineTo(point.x, point.y)
      }
    })
    ctx.stroke()

    // Fill area under the line
    ctx.lineTo(currentPoints[currentPoints.length - 1].x, height)
    ctx.lineTo(currentPoints[0].x, height)
    ctx.closePath()
    ctx.fillStyle = 'rgba(100, 116, 139, 0.1)' // Semi-transparent slate-500
    ctx.fill()

    // Draw crosshair if hovering
    if (isHovering) {
      ctx.strokeStyle = '#666666'
      ctx.lineWidth = 1
      ctx.setLineDash([5, 5])

      // Vertical dotted line
      ctx.beginPath()
      ctx.moveTo(mousePos.x, 0)
      ctx.lineTo(mousePos.x, height)
      ctx.stroke()

      // Horizontal dotted line
      ctx.beginPath()
      ctx.moveTo(0, mousePos.y)
      ctx.lineTo(width, mousePos.y)
      ctx.stroke()

      ctx.setLineDash([])
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

    // Animate drawing
    let startTime = Date.now()
    const duration = 1000 // 1 second animation

    const animate = () => {
      const progress = Math.min((Date.now() - startTime) / duration, 1)
      progressRef.current = progress
      drawChart(ctx, canvas, progress)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsLoaded(true)
      }
    }

    animate()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) * window.devicePixelRatio
    const y = (e.clientY - rect.top) * window.devicePixelRatio
    
    setMousePos({ x, y })
    setIsHovering(true)

    const ctx = canvas.getContext('2d')
    if (ctx) {
      drawChart(ctx, canvas, progressRef.current)
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        drawChart(ctx, canvas, progressRef.current)
      }
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[200px] bg-black p-2 relative"
    >
      <motion.div 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="flex items-center gap-2 mb-2"
      >
        <motion.svg 
          initial={{ rotate: -90 }}
          animate={{ rotate: 0 }}
          whileHover={{ scale: 1.2, rotate: 180 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-4 h-4"
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 3v18h18" stroke="#64748b" strokeWidth="2" strokeLinecap="round"/>
          <path d="M7 17l4-4 4 4 4-4" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
        <motion.span 
          initial={{ x: -5, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
          className="text-slate-500 text-sm font-mono"
        >
          DEPTH
        </motion.span>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-[calc(100%-2rem)]"
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