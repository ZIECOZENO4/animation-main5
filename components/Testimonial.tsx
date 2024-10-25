"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Twitter } from 'lucide-react'

export default function Component() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  const nftItems = [
    { id: 9055, price: 9.75, avatar: '/placeholder.svg?height=32&width=32' },
    { id: 1242, price: 10.24, avatar: '/placeholder.svg?height=32&width=32' },
    { id: 6913, price: 10.24, avatar: '/placeholder.svg?height=32&width=32' },
    { id: 4009, price: 10.25, avatar: '/placeholder.svg?height=32&width=32' },
  ]

  return (
    <div className=" text-[#F7F2DA] p-8 ">

      <div className="flex gap-8">
        <motion.div
          className="w-1/2 gap-4"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
             <motion.p
        className="mt-2 leading-10 tracking-tight text-[#F7F2DA] text-left sm:leading-none hover:text-gray-500 text-inherit text-md md:text-2xl ml-2 md:ml-4 hover:scale-110 hover:text-xl md:hover:text-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out text-xl font-normal relative"
        whileHover={{
          y: [-2, 2, -2],
          transition: { repeat: Infinity, duration: 0.5 }
        }}
      >
       SWEEP ACROSS MULTIPLE MARKETPLACES
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
         SWEEP ACROSS MULTIPLE MARKETPLACES
        </motion.span>
      </motion.p>
           
          <div className="border border-slate-500 bg-black">
          <motion.p
        className="mt-2 leading-10 tracking-tight p-4 text-[#F7F2DA] text-left sm:leading-none hover:text-gray-500 text-inherit text-md md:text-xl ml-2 md:ml-4 hover:scale-110 hover:text-xl md:hover:text-xl hover:-translate-y-1 transition-all uppercase duration-300 ease-in-out text-xl font-normal relative"
        whileHover={{
          y: [-2, 2, -2],
          transition: { repeat: Infinity, duration: 0.5 }
        }}
      >
      @ZENO_WEB
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
       @ZENO_WEB
        </motion.span>
      </motion.p>
      <hr className='bg-slate-500 border-slate-500 text-border-slate-500 w-full mb-8' />
            <div className="flex items-center gap-2 mb-2">
              <img src="/placeholder.svg?height=32&width=32" alt="Avatar" className="rounded-full" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">Debussy.eth</span>
                  <span className="text-gray-500">@Debussy100</span>
                </div>
                <Twitter className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <p className="mb-2">
              Just had a demo of <span className="text-blue-400">@blur_io</span> with{' '}
              <span className="text-blue-400">@PacmanBlur</span> ...Holy moly, this platform will put the others to shame.
              This is the future of NFT trading. I'm very very impressed with it.
            </p>
            <span className="text-gray-500">8:01 PM · Aug 21, 2022</span>
          </div>
        </motion.div>
        <motion.div
          className="w-1/2"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
        <img alt='image1' src='/images/image.PNG' className='w-full h-full rounded-xl' />
        </motion.div>
      </div>
    </div>
  )
}