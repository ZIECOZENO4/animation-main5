"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type HoveredDot = {
    index: number;
    x: number;
    y: number;
} | null;

// Modified to scatter dots across the entire height
const generateDots = (count: number) => {
    return Array.from({ length: count }, () => {
        const x = Math.random() * 800
        const y = Math.random() * (200 - 20) + 20 // Increased range for more scatter
        return {
            x: x,
            y: y,
            color: '#cccccc'
        }
    })
}

// Modified to generate bars with more spacing
const generateBars = (count: number) => {
    return Array.from({ length: count }, () => ({
        height: Math.random() * 30 + 15,
        value: Math.random() * (105 - 0) + 0
    }))
}

// Generate random line points
const generateLinePoints = () => {
    const yValues = [69, 71, 72] // Possible y-values
    const randomY = yValues[Math.floor(Math.random() * yValues.length)]
    
    return [
        { x: 0, y: randomY },
        { x: 100, y: randomY },
        { x: 200, y: randomY + Math.random() * 2 - 1 },
        { x: 400, y: randomY + Math.random() * 2 - 1 },
        { x: 600, y: randomY + Math.random() * 2 - 1 },
        { x: 800, y: randomY }
    ]
}

export default function SalesChart() {
    const [dots] = useState(() => generateDots(70))
    const [bars] = useState(() => generateBars(24))
    const [hoveredDot, setHoveredDot] = useState<number | null>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>()
    const progressRef = useRef(0)
    const [linePoints] = useState(() => generateLinePoints())

    const drawChart = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, progress: number = 1) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Background
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Vertical border line
        ctx.strokeStyle = '#333333'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(40, 20)
        ctx.lineTo(40, canvas.height - 100)
        ctx.stroke()

        // Grid lines
        ctx.strokeStyle = '#333333'
        ctx.lineWidth = 0.5
        for (let i = 30; i < canvas.height - 100; i += 40) {
            ctx.beginPath()
            ctx.moveTo(41, i)
            ctx.lineTo(canvas.width - 20, i)
            ctx.stroke()
        }

        // Y-axis labels
        ctx.fillStyle = '#666666'
        ctx.font = '12px monospace'
        const yLabels = ['0.73', '0.72', '0.71', '0.70', '0.69']
        yLabels.forEach((label, i) => {
            ctx.fillText(label, 10, 30 + i * 40)
        })

        // Draw scattered dots
        dots.forEach((dot, index) => {
            ctx.beginPath()
            ctx.arc(dot.x + 41, dot.y, hoveredDot === index ? 3 : 1.5, 0, Math.PI * 2)
            ctx.fillStyle = hoveredDot === index ? '#ffffff' : dot.color
            ctx.fill()
        })

        // Draw animated main line
        ctx.strokeStyle = '#64748b'
        ctx.lineWidth = 2
        ctx.beginPath()
        
        const currentPoints = linePoints.filter((_, index) => 
            index <= Math.floor(linePoints.length * progress)
        )
        
        currentPoints.forEach((point, index) => {
            if (index === 0) {
                ctx.moveTo(point.x + 41, point.y)
            } else {
                ctx.lineTo(point.x + 41, point.y)
            }
        })
        ctx.stroke()

        // Bar Chart with increased spacing
        const totalWidth = canvas.width - 80
        const barWidth = 24 // Wider bars
        const barSpacing = (totalWidth / bars.length) - barWidth
        
        bars.forEach((bar, index) => {
            const xPos = 50 + (index * (barWidth + barSpacing))
            const yPos = canvas.height - bar.height - 100

            // Draw bar border
            ctx.strokeStyle = '#64748b'
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(xPos, canvas.height - 100)
            ctx.lineTo(xPos, yPos + 5)
            ctx.arc(xPos + barWidth/2, yPos + 5, barWidth/2, Math.PI, 0)
            ctx.lineTo(xPos + barWidth, canvas.height - 100)
            ctx.stroke()

            // Fill bar with transparency
            ctx.fillStyle = 'rgba(100, 116, 139, 0.2)'
            ctx.fill()

            // Show value on hover
            if (mousePos.x >= xPos && mousePos.x <= xPos + barWidth && isHovering) {
                ctx.fillStyle = '#ffffff'
                ctx.fillText(bar.value.toFixed(1), xPos - 10, yPos - 10)
            }
        })

        // Enhanced hover crosshair
        if (isHovering) {
            ctx.strokeStyle = '#666666'
            ctx.setLineDash([5, 5])
            
            // Vertical line
            ctx.beginPath()
            ctx.moveTo(mousePos.x, 20)
            ctx.lineTo(mousePos.x, canvas.height - 100)
            ctx.stroke()
            
            // Horizontal line
            ctx.beginPath()
            ctx.moveTo(40, mousePos.y)
            ctx.lineTo(canvas.width - 20, mousePos.y)
            ctx.stroke()
            
            ctx.setLineDash([])

            // Show value
            const value = Math.round(105 - ((mousePos.y - 20) / (canvas.height - 120)) * 105)
            ctx.fillStyle = '#ffffff'
            ctx.fillText(`Value: ${value}`, mousePos.x + 10, mousePos.y - 10)
        }

        // Time labels
        const timeLabels = ['1 PM', '6 PM', '11 PM', '4 AM']
        timeLabels.forEach((label, i) => {
            ctx.fillStyle = '#666666'
            ctx.font = '12px monospace'
            const xPos = 50 + (totalWidth * (i / (timeLabels.length - 1)))
            ctx.fillText(label, xPos - 20, canvas.height - 80)
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
                animationRef.current = requestAnimationFrame(animate)
            }
        }

        animate()

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [dots, hoveredDot, hoveredBar, bars])

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const x = (e.clientX - rect.left) * window.devicePixelRatio
        const y = (e.clientY - rect.top) * window.devicePixelRatio
        
        setMousePos({ x, y })
        setIsHovering(true)

        // Check for bar hover
        const totalWidth = canvas.width - 60
        const barWidth = 24
        const barSpacing = (totalWidth / bars.length) - barWidth * 1.5
        
        const barIndex = bars.findIndex((_, index) => {
            const xPos = 50 + (index * (barWidth + barSpacing))
            return x >= xPos && x <= xPos + barWidth
        })
        
        setHoveredBar(barIndex)

        const ctx = canvas.getContext('2d')
        if (ctx) {
            drawChart(ctx, canvas, progressRef.current)
        }
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
        setHoveredBar(null)
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
          className="text-[#999999] text-sm font-mono flex items-center gap-2"
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