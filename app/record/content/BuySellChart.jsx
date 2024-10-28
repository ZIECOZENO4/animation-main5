"use client"

import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  {
    timestamp: '00:00',
    buy: 4000,
    sell: 2400,
    holding: 2400,
  },
  {
    timestamp: '04:00',
    buy: 3000,
    sell: 1398,
    holding: 2210,
  },
  {
    timestamp: '08:00',
    buy: 2000,
    sell: 9800,
    holding: 2290,
  },
  {
    timestamp: '12:00',
    buy: 2780,
    sell: 3908,
    holding: 2000,
  },
  {
    timestamp: '16:00',
    buy: 1890,
    sell: 4800,
    holding: 2181,
  },
  {
    timestamp: '20:00',
    buy: 2390,
    sell: 3800,
    holding: 2500,
  },
  {
    timestamp: '23:59',
    buy: 3490,
    sell: 4300,
    holding: 2100,
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-md">
        <p className="text-sm font-semibold mb-2">{`Time: ${label}`}</p>
        {payload.map((entry, index) => (
          <p
            key={index}
            className="text-sm"
            style={{ color: entry.color }}
          >
            {`${entry.name}: ${entry.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default class TradingChart extends PureComponent {
  render() {
    return (
      <div className="w-full h-64 overflow-auto align-middle ">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="timestamp" 
              tick={{ fill: '#374151' }}
              axisLine={{ stroke: '#374151' }}
            />
            <YAxis 
              tick={{ fill: '#374151' }}
              axisLine={{ stroke: '#374151' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="buy" 
              stackId="1" 
              stroke="#22c55e" 
              fill="#22c55e" 
              name="Buy"
            />
            <Area 
              type="monotone" 
              dataKey="sell" 
              stackId="1" 
              stroke="#ef4444" 
              fill="#ef4444" 
              name="Sell"
            />
            <Area 
              type="monotone" 
              dataKey="holding" 
              stackId="1" 
              stroke="#64748b" 
              fill="#64748b" 
              name="Holding"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}