// app/types/chart.ts
export interface ChartData {
    time: string;
    value: number;
    volume?: number;
  }
  
  export interface ScatterPoint {
    time: string;
    value: number;
  }