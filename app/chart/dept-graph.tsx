"use client"

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface DataPoint {
  x: number
  y: number
  price: number
  count: number
  total: number
}

export default function DeptComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [hoveredData, setHoveredData] = useState<DataPoint | null>(null)

  const generateSteppedData = (width: number, height: number): DataPoint[] => {
    const steps = 80
    const data: DataPoint[] = []
    let currentY = height - 20
    let currentX = 2.5
    let basePrice = 6.0453 // Starting price
    let count = 86 // Starting count

    while (currentX < width) {
      const price = basePrice + (currentX / width) * 0.23
      const total = price * count

      data.push({
        x: currentX,
        y: currentY,
        price: Number(price.toFixed(4)),
        count: count,
        total: Number(total.toFixed(2))
      })

      const rand = Math.random()
      const stepSize = Math.random() * 8 + 2
      
      if (rand < 0.7) {
        currentY = Math.max(30, currentY - stepSize)
        count = Math.max(1, count - Math.floor(Math.random() * 5))
      } else if (rand < 0.9) {
        currentY = currentY
      } else {
        currentY = Math.min(height - 20, currentY + stepSize / 2)
        count = count + Math.floor(Math.random() * 3)
      }

      currentX += (width - 5) / steps
    }

    return data
  }

  const findClosestDataPoint = (mouseX: number, mouseY: number, data: DataPoint[]) => {
    const threshold = 5
    return data.find(point => {
      const distance = Math.sqrt(
        Math.pow(point.x - mouseX, 2) + Math.pow(point.y - mouseY, 2)
      )
      return distance < threshold
    }) || null
  }

  const drawChart = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const width = canvas.width / window.devicePixelRatio
    const height = canvas.height / window.devicePixelRatio

    // Clear and set background
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, width, height)

    // Draw grid lines
    ctx.strokeStyle = '#333333'
    ctx.lineWidth = 0.25

    // Generate data points
    const depthData = generateSteppedData(width, height)

    // Draw vertical grid and labels
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

    // Draw horizontal grid and labels
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

    // Draw depth chart line
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

    // Draw hover effects
    if (isHovering) {
      const closestPoint = findClosestDataPoint(mousePos.x, mousePos.y, depthData)
      
      if (closestPoint) {
        // Highlight the point
        ctx.beginPath()
        ctx.arc(closestPoint.x, closestPoint.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.fill()

        // Draw info box
        const boxWidth = 160
        const boxHeight = 80
        let boxX = closestPoint.x + 10
        let boxY = closestPoint.y - boxHeight - 10

        // Adjust box position if it would go off screen
        if (boxX + boxWidth > width) boxX = closestPoint.x - boxWidth - 10
        if (boxY < 0) boxY = closestPoint.y + 10

        // Draw box background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)'
        ctx.fillRect(boxX, boxY, boxWidth, boxHeight)
        ctx.strokeStyle = '#333333'
        ctx.strokeRect(boxX, boxY, boxWidth, boxHeight)

        // Draw info text
        ctx.fillStyle = '#ffffff'
        ctx.font = '12px monospace'
        ctx.fillText(`Count: ${closestPoint.count}`, boxX + 10, boxY + 20)
        ctx.fillText(`Price: ${closestPoint.price}`, boxX + 10, boxY + 40)
        ctx.fillText(`Total: ${closestPoint.total}`, boxX + 10, boxY + 60)
      }
    }
  }

  // Rest of the component remains the same...
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
    setHoveredData(null)
  }

  return (
    <div className="w-[calc(100vw-35vw)] h-[calc(100vh-60vh)]">
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
            display: 'block'
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
      </motion.div>
    </div>
  )
}