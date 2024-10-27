'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'

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

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
}

const chartVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

const tooltipVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  exit: { 
    scale: 0, 
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
}

export default function FinancialGraph() {
  const [activePoint, setActivePoint] = useState<number | null>(null)
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')

  return (
    <motion.div 
      className="bg-black border border-slate-500 p-4 rounded-lg"
      initial="hidden"
      animate="visible"
      variants={chartVariants}
    >
      <div className="flex justify-between items-center mb-4">
        <motion.div 
          className="flex items-center space-x-4"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-gray-500">DEPTH</span>
          <span className="text-orange-500">SALES</span>
        </motion.div>
        <div className="flex items-center space-x-2">
          {['1D', '1W', '1M'].map((timeframe) => (
            <motion.button
              key={timeframe}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className={`px-3 py-1 rounded transition-colors ${
                selectedTimeframe === timeframe 
                  ? 'bg-orange-500 text-black' 
                  : 'text-gray-500 hover:text-gray-400'
              }`}
              onClick={() => setSelectedTimeframe(timeframe)}
            >
              {timeframe}
            </motion.button>
          ))}
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="text-gray-500 hover:text-gray-400"
          >
            ⛶
          </motion.button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
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
                  <AnimatePresence>
                    <motion.div
                      variants={tooltipVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="bg-gray-800 border border-gray-700 p-3 rounded-lg shadow-lg"
                    >
                      <p className="text-orange-500 font-medium">
                        ${payload[0].value}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {payload[0].payload.time}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#ff6b00"
            strokeWidth={2}
            dot={false}
            activeDot={false}
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
                animate={{ 
                  scale: activePoint === index ? 1.5 : 1,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }}
                whileHover={{ scale: 1.5 }}
                onMouseEnter={() => setActivePoint(index)}
                onMouseLeave={() => setActivePoint(null)}
              />
            )
          ))}
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}