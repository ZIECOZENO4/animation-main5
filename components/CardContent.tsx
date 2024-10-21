"use client"
import { motion } from "framer-motion";
import { CardSpotlight } from "./ui/card-spotlight";
import { Avatar } from "@nextui-org/react";

export function CardContent() {
  return (
    <CardSpotlight className="h-auto w-full flex flex-col items-center justify-center">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center my-2"
      >
        <Avatar src="https://cryptologos.cc/logos/ethereum-eth-logo.png" size="md" />
      </motion.div>
      
      <motion.p 
        className="text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-slate-600 via-slate-500 to-slate-400 text-center font-bold relative z-20 mt-2 "
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        Welcome to Omini Pump
      </motion.p>
      
      <div className="text-slate-100 text-xs my-2 relative z-20">
        Omini Pump is the best decentralised platform, where you Create crypto token and Coin also buy and sell of any Crypto Currency
        <p className="text-slate-500 text-md mt-2">Transparent and Safe</p>
        <ul className="list-none text-slate-100 text-xs space-y-2 mt-2">
          <li className="flex items-start">
            <CheckIcon />
            <span className="ml-2">Support Full Wallet Activity</span>
          </li>
          <li className="flex items-start">
            <CheckIcon />
            <span className="ml-2">Create Tokens and Coins</span>
          </li>
          <li className="flex items-start">
            <CheckIcon />
            <span className="ml-2">Fully Audited and Unruggable</span>
          </li>
          <li className="flex items-start">
            <CheckIcon />
            <span className="ml-2">Buy and Sell of Coins and Tokens</span>
          </li>
        </ul>
      </div>
      
      <p className="text-red-600 mt-4 relative z-20 text-[10px]">
        Omni Pump is super secure and transparent by default, but users should be careful and avoid exposing their private key.
      </p>
    </CardSpotlight>
  );
}

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
};