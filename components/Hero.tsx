
"use client";
import React from "react";
import { useState, useEffect } from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import Image from "next/image";
import { StartingButton } from "./CreateButton";
import { HeroSearchInput } from "./HeroSearch";
import { ViewMoreButton } from "./ViewMoreButton";
import { motion, AnimatePresence } from "framer-motion";
import { Badge, Button  } from "@nextui-org/react"
import {Chip} from "@nextui-org/react";
import DigitalClock from "./timer/digital-clock";
const profiles = [
  {
    name: "EthCome",
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    badges: [ "Initial", "First Phase"],
    views: "36.67K",
    reactions: "34",
    ticker: "ROB",
    tickerName: "Red or black",
    address:"OXytrf.....hgjhua",
  },
  {
    name: "SolanaBoy",
    image: "https://cryptologos.cc/logos/solana-sol-logo.png",
    badges: ["Initial","Second Phase"],
    views: "22.5K",
    reactions: "28",
    ticker: "WHZ",
    tickerName: "WhizCoin",
    address:"OXvfdt.....hghuya",
  },
  {
    name: "BlockMaster",
    image: "https://cryptologos.cc/logos/tron-trx-logo.png",
    badges: ["Initial", "First Phase"],
    views: "45.2K",
    reactions: "52",
    ticker: "BLM",
    tickerName: "BlockMasterCoin",
    address:"OXvghf.....hgyfda",
  },
]
export function HeroSection() {
  const [currentProfile, setCurrentProfile] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProfile((prev) => (prev + 1) % profiles.length)
    }, 20000)

    return () => clearInterval(interval)
  }, [])

  const profile = profiles[currentProfile]
  return (
    <div className="flex justify-center items-center h-auto mt-4">
    <BackgroundGradient className="flex flex-col rounded-[22px] w-full align-middle items-center p-4 sm:p-10 bg-black">
  <StartingButton  />
    <div className="flex align-middle my-6 flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <motion.div 
            className="relative w-32 md:w-40 md:h-40 h-32 rounded-full overflow-hidden"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <img
              alt="Profile picture"
              className="object-cover"
              src={profile.image}
            />
            <div className="absolute inset-0 rounded-full border-2 border-slate-800 opacity-50"></div>
          </motion.div>
          <motion.div 
            className="text-center sm:text-left"
            key={profile.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl text-light  text-[#F7F2DA]">Created by {profile.name}</h2>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2 text-[#F7F2DA]">
              {profile.badges.map((badge, index) => (
                <Chip key={index} color={`${index % 2 === 0 ? 'default' : 'warning'}`} variant={`${index % 2 === 0 ? 'shadow' : 'dot'}`} className='font-bold'>
                  {badge}
                </Chip>
              ))}
            </div>
            <p className="mt-2 justify-center sm:justify-start  text-gray-500 flex">Token Views: <span className='ml-2 text-[#F7F2DA]'>{profile.views}</span> </p>
            <p className=" justify-center sm:justify-start text-gray-500 flex">Reactions:<span className='ml-2 text-[#F7F2DA]'> {profile.reactions}</span> </p>
            <p className="text-slate-500 mt-2">
              {profile.tickerName} [ticker: {profile.ticker}]
            </p>
            <Chip color="default" className='text-sm md:text-md my-1 font-bold'>{profile.address}</Chip>
          </motion.div>
        </div>
        <div className="gap-4 my-2 flex flex-col w-full md:flex-row ">
          <div className="md:w-[70%] w-full">
<HeroSearchInput />
          </div>

<div className="md:w-[30%] w-full">
<Button 
            className={`relative rounded-none px-4 py-2 bg-[#0A0909] text-[#F7F2DA]  border-2 border-[#1a1a1a]`}
            style={{
                boxShadow: '4px 4px 0 0 rgba(26, 26, 26, 0.9), 8px 8px 0 0 rgba(26, 26, 26, 0.7)',
            }}
        >
            <DigitalClock />
        </Button>            
            </div>

        </div>
      </BackgroundGradient>
    </div>
  );
}
