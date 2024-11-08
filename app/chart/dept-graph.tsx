'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function DeptComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const generateSteppedData = (width: number, height: number) => {
    const steps = 80
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

    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#333333'
    ctx.lineWidth = 0.25

    const verticalSteps = width / 40
    const verticalValueStep = (0.95 - 0.72) / verticalSteps
    
    for (let i = 2.5; i < width; i += 2.5) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, height - 15)
      ctx.stroke()

      if (i % 40 === 0) {
        const value = (0.72 + (i / width) * (0.95 - 0.72)).toFixed(3)
        ctx.fillStyle = '#666666'
        ctx.font = '10px monospace'
        ctx.fillText(value, i - 15, height - 5)
      }
    }

    const horizontalSteps = height / 30
    const horizontalValueStep = 111 / horizontalSteps

    for (let i = 15; i < height - 15; i += 15) {
      ctx.beginPath()
      ctx.moveTo(2, i)
      ctx.lineTo(width, i)
      ctx.stroke()

      if (i % 30 === 0) {
        const value = Math.round(111 - (i / height) * 111)
        ctx.fillStyle = '#666666'
        ctx.font = '10px monospace'
        ctx.fillText(value.toString(), 0.5, i + 4)
      }
    }

    const depthData = generateSteppedData(width, height)

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

    ctx.lineTo(depthData[depthData.length - 1].x, height)
    ctx.lineTo(depthData[0].x, height)
    ctx.closePath()
    ctx.fillStyle = 'rgba(100, 116, 139, 0.2)'
    ctx.fill()

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

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return
      
      canvas.width = parent.offsetWidth * window.devicePixelRatio
      canvas.height = parent.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      
      drawChart(ctx, canvas)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    setIsLoaded(true)

    return () => window.removeEventListener('resize', resizeCanvas)
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
    <div className="w-[calc(100vw-35vw)] h-[calc(100vh-63vh)]">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          style={{ 
            imageRendering: 'pixelated',
            display: 'block' // Add this to remove any default spacing
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
      </motion.div>
    </div>
  )
}