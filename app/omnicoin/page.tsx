import React from 'react'
import DesktopCoin from './DesktopCoin'
import MobileCoin from './MobileCoin'

const OmniCoinPage = () => {
  return (
    <div className="w-full h-full">
      <div className="hidden sm:block w-full h-full">
        <DesktopCoin />
      </div>
      <div className="sm:hidden w-full h-full">
        <MobileCoin />
      </div>
    </div>
  )
}

export default OmniCoinPage