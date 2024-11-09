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
const generateDots = (count: number) => {
  return Array.from({ length: count }, () => {
      const x = Math.random() * 800
      // Adjust y to be within 0.73 and 0.69 range in the chart
      const y = Math.random() * (180 - 20) + 20 // This will be mapped to the 0.73-0.69 range
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
  
      // Calculate dimensions
      const chartTopMargin = 5
      const chartBottomMargin = canvas.height * 0.35
      const mainChartHeight = canvas.height - chartBottomMargin - chartTopMargin
      const timeLabelsY = canvas.height - 5
      
      // Bar Chart section calculations
      const totalWidth = canvas.width - 80
      const barCount = bars.length
      const barSpacing = 16
      const availableSpace = totalWidth - ((barCount - 1) * barSpacing)
      const adjustedBarWidth = (availableSpace / barCount) * 2
  
      // Grid lines in main chart area
      ctx.strokeStyle = '#333333'
      ctx.lineWidth = 0.5
      const gridCount = 4
      const gridSpacing = mainChartHeight / gridCount
      for (let i = 0; i <= gridCount; i++) {
          const y = chartTopMargin + (i * gridSpacing)
          ctx.beginPath()
          ctx.moveTo(41, y)
          ctx.lineTo(canvas.width - 20, y)
          ctx.stroke()
      }
  
      // Y-axis labels
      ctx.fillStyle = '#666666'
      ctx.font = '12px monospace'
      const yLabels = ['0.73', '0.72', '0.71', '0.70', '0.69']
      yLabels.forEach((label, i) => {
          const y = chartTopMargin + (i * gridSpacing)
          ctx.fillText(label, 10, y + 4)
      })
  
      // Draw scattered dots
      dots.forEach((dot, index) => {
          const mappedY = chartTopMargin + ((dot.y - 20) / (180 - 20)) * mainChartHeight
          if (mappedY >= chartTopMargin && mappedY <= canvas.height - chartBottomMargin) {
              ctx.beginPath()
              ctx.arc(dot.x + 41, mappedY, hoveredDot === index ? 4 : 2, 0, Math.PI * 2)
              if (dot.hasBorder) {
                  ctx.strokeStyle = dot.borderColor
                  ctx.lineWidth = 2
                  ctx.stroke()
              }
              ctx.fillStyle = hoveredDot === index ? '#ffffff' : dot.color
              ctx.fill()
          }
      })
  
      // Draw animated main line
      ctx.strokeStyle = '#64748b'
      ctx.lineWidth = 2
      ctx.beginPath()
      const currentPoints = linePoints.filter((_, index) => index <= Math.floor(linePoints.length * progress))
      currentPoints.forEach((point, index) => {
          const mappedY = chartTopMargin + ((point.y - 20) / (180 - 20)) * mainChartHeight
          if (index === 0) {
              ctx.moveTo(point.x + 41, mappedY)
          } else {
              ctx.lineTo(point.x + 41, mappedY)
          }
      })
      ctx.stroke()
  
      // Draw time labels first (behind bars)
      const timeLabels = ['1 PM', '6 PM', '11 PM', '4 AM']
      ctx.fillStyle = '#666666'
      ctx.font = '12px monospace'
      timeLabels.forEach((label, i) => {
          const xPos = 50 + (totalWidth * (i / (timeLabels.length - 1)))
          ctx.fillText(label, xPos - 20, timeLabelsY)
      })
  
      // Draw bars
      const barStartY = timeLabelsY - 15 // Reduced gap between bars and time labels
      bars.forEach((bar, index) => {
          const xPos = 50 + (index * ((availableSpace / barCount) + barSpacing))
          const maxHeight = chartBottomMargin * 0.6
          const barHeight = bar.isSmall ? maxHeight * 0.4 : (bar.height > 25 ? maxHeight : maxHeight * 0.7)
  
          ctx.beginPath()
          ctx.rect(
              xPos,
              barStartY,
              adjustedBarWidth,
              -barHeight
          )
          ctx.strokeStyle = '#64748b'
          ctx.lineWidth = 1
          ctx.stroke()
          ctx.fillStyle = 'rgba(100, 116, 139, 0.2)'
          ctx.fill()
  
          // Show value on hover
          if (mousePos.x >= xPos && mousePos.x <= xPos + adjustedBarWidth && isHovering) {
              ctx.fillStyle = '#ffffff'
              ctx.fillText(bar.value.toFixed(1), xPos - 10, barStartY - barHeight - 10)
          }
      })
  
      // Draw baseline for bars
      ctx.beginPath()
      ctx.strokeStyle = '#333333'
      ctx.lineWidth = 2
      ctx.moveTo(40, barStartY)
      ctx.lineTo(canvas.width - 20, barStartY)
      ctx.stroke()
  
      // Enhanced hover crosshair (only in main chart area)
      if (isHovering && mousePos.y >= chartTopMargin && mousePos.y <= canvas.height - chartBottomMargin) {
          ctx.strokeStyle = '#666666'
          ctx.setLineDash([5, 5])
          
          // Vertical line
          ctx.beginPath()
          ctx.moveTo(mousePos.x, chartTopMargin)
          ctx.lineTo(mousePos.x, canvas.height - chartBottomMargin)
          ctx.stroke()
          
          // Horizontal line
          ctx.beginPath()
          ctx.moveTo(40, mousePos.y)
          ctx.lineTo(canvas.width - 20, mousePos.y)
          ctx.stroke()
          ctx.setLineDash([])
          
          // Show value
          const valueRange = 0.04
          const value = 0.73 - ((mousePos.y - chartTopMargin) / mainChartHeight) * valueRange
          ctx.fillStyle = '#ffffff'
          ctx.fillText(value.toFixed(4), mousePos.x + 10, mousePos.y - 10)
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
        className="w-[calc(100vw-35vw)] h-[calc(100vh-63vh)] container mx-auto bg-black p-4 relative"
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
        </AnimatePresence>
          {isHovering && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-0 pointer-events-none"
              style={{
                height: 'calc(100%)',
                width: '2px',
                backgroundColor: '#666666',
                transform: `translateX(${mousePos.x}px)`,
              }}
            />
          )} 
{hoveredBar !== null && (
    <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{
            position: 'absolute',
            left: Math.min(
                Math.max(mousePos.x, 120), // Minimum 120px from left
                (canvasRef.current?.width || 0) - 120 // Maximum position from right
            ),
            top: Math.min(
                Math.max(mousePos.y - 20, 100), // Minimum 100px from top
                (canvasRef.current?.height || 0) - 180 // Maximum position from bottom
            ),
            transform: 'translate(-50%, -50%)',
        }}
        className="z-50"
    >
        <Card className="w-[200px] overflow-hidden border bg-gradient-to-b from-black to-zinc-900 border-zinc-800 group">
            <motion.div 
                className="relative w-full"
                style={{ height: '100px' }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <img        
                    src="https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif" 
                    alt='graph image' 
                    className='h-full w-full object-cover'
                />
            </motion.div>
    
            <motion.div 
                className="p-2 space-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ x: 5 }}
                >
                    <span className="text-zinc-500 text-xs font-mono">#</span>
                    <span className="text-zinc-300 text-xs font-mono">{hoveredBar}</span>
                </motion.div>
    
                <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-0.5">
                        <span className="text-[10px] text-zinc-500 font-medium">POSITION</span>
                        <motion.p 
                            className="text-xs text-zinc-300 font-mono"
                            whileHover={{ x: 5 }}
                        >
                            {`X: ${mousePos.x.toFixed(0)}`}
                        </motion.p>
                    </div>
                    <div className="space-y-0.5">
                        <span className="text-[10px] text-zinc-500 font-medium">VALUE</span>
                        <motion.p 
                            className="text-xs text-zinc-300 font-mono"
                            whileHover={{ x: 5 }}
                        >
                            {bars[hoveredBar]?.value?.toFixed(1) || ''}
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
        </motion.div>
      </motion.div>
    )
  }