"use client"
import React from 'react'
import { Bell, ChevronDown, ChevronLeft } from "lucide-react";
import { Button } from "@nextui-org/react";
import { Card, Chip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
const InfoComponent = () => {
  return (
    <div className='w-full p-2 flex flex-col gap-4'>
            <h1 className='text-xl md:text-3xl text-center py-2 md:py-4'>Coin Details</h1>
            <Card className="bg-black border border-slate-600  text-[#F7F2DA] p-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className=" flex flex-row justify-between w-full h-auto">
                <div className=" h-14 w-14 inset-0 bg-purple-600 rounded-full">
                {/* <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="Token logo"
                  width={48}
                  height={48}
                  className="relative z-10 rounded-full"
                /> */}
                </div>
                <div className="mt-4 text-right text-xs text-gray-400">
                <Chip radius="md" className="p-2">
                  MCAP: $24.28000
                </Chip>
              </div>
              </div>
           
            </div>
            <div className="my-4">
              <h2 className="text-xl ">hellohell</h2>
              <p className="text-slate-500 text-sm">
                HelloHell Is Here...{" "}
                <span className="text-green-400"> More ▼</span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Total Supply</p>
                <p className="font-mono">1000.000000</p>
              </div>
              <div>
                <p className="text-gray-400">Token Reserve</p>
                <p className="font-mono">1000.000000</p>
              </div>
              <div>
                <p className="text-gray-400">ETH Reserve</p>
                <p className="font-mono">0.009520</p>
              </div>
              <div>
                <p className="text-gray-400">Token Price</p>
                <p className="font-mono">0.000010</p>
              </div>
              <div>
                <p className="text-gray-400">Creator</p>
                <p className="font-mono truncate">afbbff</p>
              </div>
              <div>
                <p className="text-gray-400">24h Volume</p>
                <p className="font-mono">$1,000,000</p>
              </div>
            </div>
          </Card>
   
       
          <Card className="bg-black border border-slate-400 text-center p-4">
            <h2 className="text-xl md:text-3xl text-[#F7F2DA] text-center mb-4">
              Holders Distribution
            </h2>
            <p className="text-xs my-8">No Current Distribution</p>
          </Card>
    </div>
  )
}

export default InfoComponent