'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TestComponent() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState('Plain Text')

  const styles = ['Plain Text', 'Bold', 'Italic', 'Underline']

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleSelect = (style: string) => {
    setSelectedStyle(style)
    setIsOpen(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="relative w-64">
        <motion.button
          onClick={toggleDropdown}
          className="w-full px-4 py-2 text-left bg-[#0A0909] border-2 border-slate-800 
          focus:outline-none relative transition-all duration-200"
          style={{
            boxShadow: '4px 4px 0 0 rgba(100, 116, 139, 0.2), 8px 8px 0 0 rgba(100, 116, 139, 0.1)'
          }}
          whileHover={{
            boxShadow: '2px 2px 0 0 rgba(100, 116, 139, 0.3), 4px 4px 0 0 rgba(100, 116, 139, 0.2)',
            transition: { duration: 0.2 }
          }}
          whileTap={{
            boxShadow: '1px 1px 0 0 rgba(100, 116, 139, 0.4)',
            transform: 'translate(2px, 2px)',
          }}
        >
          <span className=" text-[#F7F2DA] tracking-wide">
            Style: {selectedStyle}
          </span>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute w-full mt-2 bg-[#0A0909] border-2 border-slate-800 
              overflow-hidden z-50"
              style={{
                boxShadow: '4px 4px 0 0 rgba(100, 116, 139, 0.2), 8px 8px 0 0 rgba(100, 116, 139, 0.1)'
              }}
            >
              {styles.map((style, index) => (
                <motion.button
                  key={style}
                  onClick={() => handleSelect(style)}
                  className="w-full px-4 py-2 text-left text-[#F7F2DA] transition-colors
                  duration-200 hover:bg-slate-800 focus:outline-none border-b border-slate-800
                  last:border-b-0  tracking-wide"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    x: 4,
                    transition: { duration: 0.2 }
                  }}
                >
                  <span className="inline-block w-6">
                    {selectedStyle === style ? '>' : ''}
                  </span>
                  {style}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @font-face {
          font-family: 'PixelFont';
          src: url('/path-to-your-pixel-font.ttf') format('truetype');
        }

        .pixel-border {
          border-image-slice: 2;
          border-image-width: 2;
          border-image-outset: 0;
          border-image-source: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAZSURBVHjaYmBgYPgPxAwwBgFGBiQBgAADAA/0APFlTbXoAAAAAElFTkSuQmCC");
          image-rendering: pixelated;
        }

        .pixel-shadow {
          filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.25))
                 drop-shadow(4px 4px 0 rgba(0, 0, 0, 0.15));
        }
      `}</style>
    </div>
  )
}