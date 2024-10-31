'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
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

    document.addEventListener('mousemove', moveCursor)
    document.addEventListener('mousemove', handlePointerEvent)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mousemove', handlePointerEvent)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <>
      <motion.div
        className="custom-cursor"
        animate={{
          x: position.x,
          y: position.y,
          scale: isClicking ? 0.8 : isPointer ? 1.5 : 1,
          opacity: 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      <style jsx global>{`
        * {
          cursor: none !important;
        }

        .custom-cursor {
          pointer-events: none;
          position: fixed;
          width: 20px;
          height: 20px;
          z-index: 9999;
          mix-blend-mode: difference;
          transform-origin: center;
        }

        .custom-cursor::before,
        .custom-cursor::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #F7F2DA;
          transition: all 0.2s ease;
        }

        .custom-cursor::before {
          width: 2px;
          height: 20px;
        }

        .custom-cursor::after {
          width: 20px;
          height: 2px;
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