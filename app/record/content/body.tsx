"use client"
import React from 'react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [expandedMiddle, setExpandedMiddle] = React.useState(false);
  const [expandedLeftTop, setExpandedLeftTop] = React.useState(false);
  const [expandedLeftBottom, setExpandedLeftBottom] = React.useState(false);
  const [expandedRightTop, setExpandedRightTop] = React.useState(false);
  const [expandedRightBottom, setExpandedRightBottom] = React.useState(false);

  return (
    <div className="flex justify-center items-start h-screen">
      {/* Left Panel */}
      <div className={`flex flex-col border-r transition-all duration-300 ${expandedMiddle ? 'w-1/4' : 'w-1/8'}`}>
        <motion.div
          className={`p-2 transition-all duration-300 ${expandedLeftTop ? 'h-1/2' : 'h-1/4'}`}
          onClick={() => setExpandedLeftTop(!expandedLeftTop)}
        >
          <div className="cursor-pointer">
            {expandedLeftTop ? '▼' : '►'} Top
          </div>
          {/* Content Here */}
        </motion.div>
        <motion.div
          className={`p-2 transition-all duration-300 ${expandedLeftBottom ? 'h-1/2' : 'h-1/4'}`}
          onClick={() => setExpandedLeftBottom(!expandedLeftBottom)}
        >
          <div className="cursor-pointer">
            {expandedLeftBottom ? '▼' : '►'} Bottom
          </div>
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
          className={`p-2 transition-all duration-300 ${expandedRightTop ? 'h-1/2' : 'h-1/4'}`}
          onClick={() => setExpandedRightTop(!expandedRightTop)}
        >
          <div className="cursor-pointer">
            {expandedRightTop ? '▼' : '►'} Top
          </div>
          {/* Content Here */}
        </motion.div>
        <motion.div
          className={`p-2 transition-all duration-300 ${expandedRightBottom ? 'h-1/2' : 'h-1/4'}`}
          onClick={() => setExpandedRightBottom(!expandedRightBottom)}
        >
          <div className="cursor-pointer">
            {expandedRightBottom ? '▼' : '►'} Bottom
          </div>
          {/* Content Here */}
        </motion.div>
      </div>
    </div>
  );
}