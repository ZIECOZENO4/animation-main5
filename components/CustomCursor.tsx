'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  
  const cursorRef = useRef({ x: 0, y: 0 })
  const smoothRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>()

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY }
    }

    const handlePointerEvent = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') !== null ||
        target.closest('a') !== null
      )
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const smoothAnimation = () => {
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor
      }

      smoothRef.current = {
        x: lerp(smoothRef.current.x, cursorRef.current.x, 0.15),
        y: lerp(smoothRef.current.y, cursorRef.current.y, 0.15)
      }

      setPosition(smoothRef.current)
      rafRef.current = requestAnimationFrame(smoothAnimation)
    }

    smoothAnimation()

    document.addEventListener('mousemove', moveCursor)
    document.addEventListener('mousemove', handlePointerEvent)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mousemove', handlePointerEvent)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <motion.div
        className="custom-cursor"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${
            isClicking ? 0.8 : isPointer ? 1.5 : 1
          })`
        }}
      >
        <div className="cursor-shape" />
      </motion.div>
      <style jsx global>{`
        * {
          cursor: none !important;
        }

        .custom-cursor {
          pointer-events: none;
          position: fixed;
          width: 44px;
          height: 64px;
          z-index: 9999;
          transform-origin: top left;
          will-change: transform;
        }

        .cursor-shape {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(11, 4px);
          grid-template-rows: repeat(16, 4px);
          background-color: black;
          clip-path: polygon(
            0% 0%, 9.09% 0%, 9.09% 6.25%, 18.18% 6.25%, 18.18% 12.5%, 
            27.27% 12.5%, 27.27% 18.75%, 36.36% 18.75%, 36.36% 25%, 
            45.45% 25%, 45.45% 31.25%, 54.54% 31.25%, 54.54% 37.5%, 
            63.63% 37.5%, 63.63% 43.75%, 72.72% 43.75%, 72.72% 50%, 
            81.81% 50%, 81.81% 56.25%, 54.54% 56.25%, 54.54% 62.5%, 
            27.27% 62.5%, 27.27% 68.75%, 18.18% 68.75%, 18.18% 75%, 
            9.09% 75%, 9.09% 81.25%, 0% 81.25%
          );
        }

        .cursor-shape::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background-color: transparent;
          border: 2px solid #F7F2DA;
          clip-path: polygon(
            0% 0%, 9.09% 0%, 9.09% 6.25%, 18.18% 6.25%, 18.18% 12.5%, 
            27.27% 12.5%, 27.27% 18.75%, 36.36% 18.75%, 36.36% 25%, 
            45.45% 25%, 45.45% 31.25%, 54.54% 31.25%, 54.54% 37.5%, 
            63.63% 37.5%, 63.63% 43.75%, 72.72% 43.75%, 72.72% 50%, 
            81.81% 50%, 81.81% 56.25%, 54.54% 56.25%, 54.54% 62.5%, 
            27.27% 62.5%, 27.27% 68.75%, 18.18% 68.75%, 18.18% 75%, 
            9.09% 75%, 9.09% 81.25%, 0% 81.25%
          );
        }

        @media (max-width: 768px) {
          .custom-cursor {
            display: none;
          }
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  )
}

export default CustomCursor