'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Check, X } from 'lucide-react'

interface Collection {
  name: string
  image: string
  bidPoints: boolean
  traitBidPoints: boolean
  listingPoints: boolean
  lendingPoints: boolean
  [key: string]: string | boolean // Add index signature
}

const collections: Collection[] = [
  { name: 'Wrapped Cryptopunks', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', bidPoints: true, traitBidPoints: true, listingPoints: true, lendingPoints: true },
  { name: 'Azuki', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', bidPoints: true, traitBidPoints: true, listingPoints: true, lendingPoints: true },
  { name: 'Milady', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', bidPoints: true, traitBidPoints: true, listingPoints: true, lendingPoints: true },
  { name: 'DeGods', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', bidPoints: true, traitBidPoints: true, listingPoints: true, lendingPoints: true },
  { name: 'BoredApeYachtClub', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', bidPoints: true, traitBidPoints: true, listingPoints: true, lendingPoints: true },
  { name: 'MutantApeYachtClub', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', bidPoints: true, traitBidPoints: true, listingPoints: true, lendingPoints: true },
  { name: 'Kanpai Pandas', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', bidPoints: true, traitBidPoints: false, listingPoints: true, lendingPoints: true },
  { name: 'Redacted Remilio Ba...', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', bidPoints: true, traitBidPoints: false, listingPoints: true, lendingPoints: true },
  { name: 'PudgyPenguins', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', bidPoints: true, traitBidPoints: true, listingPoints: true, lendingPoints: true },
  { name: 'Wrapped Cryptopunks', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', bidPoints: true, traitBidPoints: true, listingPoints: true, lendingPoints: true },
  { name: 'Azuki', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', bidPoints: true, traitBidPoints: true, listingPoints: true, lendingPoints: true },
  { name: 'Milady', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', bidPoints: true, traitBidPoints: true, listingPoints: true, lendingPoints: true },
  { name: 'DeGods', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', bidPoints: true, traitBidPoints: true, listingPoints: true, lendingPoints: true },
  { name: 'BoredApeYachtClub', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', bidPoints: true, traitBidPoints: true, listingPoints: true, lendingPoints: true },
  { name: 'MutantApeYachtClub', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', bidPoints: true, traitBidPoints: true, listingPoints: true, lendingPoints: true },
  { name: 'Kanpai Pandas', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', bidPoints: true, traitBidPoints: false, listingPoints: true, lendingPoints: true },
  { name: 'Redacted Remilio Ba...', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', bidPoints: true, traitBidPoints: false, listingPoints: true, lendingPoints: true },
  { name: 'PudgyPenguins', image: 'https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif', bidPoints: true, traitBidPoints: true, listingPoints: true, lendingPoints: true },
]

type PointKey = 'bidPoints' | 'traitBidPoints' | 'listingPoints' | 'lendingPoints'

export default function PointsComponent() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  const pointKeys: PointKey[] = ['bidPoints', 'traitBidPoints', 'listingPoints', 'lendingPoints']

  return (
    <div className="min-h-screen bg-black text-[#F7F2DA] ">
      <div className="w-full mx-auto">
        <motion.div
          layout
          className="bg-black overflow-auto  md:overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 border-b border-gray-800">
                <th className="px-4 py-2 text-left font-medium">NAME</th>
                <th className="px-4 py-2 text-center font-medium">BID POINTS</th>
                <th className="px-4 py-2 text-center font-medium">TRAIT BID POINTS</th>
                <th className="px-4 py-2 text-center font-medium">LISTING POINTS</th>
                <th className="px-4 py-2 text-center font-medium">LENDING POINTS</th>
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
                        <AnimatePresence>
                          {hoveredRow === index && (
                            <motion.span
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{ duration: 0.2 }}
                              className="ml-2"
                            >
                              <Star className="w-4 h-4" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    </td>
                    {pointKeys.map((point) => (
                      <td key={point} className="px-4 py-2 text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        >
                          {collection[point] ? (
                            <Check className="inline-block w-5 h-5 text-[#F7F2DA]" />
                          ) : (
                            <X className="inline-block w-5 h-5 text-slate-500" />
                          )}
                        </motion.div>
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  )
}