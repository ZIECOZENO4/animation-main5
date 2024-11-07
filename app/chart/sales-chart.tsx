"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card  } from "@nextui-org/react"
type HoveredDot = {
    index: number;
    x: number;
    y: number;
} | null;

type HoverInfo = {
  index: number;
  x: number;
  y: number;
  value: number;
} | null;
// Modified to scatter dots across the entire height

// Modified generateDots function
const generateDots = (count: number) => {
  return Array.from({ length: 100 }, () => {
    const x = Math.random() * (window.innerWidth - 100) // Full width minus padding
    const y = Math.random() * (window.innerHeight - 240) + 20 // Full height with padding
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
  const [dots, setDots] = useState(() => generateDots(100)) 
  const [bars] = useState(() => generateBars(24))
  const [hoveredDot, setHoveredDot] = useState<number | null>(null)
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const progressRef = useRef(0)
  const [hoverInfo, setHoverInfo] = useState<HoverInfo>(null)

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
  
      ctx.beginPath()
      ctx.moveTo(40, canvas.height - 100)
      ctx.lineTo(canvas.width - 20, canvas.height - 100)
      ctx.strokeStyle = '#64748b'
      ctx.lineWidth = 2
      ctx.stroke()

      // Vertical border line
      ctx.strokeStyle = '#333333'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(40, 20)
      ctx.lineTo(40, canvas.height - 100)
      ctx.stroke()
  
      // Calculate grid lines and labels dynamically
      const startY = 20
      const endY = canvas.height - 100
      const gridSpacing = 40
      const numberOfLines = Math.floor((endY - startY) / gridSpacing) + 1
      const maxValue = 0.73
      const minValue = 0.69
      const valueStep = (maxValue - minValue) / (numberOfLines - 1)
  
      // Draw grid lines and labels
      for (let i = 0; i < numberOfLines; i++) {
          const yPos = startY + (i * gridSpacing)
          const value = maxValue - (i * valueStep)
  
          // Draw grid line
          ctx.strokeStyle = '#333333'
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(41, yPos)
          ctx.lineTo(canvas.width - 20, yPos)
          ctx.stroke()
  
          // Draw y-axis label
          ctx.fillStyle = '#666666'
          ctx.font = '12px monospace'
          ctx.fillText(value.toFixed(3), 10, yPos + 4)
      }
  
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
      const barSpacing = 8
      const availableSpace = totalWidth - (bars.length * barSpacing)
      const adjustedBarWidth = availableSpace / bars.length
  
      bars.forEach((bar, index) => {
          const xPos = 50 + (index * (adjustedBarWidth + barSpacing))
          const yPos = canvas.height - (bar.isSmall ? bar.height * 0.6 : bar.height) - 100
  
          // Draw bar with bottom border
          ctx.beginPath()
          ctx.rect(
              xPos,
              canvas.height - 100,
              adjustedBarWidth,
              -(bar.isSmall ? bar.height * 0.6 : bar.height)
          )
          ctx.strokeStyle = '#64748b'
          ctx.lineWidth = 1
          ctx.stroke()
          ctx.fillStyle = 'rgba(100, 116, 139, 0.2)'
          ctx.fill()
  
          // Draw bottom border for bar
          ctx.beginPath()
          ctx.moveTo(xPos, canvas.height - 100)
          ctx.lineTo(xPos + adjustedBarWidth, canvas.height - 100)
          ctx.strokeStyle = '#64748b'
          ctx.lineWidth = 2
          ctx.stroke()
  
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
  
          // Show hover value
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
        className="w-[calc(100vw-40px)] h-[calc(100vh-140px)]  container mx-auto bg-black p-4 relative"
      >
      
        
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
          <AnimatePresence>
          {hoverInfo && (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0, opacity: 0 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
    style={{
      position: 'absolute',
      left: `${hoverInfo.x}px`,
      top: `${hoverInfo.y}px`,
      transform: 'translate(-50%, -150%)',
    }}
    className="z-50"
  >
    <Card className="w-[280px] overflow-hidden bg-gradient-to-b from-black to-zinc-900 border-zinc-800 group">
      <motion.div 
        className="relative aspect-square bg-[#98d7d1] p-6"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        />
        <motion.div
          className="w-full h-full flex items-center justify-center text-4xl font-mono text-black/80"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {hoverInfo.value.toFixed(4)}
        </motion.div>
      </motion.div>

      <motion.div 
        className="p-4 space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ x: 5 }}
        >
          <span className="text-zinc-500 text-sm font-mono">#</span>
          <span className="text-zinc-300 font-mono">{hoverInfo.index}</span>
        </motion.div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className="space-y-1">
            <span className="text-xs text-zinc-500 font-medium">POSITION</span>
            <motion.p 
              className="text-sm text-zinc-300 font-mono"
              whileHover={{ x: 5 }}
            >
              {`X: ${hoverInfo.x.toFixed(0)}`}
            </motion.p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-zinc-500 font-medium">VALUE</span>
            <motion.p 
              className="text-sm text-zinc-300 font-mono"
              whileHover={{ x: 5 }}
            >
              {hoverInfo.value.toFixed(4)}
            </motion.p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />
    </Card>
  </motion.div>
)}
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