'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

const data = [
  { time: '5 PM', price: 0.285 },
  { time: '7 PM', price: 0.292 },
  { time: '9 PM', price: 0.288 },
  { time: '11 PM', price: 0.295 },
  { time: '1 AM', price: 0.293 },
  { time: '3 AM', price: 0.291 },
  { time: '5 AM', price: 0.292 },
  { time: '7 AM', price: 0.290 },
  { time: '9 AM', price: 0.289 },
  { time: '11 AM', price: 0.288 },
]

const highlightPoints = ['5 PM', '11 PM', '5 AM', '11 AM']

export default function FinancialGraph() {
  const [activePoint, setActivePoint] = useState(null)

  return (
    <div className="bg-black  border border-slate-500">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <span className="text-gray-500">DEPTH</span>
          <span className="text-orange-500">SALES</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="bg-orange-500 text-black px-2 py-1 rounded">1D</button>
          <button className="text-gray-500">1W</button>
          <button className="text-gray-500">1M</button>
          <button className="text-gray-500">⛶</button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <XAxis
            dataKey="time"
            axisLine={{ stroke: '#333' }}
            tick={{ fill: '#666' }}
            tickLine={{ stroke: '#333' }}
          />
          <YAxis
            domain={[0.280, 0.300]}
            ticks={[0.280, 0.285, 0.290, 0.295, 0.300]}
            axisLine={{ stroke: '#333' }}
            tick={{ fill: '#666' }}
            tickLine={{ stroke: '#333' }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-gray-800 border border-gray-700 p-2 rounded">
                    <p className="text-orange-500">{`${payload[0].value}`}</p>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            type="stepAfter"
            dataKey="price"
            stroke="#ff6b00"
            dot={false}
            activeDot={false}
            strokeWidth={2}
          />
          {data.map((entry, index) => (
            highlightPoints.includes(entry.time) && (
              <motion.circle
                key={index}
                cx={`${(index / (data.length - 1)) * 100}%`}
                cy={`${((0.300 - entry.price) / 0.02) * 100}%`}
                r={4}
                fill={activePoint === index ? '#fff' : '#ff6b00'}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setActivePoint(index)}
                onMouseLeave={() => setActivePoint(null)}
              />
            )
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}