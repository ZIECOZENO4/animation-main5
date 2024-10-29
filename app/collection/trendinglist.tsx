'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Star } from 'lucide-react'

interface Collection {
  id: number
  name: string
  image: string
  floorPrice: number
  listings: string
  change5m: number | null
  sales1m: number | null
  sales5m: number | null
  sales15m: number | null
  sales1h: number | null
  owners: string
  supply: number
}

const collections: Collection[] = [
  { id: 1, name: 'Mavia Land', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.11, listings: '175 (2%)', change5m: -1, sales1m: 1, sales5m: 1, sales15m: 1, sales1h: 1, owners: '2403 (24%)', supply: 10000 },
  { id: 2, name: 'Lunartics', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.01, listings: '186 (2%)', change5m: -1, sales1m: 1, sales5m: 1, sales15m: 1, sales1h: 1, owners: '4799 (48%)', supply: 10000 },
  { id: 3, name: 'L3E7 Guardians', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.14, listings: '343 (7%)', change5m: null, sales1m: null, sales5m: null, sales15m: null, sales1h: 23, owners: '1643 (33%)', supply: 4977 },
  { id: 4, name: 'Co-Museum Founder\'s Pass', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.03, listings: '78 (2%)', change5m: -1, sales1m: null, sales5m: 1, sales15m: 1, sales1h: 13, owners: '765 (19%)', supply: 3969 },
  { id: 5, name: 'Meta Angels', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.01, listings: '72 (1%)', change5m: null, sales1m: null, sales5m: null, sales15m: 3, sales1h: 11, owners: '5080 (51%)', supply: 10000 },
  { id: 6, name: 'Goblinarinos', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.05, listings: '174 (5%)', change5m: 5, sales1m: null, sales5m: null, sales15m: null, sales1h: 6, owners: '906 (24%)', supply: 3815 },
  { id: 7, name: 'Cool Cats', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.23, listings: '261 (3%)', change5m: 1, sales1m: null, sales5m: 6, sales15m: 6, sales1h: 6, owners: '5494 (55%)', supply: 9968 },
  { id: 8, name: 'Wanderers - AAA Beta Bundle', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.01, listings: '90 (5%)', change5m: null, sales1m: null, sales5m: null, sales15m: null, sales1h: 3, owners: '734 (41%)', supply: 1786 },
  { id: 9, name: 'TURBOTOADS', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.05, listings: '247 (6%)', change5m: null, sales1m: null, sales5m: null, sales15m: null, sales1h: 1, owners: '1258 (30%)', supply: 4194 },
  { id: 10, name: 'TURBOTOADS', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.05, listings: '247 (6%)', change5m: null, sales1m: null, sales5m: null, sales15m: null, sales1h: 1, owners: '1258 (30%)', supply: 4194 },
  { id: 11, name: 'TURBOTOADS', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.05, listings: '247 (6%)', change5m: null, sales1m: null, sales5m: null, sales15m: null, sales1h: 1, owners: '1258 (30%)', supply: 4194 },
  { id: 12, name: 'TURBOTOADS', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.05, listings: '247 (6%)', change5m: null, sales1m: null, sales5m: null, sales15m: null, sales1h: 1, owners: '1258 (30%)', supply: 4194 },
  { id: 13, name: 'TURBOTOADS', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.05, listings: '247 (6%)', change5m: null, sales1m: null, sales5m: null, sales15m: null, sales1h: 1, owners: '1258 (30%)', supply: 4194 },
  { id: 14, name: 'TURBOTOADS', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.05, listings: '247 (6%)', change5m: null, sales1m: null, sales5m: null, sales15m: null, sales1h: 1, owners: '1258 (30%)', supply: 4194 },
  { id: 15, name: 'TURBOTOADS', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.05, listings: '247 (6%)', change5m: null, sales1m: null, sales5m: null, sales15m: null, sales1h: 1, owners: '1258 (30%)', supply: 4194 },
  { id: 16, name: 'TURBOTOADS', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.05, listings: '247 (6%)', change5m: null, sales1m: null, sales5m: null, sales15m: null, sales1h: 1, owners: '1258 (30%)', supply: 4194 },
  { id: 17, name: 'TURBOTOADS', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.05, listings: '247 (6%)', change5m: null, sales1m: null, sales5m: null, sales15m: null, sales1h: 1, owners: '1258 (30%)', supply: 4194 },
  { id: 18, name: 'TURBOTOADS', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.05, listings: '247 (6%)', change5m: null, sales1m: null, sales5m: null, sales15m: null, sales1h: 1, owners: '1258 (30%)', supply: 4194 },
  { id: 19, name: 'TURBOTOADS', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.05, listings: '247 (6%)', change5m: null, sales1m: null, sales5m: null, sales15m: null, sales1h: 1, owners: '1258 (30%)', supply: 4194 },
  { id: 20, name: 'TURBOTOADS', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', floorPrice: 0.05, listings: '247 (6%)', change5m: null, sales1m: null, sales5m: null, sales15m: null, sales1h: 1, owners: '1258 (30%)', supply: 4194 },
]

export default function TrendingComponent() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  const getChangeColor = (change: number | null): string => {
    if (change === null) return ''
    return change > 0 ? 'text-[#F7F2DA]' : change < 0 ? 'text-slate-500' : ''
  }

  return (
    <div className="min-h-screen bg-black text-gray-300 p-4">
      <div className="max-w-full mx-auto">
        <motion.div
          layout
          className="bg-black overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-gray-800">
                  <th className="px-4 py-2 text-left font-medium">#</th>
                  <th className="px-4 py-2 text-left font-medium">NAME</th>
                  <th className="px-4 py-2 text-left font-medium">FLOOR PRICE</th>
                  <th className="px-4 py-2 text-left font-medium">LISTINGS</th>
                  <th className="px-4 py-2 text-left font-medium">5M CHANGE</th>
                  <th className="px-4 py-2 text-left font-medium">1M SALES</th>
                  <th className="px-4 py-2 text-left font-medium">5M SALES</th>
                  <th className="px-4 py-2 text-left font-medium">15M SALES</th>
                  <th className="px-4 py-2 text-left font-medium">1H SALES</th>
                  <th className="px-4 py-2 text-left font-medium">OWNERS</th>
                  <th className="px-4 py-2 text-left font-medium">SUPPLY</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {collections.map((collection, index) => (
                    <motion.tr
                      key={collection.id}
                      className="border-b border-gray-800"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      onHoverStart={() => setHoveredRow(index)}
                      onHoverEnd={() => setHoveredRow(null)}
                      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    >
                      <td className="px-4 py-2 text-slate-500 font-medium">{collection.id}</td>
                      <td className="px-4 py-2 flex items-center">
                        <motion.img
                          src={collection.image}
                          alt={collection.name}
                          className="w-8 h-8 rounded-full mr-2"
                          whileHover={{ scale: 1.2 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        />
                        <span className="flex items-center">
                          {collection.name}
                          {hoveredRow === index && (
                            <motion.span
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{ duration: 0.2 }}
                              className="ml-2 "
                            >
                              <Star className="w-4 h-4" />
                            </motion.span>
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-2 ">
                        <motion.div whileHover={{ scale: 1.05 }} className='flex gap-2'>
                          {collection.floorPrice}  <img src='/images/eth.png' alt="coin" className="w-3 h-4" />
                        </motion.div>
                      </td>
                      <td className="px-4 py-2">{collection.listings}</td>
                      <td className={`px-4 py-2 ${getChangeColor(collection.change5m)}`}>
                        {collection.change5m ?? '-'}
                      </td>
                      <td className="px-4 py-2">{collection.sales1m ?? '-'}</td>
                      <td className="px-4 py-2">{collection.sales5m ?? '-'}</td>
                      <td className="px-4 py-2">{collection.sales15m ?? '-'}</td>
                      <td className="px-4 py-2">{collection.sales1h ?? '-'}</td>
                      <td className="px-4 py-2">{collection.owners}</td>
                      <td className="px-4 py-2">{collection.supply}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}