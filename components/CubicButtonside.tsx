"use client"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { ChevronDownIcon, Copy, CheckCircle, Power, Plug } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useBalance } from 'wagmi'

const CubicButtonSide = () => {
  const [copied, setCopied] = useState(false)

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

        const handleCopy = async () => {
          if (account?.address) {
            await navigator.clipboard.writeText(account.address)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          }
        }

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
                    onClick={openConnectModal}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex">
                      <div className="w-[2.84px] h-[36.22px] bg-[#787878] border-t-[0.63px] border-black" />
                      <div className="flex items-center justify-center w-[110.08px] text-center h-[33px] bg-[#787878]">
                        <motion.div 
                          className="flex items-center gap-2 text-[20px] text-[#F7F2DA] text-center font-normal"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <Plug size={18} />
                          <span>CONNECT</span>
                        </motion.div>
                      </div>
                    </div>
                    <div className="w-[110.08px] h-[2px] bg-[#787878] border-t-[0.63px] border-[#000000]" />
                  </motion.div>
                )
              }

              return (
                <div className="flex flex-col gap-2">
                  {/* Copy Address Button */}
                  <motion.div 
                    className="w-auto h-[36.22px] shake-button border-[0.63px] border-[#000000]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={handleCopy}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex">
                      <div className="w-[2.84px] h-[36.22px] bg-[#787878] border-t-[0.63px] border-black" />
                      <div className="w-auto px-4 shadow-md flex items-center justify-between h-[33px] bg-[#787878]">
                        <motion.div className="flex items-center gap-2 text-[#F7F2DA]">
                          {copied ? (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center gap-2"
                            >
                              <CheckCircle size={18} />
                              <span className="text-sm">Copied!</span>
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center gap-2"
                            >
                              <Copy size={18} />
                              <span className="text-sm">Copy Address</span>
                            </motion.div>
                          )}
                        </motion.div>
                      </div>
                    </div>
                    <div className="w-full h-[2px] bg-[#787878] border-t-[0.63px] border-[#000000]" />
                  </motion.div>

                  {/* Disconnect Button */}
                  <motion.div 
                    className="w-auto h-[36.22px] shake-button border-[0.63px] border-[#000000]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={openAccountModal}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex">
                      <div className="w-[2.84px] h-[36.22px] bg-[#787878] border-t-[0.63px] border-black" />
                      <div className="w-auto px-4 shadow-md flex items-center justify-between h-[33px] bg-[#787878]">
                        <motion.div 
                          className="flex items-center gap-2 text-[#F7F2DA]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <Power size={18} />
                          <span className="text-sm">Disconnect</span>
                        </motion.div>
                      </div>
                    </div>
                    <div className="w-full h-[2px] bg-[#787878] border-t-[0.63px] border-[#000000]" />
                  </motion.div>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default CubicButtonSide