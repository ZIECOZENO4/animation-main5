// app/page.tsx
import TradeChart from '@/components/TradeChart';

const sampleData = [
  { time: '2024-01-01', value: 4.8, volume: 200 },
  { time: '2024-01-02', value: 5.0, volume: 150 },
  { time: '2024-01-03', value: 4.9, volume: 300 },
  // Add more data points...
];

const sampleScatterPoints = [
  { time: '2024-01-01', value: 4.9 },
  { time: '2024-01-02', value: 5.1 },
  // Add more scatter points...
];

export default function TradingChart() {
  return (
    <main className="min-h-screen bg-black p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-2xl mb-4">Trading Chart</h1>
        <TradeChart 
          data={sampleData}
          scatterPoints={sampleScatterPoints}
        />
      </div>
    </main>
  );
}