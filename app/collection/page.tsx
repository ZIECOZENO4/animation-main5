import { HeroSection } from '@/components/Hero'
import React from 'react'
import TokenDetailsTable from './second tablelist'

const CollectionPage = () => {
  return (
    <div className='align-middle flex flex-col'>
    <HeroSection />
    <TokenDetailsTable />
  </div>
  )
}

export default CollectionPage