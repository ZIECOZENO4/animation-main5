import React from 'react'
import BottomStatus from '../record/content/crypto-status-bar'
import NFTCollectionManager from './body'

const ProfilePage = () => {
  return (
    <div>
        <NFTCollectionManager />
         <BottomStatus />
    </div>
  )
}

export default ProfilePage