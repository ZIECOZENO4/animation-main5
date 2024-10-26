"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [expandedLeft, setExpandedLeft] = React.useState(false);
  const [expandedRight, setExpandedRight] = React.useState(false);
  const [expandedLeftTop, setExpandedLeftTop] = React.useState(false);
  const [expandedLeftBottom, setExpandedLeftBottom] = React.useState(false);
  const [expandedRightTop, setExpandedRightTop] = React.useState(false);
  const [expandedRightBottom, setExpandedRightBottom] = React.useState(false);

  // Calculate widths based on expansion states
  const leftPanelWidth = expandedLeft ? 'w-[20px]' : 'w-1/8'; // 20px when expanded
  const rightPanelWidth = expandedRight ? 'w-[20px]' : 'w-1/8'; // 20px when expanded
  
  // Middle panel will take remaining space
  const middlePanelWidth = (expandedLeft || expandedRight) ? 'w-3/5' : 'w-1/2'; // Adjust according to side expansions

  return (
    <div className="flex justify-between items-start h-[calc(100vh-10rem)] overflow-auto w-[100vw]">
      {/* Left Panel */}
      <div className={`flex flex-col border-r transition-all duration-300 ${leftPanelWidth}`}>
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
          className={`p-2 transition-all duration-300 ${expandedLeftBottom ? 'h-full' : 'h-1/2'}`}
          onClick={() => setExpandedLeftBottom(!expandedLeftBottom)}
        >
          <div className="cursor-pointer">
            {expandedLeftBottom ? '▼' : '►'} Bottom
          </div>
          {/* Content Here */}
        </motion.div>
      </div>

      {/* Middle Panel */}
      <motion.div className={`p-4 transition-all duration-300 ${middlePanelWidth}`}>
        <div className="flex justify-between mb-4">
          {/* Button to toggle left panel width */}
          <button 
            onClick={() => setExpandedLeft(prev => !prev)} 
            className="bg-blue-500 text-white p-2 rounded"
          >
            {expandedLeft ? 'Restore Left' : 'Collapse Left'}
          </button>

          {/* Button to toggle right panel width */}
          <button 
            onClick={() => setExpandedRight(prev => !prev)} 
            className="bg-blue-500 text-white p-2 rounded"
          >
            {expandedRight ? 'Restore Right' : 'Collapse Right'}
          </button>
        </div>

        {/* Content Here */}
      </motion.div>

      {/* Right Panel */}
      <div className={`flex flex-col border-l transition-all duration-300 ${rightPanelWidth}`}>
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
          className={`p-2 transition-all duration-300 ${expandedRightBottom ? 'h-full' : 'h-1/2'}`}
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