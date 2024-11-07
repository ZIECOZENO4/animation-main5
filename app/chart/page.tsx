import React from 'react'
import SalesChart from './sales-chart'
import DeptComponent from './dept-graph'

const ChartPage = () => {
  return (
    <div className='bg-black p-4 min-h-screen flex-col md:flex-row gap-4 w-full flex justify-between'> 
    <div className='w-full md:w-[60%]'>
    <SalesChart />   
     </div> 
     <div className='w-full md:w-[40%]'>
        <DeptComponent />


        
        </div>
         </div>
  )
}

export default ChartPage