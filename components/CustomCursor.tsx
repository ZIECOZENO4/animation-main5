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
        animate={{
          scale: isClicking ? 0.8 : isPointer ? 1.2 : 1,
          opacity: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          mass: 0.5
        }}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      >
        <motion.div 
          className="cursor-inner"
          animate={{
            rotate: isPointer ? 5 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10
          }}
        />
      </motion.div>
      <style jsx global>{`
        * {
          cursor: none !important;
        }

        .custom-cursor {
          pointer-events: none;
          position: fixed;
          width: 24px;
          height: 24px;
          z-index: 9999;
          transform-origin: 0 0;
          will-change: transform;
          transition: all 0.1s ease-out;
        }

        .cursor-inner {
          width: 100%;
          height: 100%;
          background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGKSURBVFiF7ZY9SwNBEIYfRUQQFEQQKxvBwkpQsFSwsLGwEKz8AYKVjY2NjYVgYWNhYWMhCFZWFoKFhYWIIAiCIIggCIIgJD4WO8m5l+Ry2YvgwcHdzn7MvDOzs7tGRNgkthqNfxsMbF5Y6RzYOAEVvKp+rKQ+L6zUAkR0LSKfInK1tHoRWQu2RsA4+5J1AHSAAbAH7AJvwEFoZxPzToEH4BrYD/EngAMPwAVwCrwAF8AecAe0gAugD7SBM6CXOgNt59xEBMwsM7MjM+uYWcfMOmbWNrOumbXMrGVmTTPbNrMdM9s1s10za5pZw8zqZlYzs5qZ1cxsK8yfm9nQzIZmNjCzDzMbmNm7mQ3M7M3MXs3sxcyew/izmT2Z2aOZPYT4vZndmdmtmd0EXz3n3KQFwBXQiLb3ETgM/jHQi3J6wGhVFhwDp2bWMLOGmR0BYzPri8hARN7NbGRm30DOzL7MLDezLxHJi0heRHIikhORvIjkzOxbRHIikheR/B/twX/9Hf8AqgCqAKoAqgCqAKoAthrAD9LonKqB5r71AAAAAElFTkSuQmCC');
          background-size: contain;
          background-repeat: no-repeat;
          filter: invert(1) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        .custom-cursor.clicking .cursor-inner {
          transform: scale(0.9);
        }

        .custom-cursor.hovering .cursor-inner {
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

        /* Add hover effect for clickable elements */
        a:hover ~ .custom-cursor,
        button:hover ~ .custom-cursor {
          transform: scale(1.2);
        }

        /* Add click effect */
        a:active ~ .custom-cursor,
        button:active ~ .custom-cursor {
          transform: scale(0.9);
        }
      `}</style>
    </>
  )
}

export default CustomCursor