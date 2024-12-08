

"use client";
import React, { useState, useCallback  } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Chip, Tabs, Tab } from "@nextui-org/react";
import FullConnectButton from '@/components/fullConnectButton';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import ActivityComponent from "./activity-table";
import MainComponent from "./maincontent";
import ActivityPieChart from './ActivityPieChart';
interface Holder {
  address: string
  label: string
  percentage: number
}

interface Transaction {
  id: string
  account: string
  type: 'SELL' | 'BUY'
  in: string
  out: string
  chains: string
  time: string
}

const initialTransactions: Transaction[] = [
  {
    id: '1',
    account: '0xfaffedce',
    type: 'SELL',
    in: '0.349002400000 test2',
    out: '0.005855625957 ETH',
    chains: 'ETH',
    time: 'Oct 25, 2024 07:27:14 (2 days ago)'
  },
  {
    id: '2',
    account: '0xfaffedce',
    type: 'SELL',
    in: '0.500000000000 test2',
    out: '0.009846226006 ETH',
    chains: 'ETH',
    time: 'Oct 25, 2024 07:26:33 (2 days ago)'
  },
  {
    id: '3',
    account: '0xfaffedce',
    type: 'BUY',
    in: '0.015789455460 ETH',
    out: '0.849024021284 test2',
    chains: 'ETH',
    time: 'Oct 25, 2024 07:19:46 (2 days ago)'
  }
]

const holders: Holder[] = [
  { address: '0xe33b...38a1', label: 'Kannon', percentage: 68.33 },
  { address: '0xfedc...a2b1', label: 'Pool', percentage: 31.87 },
  { address: '0x5531...8512', label: 'Sale', percentage: 63.33 },
]

export default function Dashboard() {
  const [leftWidth, setLeftWidth] = useState(300)
  const [rightWidth, setRightWidth] = useState(300)
  const [leftTopHeight, setLeftTopHeight] = useState(300)
  const [leftBottomHeight, setLeftBottomHeight] = useState(300)
  const [rightTopHeight, setRightTopHeight] = useState(300)
  const [rightBottomHeight, setRightBottomHeight] = useState(300)
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [includeBondingCurve, setIncludeBondingCurve] = useState(true)
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [filter, setFilter] = useState<'ALL' | 'SELL' | 'BUY'>('ALL')

  const handleFilter = (type: 'ALL' | 'SELL' | 'BUY') => {
    setFilter(type)
    if (type === 'ALL') {
      setTransactions(initialTransactions)
    } else {
      setTransactions(initialTransactions.filter(t => t.type === type))
    }
  }

  const toggleBondingCurve = () => {
    setIncludeBondingCurve(!includeBondingCurve)
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(event.target.value)
  }

  const startResize = useCallback((setSize: React.Dispatch<React.SetStateAction<number>>, horizontal: boolean) => (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const startPos = horizontal ? e.clientX : e.clientY
    const startSize = horizontal ? (setSize === setLeftWidth ? leftWidth : rightWidth) : 
                                   (setSize === setLeftTopHeight ? leftTopHeight : 
                                    setSize === setLeftBottomHeight ? leftBottomHeight :
                                    setSize === setRightTopHeight ? rightTopHeight : rightBottomHeight)

    const doDrag = (e: MouseEvent) => {
      const currentPos = horizontal ? e.clientX : e.clientY
      const newSize = startSize + (horizontal ? startPos - currentPos : currentPos - startPos)
      setSize(Math.max(100, newSize)) // Minimum size of 100px
    }

    const stopDrag = () => {
      document.removeEventListener('mousemove', doDrag)
      document.removeEventListener('mouseup', stopDrag)
    }

    document.addEventListener('mousemove', doDrag)
    document.addEventListener('mouseup', stopDrag)
  }, [leftWidth, rightWidth, leftTopHeight, leftBottomHeight, rightTopHeight, rightBottomHeight])

  return (
    <div className="flex justify-between items-stretch md:overflow-hidden w-[100vw]">
      {/* Left Panel */}
      <div className={`flex flex-col border-slate-800 transition-all overflow-auto w-[25%]  overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-300 duration-300 `} style={{ width: leftWidth }}>
        <motion.div
          className={` transition-all duration-300 `}
     
          style={{ height: leftTopHeight, overflow: 'auto' }}
        >
          <div className="p-2 bg-black border border-slate-800 text-sm gap-4 text-center align-middle text-slate-500 ">
<p>Start Transaction</p>
          
          </div>
          <div className="h-full overflow-y-auto">
          <Card className="bg-black border rounded-none border-slate-800  p-2">
  
            <div className="flex text-xs justify-center flex-col gap-4 py-2">
              <span>Total Supply:10001</span>
              <span className=" text-xs text-slate-500">1 $1 is 0.000010 ETH ($0.023)</span>
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
                className="flex-grow bg-black border border-slate-800 p-2 rounded-xl"
              />
               <select
      value={selectedCurrency}
      onChange={handleChange}
      aria-label="Select Currency"
      className="bg-black text-[#F7F2DA] border border-slate-800 p-2 rounded-xl"
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
          </div>
        
        </motion.div>
        <div 
          className="h-1 bg-gray-600 cursor-row-resize" 
          onMouseDown={startResize(setLeftTopHeight, false)}
        />
           <div className="h-full overflow-y-auto">
          <motion.div
          className={` transition-all duration-300 mb-[10rem] `}
          style={{ height: `calc(100% - ${leftTopHeight}px)`, overflow: 'auto' }}
    
        >
          
          <div className="p-2 bg-black border border-slate-800 text-sm  gap-4 text-center align-middle text-slate-500 ">
<p>Token Top Holders</p>
         
          </div>
          <div className="h-full overflow-y-auto">
          <div className="bg-black text-[#F7F2DA] border border-slate-800 h-full overflow-y-auto">
      <div className="flex justify-center flex-col gap-4 items-center mb-2 p-2">
        <h2 className="text-xl gap-2 font-bold">Holders Distribution</h2>
        <button
          onClick={toggleBondingCurve}
          className="bg-slate-500 text-xs font-medium p-2 rounded-full hover:bg-slate-600 transition-colors"
        >
          {includeBondingCurve ? "Including" : "Excluding"} Bonding Curve
        </button>
      </div>
      <hr className='w-full text-slate-500 border border-slate-800  bg-slate-800 mb-2 px-4' />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {holders.map((holder, index) => (
          <motion.div
            key={holder.address}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-4 px-4"
          >
            <div className="flex justify-between text-sm mb-1">
              <span>{holder.address}</span>
              <AnimatePresence>
                {includeBondingCurve && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {holder.percentage.toFixed(5)}%
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-center">
              <AnimatePresence>
                {includeBondingCurve && (
                  <motion.div
                    className="h-2 rounded-full bg-gradient-to-r from-slate-300 to-slate-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${holder.percentage}%` }}
                    exit={{ width: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {includeBondingCurve && holder.label && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="ml-2 text-xs bg-slate-500 px-2 py-0.5 rounded-full"
                  >
                    {holder.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <hr className='w-full text-slate-500 bg-slate-500' />
      <div className="flex justify-between text-xs items-center my-6 text-gray-500 px-4">
        <button className="flex items-center">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>
        <span>Page 1</span>
        <button className="flex items-center">
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
    </div>
  
        </motion.div>    
           </div>
      
      </div>

      {/* Middle Panel */}
   

      {/* Middle Panel */}
{/* Middle Panel */}
<div className="flex-grow items-stretch h-full overflow-hidden">
  <motion.div 
    className="w-full h-full items-stretch overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-300"
    initial={false}
    animate={{
      width: `calc(100vw - ${leftWidth}px - ${rightWidth}px)`, // Subtract 2px for the resizers
    }}
    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    style={{ height: 'calc(100vh - 10rem)' }} // Adjust height as needed
  >
    <MainComponent />
  </motion.div>
</div>

      {/* Resizer */}
    
      {/* Right Panel */}
      <div className={`flex flex-col border-l w-[25%]  overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-300 border-slate-800 transition-all duration-300 `}  style={{ width: rightWidth }}>
        <motion.div
          className={`transition-all duration-300 `}
          style={{ height: rightTopHeight, overflow: 'auto' }}
        >

    
    <ActivityComponent />
        </motion.div>
        <div 
          className="h-1 bg-gray-600 cursor-row-resize" 
          onMouseDown={startResize(setRightTopHeight, false)}
        />
           <div className="h-full overflow-y-auto">
           <motion.div
          className={` transition-all duration-300 }`}
          style={{ height: `calc(100% - ${rightTopHeight}px)`, overflow: 'auto' }}
        >
        
          <div className="p-2 bg-black border border-slate-800 text-sm flex flex-row justify-between gap-4 text-center align-middle text-slate-500 ">
<p>  Token Activity Distribution</p>
        
          </div>
          <div className="bg-black">
          <ActivityPieChart />
</div>
        </motion.div>
           </div>
      
      </div>
    </div>
  );
}