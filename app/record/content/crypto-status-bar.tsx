'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, Instagram, Twitter, Info } from 'lucide-react'
import { Switch, Tabs, Tab } from "@nextui-org/react";

type PopupContent = {
  title: string
  description: string
}

const popupContents: { [key: string]: PopupContent } = {
  live: { title: 'Live Data', description: 'Real-time market data updates' },
  social: { title: 'Social Media', description: 'Connect with our community' },
  price: { title: 'Ethereum Price', description: 'Current market price of ETH' },
  collect: { title: 'Collect', description: 'Choose if want to trade standard or presale tokens' },
  trade: { title: 'Trade', description: 'Exchange digital assets' },
  settings: { title: 'Settings', description: 'Adjust your preferences' },
  gas: { title: 'Gas Fees', description: 'Current network transaction costs' },
}

export default function BottomStatus() {
  const [activePopup, setActivePopup] = useState<string | null>(null)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-black  border-slate-500/30 text-[#F7F2DA] px-2  text-xs sm:text-sm">
      <div className="flex items-center justify-between border-t border-b border-slate-500/30">
        <Section onHover={setActivePopup} id="live">
          <motion.div
            className="flex items-center space-x-1 px-2 py-1"
            animate={{
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
          <div className="flex justify-center items-center space-x-4">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-2 h-2 bg-slate-100 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.3, // Staggering the animation
          }}
        />
      ))}
    </div>

            <span className="hidden sm:inline">LIVE DATA ACTIVE</span>
          </motion.div>
        </Section>

        <Section onHover={setActivePopup} id="social">
          <div className="flex items-center space-x-2 px-2 py-1">
            <Instagram className="w-4 h-4" />
            <Twitter className="w-4 h-4" />
          </div>
        </Section>

        <Section onHover={setActivePopup} id="price">
          <span className="px-2 py-1">Ξ2486.18</span>
        </Section>

        <Section onHover={setActivePopup} id="collect" >
        <div className="flex items-center space-x-2 px-2 py-1">
          <p className=" text-xs"> PRESALE </p>
          <Switch defaultSelected color="default" className="text-xs">
         STANDARD
        </Switch>
        </div>
        </Section>

        <Section onHover={setActivePopup} id="trade">
        <Tabs 
                   className='w-auto'
                   classNames={{
                     tabList: "w-auto",
                     tab: "flex-1",
                     cursor: "w-auto",
                   }}
            key="transaction" variant="bordered" aria-label="Tabs variants">
          <Tab key="BUY" title="BUY" />
          <Tab key="SELL" title="SELL" />
        </Tabs>
        </Section>

        <Section onHover={setActivePopup} id="settings">
          <Settings className="w-4 h-4 mx-2" />
        </Section>
        <Section onHover={setActivePopup} id="gas" >
        <span className="text-xs px-2 py-1">GAS PRIORITY 0 / MAX FEE 7</span>
        </Section>
        <Section onHover={setActivePopup} id="gas" className="hidden sm:flex">
      
          <div className="flex items-center space-x-4 mr-2">
  {[1, 2, 3].map((num, index) => (
    <div key={num} className="flex flex-col items-center">
      <div className="w-5 h-5 rounded-full border border-slate-500 flex items-center justify-center text-xs">
        {num}
      </div>
      <span className="text-xs">{[50, 100, 200][index]}</span>
    </div>
  ))}
</div>
        </Section>
      </div>
      <AnimatePresence>
        {activePopup && (
          <Popup content={popupContents[activePopup]} onClose={() => setActivePopup(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

function Section({ children, onHover, id, className = '' }: { children: React.ReactNode, onHover: (id: string | null) => void, id: string, className?: string }) {
  return (
    <div 
      className={`border-r border-slate-500/30 last:border-r-0 ${className}`}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
    >
      {children}
    </div>
  )
}

function Popup({ content, onClose }: { content: PopupContent, onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute bottom-full left-1/2 text-xs transform -translate-x-1/2 mb-2 bg-black bg-opacity-70 border border-slate-500 rounded p-1 shadow-2xl"
    >
      <h3 className="text-slate-300 font-bold mb-1">{content.title}</h3>
      <p className=" text-[8px]">{content.description}</p>
      <button   aria-label='number' onClick={onClose} className="absolute top-1 right-1 text-slate-300 hover:text-slate-100">
        <Info className="w-4 h-4" />
      </button>
    </motion.div>
  )
}