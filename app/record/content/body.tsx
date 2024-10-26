"use client"
import React from 'react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [expandedLeft, setExpandedLeft] = React.useState(false);
  const [expandedRight, setExpandedRight] = React.useState(false);

  return (
    <div className="flex justify-center items-start h-screen">
      {/* Left Panel */}
      <motion.div
        className={`p-4 border-r transition-all duration-300 ${
          expandedLeft ? 'w-1/2' : 'w-1/4'
        }`}
        onClick={() => setExpandedLeft(!expandedLeft)}
      >
        <div className="cursor-pointer">
          {expandedLeft ? '▼' : '►'}
        </div>
        {/* Content Here */}
        hello world
      </motion.div>

      {/* Middle Panel */}
      <motion.div
        className={`p-4 transition-all duration-300 ${
          expandedLeft || expandedRight ? 'w-1/4' : 'w-1/2'
        }`}
      >
            hello world
        {/* Content Here */}
      </motion.div>

      {/* Right Panel */}
      <motion.div
        className={`p-4 border-l transition-all duration-300 ${
          expandedRight ? 'w-1/2' : 'w-1/4'
        }`}
        onClick={() => setExpandedRight(!expandedRight)}
      >
        <div className="cursor-pointer">
          {expandedRight ? '▼' : '►'}
        </div>
        hello world
        {/* Content Here */}
      </motion.div>
    </div>
  );
}