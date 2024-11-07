"use client"

import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DataPoint {
  x: number;
  y: number;
}

interface Bar {
  height: number;
  value: number;
  isSmall: boolean;
}

export default function DeptComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [bars] = useState<Bar[]>(() => 
    Array.from({ length: 24 }, () => ({
      height: Math.random() * 30 + 15,
      value: Math.random() * (105 - 0) + 0,
      isSmall: Math.random() > 0.5
    }))
  )
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  const drawChart = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
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
      ctx.moveTo(i, 20)
      ctx.lineTo(i, height - 40)
      ctx.stroke()
    }

    // Horizontal grid lines
    for (let i = 20; i < height - 40; i += 40) {
      ctx.beginPath()
      ctx.moveTo(40, i)
      ctx.lineTo(width - 20, i)
      ctx.stroke()
    }

    // Bar Chart
    const totalWidth = width - 80
    const barWidth = 48 // Doubled width
    const barSpacing = 8 // Fixed 8px spacing
    const availableSpace = totalWidth - (bars.length * barSpacing)
    const adjustedBarWidth = availableSpace / bars.length

    bars.forEach((bar, index) => {
      const xPos = 50 + (index * (adjustedBarWidth + barSpacing))
      const yPos = height - (bar.isSmall ? bar.height * 0.6 : bar.height) - 40

      // Draw bar
      ctx.beginPath()
      ctx.rect(
        xPos,
        height - 40,
        adjustedBarWidth,
        -(bar.isSmall ? bar.height * 0.6 : bar.height)
      )
      ctx.strokeStyle = '#64748b'
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.fillStyle = 'rgba(100, 116, 139, 0.2)'
      ctx.fill()

      // Show value on hover
      if (mousePos.x >= xPos && mousePos.x <= xPos + adjustedBarWidth && isHovering) {
        ctx.fillStyle = '#ffffff'
        ctx.font = '12px monospace'
        ctx.fillText(bar.value.toFixed(1), xPos - 10, yPos - 10)
      }
    })

    // Time labels
    const timeLabels = ['1 PM', '6 PM', '11 PM', '4 AM']
    ctx.fillStyle = '#666666'
    ctx.font = '12px monospace'
    timeLabels.forEach((label, i) => {
      const xPos = 50 + (totalWidth * (i / (timeLabels.length - 1)))
      ctx.fillText(label, xPos - 20, height - 20)
    })

    // Draw crosshair
    if (isHovering) {
      ctx.strokeStyle = '#666666'
      ctx.setLineDash([5, 5])
      
      ctx.beginPath()
      ctx.moveTo(mousePos.x, 20)
      ctx.lineTo(mousePos.x, height - 40)
      ctx.stroke()
      
      ctx.beginPath()
      ctx.moveTo(40, mousePos.y)
      ctx.lineTo(width - 20, mousePos.y)
      ctx.stroke()
      
      ctx.setLineDash([])

      // Show hover value
      const value = Math.round(111 - ((mousePos.y - 20) / (height - 60)) * 111)
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
  }, [isHovering, mousePos, bars])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setMousePos({ x, y })
    setIsHovering(true)

    // Bar hover detection
    const totalWidth = canvas.width / window.devicePixelRatio - 80
    const barSpacing = 8
    const availableSpace = totalWidth - (bars.length * barSpacing)
    const adjustedBarWidth = availableSpace / bars.length
    
    const barIndex = bars.findIndex((_, index) => {
      const xPos = 50 + (index * (adjustedBarWidth + barSpacing))
      return x >= xPos && x <= xPos + adjustedBarWidth
    })
    
    setHoveredBar(barIndex)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setHoveredBar(null)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full bg-black relative"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 p-4"
      >
        <motion.div 
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-6"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path 
              d="M3 3v18h18" 
              stroke="#999999" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
            <path 
              d="M7 17l4-4 4 4 4-4" 
              stroke="#999999" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
        <motion.span 
          className="text-[#999999] text-sm"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          DEPTH
        </motion.span>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-[calc(100%-4rem)]"
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