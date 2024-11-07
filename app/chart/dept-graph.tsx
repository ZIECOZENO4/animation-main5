"use client"

import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Define types for data points
interface DataPoint {
  x: number;
  y: number;
}

export default function DeptComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const generateSteppedData = (width: number, height: number): DataPoint[] => {
    const steps = Math.floor(width / 10)
    const data: DataPoint[] = []
    let currentY = height - 20
    let currentX = 2.5

    while (currentX < width) {
      data.push({ x: currentX, y: currentY })

      const rand = Math.random()
      const stepSize = (height / 20) * (Math.random() * 0.8 + 0.2)
      
      if (rand < 0.7) {
        currentY = Math.max(height * 0.1, currentY - stepSize)
      } else if (rand < 0.9) {
        currentY = currentY
      } else {
        currentY = Math.min(height - 20, currentY + stepSize / 2)
      }

      data.push({ x: currentX, y: currentY })
      currentX += (width - 5) / steps
      data.push({ x: currentX, y: currentY })
    }

    return data
  }

  const drawChart = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const width = canvas.width / window.devicePixelRatio
    const height = canvas.height / window.devicePixelRatio

    // Clear and set background
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, width, height)

    // Calculate grid spacing
    const verticalGridSpacing = width / 40
    const horizontalGridSpacing = height / 15

    // Grid lines
    ctx.strokeStyle = '#333333'
    ctx.lineWidth = 0.25

    // Vertical grid lines
    for (let i = 2.5; i < width; i += verticalGridSpacing) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, height - horizontalGridSpacing)
      ctx.stroke()
    }

    // Horizontal grid lines
    for (let i = horizontalGridSpacing; i < height - horizontalGridSpacing; i += horizontalGridSpacing) {
      ctx.beginPath()
      ctx.moveTo(2, i)
      ctx.lineTo(width, i)
      ctx.stroke()
    }

    // Font size calculation
    const fontSize = Math.max(10, Math.min(width, height) / 50)
    ctx.font = `${fontSize}px monospace`

    // Y-axis labels
    ctx.fillStyle = '#666666'
    const yLabels = ['111', '84', '56', '29', '1']
    yLabels.forEach((label, i) => {
      const yPos = fontSize + (i * (height - 2 * fontSize) / (yLabels.length - 1))
      ctx.fillText(label, 0.5, yPos)
    })

    // X-axis labels
    const xLabels = ['0.72', '0.78', '0.89', '0.95']
    xLabels.forEach((label, i) => {
      const x = 2.5 + (i * (width - 5) / (xLabels.length - 1))
      ctx.fillText(label, x - fontSize/2, height - 5)
    })

    // Generate and draw data
    const depthData = generateSteppedData(width, height)

    if (depthData.length > 0) {
      // Draw stepped line
      ctx.strokeStyle = '#64748b'
      ctx.lineWidth = Math.max(1, width / 500)
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
      const lastPoint = depthData[depthData.length - 1]
      const firstPoint = depthData[0]
      
      if (lastPoint && firstPoint) {
        ctx.lineTo(lastPoint.x, height)
        ctx.lineTo(firstPoint.x, height)
        ctx.closePath()
        ctx.fillStyle = 'rgba(100, 116, 139, 0.2)'
        ctx.fill()
      }
    }

    // Draw crosshair
    if (isHovering) {
      ctx.strokeStyle = '#666666'
      ctx.setLineDash([5, 5])
      
      ctx.beginPath()
      ctx.moveTo(mousePos.x, 0)
      ctx.lineTo(mousePos.x, height - horizontalGridSpacing)
      ctx.stroke()
      
      ctx.beginPath()
      ctx.moveTo(2, mousePos.y)
      ctx.lineTo(width, mousePos.y)
      ctx.stroke()
      
      ctx.setLineDash([])

      const value = Math.round(111 - ((mousePos.y) / (height - horizontalGridSpacing)) * 111)
      ctx.fillStyle = '#ffffff'
      ctx.fillText(`Value: ${value}`, mousePos.x + fontSize, mousePos.y - fontSize)
    }
  }

  // Resize observer
  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0]
      if (entry) {
        const { width, height } = entry.contentRect
        setDimensions({ width, height })
      }
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [])

  // Canvas drawing effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = dimensions.width * window.devicePixelRatio
    canvas.height = dimensions.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    drawChart(ctx, canvas)
    setIsLoaded(true)
  }, [dimensions, isHovering, mousePos])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setMousePos({ x, y })
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full bg-black py-2 px-6 relative"
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
          className="w-8 h-6"
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
          className="text-[#999999] text-xl"
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