"use client"
import React from 'react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [expandedMiddle, setExpandedMiddle] = React.useState(false);
  const [expandedLeft, setExpandedLeft] = React.useState(false);
  const [expandedRight, setExpandedRight] = React.useState(false);

  return (
    <div className="flex justify-center items-start h-screen bg-black text-white">
      {/* Left Panel */}
      <div className={`flex flex-col border-r transition-all duration-300 ${expandedMiddle ? 'w-1/4' : 'w-1/8'}`}>
        <motion.div
          className={`p-2 transition-all duration-300 ${expandedLeft ? 'h-full' : 'h-1/2'}`}
          onClick={() => setExpandedLeft(!expandedLeft)}
        >
          <div className="cursor-pointer">
            {expandedLeft ? '▼' : '►'} Expand Left
          </div>
          {/* Content Here */}
        </motion.div>
        <motion.div
          className={`p-2 transition-all duration-300 h-1/2`}
        >
          {/* Content Here */}
        </motion.div>
      </div>

      {/* Middle Panel */}
      <motion.div
        className={`p-4 transition-all duration-300 ${expandedMiddle ? 'w-full' : 'w-1/2'}`}
        onClick={() => setExpandedMiddle(!expandedMiddle)}
      >
        <div className="cursor-pointer">
          {expandedMiddle ? '▼' : '►'} Expand Middle
        </div>
        {/* Content Here */}
      </motion.div>

      {/* Right Panel */}
      <div className={`flex flex-col border-l transition-all duration-300 ${expandedMiddle ? 'w-1/4' : 'w-1/8'}`}>
        <motion.div
          className={`p-2 transition-all duration-300 ${expandedRight ? 'h-full' : 'h-1/2'}`}
          onClick={() => setExpandedRight(!expandedRight)}
        >
          <div className="cursor-pointer">
            {expandedRight ? '▼' : '►'} Expand Right
          </div>
          {/* Content Here */}
        </motion.div>
        <motion.div
          className={`p-2 transition-all duration-300 h-1/2`}
        >
          {/* Content Here */}
        </motion.div>
      </div>
    </div>
  );
}