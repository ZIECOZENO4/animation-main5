
"use client"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { ChevronDownIcon } from "lucide-react"
import Image from "next/image"
import { useBalance } from 'wagmi'
import { motion } from "framer-motion";


const CubicButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
  
        const { data: balanceData } = useBalance({
          address: account?.address && account.address.startsWith('0x') 
            ? (account.address as `0x${string}`)
            : undefined,
        })

        const ready = mounted
        const connected = ready && account && chain

  
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (

              <motion.div 
              className="w-[110.08px] h-[36.22px] shake-button border-[0.63px] border-[#000000]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}

              whileHover={{ scale: 1.05 }}
            >
              <div className="flex">
                <div className="w-[2.84px] h-[36.22px] bg-[#787878] border-t-[0.63px] border-black" />
                <div className="flex items-center justify-center w-[110.08px] text-center h-[33px] bg-[#787878]">
                  <motion.p 
                    className="text-[20px] text-[#F7F2DA] text-center font-normal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
        
                  >
                CONNECT
                  </motion.p>
                </div>
              </div>
              <div className="w-[110.08px]  h-[2px] bg-[#787878] border-t-[0.63px] border-[#000000]" />
            </motion.div>
                )
              }

              return (
                <div className="flex flex-col sm:flex-row gap-1">
            
      
                  <motion.div 
              className="w-auto h-[36.22px] shake-button border-[0.63px] border-[#000000]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={openAccountModal}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex">
                <div className="w-[2.84px] h-[36.22px] bg-[#787878] border-t-[0.63px] border-black" />
                <div className=" w-auto px-2 shadow-md flex items-center justify-between h-[33px] bg-[#787878]">
                  <motion.p 
                    className="text-[20px] text-[#F7F2DA] text-center font-normal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
        
                  >
                  <div className="flex items-center gap-2">
                          {account.ensAvatar && (
                            <Image
                              src={account.ensAvatar}
                              alt="ENS Avatar"
                              width={20}
                              height={20}
                              className="rounded-full"
                            />
                          )}
                          <span className="text-[#F7F2DA] text-sm  font-normal">
                          {balanceData?.formatted?.slice(0, 5)} {balanceData?.symbol}
                        </span>
                        <span className="text-[#F7F2DA] text-xs pl-2 pr-1 font-normal">
                            {account.displayName}
                          </span>
                        <ChevronDownIcon />
                        </div>
                 
                  </motion.p>
                </div>
              </div>
              <div className="w-full  h-[2px] bg-[#787878] border-t-[0.63px] border-[#000000]" />
            </motion.div>
                  {/* Network Button */}
                
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default CubicButton