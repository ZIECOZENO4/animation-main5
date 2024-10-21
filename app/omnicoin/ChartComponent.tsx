"use client"
import React from 'react'
import { Bell, ChevronDown, ChevronLeft } from "lucide-react";
import { Button } from "@nextui-org/react";
import { Card} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { motion} from "framer-motion";
const ChartComponent = () => {
  return (
    <div className='w-full p-2 flex flex-col gap-4 '>
            <h1 className='text-xl md:text-3xl text-center py-2 md:py-4'>Coin Chart</h1>
       <Card className=" border border-slate-600  bg-black mb-4 p-4">
    <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
          <Link href='/' passHref>
  <motion.a
    className="inline-block p-2 rounded-full bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    whileHover={{ x: -5 }}
    whileTap={{ x: -10 }}
    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
  >
    <motion.svg
      fill="#ffffff"
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="icon flat-color"
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        fill="#000000"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      />
      <motion.path
        d="M17,11H11V9.86a1,1,0,0,0-1.5-.69L6.38,11.31a.82.82,0,0,0,0,1.38L9.5,14.83a1,1,0,0,0,1.5-.69V13h6a1,1,0,0,0,0-2Z"
        fill="#2ca9bc"
        initial={{ x: 0 }}
        whileHover={{ x: -2 }}
        whileTap={{ x: -4 }}
      />
    </motion.svg>
  </motion.a>
</Link>
            <div className="w-8 h-8 bg-purple-600 rounded-full mr-2"></div>
            <span>hellohell</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">Creator: afbbff</span>
            <span className="text-red-500">🔥</span>
          </div>
        </div>
        </Card>
        <Card className=" border border-slate-600  bg-black p-4">
           
           <div className="grid grid-cols-4 gap-4 mb-4">
             <div>
               <div className="text-gray-400">Market cap</div>
               <div className="text-xl">$24.53</div>
             </div>
             <div>
               <div className="text-gray-400">ETH Reserve</div>
               <div className="text-xl">0.009520</div>
             </div>
             <div>
               <div className="text-gray-400">Token Reserve</div>
               <div className="text-xl">1000.000000</div>
             </div>
             <div>
               <div className="text-gray-400">Token Price</div>
               <div className="text-xl">0.000010 ETH</div>
             </div>
           </div>
         
           <div className="bg-slate-800 h-64 flex items-center justify-center rounded-md">
             <div className="text-gray-400 text-2xl flex flex-row gap-4">
             <svg width="30px" height="30px" className='text-gray-400 ' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 21V17M9 21V13M15 21V15M21 21V11M8.43934 5.56066C8.71079 5.83211 9.08579 6 9.5 6C9.91421 6 10.2892 5.83211 10.5607 5.56066M8.43934 5.56066C8.16789 5.28921 8 4.91421 8 4.5C8 3.67157 8.67157 3 9.5 3C10.3284 3 11 3.67157 11 4.5C11 4.91421 10.8321 5.28921 10.5607 5.56066M8.43934 5.56066L5.56066 8.43934M5.56066 8.43934C5.28921 8.16789 4.91421 8 4.5 8C3.67157 8 3 8.67157 3 9.5C3 10.3284 3.67157 11 4.5 11C5.32843 11 6 10.3284 6 9.5C6 9.08579 5.83211 8.71079 5.56066 8.43934ZM10.5607 5.56066L13.4393 8.43934M13.4393 8.43934C13.1679 8.71079 13 9.08579 13 9.5C13 10.3284 13.6716 11 14.5 11C15.3284 11 16 10.3284 16 9.5C16 9.08579 15.8321 8.71079 15.5607 8.43934M13.4393 8.43934C13.7108 8.16789 14.0858 8 14.5 8C14.9142 8 15.2892 8.16789 15.5607 8.43934M15.5607 8.43934L18.4393 5.56066M18.4393 5.56066C18.7108 5.83211 19.0858 6 19.5 6C20.3284 6 21 5.32843 21 4.5C21 3.67157 20.3284 3 19.5 3C18.6716 3 18 3.67157 18 4.5C18 4.91421 18.1679 5.28921 18.4393 5.56066Z" stroke="#f1e9e9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg> <p>TradingView Chart Placeholder</p>
             </div>
           </div>
         </Card>
         </div>
  )
}

export default ChartComponent