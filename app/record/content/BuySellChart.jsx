"use client"

import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'B',
    buy: 4000,
    sell: 2400,
  },
  {
    name: 'S',
    buy: 3000,
    sell: 1398,
  },
  {
    name: 'S',
    buy: 4000,
    sell: 1598,
  },
  {
    name: 'B',
    buy: 3200,
    sell: 1798,
  },
  {
    name: 'S',
    buy: 9000,
    sell: 3998,
  },
];

const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value } = props;
  const radius = 10;

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#ffffff" />
      <text 
        x={x + width / 2} 
        y={y - radius} 
        fill="#000000" 
        textAnchor="middle" 
        dominantBaseline="middle"
        style={{ fontSize: '12px', fontWeight: 'bold' }}
      >
        {value}
      </text>
    </g>
  );
};

export default class BuySellChart extends PureComponent {
  render() {
    return (
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#000000' }}
              axisLine={{ stroke: '#000000' }}
            />
            <YAxis 
              tick={{ fill: '#000000' }}
              axisLine={{ stroke: '#000000' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff',
                border: '1px solid #000000'
              }}
            />
            <Legend />
            <Bar 
              dataKey="buy" 
              fill="#ffffff" 
              stroke="#000000"
              strokeWidth={1}
              minPointSize={5}
            >
              <LabelList dataKey="buy" content={renderCustomizedLabel} />
            </Bar>
            <Bar 
              dataKey="sell" 
              fill="#64748b" 
              minPointSize={10}
            >
              <LabelList dataKey="sell" content={renderCustomizedLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}