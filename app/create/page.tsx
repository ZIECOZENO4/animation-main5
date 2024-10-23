"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import React, { useState, useEffect } from 'react'
import Component from './content'
import { useRouter } from "next/navigation"

const CreatePage = () => {
  const [showPopup, setShowPopup] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setShowPopup(true)
  }, [])

  const closePopup = () => {
    setShowPopup(false)
  }

  const handleNavigation = (path: string) => {
    setShowPopup(false)
    setTimeout(() => router.push(path), 500) // Delay to allow close animation
  }

  return (
    <div className="relative">
      <Component />
      
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
         <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-80 bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: "linear-gradient(45deg, #ff00ff, #00ff00, #0000ff, #ff00ff)",
            backgroundSize: "400% 400%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 15,
            ease: "linear",
            repeat: Infinity,
          }}
        />
        <div className="relative p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Choose Token Type</h2>
            <button   aria-label='number' onClick={() => setShowPopup(false)} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
          <p className="text-sm text-gray-400">Select the type of token you want to create.</p>
          <motion.button
           onClick={closePopup} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 rounded-md text-white font-medium"
            style={{
              background: "linear-gradient(to right, #4ade80, #8b5cf6)",
            }}
          >
            Standard Token
          </motion.button>
          <motion.button
                   onClick={() => handleNavigation("/create/presale-token")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 rounded-md bg-purple-500 text-white font-medium"
          >
            Presale Token
          </motion.button>
          <button 
            className="w-full text-center text-green-400 hover:underline text-sm"
            onClick={() => handleNavigation("/create/learn-more")}
          >
            Learn More
          </button>
        </div>
      </motion.div>
        </div>
      )}
    </div>
  )
}

export default CreatePage