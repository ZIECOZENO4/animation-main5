import React from 'react'
import BottomStatus from '../record/content/crypto-status-bar'
import NFTCollectionManager from './body'

const ProfilePage = () => {
  return (

         <main className="flex flex-col h-[calc(100vh-5rem)]">
      <div className="flex-grow overflow-hidden">
      <NFTCollectionManager />
      </div>
      <BottomStatus />
    </main>

  )
}

export default ProfilePage