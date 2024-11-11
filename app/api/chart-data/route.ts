// app/api/chart-data/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate fetching data from an API
  const generateData = () => {
    const data = [];
    const now = new Date();
    
    for (let i = 0; i < 100; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      data.push({
        time: date.toISOString().split('T')[0],
        value: 4.5 + Math.random(),
        volume: Math.floor(Math.random() * 500),
      });
    }
    
    return data.reverse();
  };

  return NextResponse.json({ data: generateData() });
}