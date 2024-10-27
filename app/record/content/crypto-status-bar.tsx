'use client'

import { useState, useRef, forwardRef, Ref } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, Instagram, Twitter, Info } from 'lucide-react'
import { Switch, Tabs, Tab } from "@nextui-org/react";

type PopupContent = {
  title: string;
  description: string;
};

const popupContents: { [key: string]: PopupContent } = {
  live: { title: 'Live Data', description: 'Real-time market data updates' },
  social: { title: 'Social Media', description: 'Connect with our community' },
  price: { title: 'Ethereum Price', description: 'Current market price of ETH' },
  collect: { title: 'Collect', description: 'Choose if want to trade standard or presale tokens' },
  trade: { title: 'Trade', description: 'Exchange digital assets' },
  settings: { title: 'Settings', description: 'Adjust your preferences' },
  gas: { title: 'Gas Fees', description: 'Current network transaction costs' },
};

export default function BottomStatus() {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ top?: number; left?: number }>({});
  
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleMouseEnter = (id: string) => {
    setActivePopup(id);
    const rect = sectionRefs.current[id]?.getBoundingClientRect();
    if (rect) {
      setPopupPosition({
        top: rect.top + window.scrollY - 40,
        left: rect.left + rect.width / 2
      });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-black bg-opacity-50 border text-[#F7F2DA] px-2 font-mono text-xs sm:text-sm">
      <div className="flex items-center justify-between border-t border-b border-slate-500/30">
        <Section ref={(el) => (sectionRefs.current['live'] = el)} onHover={handleMouseEnter} id="live">
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
                    delay: index * 0.3,
                  }}
                />
              ))}
            </div>
            <span className="hidden sm:inline">LIVE DATA ACTIVE</span>
          </motion.div>
        </Section>

        <Section ref={(el) => (sectionRefs.current['social'] = el)} onHover={handleMouseEnter} id="social">
          <div className="flex items-center space-x-2 px-2 py-1">
            <Instagram className="w-4 h-4" />
            <Twitter className="w-4 h-4" />
          </div>
        </Section>

        <Section ref={(el) => (sectionRefs.current['price'] = el)} onHover={handleMouseEnter} id="price">
          <span className="px-2 py-1">Ξ2486.18</span>
        </Section>

        <Section ref={(el) => (sectionRefs.current['collect'] = el)} onHover={handleMouseEnter} id="collect">
          <div className="flex items-center space-x-2 px-2 py-1">
            <p className="px-2 py-1 text-xs">PRESALE</p>
            <Switch defaultSelected color="default" className="text-xs">
               STANDARD
            </Switch>
          </div>
        </Section>

        <Section ref={(el) => (sectionRefs.current['trade'] = el)} onHover={handleMouseEnter} id="trade">
          <Tabs 
            className='w-auto'
            classNames={{
              tabList: "w-auto",
              tab: "flex-1",
              cursor: "w-auto",
            }}
            key="transaction" variant="bordered" aria-label="Tabs variants"
          >
            <Tab key="BUY" title="BUY" />
            <Tab key="SELL" title="SELL" />
          </Tabs>
        </Section>

        <Section ref={(el) => (sectionRefs.current['settings'] = el)} onHover={handleMouseEnter} id="settings">
          <Settings className="w-4 h-4 mx-2" />
        </Section>
        <Section ref={(el) => (sectionRefs.current['gas'] = el)} onHover={handleMouseEnter} id="gas">
        <span className="text-xs px-2 py-1">GAS PRIORITY 0 / MAX FEE 7</span>
        </Section>
        <Section ref={(el) => (sectionRefs.current['gas'] = el)} onHover={handleMouseEnter} id="gas" className="hidden sm:flex">

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
          <Popup content={popupContents[activePopup]} onClose={() => setActivePopup(null)} position={popupPosition} />
        )}
      </AnimatePresence>
    </div>
  );
}

interface SectionProps {
  children: React.ReactNode;
  onHover: (id:string) => void;
  id:string;
}

// Use forwardRef correctly
const Section = forwardRef<HTMLDivElement, SectionProps>(({ children, onHover, id }, ref) => {
  return (
    <div 
      ref={ref}
      className={`border-r border-slate-500/30 last:border-r-0`}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
    >
      {children}
    </div>
  );
});

// Define Popup component
function Popup({ content, onClose, position }: { content: PopupContent; onClose: () => void; position?: { top?: number; left?: number } }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{ top: position.top ?? undefined, left: position.left ?? undefined }}
      className={`absolute bg-black bg-opacity-50 border border-slate-500 text-xs rounded p-1 shadow-lg`}
    >
      <h3 className="text-slate-500 font-bold mb-1">{content.title}</h3>
      <p className="text-slate-400 text-[8px]">{content.description}</p>
      <button aria-label='close-popup' onClick={onClose} className="absolute top-1 right-1 text-slate-500 hover:text-slate-400">
        <Info className="w-4 h-4" />
      </button>
    </motion.div>
  );
}