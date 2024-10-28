'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronRight, Rocket } from 'lucide-react'

interface Activity {
  id: string
  time: string
  item: string // This will now hold the image URL
  price: number
  seller: string
  buyer: string
}

const initialActivities: Activity[] = [
  { id: '1', time: '11m', item: '/images/eth.png', price: 0.315, seller: '0587E4', buyer: 'BUY' },
  { id: '2', time: '13m', item: '/images/eth.png', price: 0.3087, seller: 'naroya...', buyer: 'BUY' },
  { id: '3', time: '44m', item: '/images/eth.png', price: 0.28, seller: '336b57', buyer: '0587E4' },
  { id: '4', time: '1h', item: '/images/eth.png', price: 0.3087, seller: 'naroya...', buyer: 'BUY' },
  { id: '5', time: '2h', item: '/images/eth.png', price: 0.294, seller: '5E0F3A', buyer: '792cAd' },
]

const timeFilters = ['ALL', '5m', '15m', '30m', '1h', '6h', '1d']

export default function ActivityComponent() {
  const [activities, setActivities] = useState<Activity[]>(initialActivities)
  const [filter, setFilter] = useState('ALL')

  const handleFilter = (selectedFilter: string) => {
    setFilter(selectedFilter)
    if (selectedFilter === 'ALL') {
      setActivities(initialActivities)
    } else {
      // This is a simplified filter. In a real application, you'd implement proper time-based filtering
      setActivities(initialActivities.filter(a => a.time === selectedFilter))
    }
  }

  return (
    <div className="bg-black text-[#F7F2DA] w-auto border border-slate-800 text-xs">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center p-4">
          <Rocket className="h-4 w-4 mr-2 text-slate-500" />
          <h2 className="text-sm font-bold text-slate-500">ACTIVITY</h2>
        </div>
        <div className="relative px-4">
          <select
            aria-label='number'
            className="appearance-none border border-slate-800 text-xs py-1 px-2 pr-6 rounded leading-tight focus:outline-none focus:border-slate-800"
            value={filter}
            onChange={(e) => handleFilter(e.target.value)}
          >
            {timeFilters.map((tf) => (
              <option key={tf} value={tf}>{tf}</option>
            ))}
          </select>
        </div>
      </div>
      <hr className="w-full text-slate-500 border border-slate-800 bg-slate-500 mb-4"/>
      <table className="w-full text-xs px-4 ml-2">
        <thead>
          <tr className="text-left text-slate-500">
            <th className="py-2 w-1/6">TIME</th>
            <th className="py-2 w-1/6">ITEM</th>
            <th className="py-2 w-1/6">PRICE</th>
            <th className="py-2 w-1/4">SELLER</th>
            <th className="py-2 w-1/4">BUYER</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {activities.map((activity) => (
              <motion.tr
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <td className="py-2">{activity.time}</td>
                <td className="py-2">
                  {/* Image of the coin */}
                  <img src={activity.item} alt={`Coin ${activity.id}`} className="w-4 h-4" />
                </td>
                <td className="py-2">
                  <span className={activity.price < 0.3 ? 'text-slate-700' : activity.price > 0.3 ? 'text-slate-300' : ''}>
                    {activity.price.toFixed(4)}
                  </span>
                  <span className="text-slate-500 ml-1">◆</span>
                </td>
                <td className="py-2">{activity.seller}</td>
                <td className="py-2">
                  {activity.buyer === 'BUY' ? (
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs">
                      {activity.buyer}
                    </span>
                  ) : (
                    activity.buyer
                  )}
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  )
}