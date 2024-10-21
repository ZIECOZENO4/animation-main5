'use client';
import './loder.css'


export default function Loading() {
    return (
      <div className="flex justify-center items-center h-screen">
<div className="terminal-loader">
  <div className="terminal-header">
    <div className="terminal-title">Status</div>
    <div className="terminal-controls">
      <div className="control close"></div>
      <div className="control minimize"></div>
      <div className="control maximize"></div>
    </div>
  </div>
  <div className="text">please wait...</div>
</div>
        </div>
    );
}