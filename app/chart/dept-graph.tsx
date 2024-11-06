"use client"

import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Point {
  x: number;
  y: number;
  value?: number;
}

export default function DeptComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const progressRef = useRef(0)

  const generateBars = (count: number) => {
    return Array.from({ length: count }, () => ({
      height: Math.random() * 60 + 30, // Doubled height
      value: Math.random() * (105 - 0) + 0
    }))
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

    // Vertical grid lines
    for (let i = 40; i < width - 40; i += 40) {
      ctx.beginPath()
      ctx.moveTo(i, 20)
      ctx.lineTo(i, height - 40)
      ctx.stroke()
    }

    // Horizontal grid lines
    for (let i = 20; i < height - 40; i += 20) {
      ctx.beginPath()
      ctx.moveTo(40, i)
      ctx.lineTo(width - 40, i)
      ctx.stroke()
    }

    // Labels
    ctx.fillStyle = '#666666'
    ctx.font = '12px monospace'
    const yLabels = ['105', '80', '55', '30', '0']
    yLabels.forEach((label, i) => {
      ctx.fillText(label, 10, 30 + i * ((height - 60) / 4))
    })

    // Generate and draw bars
    const bars = generateBars(24)
    const barWidth = 24 // Doubled width
    const availableWidth = width - 80
    const barSpacing = (availableWidth / bars.length) - barWidth * 1.5 // Increased spacing

    bars.forEach((bar, i) => {
      if (i < Math.floor(bars.length * progress)) {
        const xPos = 40 + (i * (barWidth + barSpacing))
        const yPos = height - 40 - bar.height

        // Draw bar with rounded top
        ctx.beginPath()
        ctx.moveTo(xPos, height - 40)
        ctx.lineTo(xPos, yPos + barWidth/2)
        ctx.arc(xPos + barWidth/2, yPos + barWidth/2, barWidth/2, Math.PI, 0)
        ctx.lineTo(xPos + barWidth, height - 40)
        
        // Bar border
        ctx.strokeStyle = '#64748b'
        ctx.lineWidth = 1
        ctx.stroke()
        
        // Bar fill
        ctx.fillStyle = 'rgba(100, 116, 139, 0.2)'
        ctx.fill()
      }
    })

    // Draw crosshair
    if (isHovering) {
      ctx.strokeStyle = '#666666'
      ctx.lineWidth = 1
      ctx.setLineDash([5, 5])

      // Vertical line
      if (mousePos.x >= 40 && mousePos.x <= width - 40) {
        ctx.beginPath()
        ctx.moveTo(mousePos.x, 20)
        ctx.lineTo(mousePos.x, height - 40)
        ctx.stroke()
      }

      // Horizontal line
      if (mousePos.y >= 20 && mousePos.y <= height - 40) {
        ctx.beginPath()
        ctx.moveTo(40, mousePos.y)
        ctx.lineTo(width - 40, mousePos.y)
        ctx.stroke()
      }

      ctx.setLineDash([])

      // Draw value
      const value = Math.round(105 - ((mousePos.y - 20) / (height - 60)) * 105)
      ctx.fillStyle = '#666666'
      ctx.fillText(value.toString(), 10, mousePos.y + 4)
    }

    // Time labels
    const timeLabels = ['1 PM', '6 PM', '11 PM', '4 AM']
    timeLabels.forEach((label, i) => {
      const xPos = 40 + (availableWidth * (i / (timeLabels.length - 1)))
      ctx.fillStyle = '#666666'
      ctx.fillText(label, xPos - 15, height - 20)
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    let startTime = Date.now()
    const duration = 1000

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

    const handleResize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      drawChart(ctx, canvas, progressRef.current)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
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
          className="text-slate-500 text-sm "
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