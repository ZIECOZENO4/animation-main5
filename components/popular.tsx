"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@nextui-org/react"
import { ArrowUpRight } from "lucide-react"

interface Collection {
  id: number
  name: string
  image: string
  owners: number
  floorPrice: number
  volume: number
}

const collections: Collection[] = [
  {
    id: 1,
    name: "Milady",
    image: "/path-to-milady-image.jpg",
    owners: 5377,
    floorPrice: 4.99,
    volume: 201.74
  },
  {
    id: 2,
    name: "Opepen Edition",
    image: "/path-to-opepen-image.jpg",
    owners: 3793,
    floorPrice: 0.14,
    volume: 4.22
  },
  {
    id: 3,
    name: "Kanpai Pandas",
    image: "/path-to-pandas-image.jpg",
    owners: 3128,
    floorPrice: 0.52,
    volume: 17.25
  },
  {
    id: 4,
    name: "Pixelmon",
    image: "/path-to-pixelmon-image.jpg",
    owners: 1528,
    floorPrice: 0.32,
    volume: 0.61
  },
  // Add more collections as needed
]

export default function CollectionsGrid() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div className="min-h-screen  py-8">
 <motion.p
        className="mt-2 leading-10 tracking-tight text-[#F7F2DA] text-center sm:leading-none hover:text-gray-500 text-inherit text-md md:text-2xl hover:scale-110 hover:text-xl md:hover:text-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out text-xl font-normal relative"
        whileHover={{
          y: [-2, 2, -2],
          transition: { repeat: Infinity, duration: 0.5 }
        }}
      >
        POPULAR TOKENS
        <motion.span
          className="absolute inset-0 text-transparent pointer-events-none"
          style={{
            textShadow: `
              0 0 20px rgba(247, 242, 218, 0.7),
              0 0 40px rgba(247, 242, 218, 0.5),
              0 0 60px rgba(247, 242, 218, 0.3)
            `,
            WebkitTextStroke: "2px rgba(247, 242, 218, 0.2)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
             POPULAR TOKENS
        </motion.span>
      </motion.p>
      
      <motion.div 
        className="flex space-x-4 overflow-x-auto scrollbar-hide"
        drag="x"
        dragConstraints={{ right: 0, left: -((collections.length - 1) * 340) }}
      >
        {collections.map((collection) => (
          <motion.div
            key={collection.id}
            className="relative flex-none"
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setHoveredId(collection.id)}
            onHoverEnd={() => setHoveredId(null)}
          >
            <Card className="w-[320px] h-[400px] bg-[#0A0A0A] border border-[#1A1A1A] overflow-hidden">
              <div className="relative h-full">
                {/* Main Image */}
                <div className="h-[70%] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0A] z-10" />
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content Section */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-white text-xl font-medium mb-1">
                        {collection.name}
                      </h3>
                      <p className="text-[#666666] text-sm">
                        {collection.owners} owners
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="bg-[#1A1A1A] p-2 rounded-lg cursor-pointer"
                    >
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[#666666] text-sm mb-1">FLOOR PRICE</p>
                      <div className="flex items-center">
                        <img 
                          src="/eth-icon.svg" 
                          alt="ETH" 
                          className="w-4 h-4 mr-1"
                        />
                        <span className="text-white">
                          {collection.floorPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[#666666] text-sm mb-1">1D VOLUME</p>
                      <div className="flex items-center">
                        <img 
                          src="/eth-icon.svg" 
                          alt="ETH" 
                          className="w-4 h-4 mr-1"
                        />
                        <span className="text-white">
                          {collection.volume.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}