'use client'

import { motion } from 'framer-motion'
import React from 'react'

export default function TestContent() {
  return (
    <div className="min-h-screen  overflow-hidden">

      <div className="relative z-10 p-6">


        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <div className=" flex flex-col align-middle gap-4">
    <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="relative mb-6" style={{ height: 'calc(70vh - 100px)' }}>
              <div className="absolute inset-0 border border-gray-800 opacity-50" />
              <div className="absolute inset-0 border border-dashed border-gray-800 opacity-30" 
                   style={{ borderSpacing: '4px' }} />
              <div className="relative bg-gray-900/50 p-6 h-full">
                <span className="text-sm text-gray-500">TOP COMPONENT (70%)</span>
              </div>
            </div>
          </motion.div>

          {/* Left Panel - Bottom (30%) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="relative" style={{ height: 'calc(30vh - 50px)' }}>
              <div className="absolute inset-0 border border-gray-800 opacity-50" />
              <div className="absolute inset-0 border border-dashed border-gray-800 opacity-30" 
                   style={{ borderSpacing: '4px' }} />
              <div className="relative bg-gray-900/50 p-6 h-full">
                <span className="text-sm text-gray-500">BOTTOM COMPONENT (30%)</span>
              </div>
            </div>
          </motion.div>
    </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 lg:row-span-2"
          >
            <div className="relative" style={{ height: 'calc(100vh - 150px)' }}>
              <div className="absolute inset-0 border border-gray-800 opacity-50" />
              <div className="absolute inset-0 border border-dashed border-gray-800 opacity-30" 
                   style={{ borderSpacing: '4px' }} />
              <div className="relative bg-gray-900/50 p-4 h-full flex flex-col">
                <span className="text-sm text-gray-500 mb-4">RIGHT PANEL</span>
                <div className="flex-grow flex flex-col justify-between">
                  {/* Content aligned with the top div */}
                  <div className="mb-4">
                    <span className="text-xs text-gray-500">ALIGNED WITH TOP</span>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="mt-2 space-y-2"
                    >
                      {Array.from({ length: 3 }).map((_, j) => (
                        <motion.div
                          key={j}
                          whileHover={{ x: 5 }}
                          className="h-1 bg-gray-800/50 rounded-sm"
                        />
                      ))}
                    </motion.div>
                  </div>
                  
                  {/* Content aligned with the bottom div */}
                  <div>
                    <span className="text-xs text-gray-500">ALIGNED WITH BOTTOM</span>
                    {/* NOMAD Sections */}
                    {[1, 2].map((i) => (
                      <motion.div
                        key={`nomad-${i}`}
                        whileHover={{ scale: 1.02 }}
                        className="mb-4"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">NOMAD</span>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-4 h-4 border border-gray-800 cursor-pointer"
                          />
                        </div>
                        <div className="mt-2 space-y-2">
                          {Array.from({ length: 3 }).map((_, j) => (
                            <motion.div
                              key={j}
                              whileHover={{ x: 5 }}
                              className="h-1 bg-gray-800/50 rounded-sm"
                            />
                          ))}
                        </div>
                      </motion.div>
                    ))}

                    {/* BEAT Section */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="mb-4"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">BEAT</span>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-4 h-4 border border-gray-800 cursor-pointer"
                        />
                      </div>
                      <div className="mt-2 space-y-2">
                        {Array.from({ length: 3 }).map((_, j) => (
                          <motion.div
                            key={j}
                            whileHover={{ x: 5 }}
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
    </div>
  )
}