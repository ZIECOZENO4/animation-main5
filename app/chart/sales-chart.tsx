"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type HoveredDot = {
  index: number
  x: number 
  y: number
} | null
  
const generateDots = (count: number) => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 800,
    y: Math.random() * (80 - 50) + 50,
    color: '#cccccc'
  }))
}

const generateBars = (count: number) => {
  return Array.from({ length: count }, () => ({
    height: Math.random() * 30 + 15,
    value: Math.random() * (105 - 0) + 0
  }))
}

export default function SalesChart() {
  const [dots] = useState(() => generateDots(70))
  const [bars] = useState(() => generateBars(24))
  const [hoveredDot, setHoveredDot] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const animationRef = useRef<number>()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const progressRef = useRef(0)



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
    const barWidth = 12
    const availableWidth = width - 80
    const barSpacing = (availableWidth / bars.length) - barWidth

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
    if (isHovering && mousePos.x >= 40 && mousePos.x <= width - 40) {
      ctx.strokeStyle = '#666666'
      ctx.lineWidth = 1
      ctx.setLineDash([5, 5])

      // Vertical line
      ctx.beginPath()
      ctx.moveTo(mousePos.x, 20)
      ctx.lineTo(mousePos.x, height - 40)
      ctx.stroke()

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

  const linePoints = [
    { x: 0, y: 70 },
    { x: 100, y: 70 },
    { x: 100, y: 50 },
    { x: 200, y: 50 },
    { x: 200, y: 60 },
    { x: 400, y: 60 },
    { x: 400, y: 50 },
    { x: 600, y: 50 },
    { x: 600, y: 60 },
    { x: 800, y: 60 }
  ]

  
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
          className="text-[#999999] text-sm  flex items-center gap-2"
        >
          <motion.svg 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="w-4 h-4" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 20V4L20 4V20" stroke="#999999" strokeWidth="2"/>
          </motion.svg>
          <motion.span
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            SALES
          </motion.span>
        </motion.div>
        <motion.div 
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          className="flex gap-2"
        >
          {['1D', '1W', '1M'].map((period) => (
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
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          style={{ imageRendering: 'pixelated' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
        
        <AnimatePresence>
          <div className="absolute inset-0 pointer-events-none">
            {dots.map((dot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.01 }}
                className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full cursor-pointer"
                style={{ left: dot.x + 41, top: dot.y }}
                onHoverStart={() => setHoveredDot(index)}
                onHoverEnd={() => setHoveredDot(null)}
                whileHover={{ scale: 1.5 }}
              >
                {hoveredDot === index && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: -20 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-slate-200 text-xs rounded whitespace-nowrap shadow-lg z-10"
                  >
                    {/* Value: {getValueFromY(dot.y)} */}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {isHovering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 pointer-events-none"
            style={{
              height: 'calc(100% - 100px)',
              width: '2px',
              backgroundColor: '#666666',
              transform: `translateX(${mousePos.x}px)`,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}