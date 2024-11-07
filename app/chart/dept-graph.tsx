"use client"

import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DeptComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const generateSteppedData = (width: number, height: number) => {
    const steps = 40 // Number of potential steps
    const data = []
    let currentY = height - 20 // Start from bottom
    let currentX = 2.5

    while (currentX < width) {
      // Add current point
      data.push({ x: currentX, y: currentY })

      // Randomly decide whether to go up, stay, or make a small down movement
      const rand = Math.random()
      const stepSize = Math.random() * 8 + 2 // Random step size between 2 and 10
      
      if (rand < 0.7) { // 70% chance to go up (overall ascending trend)
        currentY = Math.max(30, currentY - stepSize)
      } else if (rand < 0.9) { // 20% chance to stay
        currentY = currentY
      } else { // 10% chance to go down slightly
        currentY = Math.min(height - 20, currentY + stepSize / 2)
      }

      // Add point at new height (creates vertical line)
      data.push({ x: currentX, y: currentY })

      // Move right
      currentX += (width - 5) / steps
      // Add horizontal line point
      data.push({ x: currentX, y: currentY })
    }

    return data
  }

  const drawChart = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const width = canvas.width / window.devicePixelRatio
    const height = canvas.height / window.devicePixelRatio

    // Background
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, width, height)

    // Grid lines
    ctx.strokeStyle = '#333333'
    ctx.lineWidth = 0.25

    // Vertical grid lines
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
    const yLabels = ['111', '84', '56', '29', '1']
    yLabels.forEach((label, i) => {
      ctx.fillText(label, 0.5, 20 + i * 30)
    })

    // X-axis labels
    const xLabels = ['0.72', '0.78', '0.89', '0.95']
    xLabels.forEach((label, i) => {
      const x = 2.5 + (i * (width - 5) / (xLabels.length - 1))
      ctx.fillText(label, x - 7.5, height - 5)
    })

    // Generate and draw stepped data
    const depthData = generateSteppedData(width, height)

    // Draw stepped line
    ctx.strokeStyle = '#64748b'
    ctx.lineWidth = 1
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
      const value = Math.round(111 - ((mousePos.y) / (height - 15)) * 111)
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
    const x = (e.clientX - rect.left)
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
      className="w-full h-[200px] flex  mx-auto bg-black py-2 px-6 relative"
    >
    
      
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