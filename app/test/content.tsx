'use client'

import { motion } from 'framer-motion'
import React from 'react'

export default function TestContent() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 p-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-between items-center mb-6"
        >
          <div className="text-xl">SYSTEM</div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gray-800 rounded"
          >
            CONNECT
          </motion.button>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-2"
          >
            <div className="border border-gray-800 bg-black/50 backdrop-blur-sm p-6 rounded-lg h-[600px]">
              <div className="grid grid-cols-8 gap-2 h-full">
                {Array.from({ length: 64 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.01 }}
                    className="aspect-square border border-gray-800 rounded-sm hover:border-gray-600 transition-colors"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Panel */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-6"
          >
            {/* NOMAD Sections */}
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="border border-gray-800 bg-black/50 backdrop-blur-sm p-4 rounded-lg"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm opacity-50">NOMAD</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-6 h-6 rounded-full border border-gray-800"
                  />
                </div>
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <motion.div
                      key={j}
                      whileHover={{ x: 5 }}
                      className="h-2 bg-gray-800 rounded"
                    />
                  ))}
                </div>
              </motion.div>
            ))}

            {/* BEAT Section */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="border border-gray-800 bg-black/50 backdrop-blur-sm p-4 rounded-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm opacity-50">BEAT</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-6 h-6 rounded-full border border-gray-800"
                />
              </div>
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 5 }}
                    className="h-2 bg-gray-800 rounded"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

    </div>
  )
}