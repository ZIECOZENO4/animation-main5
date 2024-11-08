"use client"

import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DeptComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const generateSteppedData = (width: number, height: number) => {
    const steps = 80 // Increased number of steps
    const data = []
    let currentY = height - 20
    let currentX = 2.5

    while (currentX < width) {
      data.push({ x: currentX, y: currentY })

      const rand = Math.random()
      const stepSize = Math.random() * 8 + 2
      
      if (rand < 0.7) {
        currentY = Math.max(30, currentY - stepSize)
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

    // Background
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, width, height)

    // Grid lines with labels
    ctx.strokeStyle = '#333333'
    ctx.lineWidth = 0.25

    // Calculate step values for vertical grid
    const verticalSteps = width / 40 // Adjust for desired density
    const verticalValueStep = (0.95 - 0.72) / verticalSteps
    
    // Vertical grid lines with labels
    for (let i = 2.5; i < width; i += 2.5) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, height - 15)
      ctx.stroke()

      // Add label every 40 pixels
      if (i % 40 === 0) {
        const value = (0.72 + (i / width) * (0.95 - 0.72)).toFixed(3)
        ctx.fillStyle = '#666666'
        ctx.font = '10px monospace'
        ctx.fillText(value, i - 15, height - 5)
      }
    }

    // Calculate step values for horizontal grid
    const horizontalSteps = height / 30 // Adjust for desired density
    const horizontalValueStep = 111 / horizontalSteps

    // Horizontal grid lines with labels
    for (let i = 15; i < height - 15; i += 15) {
      ctx.beginPath()
      ctx.moveTo(2, i)
      ctx.lineTo(width, i)
      ctx.stroke()

      // Add label every 30 pixels
      if (i % 30 === 0) {
        const value = Math.round(111 - (i / height) * 111)
        ctx.fillStyle = '#666666'
        ctx.font = '10px monospace'
        ctx.fillText(value.toString(), 0.5, i + 4)
      }
    }

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
      
      ctx.beginPath()
      ctx.moveTo(mousePos.x, 0)
      ctx.lineTo(mousePos.x, height - 15)
      ctx.stroke()
      
      ctx.beginPath()
      ctx.moveTo(2, mousePos.y)
      ctx.lineTo(width, mousePos.y)
      ctx.stroke()
      
      ctx.setLineDash([])

      const value = Math.round(111 - ((mousePos.y) / (height - 15)) * 111)
      const xValue = (0.72 + (mousePos.x / width) * (0.95 - 0.72)).toFixed(3)
      ctx.fillStyle = '#ffffff'
      ctx.fillText(`Value: ${value} (${xValue})`, mousePos.x + 10, mousePos.y - 10)
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
      className="min-w-[1024px] h-[65%] flex-grow flex mx-auto bg-black py-2 px-6 relative"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-[calc(65%-1.5rem)]"
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