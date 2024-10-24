
"use client"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { ChevronDownIcon } from "lucide-react"
import Image from "next/image"
import { useBalance } from 'wagmi'

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
        // Correct way to use useBalance hook
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
                  <div 
                    className='flex flex-row mx-4 shake-button cursor-pointer'
                    onClick={openConnectModal}
                  >
                    <div className="w-[2.84px] h-[36.22px] bg-[#787878] border-t-[0.63px] border-solid border-black"></div>
                    <div className='flex flex-col'>
                      <div className="w-[110.25px] h-[33.39px] bg-[#787878] items-center shadow-md flex justify-center">
                        <span className="text-[#F7F2DA] text-xl font-normal leading-5 text-center">
                          CONNECT
                        </span>
                      </div>
                      <div className="w-[110.08px] h-[3.15px] bg-[#787878] border-t-[0.63px] border-solid border-black"></div>
                    </div>
                  </div>
                )
              }

              return (
                <div className="flex flex-col sm:flex-row gap-1">
                    <div 
                    className='flex flex-row mx-1 w-auto shake-button cursor-pointer'
                    onClick={openChainModal}
                  >
                    <div className="w-[2.84px] h-full bg-[#787878] border-t-[0.63px] border-solid border-black"></div>
                    <div className='flex flex-col'>
                      <div className="w-auto px-2 h-[45px] bg-[#787878] shadow-md flex items-center justify-between ">
                        <div className="flex items-center gap-2">
                          {chain.iconUrl && (
                            <Image
                              src={chain.iconUrl}
                              alt={chain.name || "Network"}
                              width={30}
                              height={30}
                              className="rounded-full"
                            />
                          )}
         <span className="text-[#F7F2DA] text-sm font-normal px-1">
  {(chain.name ?? "Unknown").length <= 8 
    ? chain.name 
    : `${chain.name?.slice(0, 8)}...`}
</span>
                          <ChevronDownIcon />
                        </div>
                        {chain.unsupported && (
                          <span className="text-red-500 text-xs">
                            ⚠️ Unsupported
                          </span>
                        )}
                      </div>
                      <div className="w-full h-[3.15px] bg-[#787878] border-t-[0.63px] border-solid border-black"></div>
                    </div>
                  </div>
                  {/* Account & Balance Button */}
                  <div 
                    className='flex flex-row mx-2 w-auto shake-button cursor-pointer'
                    onClick={openAccountModal}
                  >
                    <div className="w-[2.84px] h-full bg-[#787878] border-t-[0.63px] border-solid border-black"></div>
                    <div className='flex flex-col'>
                      <div className="w-auto px-2 h-[45px] bg-[#787878] shadow-md flex items-center justify-between ">
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
                        </div>
                        <span className="text-[#F7F2DA] text-xs pl-2 pr-1 font-normal">
                            {account.displayName}
                          </span>
                        <ChevronDownIcon />
                      </div>
                      <div className="w-full h-[3.15px] bg-[#787878] border-t-[0.63px] border-solid border-black"></div>
                    </div>
                  </div>

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