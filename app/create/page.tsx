"use client"
import { Button } from "@nextui-org/react";
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
    setTimeout(() => router.push(path), 200) // Delay to allow close animation
  }

  return (
    <div className="relative">
      <Component />
      
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
         <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-80 bg-black border-slate-800 rounded-lg shadow-lg overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 opacity-20"
       
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
            <h2 className="text-xl font-semibold text-[#F7F2DA]">Choose Token Type</h2>
            <button   aria-label='number' onClick={() => setShowPopup(false)} className="text-gray-400 hover:text-[#F7F2DA] transition-colors">
              <X size={20} />
            </button>
          </div>
          <p className="text-sm text-gray-400">Select the type of token you want to create.</p>
          <motion.button
           onClick={closePopup} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 bg-slate-500 shadow-xl border-slate-800 rounded-md text-[#F7F2DA] font-medium"
          
          >
            Standard Token
          </motion.button>
          <motion.button
         
                   onClick={() => handleNavigation("/create/presale-token")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 rounded-md  shadow-xl border-slate-800 bg-black text-[#F7F2DA] font-medium"
          >
            Presale Token
          </motion.button>
          <Button 
          variant='light'
            className="w-full text-center text-slate-500 hover:underline text-sm"
            onClick={() => handleNavigation("/create/learn-more")}
          >
            Learn More
          </Button>
        </div>
      </motion.div>
        </div>
      )}
    </div>
  )
}

export default CreatePage