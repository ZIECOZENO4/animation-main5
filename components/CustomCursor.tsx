'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX - 10, y: e.clientY - 10 }) // Adjust offset for cursor center
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
        * {
          cursor: none !important;
        }

        .custom-cursor {
          pointer-events: none;
          position: fixed;
          width: 20px;
          height: 20px;
          z-index: 9999;
          background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGKSURBVFiF7ZY9SwNBEIYfRUQQFEQQKxvBwkpQsFSwsLGwEKz8AYKVjY2NjYVgYWNhYWMhCFZWFoKFhYWIIAiCIIggCIIgJD4WO8m5l+Ry2YvgwcHdzn7MvDOzs7tGRNgkthqNfxsMbF5Y6RzYOAEVvKp+rKQ+L6zUAkR0LSKfInK1tHoRWQu2RsA4+5J1AHSAAbAH7AJvwEFoZxPzToEH4BrYD/EngAMPwAVwCrwAF8AecAe0gAugD7SBM6CXOgNt59xEBMwsM7MjM+uYWcfMOmbWNrOumbXMrGVmTTPbNrMdM9s1s10za5pZw8zqZlYzs5qZ1cxsK8yfm9nQzIZmNjCzDzMbmNm7mQ3M7M3MXs3sxcyew/izmT2Z2aOZPYT4vZndmdmtmd0EXz3n3KQFwBXQiLb3ETgM/jHQi3J6wGhVFhwDp2bWMLOGmR0BYzPri8hARN7NbGRm30DOzL7MLDezLxHJi0heRHIikhORvIjkRSQnIjkzOxCRnIjkReR/twf/9Xf8A6gCqAKoAqgCqAKoAthrAD9LonKqB5r71AAAAAElFTkSuQmCC');
          background-size: contain;
          background-repeat: no-repeat;
          image-rendering: pixelated;
        }

        .custom-cursor.clicking {
          transform: scale(0.8);
        }

        .custom-cursor.hovering {
          transform: scale(1.2);
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