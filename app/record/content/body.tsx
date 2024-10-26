"use client";
import React, { useState } from "react";
import { motion } from 'framer-motion';
import { Card, Chip, Tabs, Tab } from "@nextui-org/react";
import FullConnectButton from '@/components/fullConnectButton';

export default function Dashboard() {
  const [expandedLeft, setExpandedLeft] = React.useState(false);
  const [expandedRight, setExpandedRight] = React.useState(false);
  const [expandedLeftTop, setExpandedLeftTop] = React.useState(false);
  const [expandedLeftBottom, setExpandedLeftBottom] = React.useState(false);
  const [expandedRightTop, setExpandedRightTop] = React.useState(false);
  const [expandedRightBottom, setExpandedRightBottom] = React.useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(event.target.value);
  };
  // Calculate widths based on expansion states
  const leftPanelWidth = expandedLeft ? 'w-1/10' : 'w-1/4'; // 20px when expanded
  const rightPanelWidth = expandedRight ? 'w-1/10' : 'w-1/4'; // 20px when expanded
  
  // Middle panel will take remaining space
  const middlePanelWidth = (expandedLeft || expandedRight) ? 'w-3/5' : 'w-1/2'; // Adjust according to side expansions

  return (
    <div className="flex justify-between items-start h-[calc(100vh-10rem)] overflow-auto w-[100vw]">
      {/* Left Panel */}
      <div className={`flex flex-col border-r transition-all duration-300 ${leftPanelWidth}`}>
        <motion.div
          className={` transition-all duration-300 ${expandedLeftTop ? 'h-1/2' : 'h-1/4'}`}
          onClick={() => setExpandedLeftTop(!expandedLeftTop)}
        >
          <div className="cursor-pointer">
            {expandedLeftTop ? '▼' : '►'} Top
          </div>
          <Card className="bg-black border rounded-none border-slate-600 mt-2 p-4">
  
            <div className="flex text-xs justify-between py-2">
              <span>Total Supply:10001</span>
              <span className=" text-xs text-gray-400">1 $1 is 0.000010 ETH ($0.023)</span>
            </div>
            <div className="flex justify-center align-middle w-full mb-4 p-2">
            <Tabs 
                   className='w-full'
                   classNames={{
                     tabList: "w-full",
                     tab: "flex-1",
                     cursor: "w-full",
                   }}
            key="transaction" variant="bordered" aria-label="Tabs variants">
          <Tab key="BUY" title="BUY" />
          <Tab key="SELL" title="SELL" />
        </Tabs>
 
            </div>
            <div className="flex text-xs justify-between  mb-4">
              <span>Total Supply:10001</span>
              <span className="text-slate-400">Set slippage: 1%</span>
            </div>
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="Enter amount"
                className="flex-grow bg-black border border-gray-700 p-2 rounded-xl"
              />
               <select
      value={selectedCurrency}
      onChange={handleChange}
      aria-label="Select Currency"
      className="bg-black text-[#F7F2DA] border border-gray-700 p-2 rounded-xl"
    >
      <option value="USD">USD</option>
      <option value="ETH">ETH</option>
      <option value="BTC">BTC</option>
      <option value="SOL">SOL</option>
    </select>
            </div>
            <div className="flex flex-grow space-x-2 mb-4">
              <Chip radius="sm" className="flex-grow p-2">
                1 ETH
              </Chip>
              <Chip radius="sm" className="flex-grow p-2">
                5 ETH
              </Chip>
              <Chip radius="sm" className="flex-grow p-2">
                10 ETH
              </Chip>
              
         
            </div>
     
            <div className="w-full">
            <FullConnectButton />
            </div>
         
          </Card>
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