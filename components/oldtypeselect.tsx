'use client'

import React, { useState } from 'react'

export default function TestComponent() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState('Plain Text')

  const styles = ['Plain Text', 'Bold', 'Italic', 'Underline']

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleSelect = (style: string) => {
    setSelectedStyle(style)
    setIsOpen(false)
  }

  const PixelatedText = ({ text }: { text: string }) => (
    <div className="pixel-text">{text}</div>
  )

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-64">
        <button
          onClick={toggleDropdown}
          className="w-full px-4 py-2 text-left bg-white border-2 border-black focus:outline-none pixelated"
        >
          <PixelatedText text={`Style: ${selectedStyle}`} />
        </button>
        {isOpen && (
          <div className="absolute w-full mt-1 bg-white border-2 border-black pixelated">
            {styles.map((style) => (
              <button
                key={style}
                onClick={() => handleSelect(style)}
                className="w-full px-4 py-2 text-left hover:bg-gray-200 focus:outline-none"
              >
                <PixelatedText text={`${style === selectedStyle ? '> ' : ''}${style}`} />
              </button>
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        .pixelated {
          image-rendering: pixelated;
          box-shadow: 
            2px 2px 0 1px #000,
            4px 4px 0 1px #000,
            6px 6px 0 1px #000,
            8px 8px 0 1px #000;
        }
        .pixel-text {
          font-family: monospace;
          font-size: 16px;
          line-height: 1;
          letter-spacing: 2px;
          white-space: nowrap;
        }
        .pixel-text::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            linear-gradient(90deg, #000 25%, transparent 25%) 0 0 / 4px 4px,
            linear-gradient(0deg, #000 25%, transparent 25%) 0 0 / 4px 4px;
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}