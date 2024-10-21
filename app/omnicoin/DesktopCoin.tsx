"use client";
import React, { useState } from "react";
import { Bell, ChevronDown, ChevronLeft } from "lucide-react";
import { Button } from "@nextui-org/react";
import { Card, Chip, Tabs, Tab } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { motion} from "framer-motion";
import FullConnectButton from "../../components/fullConnectButton";

export default function DesktopCoin() {
  const [activeTab, setActiveTab] = useState("comments");
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(event.target.value);
  };

  return (
    <div className="min-h-screen  text-[#F7F2DA] p-4 md:px-[5vw] px-4">
    <style jsx global>{`
    input:focus,
    textarea:focus {
      outline: none;
      border-color: #4ae436 !important;
    }
  `}</style>
      <main className="flex space-x-4">
        <div className="w-2/3 space-y-4">
        <Card className=" border border-slate-600  bg-black p-4">
        <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
              <Link href='/' passHref>
      <motion.a
        className="inline-block p-2 rounded-full bg-slate-800  hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
                <div className="w-12 h-12 bg-purple-600 rounded-full ml-6 mr-4"></div>
                <span className='uppercase leading-8'>hellohell</span>
              </div>
              <div className="flex items-center">
                <Chip className='p-2 flex flex-row gap-3 mx-2'>   <span className="mr-2">Creator: afbbff</span>
                <span className="text-red-500">🔥</span></Chip>
             
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
          <div className="flex space-x-8 text-xl mb-4 mt-6 md:mt-10">
            <button
              className={`${
                activeTab === "comments"
                  ? "text-[#F7F2DA] border-b-2 border-[#F7F2DA]"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("comments")}
            >
              Comments 0
            </button>
            <button
              className={`${
                activeTab === "trades"
                  ? "text-[#F7F2DA] border-b-2 border-[#F7F2DA]"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("trades")}
            >
              Trades
            </button>
          <hr />
          </div>
          {activeTab === "comments" ? (
            <>
              <Card className="bg-black border border-slate-600  p-4 flex flex-col items-center justify-center h-52">
              <svg width="30px" height="30px" className='text-gray-400 my-2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0619 4.4295C12.6213 3.54786 11.3636 3.54786 10.9229 4.4295L3.89008 18.5006C3.49256 19.2959 4.07069 20.2317 4.95957 20.2317H19.0253C19.9142 20.2317 20.4923 19.2959 20.0948 18.5006L13.0619 4.4295ZM9.34196 3.6387C10.434 1.45376 13.5508 1.45377 14.6429 3.63871L21.6758 17.7098C22.6609 19.6809 21.2282 22 19.0253 22H4.95957C2.75669 22 1.32395 19.6809 2.3091 17.7098L9.34196 3.6387Z" fill="#ffffff"></path> <path d="M12 8V13" stroke="#f20202" stroke-width="1.7" stroke-linecap="round"></path> <path d="M12 16L12 16.5" stroke="#f20202" stroke-width="1.7" stroke-linecap="round"></path> </g></svg>
                <p className="text-gray-400 text-2xl">
                  No comments yet Be the first to comment!
                </p>
              </Card>
              <div className="text-center text-[#F7F2DA] text-xl mb-4 py-2  border border-slate-600">Load more</div>
      
              <button
            type="submit"
       
          className='flex flex-row w-full shake-button'>
      <div className="top-9 left-[1305.31px] w-[2.84px] h-[36.22px] bg-[#787878] border-t-[0.63px] border-solid border-black"></div>
      <div className='flex flex-col flex-grow'>
        <div className="w-full h-[33.39px] top-9 left-[1307.83px] bg-[#787878] items-center shadow-md flex justify-center">
          <span className="text-[#F7F2DA] text-xl font-normal leading-5 text-center">
          + Add Comment
          </span>
        </div>
        <div className="top-[69.7px] left-[1305px] w-full h-[3.15px] bg-[#787878] border-t-[0.63px] border-solid border-black"></div>
      </div>
    </button>
            </>
          ) : (
            <Card className="bg-black p-4 flex   border border-slate-600 flex-col items-center justify-center h-56">
              <svg width="30px" height="30px" className='text-gray-400 my-2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0619 4.4295C12.6213 3.54786 11.3636 3.54786 10.9229 4.4295L3.89008 18.5006C3.49256 19.2959 4.07069 20.2317 4.95957 20.2317H19.0253C19.9142 20.2317 20.4923 19.2959 20.0948 18.5006L13.0619 4.4295ZM9.34196 3.6387C10.434 1.45376 13.5508 1.45377 14.6429 3.63871L21.6758 17.7098C22.6609 19.6809 21.2282 22 19.0253 22H4.95957C2.75669 22 1.32395 19.6809 2.3091 17.7098L9.34196 3.6387Z" fill="#ffffff"></path> <path d="M12 8V13" stroke="#f20202" stroke-width="1.7" stroke-linecap="round"></path> <path d="M12 16L12 16.5" stroke="#f20202" stroke-width="1.7" stroke-linecap="round"></path> </g></svg>
              <p className="text-gray-400 text-2xl">No trades yet</p>
            </Card>
          )}
        </div>
        <div className="w-1/3 space-y-4">
          <Card className="bg-black border border-slate-600 mt-2 p-4">
  
            <div className="flex text-xs justify-between py-2">
              <span>Total Supply:10001</span>
              <span className=" text-xs text-gray-400">1 $1 is 0.000010 ETH ($0.023)</span>
            </div>
            <div className="flex justify-center align-middle w-full mb-4 p-2">
            <Tabs 
                   className='w-full'
                   classNames={{
                     tabList: "w-full",
                     tab: "flex-1",
                     cursor: "w-full",
                   }}
            key="transaction" variant="bordered" aria-label="Tabs variants">
          <Tab key="BUY" title="BUY" />
          <Tab key="SELL" title="SELL" />
        </Tabs>
 
            </div>
            <div className="flex text-xs justify-between  mb-4">
              <span>Total Supply:10001</span>
              <span className="text-slate-400">Set slippage: 1%</span>
            </div>
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="Enter amount"
                className="flex-grow bg-black border border-gray-700 p-2 rounded-xl"
              />
               <select
      value={selectedCurrency}
      onChange={handleChange}
      aria-label="Select Currency"
      className="bg-black text-[#F7F2DA] border border-gray-700 p-2 rounded-xl"
    >
      <option value="USD">USD</option>
      <option value="ETH">ETH</option>
      <option value="BTC">BTC</option>
      <option value="SOL">SOL</option>
    </select>
            </div>
            <div className="flex flex-grow space-x-2 mb-4">
              <Chip radius="sm" className="flex-grow p-2">
                1 ETH
              </Chip>
              <Chip radius="sm" className="flex-grow p-2">
                5 ETH
              </Chip>
              <Chip radius="sm" className="flex-grow p-2">
                10 ETH
              </Chip>
                 <Chip radius="sm" className="flex-grow p-2">
                20 ETH
              </Chip>
         
            </div>
     
            <div className="w-full">
            <FullConnectButton />
            </div>
         
          </Card>

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
                <span className=""> More ▼</span>
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
   
       
          <Card className="bg-black border border-slate-600 text-center p-4">
            <h2 className="text-xl md:text-3xl text-[#F7F2DA] text-center mb-4">
              Holders Distribution
            </h2>
            <p className="text-xs text-slate-600 my-8">No Current Distribution</p>
          </Card>
        </div>
      </main>
    </div>
  );
}