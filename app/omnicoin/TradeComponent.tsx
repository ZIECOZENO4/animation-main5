"use client"
import React, { useState } from "react";
import { Bell, ChevronDown, ChevronLeft } from "lucide-react";
import { Button, Card, Chip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import FullConnectButton from "@/components/fullConnectButton";

const TradeComponent = () => {
  const [activeTab, setActiveTab] = useState("comments");
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(event.target.value);
  };

  return (
    <div className='w-full p-2 flex flex-col gap-4'>
      <h1 className='text-xl md:text-3xl text-center py-2 md:py-4'>Trade Transaction</h1>
      <Card className="bg-black border border-slate-600 mt-2 p-4">
        <div className="flex text-xs justify-between py-2">
          <span>Total Supply:10001</span>
          <span className="text-xs text-gray-400">1 $1 is 0.000010 ETH ($0.023)</span>
        </div>
        <div className="flex justify-between mb-8 p-2">
          <Button className="bg-green-500 hover:bg-green-600 flex-grow mr-2">
            Buy
          </Button>
          <Button variant="bordered" className="flex-grow ml-2">
            Sell
          </Button>
        </div>
        <div className="flex text-xs justify-between mb-8">
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
        <div className="flex space-x-2 mb-4">
          <Chip radius="sm" className="flex-grow p-2">1 ETH</Chip>
          <Chip radius="sm" className="flex-grow p-2">5 ETH</Chip>
          <Chip radius="sm" className="flex-grow p-2">10 ETH</Chip>
          <Chip radius="sm" className="flex-grow p-2">20 ETH</Chip>
          <Chip radius="sm" className="flex-grow p-2">50 ETH</Chip>
        </div>
        <div className="w-full">
          <FullConnectButton />
        </div>
      </Card>
      <div className="flex space-x-8 text-xl mb-4 mt-6 md:mt-10">
        <button
          className={`${
            activeTab === "comments"
              ? "text-green-500 border-b-2 border-green-500"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("comments")}
        >
          Comments 0
        </button>
        <button
          className={`${
            activeTab === "trades"
              ? "text-green-500 border-b-2 border-green-500"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("trades")}
        >
          Trades
        </button>
      </div>
      <hr />
      {activeTab === "comments" ? (
        <>
          <Card className="bg-black border border-slate-600 p-4 flex flex-col items-center justify-center h-52">
            <svg width="30px" height="30px" className='text-gray-400 my-2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.0619 4.4295C12.6213 3.54786 11.3636 3.54786 10.9229 4.4295L3.89008 18.5006C3.49256 19.2959 4.07069 20.2317 4.95957 20.2317H19.0253C19.9142 20.2317 20.4923 19.2959 20.0948 18.5006L13.0619 4.4295ZM9.34196 3.6387C10.434 1.45376 13.5508 1.45377 14.6429 3.63871L21.6758 17.7098C22.6609 19.6809 21.2282 22 19.0253 22H4.95957C2.75669 22 1.32395 19.6809 2.3091 17.7098L9.34196 3.6387Z" fill="#ffffff"></path>
                <path d="M12 8V13" stroke="#f20202" strokeWidth="1.7" strokeLinecap="round"></path>
                <path d="M12 16L12 16.5" stroke="#f20202" strokeWidth="1.7" strokeLinecap="round"></path>
              </g>
            </svg>
            <p className="text-gray-400 text-2xl">
              No comments yet Be the first to comment!
            </p>
          </Card>
          <div className="text-center text-green-500 mb-4 py-2 border border-slate-600">Load more</div>
          <Button className="w-full bg-green-500 hover:bg-green-600">
            + Add Comment
          </Button>
        </>
      ) : (
        <Card className="bg-black p-4 flex border border-slate-600 flex-col items-center justify-center h-56">
          <svg width="30px" height="30px" className='text-gray-400 my-2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.0619 4.4295C12.6213 3.54786 11.3636 3.54786 10.9229 4.4295L3.89008 18.5006C3.49256 19.2959 4.07069 20.2317 4.95957 20.2317H19.0253C19.9142 20.2317 20.4923 19.2959 20.0948 18.5006L13.0619 4.4295ZM9.34196 3.6387C10.434 1.45376 13.5508 1.45377 14.6429 3.63871L21.6758 17.7098C22.6609 19.6809 21.2282 22 19.0253 22H4.95957C2.75669 22 1.32395 19.6809 2.3091 17.7098L9.34196 3.6387Z" fill="#ffffff"></path>
              <path d="M12 8V13" stroke="#f20202" strokeWidth="1.7" strokeLinecap="round"></path>
              <path d="M12 16L12 16.5" stroke="#f20202" strokeWidth="1.7" strokeLinecap="round"></path>
            </g>
          </svg>
          <p className="text-gray-400 text-2xl">No trades yet</p>
        </Card>
      )}
    </div>
  )
}

export default TradeComponent;