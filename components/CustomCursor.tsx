'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX - 10, y: e.clientY - 10 })
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

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousemove', handlePointerEvent)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousemove', handlePointerEvent)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <>
      <motion.div
        className={`custom-cursor ${isPointer ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
        animate={{
          x: position.x,
          y: position.y,
          scale: isClicking ? 0.8 : isPointer ? 1.2 : 1,
        }}
        transition={{
          duration: 0.1,
          ease: "linear"
        }}
      />
      <style jsx global>{`
        .custom-cursor {
          pointer-events: none;
          position: fixed;
          width: 20px;
          height: 20px;
          z-index: 9999;
          background: url('/cursor.png') no-repeat center center; /* Place your cursor image in public folder */
          background-size: contain;
        }

        /* Hide default cursor */
        * {
          cursor: none !important;
        }

        /* Mobile devices */
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