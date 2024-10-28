'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Grid, List, LayoutGrid, Settings, Copy, Check } from 'lucide-react'
import TokenInfoCards from './token-info-cards'

const tabs = ['CREATED', 'TOKEN', 'TRADES', 'HELD']

interface Collection {
  name: string
  floor: number
  valueListed: number
}

const mockCollections: Record<string, Collection[]> = {
  CREATED: [
    { name: 'Collection 1', floor: 0.5, valueListed: 1.2 },
    { name: 'Collection 2', floor: 0.8, valueListed: 2.5 },
  ],
  TOKEN: [
    { name: 'Past Collection 1', floor: 0.3, valueListed: 0.9 },
    { name: 'Past Collection 2', floor: 0.6, valueListed: 1.8 },
  ],
  TRADES: [
    { name: 'Bid Collection 1', floor: 0.7, valueListed: 2.1 },
    { name: 'Bid Collection 2', floor: 1.0, valueListed: 3.0 },
  ],
  HELD: [
    { name: 'Lend Collection 1', floor: 0.4, valueListed: 1.5 },
    { name: 'Lend Collection 2', floor: 0.9, valueListed: 2.7 },
  ],
}

export default function NFTCollectionManager() {
  const [activeTab, setActiveTab] = useState('CREATED')
  const [showAll, setShowAll] = useState(true)
  const [collections, setCollections] = useState<Collection[]>(mockCollections.CREATED)
  const [searchTerm, setSearchTerm] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setCollections(mockCollections[activeTab] || [])
  }, [activeTab])

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }
  const handleCopy = () => {
    navigator.clipboard.writeText("0x5Ca37...a5df3")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="bg-black border border-slate-500 text-[#F7F2DA] h-[calc(100vh-5rem)] w-[100vw]">
      <header className="bg-black border border-slate-500 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img
            src="https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif"
            alt="Profile avatar"
            className="w-16 h-16 rounded-full border-2 border-slate-500"
          />
        </motion.div>
          <motion.h2
              className="text-sm text-gray-500 "
      
            >
            0x5Ca37...a5df3
            </motion.h2>
          <button onClick={handleCopy}>
              {copied ? (
                <Check className="w-6 h-6 text-green-400" />
              ) : (
                <Copy className="w-6 h-6 text-gray-500" />
              )}
            </button>
        </div>
        <div className="flex space-x-4 text-sm">
          <div className="flex gap-2 flex-col align-middle text-center text-sm">
            <span className="text-gray-500">LEVEL</span>
            <span className="text-sm">0/100</span>
          </div> 
          <div className="flex gap-2 flex-col align-middle text-center text-sm">
            <span className="text-gray-500">OWNED</span>
            <span className="text-sm">0/0</span>
          </div> 
          <div className="flex gap-2 flex-col align-middle text-center text-sm">
            <span className="text-gray-500">SOLD</span>
            <span className="text-sm">0/0</span>
          </div> 
          <div className="flex gap-2 flex-col align-middle text-center text-sm">
            <span className="text-gray-500">LIKES</span>
            <span className="text-sm">0/0</span>
          </div> 
          
          <div className="flex gap-2 flex-col align-middle text-center text-sm">
            <span className="text-gray-500">FOLLOWERS</span>
            <span className="text-sm">0/0</span>
          </div> 
          <div className="flex gap-2 flex-col align-middle text-center text-sm">
            <span className="text-gray-500">FOLLOWED</span>
            <span className="text-sm">0/0</span>
          </div> 
        </div>
        
      </header>

      <div className="flex">
        <aside className="w-64 bg-black border border-slate-500 p-4">
          <div className="mb-6">
            <h3 className="text-slate-500 mb-2">TOKEN STATUS</h3>
            <div className="flex items-center space-x-2 mb-2">
              <input type="radio" id="onlyListed" name="status" className="form-radio text-slate-500" checked={!showAll} onChange={() => setShowAll(false)} />
              <label htmlFor="onlyListed">STANDARD</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="radio" id="showAll" name="status" className="form-radio text-slate-500" checked={showAll} onChange={() => setShowAll(true)} />
              <label htmlFor="showAll">PRE SALE</label>
            </div>
          </div>
          <div>
            <h3 className="text-slate-500 mb-2">TOKEN COLLECTIONS</h3>
            <div className="relative mb-2 mt-4">
              <input
                type="text"
                placeholder="Search your collections"
                className="w-full bg-black border border-slate-500 text-gray-300 px-3 py-2 rounded-md pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-2 top-2.5 text-gray-500" size={16} />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-gray-500">
                      <th className="text-left">COLLECTION</th>
                      <th className="text-right">FLOOR</th>
                      <th className="text-right">VALUE LISTED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCollections.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="text-center py-4">No collections found.</td>
                      </tr>
                    ) : (
                      filteredCollections.map((collection, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <td>{collection.name}</td>
                          <td className="text-right">{collection.floor} ◊</td>
                          <td className="text-right">{collection.valueListed} ◊</td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </motion.div>
            </AnimatePresence>
          </div>
        </aside>

        <main className="flex-1 bg-black border border-slate-500 ">
          <div className="mb-4">
            <h2 className="text-2xl mb-4 p-4">All YOUR TOKEN COLLECTIONS</h2>
            <div className="flex justify-between space-x-4 mb-1 p-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab}
                  className={`px-4 py-2 rounded ${activeTab === tab ? 'text-[#F7F2DA] border-b-2 border-[#F7F2DA]' : 'text-gray-500'}`}
                  onClick={() => handleTabChange(tab)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab}
                </motion.button>
              ))}
              <div className="flex justify-end space-x-2">
              <button  aria-label='number' className="text-gray-500 hover:text-gray-300"><List size={20} /></button>
              <button  aria-label='number' className="text-gray-500 hover:text-gray-300"><Grid size={20} /></button>
              <button  aria-label='number' className="text-gray-500 hover:text-gray-300"><LayoutGrid size={20} /></button>
              <button  aria-label='number' className="text-gray-500 hover:text-gray-300"><Settings size={20} /></button>
            </div>
            </div>
                      <hr  className="bg-slate-500 border border-slate-500 text-slate-500 mb-4" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className='p-2 h-40'
            >
              {activeTab === 'CREATED' && (
                <div className='align-middle h-full overflow-auto'>
                 <TokenInfoCards />
                </div>
              )}
              {activeTab === 'TOKEN' &&    <div className='align-middle h-full overflow-auto'>
                 <TokenInfoCards />
                </div>}
              {activeTab === 'TRADES' &&    <div className='align-middle h-full overflow-auto'>
                 <TokenInfoCards />
                </div>}
              {activeTab === 'HELD' &&    <div className='align-middle h-full overflow-auto'>
                 <TokenInfoCards />
                </div>}
            </motion.div>
          </AnimatePresence>
          <div className="my-2 px-8 align-bottom  justify-start  flex space-x-8">
            <motion.button
              className="bg-black border borser-slate-500 text-center   px-4 py-2 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              START STANDARD
            </motion.button>
                 <motion.button
              className="bg-black border borser-slate-500 text-center   px-6 py-2 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              START PRESALE
            </motion.button>
                   <motion.button
              className="bg-black border borser-slate-500 text-center   px-6 py-2 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SUPPORT TOKEN
            </motion.button>
          </div>
        </main>
      </div>
    </div>
  )
}