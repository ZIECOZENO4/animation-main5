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

  const BorderComponent = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
    <div className="relative h-full">
      <div className="relative bg-gray-900/50 p-6 h-full">
        {children}
      </div>
      {/* Top border */}
      <div 
        className="absolute -top-[2px] -right-[2px] -left-[2px]"
        style={{
          height: '2px',
          backgroundImage: `
            repeating-linear-gradient(to right, 
              #555555 0, #555555 2px, 
              transparent 2px, transparent 4px,
              #555555 4px, #555555 8px, 
              transparent 8px, transparent 12px
            )
          `,
        }}
      />
      {/* Bottom border */}
      <div 
        className="absolute -bottom-[2px] -right-[2px] -left-[2px]"
        style={{
          height: '2px',
          backgroundImage: `
            repeating-linear-gradient(to right, 
              #555555 0, #555555 2px, 
              transparent 2px, transparent 4px,
              #555555 4px, #555555 8px, 
              transparent 8px, transparent 12px
            )
          `,
        }}
      />
      {/* Left border */}
      <div 
        className="absolute -left-[2px] -top-[2px] -bottom-[2px]"
        style={{
          width: '2px',
          backgroundImage: `
            repeating-linear-gradient(to bottom, 
              #555555 0, #555555 2px, 
              transparent 2px, transparent 4px,
              #555555 4px, #555555 8px, 
              transparent 8px, transparent 12px
            )
          `,
        }}
      />
      {/* Right border */}
      <div 
        className="absolute -right-[2px] -top-[2px] -bottom-[2px]"
        style={{
          width: '2px',
          backgroundImage: `
            repeating-linear-gradient(to bottom, 
              #555555 0, #555555 2px, 
              transparent 2px, transparent 4px,
              #555555 4px, #555555 8px, 
              transparent 8px, transparent 12px
            )
          `,
        }}
      />
    </div>
  )

  const BoxComponent = ({ title }: { title: string }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className="mb-4"
    >
      <BorderComponent>
        <div className="flex justify-between items-center p-2">
          <span className="text-xs text-gray-500">{title}</span>
          <motion.div
            whileHover={{ scale: 1.1, borderColor: "#ffffff" }}
            whileTap={{ scale: 0.9 }}
            className="w-4 h-4 border border-gray-800 cursor-pointer"
          />
        </div>
      </BorderComponent>
    </motion.div>
  )

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
          <div className="flex flex-col gap-6 h-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.01 }}
              className="relative h-[65%]"
            >
              <BorderComponent>
                <motion.span 
                  className="text-sm text-gray-500"
                  whileHover={{ color: "#ffffff" }}
                >
                  TOP COMPONENT (65%)
                </motion.span>
              </BorderComponent>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              whileHover={{ scale: 1.01 }}
              className="relative h-[35%]"
            >
              <BorderComponent>
                <motion.span 
                  className="text-sm text-gray-500"
                  whileHover={{ color: "#ffffff" }}
                >
                  BOTTOM COMPONENT (35%)
                </motion.span>
              </BorderComponent>
            </motion.div>
          </div>

             {/* Right Column */}
             <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full"
          >
            <BorderComponent>
              <div className="flex flex-col h-full gap-4">
                {/* Top Section */}
                <div className="space-y-4">
                  {/* First Row */}
                  <div className="flex gap-4">
                    <div className="w-[80%] h-[51px]">
                      <BorderComponent>
                           <div className="flex justify-between align-middle items-center">
                        <span className="text-xs text-gray-500"></span>
                          <span className="text-xs text-gray-500">NOMAD</span>
                         
                        </div>
                      </BorderComponent>
                    </div>
                    <div className="w-[20%] h-[51px]">
                      <BorderComponent>
                   
                      </BorderComponent>
                    </div>
                  </div>
                  {/* Second Row - Full Width */}
                  <div className="w-full h-[51px]">
                    <BorderComponent>
                    <div className="flex justify-between align-middle items-center">
                        <span className="text-xs text-gray-500"></span>
                          <span className="text-xs text-gray-500">BEAT</span>
                         
                        </div>
                    </BorderComponent>
                  </div>
                </div>

                {/* Middle Empty Section with Border */}
                <div className="flex-grow h-1">
                  <BorderComponent />
                </div>



                <div className="space-y-4">
                  {/* First Row */}
                  <div className="flex gap-4">
                    <div className="w-[80%] h-[51px]">
                      <BorderComponent>
                        <div className="flex justify-between align-middle items-center">
                        <span className="text-xs text-gray-500"></span>
                          <span className="text-xs text-gray-500">NOMAD</span>
                         
                        </div>
                      </BorderComponent>
                    </div>
                    <div className="w-[20%] h-[51px]">
                      <BorderComponent>
                        
                      </BorderComponent>
                    </div>
                  </div>
                  {/* Second Row */}
                  <div className="flex gap-4">
                    <div className="w-[80%] h-[51px]">
                      <BorderComponent>
                        <div className="flex justify-between items-center">
                    
                          <span className="text-xs text-gray-500"></span>
                          <span className="text-xs text-gray-500">NOMAD</span>
                        </div>
                      </BorderComponent>
                    </div>
                    <div className="w-[20%] h-[51px]">
                      <BorderComponent>
                     
                      </BorderComponent>
                    </div>
                  </div>
                  {/* Third Row - Full Width */}
                  <div className="w-full h-[51px]">
                    <BorderComponent>
                    <div className="flex justify-between align-middle items-center">
                        <span className="text-xs text-gray-500"></span>
                          <span className="text-xs text-gray-500">BEAT</span>
                         
                        </div>
                    </BorderComponent>
                  </div>
                </div>
              </div>
            </BorderComponent>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}