import { HeroSection } from '@/components/Hero'
import React from 'react'
import MainComponent from './crypto-marketplace'

const CollectionPage = () => {
  return (
    <div className='align-middle flex flex-col'>
    <HeroSection />
    <MainComponent />
  </div>
  )
}

export default CollectionPage