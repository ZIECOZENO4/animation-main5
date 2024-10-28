import React from 'react'
import BottomStatus from '../record/content/crypto-status-bar'
import NFTCollectionManager from './body'

const ProfilePage = () => {
  return (
    <div>
         <main className="flex flex-col h-[calc(100vh-5rem)]">
      <div className="flex-grow overflow-hidden">
      <NFTCollectionManager />
      </div>
      <BottomStatus />
    </main>
    </div>
  )
}

export default ProfilePage