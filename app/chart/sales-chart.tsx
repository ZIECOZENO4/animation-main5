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
      const y = Math.random() * (200 - 20) + 20
      return {
          x: x,
          y: y,
          color: '#000000',
          borderColor: Math.random() > 0.5 ? '#ffffff' : '#64748b',
          hasBorder: Math.random() > 0.3
      }
  })
}

// Modified to generate bars with more spacing
const generateBars = (count: number) => {
  return Array.from({ length: count }, () => ({
      height: Math.random() * 30 + 15,
      value: Math.random() * (105 - 0) + 0,
      isSmall: Math.random() > 0.5
  }))
}

// Generate random line points
const generateLinePoints = () => {
  // Random starting positions (top, middle, bottom)
  const basePositions = [
      { min: 30, max: 40 },  // Top
      { min: 50, max: 60 },  // Middle
      { min: 70, max: 80 }   // Bottom
  ]
  
  const selectedPosition = basePositions[Math.floor(Math.random() * basePositions.length)]
  const baseY = Math.random() * (selectedPosition.max - selectedPosition.min) + selectedPosition.min

  return [
      { x: 0, y: baseY },
      { x: 100, y: baseY },
      { x: 100, y: baseY - 15 }, // Movement up
      { x: 200, y: baseY - 15 },
      { x: 200, y: baseY + 10 }, // Movement down
      { x: 400, y: baseY + 10 },
      { x: 400, y: baseY - 10 }, // Movement up
      { x: 600, y: baseY - 10 },
      { x: 600, y: baseY }, // Return to base
      { x: 800, y: baseY }
  ]
}

export default function SalesChart() {
  const [linePoints] = useState(() => generateLinePoints())
  const [dots, setDots] = useState(() => generateDots(70))
  const [bars] = useState(() => generateBars(24))
  const [hoveredDot, setHoveredDot] = useState<number | null>(null)
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const progressRef = useRef(0)

     useEffect(() => {
        const intervalId = setInterval(() => {
            setDots(prevDots => 
                prevDots.map(dot => ({
                    ...dot,
                    x: Math.random() * 800,
                    y: Math.random() * (200 - 20) + 20
                }))
            )
        }, 10000)

        return () => clearInterval(intervalId)
    }, [])

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
          ctx.arc(dot.x + 41, dot.y, hoveredDot === index ? 4 : 2, 0, Math.PI * 2)
          
          if (dot.hasBorder) {
              ctx.strokeStyle = dot.borderColor
              ctx.lineWidth = 2
              ctx.stroke()
          }
          
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
        const barWidth = 48  // Doubled from 24 to 48
        const barSpacing = 8  // Fixed 8px spacing (px-2 equivalent)
        const availableSpace = totalWidth - (bars.length * barSpacing)
        const adjustedBarWidth = availableSpace / bars.length

        bars.forEach((bar, index) => {
            const xPos = 50 + (index * (adjustedBarWidth + barSpacing))
            const yPos = canvas.height - (bar.isSmall ? bar.height * 0.6 : bar.height) - 100

            // Draw rectangular bar without rounded corners
            ctx.beginPath()
            ctx.rect(
                xPos,
                canvas.height - 100,
                adjustedBarWidth,  // Use adjusted width to fill space
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

      // Updated bar hover detection
      const totalWidth = canvas.width - 80
      const barSpacing = 8
      const availableSpace = totalWidth - (bars.length * barSpacing)
      const adjustedBarWidth = availableSpace / bars.length

      const barIndex = bars.findIndex((_, index) => {
          const xPos = 50 + (index * (adjustedBarWidth + barSpacing))
          return x >= xPos && x <= xPos + adjustedBarWidth
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
            className="text-[#999999] text-sm  flex items-center gap-2"
          >
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8" 
            >
              <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#999999"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V3M9.5 8.5H9.51M19.5 7.5H19.51M14.5 12.5H14.51M8.5 15.5H8.51M18.5 15.5H18.51" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </motion.div>
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
                      Value: {dot.y.toFixed(2)}
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
  
          {hoveredBar !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bg-slate-800 text-slate-200 px-2 py-1 rounded text-xs"
              style={{
                left: mousePos.x + 10,
                top: mousePos.y - 20,
              }}
            >
              {bars[hoveredBar]?.value?.toFixed(1) || ''}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    )
  }