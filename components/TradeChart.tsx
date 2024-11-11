// app/components/TradeChart.tsx
'use client';

import { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi } from 'lightweight-charts';
import { motion } from 'framer-motion';

interface TradeChartProps {
  data: ChartData[];
  scatterPoints?: ScatterPoint[];
}

const TradeChart: React.FC<TradeChartProps> = ({ data, scatterPoints = [] }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartOptions = {
      layout: {
        background: { type: ColorType.Solid, color: '#000000' },
        textColor: '#666666',
      },
      grid: {
        vertLines: { color: '#333333' },
        horzLines: { color: '#333333' },
      },
      crosshair: {
        mode: 1,
        vertLine: {
          width: 1,
          color: '#666666',
          style: 0,
        },
        horzLine: {
          width: 1,
          color: '#666666',
          style: 0,
        },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: '#333333',
        textColor: '#666666',
      },
      rightPriceScale: {
        borderColor: '#333333',
        textColor: '#666666',
      },
    };

    const chart = createChart(chartContainerRef.current, chartOptions);
    chartRef.current = chart;

    // Main line series
    const mainSeries = chart.addLineSeries({
      color: '#ff4444',
      lineWidth: 2,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 4,
      lastValueVisible: false,
    });

    // Scatter series
    const scatterSeries = chart.addScatterSeries({
      color: '#666666',
      markers: {
        size: 4,
      },
    });

    // Volume series
    const volumeSeries = chart.addHistogramSeries({
      color: '#ff4444',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    // Set data
    mainSeries.setData(data);
    scatterSeries.setData(scatterPoints);
    volumeSeries.setData(data.map(item => ({
      time: item.time,
      value: item.volume || 0,
    })));

    // Responsive handling
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, scatterPoints]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[600px] bg-black p-4"
    >
      <div
        ref={chartContainerRef}
        className="w-full h-full"
      />
    </motion.div>
  );
};

export default TradeChart;