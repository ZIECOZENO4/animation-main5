// import React from "react";

// const CubicButton = () => {
//   return (
//     <div className='flex flex-row mx-4 shake-button'>
//       <div className="top-9  left-[1305.31px] w-[2.84px] h-[36.22px] bg-[#787878] border-t-[0.63px] border-solid border-black"></div>
//       <div className='flex flex-col'>
//         <div className="w-[110.25px] h-[33.39px] top-9 left-[1307.83px] bg-[#787878] items-center shadow-md flex justify-center">
//           <span className="text-[#F7F2DA] text-xl font-normal leading-5 text-center">
//             CONNECT
//           </span>
//         </div>
//         <div className="top-[69.7px] left-[1305px] w-[110.08px] h-[3.15px] bg-[#787878] border-t-[0.63px] border-solid border-black"></div>
//       </div>
//     </div>
//   );
// };

// export default CubicButton;


"use client"
import { ConnectButton } from "@rainbow-me/rainbowkit"

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
                    <div className="top-9 left-[1305.31px] w-[2.84px] h-[36.22px] bg-[#787878] border-t-[0.63px] border-solid border-black"></div>
                    <div className='flex flex-col'>
                      <div className="w-[110.25px] h-[33.39px] top-9 left-[1307.83px] bg-[#787878] items-center shadow-md flex justify-center">
                        <span className="text-[#F7F2DA] text-xl font-normal leading-5 text-center">
                          CONNECT
                        </span>
                      </div>
                      <div className="top-[69.7px] left-[1305px] w-[110.08px] h-[3.15px] bg-[#787878] border-t-[0.63px] border-solid border-black"></div>
                    </div>
                  </div>
                )
              }

              return (
                <div className="flex gap-3">
                  <div 
                    className='flex flex-row mx-4 shake-button cursor-pointer'
                    onClick={openChainModal}
                  >
                    <div className="top-9 left-[1305.31px] w-[2.84px] h-[36.22px] bg-[#787878] border-t-[0.63px] border-solid border-black"></div>
                    <div className='flex flex-col'>
                      <div className="w-[110.25px] h-[33.39px] top-9 left-[1307.83px] bg-[#787878] items-center shadow-md flex justify-center">
                        <span className="text-[#F7F2DA] text-xl font-normal leading-5 text-center">
                          {chain.name}
                        </span>
                      </div>
                      <div className="top-[69.7px] left-[1305px] w-[110.08px] h-[3.15px] bg-[#787878] border-t-[0.63px] border-solid border-black"></div>
                    </div>
                  </div>

                  <div 
                    className='flex flex-row mx-4 shake-button cursor-pointer'
                    onClick={openAccountModal}
                  >
                    <div className="top-9 left-[1305.31px] w-[2.84px] h-[36.22px] bg-[#787878] border-t-[0.63px] border-solid border-black"></div>
                    <div className='flex flex-col'>
                      <div className="w-[110.25px] h-[33.39px] top-9 left-[1307.83px] bg-[#787878] items-center shadow-md flex justify-center">
                        <span className="text-[#F7F2DA] text-xl font-normal leading-5 text-center">
                          {account.displayName}
                        </span>
                      </div>
                      <div className="top-[69.7px] left-[1305px] w-[110.08px] h-[3.15px] bg-[#787878] border-t-[0.63px] border-solid border-black"></div>
                    </div>
                  </div>
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