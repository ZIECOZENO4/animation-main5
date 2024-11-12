
// import { ConnectButton } from "@rainbow-me/rainbowkit"
// import { ChevronDownIcon, Copy, CheckCircle, Power, Plug, Loader2 } from "lucide-react"
// import { useState } from "react"
// import { motion } from "framer-motion"
// import { useBalance, useDisconnect } from 'wagmi'
// const WalletIcon = ({ className = "", size = 24 }) => {
//   return (
//     <motion.svg
//       width={size}
//       height={size}
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className={`${className}`}
//       whileHover={{ scale: 1.1 }}
//       whileTap={{ scale: 0.95 }}
//     >
//       {/* Main wallet body */}
//       <path d="M20 6H4C2.89543 6 2 6.89543 2 8V16C2 17.1046 2.89543 18 4 18H20C21.1046 18 22 17.1046 22 16V8C22 6.89543 21.1046 6 20 6Z" />
      
//       {/* Wallet flap */}
//       <path d="M20 6V4C20 2.89543 19.1046 2 18 2H4C2.89543 2 2 2.89543 2 4" />
      
//       {/* Card slot */}
//       <rect x="16" y="10" width="4" height="4" rx="1" />
//     </motion.svg>
//   )
// }

// const CubicButtonSide = () => {
//   const [copied, setCopied] = useState(false)
//   const { disconnect } = useDisconnect()

//   return (
//     <ConnectButton.Custom>
//       {({
//         account,
//         chain,
//         openAccountModal,
//         openChainModal,
//         openConnectModal,
//         mounted,
//       }) => {
//         const { data: balanceData, isLoading: isBalanceLoading } = useBalance({
//           address: account?.address && account.address.startsWith('0x') 
//             ? (account.address as `0x${string}`)
//             : undefined,
//         })

//         const ready = mounted
//         const connected = ready && account && chain

//         const handleCopy = async () => {
//           if (account?.address) {
//             await navigator.clipboard.writeText(account.address)
//             setCopied(true)
//             setTimeout(() => setCopied(false), 2000)
//           }
//         }

//         const handleDisconnect = async () => {
//           try {
//             await disconnect()
//           } catch (error) {
//             console.error("Failed to disconnect:", error)
//           }
//         }

//         return (
//           <div
//             {...(!ready && {
//               'aria-hidden': true,
//               'style': {
//                 opacity: 0,
//                 pointerEvents: 'none',
//                 userSelect: 'none',
//               },
//             })}
//           >
//             {(() => {
//               if (!connected) {
//                 return (
//                   <div className="px-6">
//                     <motion.div 
//                       className="w-full h-[36.22px] shake-button border-[0.63px] border-[#000000]"
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       onClick={openConnectModal}
//                       whileHover={{ scale: 1.05 }}
//                     >
//                       <div className="flex">
//                         <div className="w-[2.84px] h-[36.22px] bg-[#787878] border-t-[0.63px] border-black" />
//                         <div className="flex items-center justify-center w-full text-center h-[33px] bg-[#787878]">
//                           <motion.div 
//                             className="flex items-center  gap-4 text-[20px] text-[#F7F2DA] text-center font-normal"
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                           >
//                             <span>CONNECT</span>
                         
//                             <WalletIcon size={18} />
//                           </motion.div>
//                         </div>
//                       </div>
//                       <div className="w-full h-[2px] bg-[#787878] border-t-[0.63px] border-[#000000]" />
//                     </motion.div>
//                   </div>
//                 )
//               }

//               return (
//                 <div className="flex flex-col gap-4 px-6">
//                   {/* Copy Address Button */}
//                   <motion.div 
//                     className="w-full h-[36.22px] shake-button border-[0.63px] border-[#000000]"
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     onClick={handleCopy}
//                     whileHover={{ scale: 1.05 }}
//                   >
//                     <div className="flex">
//                       <div className="w-[2.84px] h-[36.22px] bg-[#787878] border-t-[0.63px] border-black" />
//                       <div className="w-full px-4 shadow-md flex text-center items-center justify-between h-[33px] bg-[#787878]">
//                         <motion.div className="flex items-center w-full justify-between text-[#F7F2DA]">
//                           {isBalanceLoading || !account?.address ? (
//                             <motion.div
//                               className="flex items-center text-center gap-4 w-full justify-between"
//                             >
//                               <span className="text-sm">Waiting for address...</span>
//                               <Loader2 className="animate-spin" size={18} />
//                             </motion.div>
//                           ) : copied ? (
//                             <motion.div
//                               initial={{ opacity: 0 }}
//                               animate={{ opacity: 1 }}
//                               className="flex items-center text-center gap-4 w-full "
//                             >
//                               <span className="text-sm">Copied!</span>
//                               <CheckCircle size={18} />
//                             </motion.div>
//                           ) : (
//                             <motion.div
//                               initial={{ opacity: 0 }}
//                               animate={{ opacity: 1 }}
//                               className="flex items-center text-center gap-4 w-full "
//                             >
//                               <span className="text-sm">Copy Address</span>
//                               <Copy size={18} />
//                             </motion.div>
//                           )}
//                         </motion.div>
//                       </div>
//                     </div>
//                     <div className="w-full h-[2px] bg-[#787878] border-t-[0.63px] border-[#000000]" />
//                   </motion.div>

//                   {/* Disconnect Button */}
//                   <motion.div 
//                     className="w-full h-[36.22px] shake-button border-[0.63px] border-[#000000]"
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     onClick={handleDisconnect}
//                     whileHover={{ scale: 1.05 }}
//                   >
//                     <div className="flex">
//                       <div className="w-[2.84px] h-[36.22px] bg-[#787878] border-t-[0.63px] border-black" />
//                       <div className="w-full px-4 shadow-md flex items-center text-center justify-between h-[33px] bg-[#787878]">
//                         <motion.div 
//                           className="flex items-center text-center  gap-4 w-full text-[#F7F2DA]"
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                         >
//                           <span className="text-sm">Disconnect</span>
//                           <Power size={18} />
//                         </motion.div>
//                       </div>
//                     </div>
//                     <div className="w-full h-[2px] bg-[#787878] border-t-[0.63px] border-[#000000]" />
//                   </motion.div>
//                 </div>
//               )
//             })()}
//           </div>
//         )
//       }}
//     </ConnectButton.Custom>
//   )
// }

// export default CubicButtonSide


"use client"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { ChevronDownIcon, Copy, CheckCircle, Power, Plug, Loader2 } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useBalance, useDisconnect, useAccount } from 'wagmi'

const WalletIcon = ({ className = "", size = 24 }) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <path d="M20 6H4C2.89543 6 2 6.89543 2 8V16C2 17.1046 2.89543 18 4 18H20C21.1046 18 22 17.1046 22 16V8C22 6.89543 21.1046 6 20 6Z" />
      <path d="M20 6V4C20 2.89543 19.1046 2 18 2H4C2.89543 2 2 2.89543 2 4" />
      <rect x="16" y="10" width="4" height="4" rx="1" />
    </motion.svg>
  )
}

const CubicButtonSide = () => {
  const [copied, setCopied] = useState(false)
  const { disconnect } = useDisconnect()
  const { address, isConnected } = useAccount()

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
        const { data: balanceData, isLoading: isBalanceLoading } = useBalance({
          address: address as `0x${string}`,
          enabled: Boolean(address),
        })

        const ready = mounted && isConnected
        const connected = ready && address

        const handleCopy = async () => {
          if (address) {
            await navigator.clipboard.writeText(address)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          }
        }

        const handleDisconnect = async () => {
          try {
            await disconnect()
          } catch (error) {
            console.error("Failed to disconnect:", error)
          }
        }

        if (!mounted) return null

        return (
          <div className="relative">
            {!connected ? (
              <div className="px-6">
                <motion.div 
                  className="w-full h-[36.22px] shake-button border-[0.63px] border-[#000000]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={openConnectModal}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex">
                    <div className="w-[2.84px] h-[36.22px] bg-[#787878] border-t-[0.63px] border-black" />
                    <div className="flex items-center justify-center w-full text-center h-[33px] bg-[#787878]">
                      <motion.div 
                        className="flex items-center gap-4 text-[20px] text-[#F7F2DA] text-center font-normal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <span>CONNECT</span>
                        <WalletIcon size={18} />
                      </motion.div>
                    </div>
                  </div>
                  <div className="w-full h-[2px] bg-[#787878] border-t-[0.63px] border-[#000000]" />
                </motion.div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 px-6">
                <motion.div 
                  className="w-full h-[36.22px] shake-button border-[0.63px] border-[#000000]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={handleCopy}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex">
                    <div className="w-[2.84px] h-[36.22px] bg-[#787878] border-t-[0.63px] border-black" />
                    <div className="w-full px-4 shadow-md flex text-center items-center justify-between h-[33px] bg-[#787878]">
                      <motion.div className="flex items-center w-full justify-between text-[#F7F2DA]">
                        {isBalanceLoading ? (
                          <motion.div
                            className="flex items-center text-center gap-4 w-full justify-between"
                          >
                            <span className="text-sm">Waiting for address...</span>
                            <Loader2 className="animate-spin" size={18} />
                          </motion.div>
                        ) : copied ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center text-center gap-4 w-full justify-between"
                          >
                            <span className="text-sm">Copied!</span>
                            <CheckCircle size={18} />
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center text-center gap-4 w-full justify-between"
                          >
                            <span className="text-sm">Copy Address</span>
                            <Copy size={18} />
                          </motion.div>
                        )}
                      </motion.div>
                    </div>
                  </div>
                  <div className="w-full h-[2px] bg-[#787878] border-t-[0.63px] border-[#000000]" />
                </motion.div>

                <motion.div 
                  className="w-full h-[36.22px] shake-button border-[0.63px] border-[#000000]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={handleDisconnect}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex">
                    <div className="w-[2.84px] h-[36.22px] bg-[#787878] border-t-[0.63px] border-black" />
                    <div className="w-full px-4 shadow-md flex items-center text-center justify-between h-[33px] bg-[#787878]">
                      <motion.div 
                        className="flex items-center text-center gap-4 w-full text-[#F7F2DA]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <span className="text-sm">Disconnect</span>
                        <Power size={18} />
                      </motion.div>
                    </div>
                  </div>
                  <div className="w-full h-[2px] bg-[#787878] border-t-[0.63px] border-[#000000]" />
                </motion.div>
              </div>
            )}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default CubicButtonSide