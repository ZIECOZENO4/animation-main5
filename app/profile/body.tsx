'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Grid, List, LayoutGrid, Settings, Copy } from 'lucide-react'

const tabs = ['INVENTORY', 'HISTORY', 'BIDS', 'LENDING']

interface Collection {
  name: string
  floor: number
  valueListed: number
}

const mockCollections: Record<string, Collection[]> = {
  INVENTORY: [
    { name: 'Collection 1', floor: 0.5, valueListed: 1.2 },
    { name: 'Collection 2', floor: 0.8, valueListed: 2.5 },
  ],
  HISTORY: [
    { name: 'Past Collection 1', floor: 0.3, valueListed: 0.9 },
    { name: 'Past Collection 2', floor: 0.6, valueListed: 1.8 },
  ],
  BIDS: [
    { name: 'Bid Collection 1', floor: 0.7, valueListed: 2.1 },
    { name: 'Bid Collection 2', floor: 1.0, valueListed: 3.0 },
  ],
  LENDING: [
    { name: 'Lend Collection 1', floor: 0.4, valueListed: 1.5 },
    { name: 'Lend Collection 2', floor: 0.9, valueListed: 2.7 },
  ],
}

export default function NFTCollectionManager() {
  const [activeTab, setActiveTab] = useState('INVENTORY')
  const [showAll, setShowAll] = useState(true)
  const [collections, setCollections] = useState<Collection[]>(mockCollections.INVENTORY)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setCollections(mockCollections[activeTab] || [])
  }, [activeTab])

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen font-mono">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-500 rounded-full"></div>
          <span className="text-yellow-500">0x5Ca37...a5df3</span>
          <button   aria-label='number' className="text-gray-500 hover:text-gray-300">
            <Copy size={16} />
          </button>
        </div>
        <div className="flex space-x-8 text-sm">
          <div>
            <span className="text-gray-500">LISTED</span>
            <span className="ml-2">0/0</span>
          </div>
          <div>
            <span className="text-gray-500">EST VALUE</span>
            <span className="ml-2">0.00 ◊</span>
          </div>
          <div>
            <span className="text-gray-500">COST</span>
            <span className="ml-2">0.00 ◊</span>
          </div>
          <div>
            <span className="text-gray-500">UNREALIZED P&L</span>
            <span className="ml-2 text-green-500">???</span>
          </div>
          <div>
            <span className="text-gray-500">REALIZED P&L</span>
            <span className="ml-2 text-green-500">???</span>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-gray-800 p-4">
          <div className="mb-6">
            <h3 className="text-yellow-500 mb-2">STATUS</h3>
            <div className="flex items-center space-x-2 mb-2">
              <input type="radio" id="onlyListed" name="status" className="form-radio text-yellow-500" checked={!showAll} onChange={() => setShowAll(false)} />
              <label htmlFor="onlyListed">ONLY LISTED</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="radio" id="showAll" name="status" className="form-radio text-yellow-500" checked={showAll} onChange={() => setShowAll(true)} />
              <label htmlFor="showAll">SHOW ALL</label>
            </div>
          </div>

          <div>
            <h3 className="text-yellow-500 mb-2">COLLECTIONS</h3>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search your collections"
                className="w-full bg-gray-700 text-gray-300 px-3 py-2 rounded-md pl-8"
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
                <table className="w-full text-sm">
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

        <main className="flex-1 p-4">
          <div className="mb-4">
            <h2 className="text-2xl mb-4">All Collections</h2>
            <div className="flex space-x-4 mb-4">
              {tabs.map((tab) => (
                <motion.button
                  key={tab}
                  className={`px-4 py-2 rounded ${activeTab === tab ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-500'}`}
                  onClick={() => handleTabChange(tab)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab}
                </motion.button>
              ))}
            </div>
            <div className="flex justify-end space-x-2">
              <button  aria-label='number' className="text-gray-500 hover:text-gray-300"><List size={20} /></button>
              <button  aria-label='number' className="text-gray-500 hover:text-gray-300"><Grid size={20} /></button>
              <button  aria-label='number' className="text-gray-500 hover:text-gray-300"><LayoutGrid size={20} /></button>
              <button  aria-label='number' className="text-gray-500 hover:text-gray-300"><Settings size={20} /></button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'INVENTORY' && (
                <div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-500">
                        <th className="text-left">
                          <input  aria-label='number' type="checkbox" className="form-checkbox text-yellow-500" />
                          SELECT ALL
                        </th>
                        <th className="text-left">RARITY</th>
                        <th className="text-left">LIST PRICE</th>
                        <th className="text-left">TOP BID</th>
                        <th className="text-left">COST</th>
                        <th className="text-left">RECEIVED MAX BORROWRATE</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={6} className="text-center py-8">No NFTs found.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === 'HISTORY' && <div>History content here</div>}
              {activeTab === 'BIDS' && <div>Bids content here</div>}
              {activeTab === 'LENDING' && <div>Lending content here</div>}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex space-x-4">
            <motion.button
              className="bg-yellow-600 text-black px-6 py-2 rounded"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              LIST 0
            </motion.button>
            <motion.button
              className="bg-yellow-600 text-black px-6 py-2 rounded"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ACCEPT 0 0.00 ◊
            </motion.button>
            <motion.button
              className="bg-yellow-600 text-black px-6 py-2 rounded"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              BORROW 0 0.00 ◊
            </motion.button>
          </div>
        </main>
      </div>
    </div>
  )
}