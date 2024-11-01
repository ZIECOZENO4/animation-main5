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
            isClicking ? 0.95 : isPointer ? 1.1 : 1
          })`
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
          transform-origin: 0 0;
          will-change: transform;
          clip-path: polygon(
            0 0,
            0 15px,
            5px 12px,
            8px 19px,
            11px 18px,
            8px 11px,
            15px 11px
          );
          background: #111827;
          filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.3));
        }

        .custom-cursor::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          clip-path: polygon(
            0 0,
            0 15px,
            5px 12px,
            8px 19px,
            11px 18px,
            8px 11px,
            15px 11px
          );
          border: 1px solid #ffffff;
          transform: translate(-1px, -1px);
        }

        .custom-cursor::before {
          content: '';
          position: absolute;
          inset: -1px;
          clip-path: polygon(
            0 0,
            0 15px,
            5px 12px,
            8px 19px,
            11px 18px,
            8px 11px,
            15px 11px
          );
          background: #111827;
          z-index: -1;
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