'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, TrendingUp, Star, Award, Menu, MoreVertical } from 'lucide-react'
import TrendingComponent from './trendinglist'
import PointsComponent from './pointlist'

// Define types
type TabId = 'collections' | 'trending' | 'favorites' | 'points';

interface Tab {
  id: TabId
  label: string
  icon: string | JSX.Element
}

interface Collection {
  name: string
  image: string
  floorPrice: number
  topBid: number | string
  change1d: number | string
  change7d: number | string
  volume1d: number
  volume7d: number
  owners: string
  supply: number
}

interface CollectionsTabProps {
  hoveredRow: number | null
  setHoveredRow: (index: number | null) => void
}

const tabs: Tab[] = [
  { id: 'collections', label: 'Collections', icon: 'M' },
  { id: 'trending', label: 'Trending', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'favorites', label: 'Favorites', icon: <Star className="w-4 h-4" /> },
  { id: 'points', label: 'Points', icon: <Award className="w-4 h-4" /> },
]

const collections: Collection[] = [
  { name: 'PudgyPenguins', image: '/placeholder.svg?height=32&width=32', floorPrice: 8.90, topBid: 8.75, change1d: -2.07, change7d: -5.62, volume1d: 257.34, volume7d: 1024.43, owners: '5259 (59%)', supply: 8888 },
  { name: 'BoredApeYachtClub', image: '/placeholder.svg?height=32&width=32', floorPrice: 11.65, topBid: 11.42, change1d: 0.95, change7d: -5.22, volume1d: 192.25, volume7d: 742.74, owners: '5455 (55%)', supply: 9998 },
  { name: 'Apu Apustajas', image: '/placeholder.svg?height=32&width=32', floorPrice: 0.23, topBid: '-', change1d: -2.13, change7d: '-', volume1d: 157.54, volume7d: 938.05, owners: '1340 (17%)', supply: 7777 },
  { name: 'Infinex Patrons', image: '/placeholder.svg?height=32&width=32', floorPrice: 1.23, topBid: 1.13, change1d: '-', change7d: '-', volume1d: 145.52, volume7d: 145.52, owners: '132 (0%)', supply: 67548 },
  { name: 'Milady', image: '/placeholder.svg?height=32&width=32', floorPrice: 4.62, topBid: 4.42, change1d: 7.81, change7d: -5.24, volume1d: 144.07, volume7d: 896.98, owners: '5370 (54%)', supply: 9977 },
  { name: 'MutantApeYachtClub', image: '/placeholder.svg?height=32&width=32', floorPrice: 1.83, topBid: 1.81, change1d: -1.59, change7d: -4.64, volume1d: 90.12, volume7d: 453.29, owners: '11,826 (61%)', supply: 19498 },
  { name: 'LilPudgys', image: '/placeholder.svg?height=32&width=32', floorPrice: 0.78, topBid: 0.77, change1d: -1.75, change7d: -5.92, volume1d: 53.16, volume7d: 218.78, owners: '8373 (39%)', supply: 21683 },
  { name: 'Azuki', image: '/placeholder.svg?height=32&width=32', floorPrice: 4.90, topBid: 4.76, change1d: 1.47, change7d: -5.41, volume1d: 46.54, volume7d: 185.45, owners: '4136 (41%)', supply: 10000 },
  { name: 'Project AEON', image: '/placeholder.svg?height=32&width=32', floorPrice: 1.64, topBid: 1.48, change1d: 13.18, change7d: 13.26, volume1d: 30.55, volume7d: 133.56, owners: '1450 (44%)', supply: 3332 },
]

const CollectionsTab: React.FC<CollectionsTabProps> = ({ hoveredRow, setHoveredRow }) => (
  <table className="w-full text-sm">
    <thead>
      <tr className="text-gray-400 border-b border-gray-800">
        <th className="px-4 py-2 text-left font-medium">FLOOR PRICE</th>
        <th className="px-4 py-2 text-left font-medium">FLOOR PRICE</th>
        <th className="px-4 py-2 text-left font-medium">TOP BID</th>
        <th className="px-4 py-2 text-left font-medium">1D CHANGE</th>
        <th className="px-4 py-2 text-left font-medium">7D CHANGE</th>
        <th className="px-4 py-2 text-left font-medium">15M VOLUME</th>
        <th className="px-4 py-2 text-left font-medium">1D VOLUME</th>
        <th className="px-4 py-2 text-left font-medium">7D VOLUME</th>
        <th className="px-4 py-2 text-left font-medium">OWNERS</th>
        <th className="px-4 py-2 text-left font-medium">SUPPLY</th>
      </tr>
    </thead>
    <tbody>
      <AnimatePresence>
        {collections.map((collection, index) => (
          <motion.tr
            key={collection.name}
            className="border-b border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.05 }}
            onHoverStart={() => setHoveredRow(index)}
            onHoverEnd={() => setHoveredRow(null)}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          >
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
                    className="ml-2 text-yellow-500"
                  >
                    <Star className="w-4 h-4" />
                  </motion.span>
                )}
              </span>
            </td>
            <td className="px-4 py-2">
              <motion.div whileHover={{ scale: 1.05 }}>
                {collection.floorPrice} <ChevronDown className="inline w-4 h-4 text-red-500" />
              </motion.div>
            </td>
            <td className="px-4 py-2">
              <motion.div whileHover={{ scale: 1.05 }}>
                {collection.topBid} {collection.topBid !== '-' && <ChevronDown className="inline w-4 h-4 text-red-500" />}
              </motion.div>
            </td>
            <td className={`px-4 py-2 ${
  typeof collection.change1d === 'number' 
    ? collection.change1d > 0 
      ? 'text-green-500' 
      : collection.change1d < 0 
        ? 'text-red-500' 
        : ''
    : ''
}`}>
  <motion.div whileHover={{ scale: 1.05 }}>
    {typeof collection.change1d === 'number' ? `${collection.change1d}%` : '-'}
  </motion.div>
</td>
<td className={`px-4 py-2 ${
  typeof collection.change7d === 'number'
    ? collection.change7d > 0
      ? 'text-green-500'
      : collection.change7d < 0
        ? 'text-red-500'
        : ''
    : ''
}`}>
  <motion.div whileHover={{ scale: 1.05 }}>
    {typeof collection.change7d === 'number' ? `${collection.change7d}%` : '-'}
  </motion.div>
</td>
            <td className="px-4 py-2">-</td>
            <td className="px-4 py-2">
              <motion.div whileHover={{ scale: 1.05 }}>
                {collection.volume1d} <ChevronUp className="inline w-4 h-4 text-green-500" />
              </motion.div>
            </td>
            <td className="px-4 py-2">
              <motion.div whileHover={{ scale: 1.05 }}>
                {collection.volume7d} <ChevronUp className="inline w-4 h-4 text-green-500" />
              </motion.div>
            </td>
            <td className="px-4 py-2">{collection.owners}</td>
            <td className="px-4 py-2">{collection.supply}</td>
          </motion.tr>
        ))}
      </AnimatePresence>
    </tbody>
  </table>
)

const TrendingTab: React.FC = () => (
  <div className="p-4">
    <TrendingComponent />
  </div>
)

const FavoritesTab: React.FC = () => (
  <div className="p-4 text-center">
    <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
    <p>Connect your wallet to view and manage your favorite NFT collections.</p>
  </div>
)

const PointsTab: React.FC = () => (
  <div className="p-4">
    <PointsComponent />
  </div>
)


export default function MainComponent() {
  const [activeTab, setActiveTab] = useState<TabId>('collections')
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  const tabComponents: Record<TabId, JSX.Element> = {
    collections: <CollectionsTab hoveredRow={hoveredRow} setHoveredRow={setHoveredRow} />,
    trending: <TrendingTab />,
    favorites: <FavoritesTab />,
    points: <PointsTab />,
  }

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-gray-300 p-4">
      <div className="max-w-full mx-auto">
        <motion.div
          layout
          className="bg-[#0c0c0c] rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center border-b border-gray-800 px-4 py-2">
            <div className="flex space-x-4">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  className={`flex items-center px-2 py-1 text-sm font-medium ${
                    activeTab === tab.id ? 'text-[#ffa300] border-b-2 border-[#ffa300]' : 'text-gray-400 hover:text-gray-200'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {typeof tab.icon === 'string' ? tab.icon : tab.icon}
                  <span className="ml-1">{tab.label}</span>
                </motion.button>
              ))}
            </div>
            <div className="flex space-x-2">
              <motion.button
                className="text-gray-400 hover:text-gray-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Menu className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="text-gray-400 hover:text-gray-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MoreVertical className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {tabComponents[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}