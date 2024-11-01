'use client'

import { motion } from 'framer-motion'
import React from 'react'

export default function TestContent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      className="overflow-hidden"
      style={{ height: 'calc(100vh - 5rem)' }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="relative z-10 h-full p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-6 h-full">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.01 }}
              className="relative flex-[0.7]"
            >
              <div className="absolute inset-0 border border-gray-800 opacity-50" />
              <div className="absolute inset-0 border border-dashed border-gray-800 opacity-30" 
                   style={{ borderSpacing: '4px' }} />
              <div className="relative bg-gray-900/50 p-6 h-full">
                <motion.span 
                  className="text-sm text-gray-500"
                  whileHover={{ color: "#ffffff" }}
                >
                  TOP COMPONENT (70%)
                </motion.span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              whileHover={{ scale: 1.01 }}
              className="relative flex-[0.3]"
            >
              <div className="absolute inset-0 border border-gray-800 opacity-50" />
              <div className="absolute inset-0 border border-dashed border-gray-800 opacity-30" 
                   style={{ borderSpacing: '4px' }} />
              <div className="relative bg-gray-900/50 p-6 h-full">
                <motion.span 
                  className="text-sm text-gray-500"
                  whileHover={{ color: "#ffffff" }}
                >
                  BOTTOM COMPONENT (30%)
                </motion.span>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full"
          >
            <div className="relative h-full">
              <div className="absolute inset-0 border border-gray-800 opacity-50" />
              <div className="absolute inset-0 border border-dashed border-gray-800 opacity-30" 
                   style={{ borderSpacing: '4px' }} />
              <div className="relative bg-gray-900/50 p-4 h-full flex flex-col">
                <motion.span 
                  className="text-sm text-gray-500 mb-4"
                  whileHover={{ color: "#ffffff" }}
                >
                  RIGHT PANEL
                </motion.span>
                
                <div className="flex-grow flex flex-col justify-between">
                  <motion.div 
                    className="mb-4"
                    variants={itemVariants}
                  >
                    <span className="text-xs text-gray-500">ALIGNED WITH TOP</span>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="mt-2 space-y-2"
                    >
                      {Array.from({ length: 3 }).map((_, j) => (
                        <motion.div
                          key={j}
                          whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.1)" }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="h-1 bg-gray-800/50 rounded-sm"
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                  
                  <div>
                    <motion.span 
                      className="text-xs text-gray-500"
                      variants={itemVariants}
                    >
                      ALIGNED WITH BOTTOM
                    </motion.span>
                    
                    {[1, 2].map((i) => (
                      <motion.div
                        key={`nomad-${i}`}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        className="mb-4"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">NOMAD</span>
                          <motion.div
                            whileHover={{ scale: 1.1, borderColor: "#ffffff" }}
                            whileTap={{ scale: 0.9 }}
                            className="w-4 h-4 border border-gray-800 cursor-pointer"
                          />
                        </div>
                        <div className="mt-2 space-y-2">
                          {Array.from({ length: 3 }).map((_, j) => (
                            <motion.div
                              key={j}
                              whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.1)" }}
                              transition={{ type: "spring", stiffness: 300 }}
                              className="h-1 bg-gray-800/50 rounded-sm"
                            />
                          ))}
                        </div>
                      </motion.div>
                    ))}

                    <motion.div
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      className="mb-4"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">BEAT</span>
                        <motion.div
                          whileHover={{ scale: 1.1, borderColor: "#ffffff" }}
                          whileTap={{ scale: 0.9 }}
                          className="w-4 h-4 border border-gray-800 cursor-pointer"
                        />
                      </div>
                      <div className="mt-2 space-y-2">
                        {Array.from({ length: 3 }).map((_, j) => (
                          <motion.div
                            key={j}
                            whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.1)" }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="h-1 bg-gray-800/50 rounded-sm"
                          />
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}