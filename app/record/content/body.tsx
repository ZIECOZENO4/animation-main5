"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Chip, Tabs, Tab } from "@nextui-org/react";
import FullConnectButton from '@/components/fullConnectButton';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import FinancialGraph from "./financial-graph";
import ActivityComponent from "./activity-table";

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
  const [expandedLeft, setExpandedLeft] = React.useState(false);
  const [expandedRight, setExpandedRight] = React.useState(false);
  const [expandedLeftTop, setExpandedLeftTop] = React.useState(false);
  const [expandedLeftBottom, setExpandedLeftBottom] = React.useState(false);
  const [expandedRightTop, setExpandedRightTop] = React.useState(false);
  const [expandedRightBottom, setExpandedRightBottom] = React.useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
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
          className={` transition-all duration-300 ${expandedLeftTop ?  'h-[80vh]' : 'h-1/2'}`}
          onClick={() => setExpandedLeftTop(!expandedLeftTop)}
        >
          <div className="cursor-pointer">
            {expandedLeftTop ? '▼' : '►'} Top
          </div>
          <Card className="bg-black border rounded-none border-slate-600 mt-2 p-4">
  
            <div className="flex text-xs justify-between py-2">
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
                className="flex-grow bg-black border border-slate-500 p-2 rounded-xl"
              />
               <select
      value={selectedCurrency}
      onChange={handleChange}
      aria-label="Select Currency"
      className="bg-black text-[#F7F2DA] border border-slate-500 p-2 rounded-xl"
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
          className={` transition-all duration-300 mb-[10rem] ${expandedLeftBottom ? 'h-[80vh] top-2' : 'h-1/2'}`}
          onClick={() => setExpandedLeftBottom(!expandedLeftBottom)}
        >
          <div className="cursor-pointer">
            {expandedLeftBottom ? '▼' : '►'} Bottom
          </div>
          <div className="bg-black text-[#F7F2DA] border-slate-500 w-full">
      <div className="flex justify-center flex-col gap-4 items-center mb-4 p-4">
        <h2 className="text-xl gap-4 font-bold">Holders Distribution</h2>
        <button
          onClick={toggleBondingCurve}
          className="bg-slate-500 text-xs font-medium px-2.5 py-0.5 rounded-full hover:bg-slate-600 transition-colors"
        >
          {includeBondingCurve ? "Including" : "Excluding"} Bonding Curve
        </button>
      </div>
      <hr className='w-full text-slate-500 bg-slate-500 mb-4 px-4' />
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
        </motion.div>
      </div>

      {/* Middle Panel */}
      <motion.div className={`p-4 transition-all duration-300 ${middlePanelWidth}`}>
    
<MainComponent />
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
          <div className="bg-black text-[#F7F2DA]  w-full ">
      <div className="mb-4 flex justify-end">
        <div className="relative">
          <select
            aria-label='number'
            className="appearance-none bg-black border border-slate-500 text-[#F7F2DA] py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-slate-500 focus:border-slate-800"
            value={filter}
            onChange={(e) => handleFilter(e.target.value as 'ALL' | 'SELL' | 'BUY')}
          >
            <option value="ALL">All Transactions</option>
            <option value="SELL">Sell</option>
            <option value="BUY">Buy</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>
      <table className="w-full overflow-auto text-xs">
        <thead>
          <tr className="text-left border-b border-slate-500">
            <th className="py-2">Account</th>
            <th className="py-2">Type</th>
            <th className="py-2">In</th>
            <th className="py-2">Out</th>
            <th className="py-2">Chains</th>
            <th className="py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {transactions.map((transaction) => (
              <motion.tr
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="border-b border-gray-800"
              >
                <td className="py-3 flex items-center">
                  <span className="w-6 h-6 mr-2  rounded-full"></span>
                  {transaction.account}
                </td>
                <td>
                  <Chip className={`px-2 py-1 rounded text-xs ${transaction.type === 'SELL' ? 'bg-slate-800 ' : 'bg-slate-500 '}`}>
                    {transaction.type}
                  </Chip>
                </td>
                <td>{transaction.in}</td>
                <td>{transaction.out}</td>
                <td>{transaction.chains}</td>
                <td>{transaction.time}</td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
    <hr className='text-slate-slate-500 bg-slate-500 border-slate-500 my-2' />
    <ActivityComponent />
        </motion.div>
        <motion.div
          className={`p-2 transition-all duration-300 ${expandedRightBottom ? 'h-full' : 'h-1/2'}`}
          onClick={() => setExpandedRightBottom(!expandedRightBottom)}
        >
          <div className="cursor-pointer">
            {expandedRightBottom ? '▼' : '►'} Bottom
          </div>
         <FinancialGraph />
        </motion.div>
      </div>
    </div>
  );
}