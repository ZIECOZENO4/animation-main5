'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, List, Grid, LayoutGrid, Settings, ChevronDown } from 'lucide-react'

interface NFTItem {
  id: string
  image: string
  name: string
  rarity: number
  buyNow: number
  lastSale: number
  topBid: number
  owner: string
  held: number
  time: string
}

const nftItems: NFTItem[] = [
  { id: '1', image: '/placeholder.svg?height=50&width=50', name: 'Sappy Seal...', rarity: 9598, buyNow: 0.2907, lastSale: 0.29, topBid: 0.28, owner: 'F4c63F', held: 3, time: '5h ago' },
  { id: '2', image: '/placeholder.svg?height=50&width=50', name: 'Sappy Seal...', rarity: 7527, buyNow: 0.2909, lastSale: 0.29, topBid: 0.28, owner: 'F4c63F', held: 3, time: '5h ago' },
  { id: '3', image: '/placeholder.svg?height=50&width=50', name: 'Sappy Seal...', rarity: 9229, buyNow: 0.291, lastSale: 0.29, topBid: 0.28, owner: '08V76d', held: 7, time: '7h ago' },
  { id: '4', image: '/placeholder.svg?height=50&width=50', name: 'Sappy Seal...', rarity: 8650, buyNow: 0.292, lastSale: 0.28, topBid: 0.28, owner: 'F8V4VE', held: 8, time: '12h ago' },
]

const tabs = ['ITEMS', 'BIDS', 'LOANS', 'HOLDERS', 'GRAPH']

export default function MainComponent() {
  const [activeTab, setActiveTab] = useState('ITEMS')
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [optimizeSweep, setOptimizeSweep] = useState(false)
  const [quantity, setQuantity] = useState(0)

  const handleItemSelect = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    setSelectedItems(selectedItems.length === nftItems.length ? [] : nftItems.map(item => item.id))
  }

  return (
    <div className="bg-black border border-slate-500 text-gray-300 ">
      <nav className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          {tabs.map(tab => (
            <motion.button
              key={tab}
              className={`px-3 py-2 rounded ${activeTab === tab ? 'text-yellow-500' : 'text-gray-400'}`}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Item ID"
              className="bg-gray-800 text-gray-300 px-3 py-1 rounded-md pl-8"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          </div>
          <button   aria-label='number' className="p-2 hover:bg-gray-800 rounded"><List className="w-4 h-4" /></button>
          <button   aria-label='number' className="p-2 hover:bg-gray-800 rounded"><Grid className="w-4 h-4" /></button>
          <button   aria-label='number' className="p-2 hover:bg-gray-800 rounded"><LayoutGrid className="w-4 h-4" /></button>
          <button   aria-label='number' className="p-2 hover:bg-gray-800 rounded"><Settings className="w-4 h-4" /></button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {activeTab === 'ITEMS' && (
          <motion.div
            key="items"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left border-b border-gray-800">
                    <th className="py-2">
                      <input
                      aria-label='number'
                        type="checkbox"
                        checked={selectedItems.length === nftItems.length}
                        onChange={handleSelectAll}
                        className="rounded bg-gray-700 border-gray-600"
                      />
                    </th>
                    <th className="py-2">29 LISTED</th>
                    <th className="py-2">RARITY</th>
                    <th className="py-2">BUY NOW</th>
                    <th className="py-2">LAST SALE</th>
                    <th className="py-2">TOP BID</th>
                    <th className="py-2">OWNER</th>
                    <th className="py-2">#HELD</th>
                    <th className="py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {nftItems.map(item => (
                    <motion.tr
                      key={item.id}
                      className="border-b border-gray-800"
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                    >
                      <td className="py-2">
                        <input
                        aria-label='number'
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleItemSelect(item.id)}
                          className="rounded bg-gray-700 border-gray-600"
                        />
                      </td>
                      <td className="py-2 flex items-center">
                        <img src={item.image} alt={item.name} className="w-8 h-8 mr-2 rounded" />
                        {item.name}
                      </td>
                      <td className="py-2">{item.rarity}</td>
                      <td className="py-2 text-yellow-500">{item.buyNow} ◆</td>
                      <td className="py-2">{item.lastSale} ◆</td>
                      <td className="py-2">{item.topBid} ◆</td>
                      <td className="py-2">{item.owner}</td>
                      <td className="py-2">{item.held}</td>
                      <td className="py-2">{item.time}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
        {activeTab === 'GRAPH' && (
          <motion.div
            key="graph"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-64 bg-gray-800 rounded-lg flex items-center justify-center"
          >
            <p>Graph view coming soon...</p>
          </motion.div>
        )}
        {(activeTab === 'BIDS' || activeTab === 'LOANS' || activeTab === 'HOLDERS') && (
          <motion.div
            key={activeTab.toLowerCase()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-64 bg-gray-800 rounded-lg flex items-center justify-center"
          >
            <p>{activeTab} view coming soon...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 flex items-center justify-between">
        <motion.button
          className="bg-yellow-600 text-black px-4 py-2 rounded flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          BUY FLOOR 0.2907 ◆
        </motion.button>
        <div className="flex items-center space-x-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={optimizeSweep}
              onChange={() => setOptimizeSweep(!optimizeSweep)}
              className="sr-only"
            />
            <div className={`w-10 h-5 rounded-full ${optimizeSweep ? 'bg-yellow-600' : 'bg-gray-700'} transition-colors duration-200 ease-in-out`}>
              <div className={`w-3 h-3 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${optimizeSweep ? 'translate-x-6' : 'translate-x-1'}`} />
            </div>
            <span className="ml-2 text-xs">OPTIMIZE SWEEP</span>
          </label>
          <Settings className="w-4 h-4" />
          <div className="flex items-center bg-gray-800 rounded-md">
            <button className="px-2 py-1 text-gray-400 hover:text-white" onClick={() => setQuantity(Math.max(0, quantity - 1))}>-</button>
            <input
            aria-label='number'
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-12 bg-transparent text-center"
            />
            <button className="px-2 py-1 text-gray-400 hover:text-white" onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          <input aria-label='number' type="range" min="0" max="100" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} className="w-32" />
        </div>
      </div>
    </div>
  )
}