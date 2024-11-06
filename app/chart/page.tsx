import React from 'react'
import SalesChart from './sales-chart'
import DeptComponent from './dept-graph'

const ChartPage = () => {
  return (
    <div className='bg-black p-4 flex justify-between'><SalesChart /> <DeptComponent /></div>
  )
}

export default ChartPage