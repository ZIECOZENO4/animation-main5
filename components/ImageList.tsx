"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card} from "@nextui-org/react"
import { Badge } from "@nextui-org/react"
import { Avatar} from "@nextui-org/react"
import { CheckCircle, XCircle } from "lucide-react"

const collections = [
  { 
    id: 1, 
    name: "Pudgy Penguins", 
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png", 
    verified: true,
    creator: {
      name: "PenguinMaster",
      avatar: "https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif"
    }
  },
  { 
    id: 2, 
    name: "Kanpai Pandas", 
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png", 
    verified: true,
    creator: {
      name: "PandaCreator",
      avatar: "https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif"
    }
  },
  { 
    id: 3, 
    name: "Bored Ape Yacht Club", 
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png", 
    verified: true,
    creator: {
      name: "YachtClubOwner",
      avatar: "https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif"
    }
  },
  { 
    id: 4, 
    name: "Checks - VV Originals", 
    image: "https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/images/ethereumLogo.png", 
    verified: false,
    creator: {
      name: "CheckMaker",
      avatar: "https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif"
    }
  },
  { 
    id: 5, 
    name: "Azuki", 
    image: "https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/images/com.jpeg", 
    verified: true,
    creator: {
      name: "AzukiArtist",
      avatar: "https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif"
    }
  },
  { 
    id: 6, 
    name: "Azukimr", 
    image: "https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/images/fx.jfif", 
    verified: true,
    creator: {
      name: "AzukiArtist",
      avatar: "https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif"
    }
  },
  { 
    id: 7, 
    name: "ZenoToken", 
    image: "https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/images/gf2.jpg", 
    verified: true,
    creator: {
      name: "Zeno Web",
      avatar: "https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif"
    }
  },
  { 
    id: 7, 
    name: "ZenoToken2", 
    image: "https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/images/gt1.jpg", 
    verified: true,
    creator: {
      name: "Zeno Web",
      avatar: "https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif"
    }
  },
]


export default function ImageComponent() {
    const [hoveredId, setHoveredId] = useState<number | null>(null)
  
    return (
      <div className="w-full overflow-hidden p-8 shadow-2xl mt-4 md:mt-6">
        <motion.div
          className="flex space-x-6 pb-4 shadow-2xl"
          drag="x"
          dragConstraints={{ right: 0, left: -((collections.length - 1) * 280) }}
        >
          {collections.map((collection) => (
            <motion.div
              key={collection.id}
              className="relative"
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setHoveredId(collection.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
         <Card className="w-72 h-64 overflow-hidden relative">
 
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
  <div className="p-0 relative h-full bg-black border border-gray-900 rounded-2xl">
    <motion.div
      className="absolute inset-0 z-10"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: hoveredId === collection.id ? 1 : 0,
        boxShadow: hoveredId === collection.id ? 
          "0 0 20px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.5), 0 0 60px rgba(0,0,0,0.3)" : 
          "none"
      }}
      transition={{ duration: 0.3 }}
    />
                  <motion.img
                    src={collection.image}
                    alt={collection.name}
                    className="h-full w-full object-cover"
                    initial={{ opacity: 0.8, scale: 1 }}
                    animate={{ 
                      opacity: hoveredId === collection.id ? 1 : 0.8,
                      scale: hoveredId === collection.id ? 1.1 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute top-2 left-2 flex items-center space-x-2 bg-black bg-opacity-20 p-2 rounded-md z-20">
                    <Avatar 
                      src={collection.creator.avatar} 
                      alt={collection.creator.name}
                      className="w-8 h-8"
                      showFallback
                      fallback={
                        <span className="text-sm font-medium">
                          {collection.creator.name.charAt(0)}
                        </span>
                      }
                      classNames={{
                        base: "bg-[#787878]",
                        img: "object-cover",
                        fallback: "text-[#F7F2DA]"
                      }}
                    />
                    <span className="text-[#F7F2DA] text-sm font-medium">
                      {collection.creator.name}
                    </span>
                  </div>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-70 z-20"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ 
                      y: hoveredId === collection.id ? 0 : 100, 
                      opacity: hoveredId === collection.id ? 1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-slate-500">
                      {collection.name}
                    </h3>
                    <div className="mt-2 flex items-center justify-between">
                      <Badge 
                        variant="shadow" 
                        className={`${collection.verified ? 
                          'bg-slate-100 text-slate-800' : 
                          'bg-red-100 text-red-800'}`}
                      >
                        {collection.verified ? "Verified" : "Unverified"}
                      </Badge>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        {collection.verified ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }