// app/hooks/useChartData.ts
import { useState, useEffect } from 'react';
import { ChartData } from '../types/chart';

export function useChartData() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/chart-data');
        const json = await response.json();
        setData(json.data);
      } catch (err) {
        setError('Failed to fetch chart data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}