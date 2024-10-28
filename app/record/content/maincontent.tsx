'use client'
import TradingChart from './BuySellChart';
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, List, Grid, LayoutGrid, Settings, ChevronDown } from 'lucide-react'
import { Switch  } from "@nextui-org/react";
import { Card, Chip, Tabs, Tab } from "@nextui-org/react";
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
  { id: '1', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', name: 'Sappy Seal...', rarity: 9598, buyNow: 0.2907, lastSale: 0.29, topBid: 0.28, owner: 'F4c63F', held: 3, time: '5h ago' },
  { id: '2', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', name: 'Sappy Seal...', rarity: 7527, buyNow: 0.2909, lastSale: 0.29, topBid: 0.28, owner: 'F4c63F', held: 3, time: '5h ago' },
  { id: '3', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', name: 'Sappy Seal...', rarity: 9229, buyNow: 0.291, lastSale: 0.29, topBid: 0.28, owner: '08V76d', held: 7, time: '7h ago' },
  { id: '4', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', name: 'Sappy Seal...', rarity: 8650, buyNow: 0.292, lastSale: 0.28, topBid: 0.28, owner: 'F8V4VE', held: 8, time: '12h ago' },
]

type TabType = 'GRAPH' | 'BIDS' | 'TRADES' | 'HOLDERS' | 'SUPPORT';


const tabs: TabType[] = ['GRAPH', 'BIDS', 'TRADES', 'HOLDERS', 'SUPPORT'];

export default function MainComponent() {
  const [activeTab, setActiveTab] = useState('GRAPH')
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [optimizeSweep, setOptimizeSweep] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== undefined) {
      setValue(e.target.value);
    }
  };
  
  const handleItemSelect = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    setSelectedItems(selectedItems.length === nftItems.length ? [] : nftItems.map(item => item.id))
  }

  return (
    <div className="bg-black border flex-grow h-full items-stretch border-slate-800 text-gray-300 ">
      <nav className="flex justify-between items-center mb-1">
        <div className="flex space-x-4">
        
           {tabs.map(tab => (
            <motion.button
              key={tab}
              className={`px-2 py-2 rounded ${activeTab === tab ? 'text-[#F7F2DA]' : 'text-gray-500'}`}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <div className="relative py-2">
            <input
              type="text"
              placeholder="TOKEN ID"
              className="bg-black border border-slate-800 text-[#F7F2DA] p-2 rounded-md pl-8"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          </div>
         
          <button   aria-label='number' className="p-2 hover:bg-black rounded"><LayoutGrid className="w-4 h-4" /></button>
          
        </div>
      </nav>
<hr className='border-slate-800 bg-slate-500 text-slate-500 w-full mb-4' />
      <AnimatePresence mode="wait">
        {activeTab === 'GRAPH' && (
          <motion.div
            key="graph"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="overflow-x-auto  align-middle text-center">
             
                  <div className="flex align-middle text-center px-4 gap-4 mb-4">
              <div>
                <div className="text-gray-500">Market cap</div>
                <div className="text-sm">$24.53</div>
              </div>
              <div>
                <div className="text-gray-500">ETH Reserve</div>
                <div className="text-sm">0.009520</div>
              </div>
              <div>
                <div className="text-gray-500">Token Reserve</div>
                <div className="text-sm">1000.000000</div>
              </div>
              <div>
                <div className="text-gray-500">Token Price</div>
                <div className="text-sm">0.000010 ETH</div>
              </div>
            </div>
            <div className="p-2">
          Loading Graph
    </div>
            </div>
          </motion.div>
        )}
        {activeTab === 'TRADES' && (
          <motion.div
            key="trades"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className=" bg-black bg-opacity-50 border border-slate-800 flex items-center justify-center"
          >
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
          </motion.div>
        )}
           { activeTab === 'SUPPORT'  && (
          <motion.div
            key={activeTab.toLowerCase()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className=" overflow-x-auto bg-black px-4 border w-full  flex flex-col gap-2 items-center justify-center"
          >
                <Card className="bg-black border border-slate-800 w-full p-4 flex flex-col items-center justify-center h-32">
              <svg width="30px" height="30px" className='text-gray-400 my-2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0619 4.4295C12.6213 3.54786 11.3636 3.54786 10.9229 4.4295L3.89008 18.5006C3.49256 19.2959 4.07069 20.2317 4.95957 20.2317H19.0253C19.9142 20.2317 20.4923 19.2959 20.0948 18.5006L13.0619 4.4295ZM9.34196 3.6387C10.434 1.45376 13.5508 1.45377 14.6429 3.63871L21.6758 17.7098C22.6609 19.6809 21.2282 22 19.0253 22H4.95957C2.75669 22 1.32395 19.6809 2.3091 17.7098L9.34196 3.6387Z" fill="#ffffff"></path> <path d="M12 8V13" stroke="#f20202" stroke-width="1.7" stroke-linecap="round"></path> <path d="M12 16L12 16.5" stroke="#f20202" stroke-width="1.7" stroke-linecap="round"></path> </g></svg>
                <p className="text-gray-400 text-xl">
                  No comments yet Be the first to comment!
                </p>
              </Card>
              <div className="text-center text-[#F7F2DA] text-xl mb-2 mt-6 py-2  w-full  border border-slate-600">Load more</div>
      
              <button
            type="submit"
       
          className='flex flex-row w-full shake-button'>
      <div className="top-9 left-[1305.31px] w-[2.84px] h-[36.22px] bg-[#787878] border-t-[0.63px] border-solid border-black"></div>
      <div className='flex flex-col flex-grow'>
        <div className="w-full h-[33.39px] top-9 left-[1307.83px] bg-[#787878] items-center shadow-md flex justify-center">
          <span className="text-[#F7F2DA] text-xl font-normal leading-5 text-center">
          + Add Comment
          </span>
        </div>
        <div className="top-[69.7px] left-[1305px] w-full h-[3.15px] bg-[#787878] border-t-[0.63px] border-solid border-black"></div>
      </div>
    </button>
          </motion.div>
        )}
        {(activeTab === 'BIDS' || activeTab === 'HOLDERS') && (
          <motion.div
            key={activeTab.toLowerCase()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="  bg-black bg-opacity-50 border border-slate-800 flex items-center justify-center"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
      <hr className='border-slate-800 bg-slate-500 text-slate-500 w-full mt-2 mb-4' />
      <div className=" flex items-center align-bottom bottom-0 justify-between">
  
        <motion.button
          className="bg-black m-2 border border-slate-800  text-[#F7F2DA] px-4 py-2 rounded-md flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          BUY TOKEN 0.2907 
        </motion.button>
        <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 px-2 py-1">
          <p className=" text-xs"> PRESALE </p>
          <Switch defaultSelected color="default" className="text-xs">
         STANDARD
        </Switch>
        </div>
          <Settings className="w-4 h-4" />
          <div className="flex items-center bg-black border border-slate-800 text-[#F7F2DA] rounded-md pr-2">
            <button className="px-2 py-1 text-gray-400 hover:text-white" onClick={() => setQuantity(Math.max(0, quantity - 1))}>-</button>
            <input
            aria-label='number'
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-12 bg-transpaent text-center"
            />
            <button className="px-2 py-1 text-gray-400 hover:text-white" onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          <input aria-label='number' type="range" min="0" max="100" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} className="w-32" />
        </div>
      </div>
    </div>
  )
} 